'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Typography } from 'antd'
import { BankOutlined, CreditCardOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BankAccountLinkingPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [bankAccounts, setBankAccounts] = useState([])
  const [virtualCards, setVirtualCards] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User must be logged in to link bank accounts.', {
        variant: 'error',
      })
      router.push('/home')
      return
    }

    const fetchData = async () => {
      try {
        const bankAccountsData = await Api.Bankaccount.findManyByUserId(userId)
        const virtualCardsData = await Api.Virtualcard.findManyByUserId(userId)
        setBankAccounts(bankAccountsData)
        setVirtualCards(virtualCardsData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data: ' + error.message, {
          variant: 'error',
        })
      }
    }

    fetchData()
  }, [userId, router])

  const handleFormSubmit = async values => {
    try {
      const { virtualCardId, bankAccountId } = values
      const virtualCardToUpdate = virtualCards.find(
        card => card.id === virtualCardId,
      )
      await Api.Virtualcard.updateOne(virtualCardId, {
        ...virtualCardToUpdate,
        linkedBankAccount: bankAccountId,
      })
      enqueueSnackbar('Bank account linked successfully!', {
        variant: 'success',
      })
      router.push('/virtual-card')
    } catch (error) {
      enqueueSnackbar('Failed to link bank account: ' + error.message, {
        variant: 'error',
      })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <CreditCardOutlined /> Link Bank Account
      </Title>
      <Text>
        Please select your virtual card and the bank account you wish to link.
      </Text>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="virtualCardId"
          label="Virtual Card"
          rules={[{ required: true, message: 'Please select a virtual card!' }]}
        >
          <Select placeholder="Select a virtual card">
            {virtualCards?.map(card => (
              <Option key={card.id} value={card.id}>
                {card.cardNumber}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="bankAccountId"
          label="Bank Account"
          rules={[{ required: true, message: 'Please select a bank account!' }]}
        >
          <Select placeholder="Select a bank account">
            {bankAccounts?.map(account => (
              <Option key={account.id} value={account.id}>
                {account.bankName} - {account.accountNumber}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<BankOutlined />}>
            Link Account
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}

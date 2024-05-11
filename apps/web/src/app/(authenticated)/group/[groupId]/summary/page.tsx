'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, List, Avatar, Divider } from 'antd'
import { DollarCircleOutlined, UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ExpenseSummaryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [group, setGroup] = useState<Model.Group>()
  const [expenses, setExpenses] = useState<Model.Expense[]>([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User must be logged in to view this page.', {
        variant: 'error',
      })
      router.push('/home')
      return
    }

    const fetchGroupDetails = async () => {
      try {
        const fetchedGroup = await Api.Group.findOne(params.groupId, {
          includes: [
            'createdBy',
            'expenses',
            'expenses.paidBy',
            'expenses.expensesplits',
            'expenses.expensesplits.owedBy',
          ],
        })
        setGroup(fetchedGroup)
        setExpenses(fetchedGroup.expenses || [])
      } catch (error) {
        enqueueSnackbar('Failed to fetch group details.', { variant: 'error' })
      }
    }

    fetchGroupDetails()
  }, [params.groupId, userId, router])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Expense Summary</Title>
      <Text type="secondary">
        Here you can see all expenses and settlements within the group.
      </Text>
      <Divider />
      {expenses?.map(expense => (
        <Card
          key={expense.id}
          title={expense.description}
          style={{ marginBottom: '20px' }}
        >
          <p>
            <DollarCircleOutlined /> Amount: {expense.amount}
          </p>
          <p>
            <UserOutlined /> Paid by: {expense.paidBy?.name}
          </p>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={expense.expensesplits}
            renderItem={split => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={split.owedBy?.pictureUrl || undefined}
                      icon={<UserOutlined />}
                    />
                  }
                  title={split.owedBy?.name}
                  description={`Owes ${split.amount}`}
                />
              </List.Item>
            )}
          />
        </Card>
      ))}
    </PageLayout>
  )
}

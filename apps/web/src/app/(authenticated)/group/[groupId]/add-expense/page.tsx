'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddExpensePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!authentication.isAuthenticated) {
      enqueueSnackbar('You must be logged in to add an expense.', {
        variant: 'error',
      })
      router.push('/home')
    }
  }, [authentication.isAuthenticated, router])

  const handleSubmit = async (values: {
    description: string
    amount: number
  }) => {
    try {
      const expense = await Api.Expense.createOneByGroupId(params.groupId, {
        description: values.description,
        amount: values.amount,
        paidById: authentication.user?.id,
        groupId: params.groupId,
      })
      enqueueSnackbar('Expense added successfully!', { variant: 'success' })
      router.push(`/group/${params.groupId}/summary`)
    } catch (error) {
      enqueueSnackbar('Failed to add expense. Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Add New Expense</Title>
      <Text type="secondary">
        Enter the details of the expense you wish to add to the group.
      </Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input the description of the expense!',
            },
          ]}
        >
          <Input placeholder="What was the expense for?" />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: 'Please input the amount of the expense!',
            },
          ]}
        >
          <InputNumber
            placeholder="Enter the amount"
            style={{ width: '100%' }}
            min={0.01}
            step={0.01}
            precision={2}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          >
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}

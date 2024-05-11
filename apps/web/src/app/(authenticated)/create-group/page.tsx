'use client'

import { Button, Form, Input, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateGroupPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleFormSubmit = async (values: { groupName: string }) => {
    if (!userId) {
      enqueueSnackbar('User must be logged in to create a group', {
        variant: 'error',
      })
      return
    }

    try {
      const newGroup = await Api.Group.createOneByCreatedById(userId, {
        name: values.groupName,
      })
      enqueueSnackbar('Group created successfully!', { variant: 'success' })
      router.push(`/group/${newGroup.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to create group', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Title level={2}>Create a New Group</Title>
        <Text type="secondary">
          Manage and track your expenses with a new group.
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="groupName"
            label="Group Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of the group!',
              },
            ]}
          >
            <Input placeholder="Enter group name" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
            >
              Create Group
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}

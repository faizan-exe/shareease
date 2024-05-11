'use client'

import { useState } from 'react'
import { Button, Input, Typography, Form, Space } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function InviteMembersPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { groupId } = params
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [email, setEmail] = useState('')

  const handleInvite = async () => {
    if (!email) {
      enqueueSnackbar('Please enter an email address.', { variant: 'error' })
      return
    }

    try {
      const invitation = await Api.Invitation.createOneByGroupId(groupId, {
        invitedUserEmail: email,
        status: 'pending',
        invitedById: userId,
      })
      enqueueSnackbar(`Invitation sent to ${email}`, { variant: 'success' })
      setEmail('')
    } catch (error) {
      enqueueSnackbar('Failed to send invitation.', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Invite Members</Title>
      <Paragraph>
        Enter the email address of the person you want to invite to the group.
      </Paragraph>
      <Form layout="inline" onFinish={handleInvite}>
        <Form.Item>
          <Input
            prefix={<UserAddOutlined />}
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Invitation
          </Button>
        </Form.Item>
      </Form>
      <Space>
        <Button onClick={() => router.push(`/group/${groupId}`)}>
          Back to Group
        </Button>
        <Button onClick={() => router.push('/home')}>Home</Button>
      </Space>
    </PageLayout>
  )
}

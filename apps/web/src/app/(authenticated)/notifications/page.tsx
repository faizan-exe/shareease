'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Avatar, Card, Button } from 'antd'
import { BellOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function NotificationsPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (userId) {
      Api.Notification.findManyByUserId(userId, { includes: ['user'] })
        .then(setNotifications)
        .catch(error => {
          console.error('Failed to fetch notifications', error)
          enqueueSnackbar('Failed to load notifications', { variant: 'error' })
        })
    }
  }, [userId])

  const handleNotificationClick = redirectUrl => {
    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <BellOutlined /> Notifications
      </Title>
      <Text type="secondary">
        Here are the latest updates on your group expenses, payments, and
        invites.
      </Text>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.title}
              extra={
                <Button
                  type="link"
                  onClick={() => handleNotificationClick(item.redirectUrl)}
                >
                  View
                </Button>
              }
            >
              <Card.Meta
                avatar={
                  <Avatar
                    src={
                      item.senderPictureUrl ||
                      'https://joeschmoe.io/api/v1/random'
                    }
                  />
                }
                title={item.senderName || 'System'}
                description={item.message}
              />
              <Text type="secondary">
                {dayjs(item.dateCreated).format('YYYY-MM-DD HH:mm')}
              </Text>
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}

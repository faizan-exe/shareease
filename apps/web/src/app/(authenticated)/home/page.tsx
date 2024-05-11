'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, List, Avatar, Button, Row, Col } from 'antd'
import {
  NotificationOutlined,
  TeamOutlined,
  TransactionOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [groups, setGroups] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      return
    }

    const fetchData = async () => {
      try {
        const userData = await Api.User.findOne(userId, {
          includes: [
            'notifications',
            'groupsAsCreatedBy',
            'transactionsAsSender',
            'transactionsAsReceiver',
          ],
        })
        setUser(userData)
        setNotifications(userData.notifications || [])
        setGroups(userData.groupsAsCreatedBy || [])
        setTransactions(
          [
            ...userData.transactionsAsSender,
            ...userData.transactionsAsReceiver,
          ] || [],
        )
      } catch (error) {
        enqueueSnackbar('Failed to fetch user data.', { variant: 'error' })
      }
    }

    fetchData()
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Dashboard</Title>
      <Text>Welcome to your ShareEase Dashboard.</Text>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title={
              <>
                <NotificationOutlined /> Notifications
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.senderPictureUrl} />}
                    title={item.title}
                    description={dayjs(item.dateCreated).format('MMMM D, YYYY')}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title={
              <>
                <TeamOutlined /> Groups
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={groups}
              renderItem={group => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<TeamOutlined />} />}
                    title={group.name}
                    description={`Created on ${dayjs(group.dateCreated).format('MMMM D, YYYY')}`}
                  />
                  <Button
                    type="link"
                    onClick={() => router.push(`/group/${group.id}`)}
                  >
                    View
                  </Button>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <>
                <TransactionOutlined /> Recent Transactions
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={transactions}
              renderItem={transaction => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<TransactionOutlined />} />}
                    title={`$${transaction.amount}`}
                    description={`To ${transaction.receiver?.name} on ${dayjs(transaction.dateCreated).format('MMMM D, YYYY')}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}

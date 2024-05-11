'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  List,
  Avatar,
  Card,
  Button,
  Descriptions,
  Divider,
} from 'antd'
import {
  UserOutlined,
  DollarCircleOutlined,
  TeamOutlined,
  MailOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function GroupDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [group, setGroup] = useState<Model.Group | null>(null)

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await Api.Group.findOne(params.groupId, {
          includes: [
            'createdBy',
            'memberships.user',
            'expenses',
            'invitations',
          ],
        })
        setGroup(groupData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch group details', { variant: 'error' })
      }
    }

    if (params.groupId) {
      fetchGroup()
    }
  }, [params.groupId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Group Details</Title>
      <Text type="secondary">
        Here you can view detailed information about the group, its members,
        expenses, and invitations.
      </Text>
      <Divider />
      {group ? (
        <>
          <Descriptions title="Group Information">
            <Descriptions.Item label="Name">{group.name}</Descriptions.Item>
            <Descriptions.Item label="Created By">
              {group.createdBy?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Date Created">
              {dayjs(group.dateCreated).format('DD/MM/YYYY')}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={group.memberships}
            header={
              <div>
                <TeamOutlined /> Members
              </div>
            }
            renderItem={member => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={member.user?.pictureUrl || undefined}
                      icon={<UserOutlined />}
                    />
                  }
                  title={member.user?.name}
                  description={`Joined on ${dayjs(member.dateCreated).format('DD/MM/YYYY')}`}
                />
              </List.Item>
            )}
          />
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={group.expenses}
            header={
              <div>
                <DollarCircleOutlined /> Expenses
              </div>
            }
            renderItem={expense => (
              <List.Item>
                <List.Item.Meta
                  title={`${expense.description} - $${expense.amount}`}
                  description={`Paid by ${expense.paidBy?.name} on ${dayjs(expense.dateCreated).format('DD/MM/YYYY')}`}
                />
              </List.Item>
            )}
          />
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={group.invitations}
            header={
              <div>
                <MailOutlined /> Invitations
              </div>
            }
            renderItem={invitation => (
              <List.Item>
                <List.Item.Meta
                  title={`Invited ${invitation.invitedUserEmail}`}
                  description={`Status: ${invitation.status} on ${dayjs(invitation.dateCreated).format('DD/MM/YYYY')}`}
                />
              </List.Item>
            )}
          />
          <Divider />
          <Button
            type="primary"
            onClick={() => router.push(`/group/${params.groupId}/add-expense`)}
          >
            Add Expense
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => router.push(`/group/${params.groupId}/invite`)}
          >
            Invite Members
          </Button>
        </>
      ) : (
        <Text>Loading group details...</Text>
      )}
    </PageLayout>
  )
}

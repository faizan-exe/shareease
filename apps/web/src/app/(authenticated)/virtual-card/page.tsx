'use client'

import { useState, useEffect } from 'react'
import { Typography, Button, Table, Modal, Form, Input, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function VirtualCardManagementPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [virtualCards, setVirtualCards] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCard, setEditingCard] = useState(null)

  useEffect(() => {
    const fetchVirtualCards = async () => {
      if (userId) {
        try {
          const cards = await Api.Virtualcard.findManyByUserId(userId, {
            includes: ['user'],
          })
          setVirtualCards(cards)
        } catch (error) {
          enqueueSnackbar('Failed to fetch virtual cards', { variant: 'error' })
        }
      }
    }

    fetchVirtualCards()
  }, [userId])

  const showModal = (card = null) => {
    setEditingCard(card)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingCard(null)
  }

  const handleFormSubmit = async values => {
    try {
      if (editingCard) {
        await Api.Virtualcard.updateOne(editingCard.id, values)
        enqueueSnackbar('Virtual card updated successfully', {
          variant: 'success',
        })
      } else {
        await Api.Virtualcard.createOneByUserId(userId, values)
        enqueueSnackbar('Virtual card created successfully', {
          variant: 'success',
        })
      }
      setIsModalVisible(false)
      setEditingCard(null)
    } catch (error) {
      enqueueSnackbar('Failed to process virtual card', { variant: 'error' })
    }
  }

  const handleDelete = async cardId => {
    try {
      await Api.Virtualcard.deleteOne(cardId)
      enqueueSnackbar('Virtual card deleted successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to delete virtual card', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Card Number',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    },
    {
      title: 'Linked Bank Account',
      dataIndex: 'linkedBankAccount',
      key: 'linkedBankAccount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title>Virtual Card Management</Title>
      <Text>
        Manage your virtual cards linked to your bank accounts for handling
        group expenses.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Virtual Card
      </Button>
      <Table dataSource={virtualCards} columns={columns} rowKey="id" />

      <Modal
        title={editingCard ? 'Edit Virtual Card' : 'Add Virtual Card'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form initialValues={editingCard} onFinish={handleFormSubmit}>
          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
              { required: true, message: 'Please input the card number!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="linkedBankAccount"
            label="Linked Bank Account"
            rules={[
              {
                required: true,
                message: 'Please input the linked bank account!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingCard ? 'Update' : 'Create'}
          </Button>
        </Form>
      </Modal>
    </PageLayout>
  )
}

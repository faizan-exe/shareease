'use client'

import { useEffect, useState } from 'react'
import { Button, Table, Tag, Typography } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TransactionApprovalPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsFound = await Api.Transaction.findMany({
          filters: { status: { eq: 'pending' }, receiverId: { eq: userId } },
          includes: ['sender', 'receiver'],
        })
        setTransactions(transactionsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch transactions', { variant: 'error' })
      }
    }

    if (userId) {
      fetchTransactions()
    }
  }, [userId])

  const handleApprove = async transactionId => {
    try {
      await Api.Transaction.updateOne(transactionId, { status: 'approved' })
      enqueueSnackbar('Transaction approved', { variant: 'success' })
      setTransactions(transactions.filter(t => t.id !== transactionId))
    } catch (error) {
      enqueueSnackbar('Failed to approve transaction', { variant: 'error' })
    }
  }

  const handleReject = async transactionId => {
    try {
      await Api.Transaction.updateOne(transactionId, { status: 'rejected' })
      enqueueSnackbar('Transaction rejected', { variant: 'success' })
      setTransactions(transactions.filter(t => t.id !== transactionId))
    } catch (error) {
      enqueueSnackbar('Failed to reject transaction', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: text => `$${text.toFixed(2)}`,
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
      key: 'sender',
      render: sender => sender?.name || 'Unknown',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag color="blue">{status}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.id)}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.id)}
          >
            Reject
          </Button>
        </>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Transaction Approval</Title>
      <Text type="secondary">
        Approve or reject pending transactions related to your group expenses.
      </Text>
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </PageLayout>
  )
}

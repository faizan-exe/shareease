import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = []

  const itemsUser = []

  const itemsTopbar = [
    {
      key: '/home',
      label: 'Dashboard',
      onClick: () => goTo('/home'),
    },

    {
      key: '/create-group',
      label: 'Create Group',
      onClick: () => goTo('/create-group'),
    },

    {
      key: '/virtual-card',
      label: 'Virtual Card',
      onClick: () => goTo('/virtual-card'),
    },

    {
      key: '/link-bank',
      label: 'Link Bank Account',
      onClick: () => goTo('/link-bank'),
    },

    {
      key: '/transactions/approve',
      label: 'Approve Transactions',
      onClick: () => goTo('/transactions/approve'),
    },

    {
      key: '/notifications',
      label: 'Notifications',
      onClick: () => goTo('/notifications'),
    },
  ]

  const itemsSubNavigation = [
    {
      key: '/home',
      label: 'Dashboard',
    },

    {
      key: '/create-group',
      label: 'Create Group',
    },

    {
      key: '/group/:groupId',
      label: 'Group Details',
    },

    {
      key: '/group/:groupId/add-expense',
      label: 'Add Expense',
    },

    {
      key: '/group/:groupId/summary',
      label: 'Expense Summary',
    },

    {
      key: '/group/:groupId/invite',
      label: 'Invite Members',
    },

    {
      key: '/virtual-card',
      label: 'Virtual Card',
    },

    {
      key: '/link-bank',
      label: 'Link Bank Account',
    },

    {
      key: '/transactions/approve',
      label: 'Approve Transactions',
    },

    {
      key: '/notifications',
      label: 'Notifications',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

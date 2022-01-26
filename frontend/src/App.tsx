import { Layout, Menu, message, notification } from 'antd'
import {
  Header,
  Content,
  Footer,
} from 'antd/lib/layout/layout'
import { Link, Outlet } from 'react-router-dom'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import './App.css'
import LoginPage from './LoginPage'
import AuthProvider, { useAuth } from './utils/AuthProvider'

function RequireAuth({
  children,
}: {
  children: JSX.Element
}) {
  let auth = useAuth()
  let location = useLocation()

  notification.error({
    key: '1',
    message: 'Please login first!',
  })
  if (!auth.user) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}

function NavBar({ pages }: { pages: string[] }) {
  return (
    <div>
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['0']}
      >
        {pages.map((e, idx) => (
          <Menu.Item key={idx}>
            <Link to={`/${e}`}>{e}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <Outlet />
    </div>
  )
}

function App() {
  const pages = [
    'login',
    'booking',
    'view',
    'blockchain',
    'status',
  ]
  return (
    <Layout className='layout'>
      <AuthProvider>
        <BrowserRouter>
          <Content>
            <Routes>
              <Route
                element={
                  <Header>
                    <NavBar pages={pages} />
                  </Header>
                }
              >
                <Route
                  path='/'
                  element={
                    <RequireAuth>
                      <div>booking</div>
                    </RequireAuth>
                  }
                />
                <Route
                  path='/login'
                  element={<LoginPage />}
                />
                <Route
                  path='/booking'
                  element={
                    <RequireAuth>
                      <div>booking</div>
                    </RequireAuth>
                  }
                />
                <Route
                  path='/view'
                  element={
                    <RequireAuth>
                      <div>view</div>
                    </RequireAuth>
                  }
                />
                <Route
                  path='/blockchain'
                  element={
                    <RequireAuth>
                      <div>blockchain</div>
                    </RequireAuth>
                  }
                />
                <Route
                  path='/status'
                  element={
                    <RequireAuth>
                      <div>status</div>
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </Content>
        </BrowserRouter>
      </AuthProvider>
      <Footer style={{ textAlign: 'center' }}>
        Concensys take home task ©2022 Created by Tomi Tsui
      </Footer>
    </Layout>
  )
}

export default App

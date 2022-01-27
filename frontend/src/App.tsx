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
import BookingPage from './BookingPage'
import LoginPage from './LoginPage'
import AuthProvider, { useAuth } from './utils/AuthProvider'

function RequireAuth({
  children,
}: {
  children: JSX.Element
}) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth.user) {
    notification.error({
      key: '1',
      message: 'Please login first!',
    })
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
  let auth = useAuth()
  pages = auth.user
    ? pages.filter((e) => e !== 'login')
    : pages
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
      {auth.user && <div>Welcome, {auth.user}</div>}
      <Outlet />
    </div>
  )
}

function App() {
  const pages = ['login', 'booking']
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
                      <BookingPage />
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
                      <BookingPage />
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

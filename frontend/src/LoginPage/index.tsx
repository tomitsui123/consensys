import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
} from 'antd'
import {
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { LoginField, useAuth } from '../utils/AuthProvider'
import './index.css'

interface CustomState {
  from: { pathname: string }
}

export default function LoginPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  let state = location.state as CustomState
  let from = state?.from?.pathname || '/booking'
  console.log(from)
  const onFinish = async (values: LoginField) => {
    console.log('Success:', values)
    const res = await auth.signin(values)
    console.log(res)
    navigate(from, { replace: true })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Row style={{ margin: 40 }}>
      <Col md={8} sm={1} />
      <Col md={8} sm={22}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col md={8} sm={1} />
    </Row>
  )
}

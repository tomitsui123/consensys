import { Button, Modal, notification } from 'antd'
import { useState } from 'react'

export default function BookButton() {
  const [isBooked, setIsBook] = useState(false)
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] =
    useState(false)

  const onClick = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const handleOk = async () => {
    console.log('hi')
    setConfirmLoading(true)
    setTimeout(() => {
      setIsBook(!isBooked)
      setConfirmLoading(false)
      setVisible(false)
      notification.info({
        key: 'editBlockchain',
        message: 'data has been added to blockchain!',
      })
    }, 1000)
  }
  return (
    <>
      <Button
        onClick={onClick}
        danger={isBooked}
        type='primary'
        style={{ height: '100px', width: '70px' }}
      >
        {isBooked ? 'Cancel' : 'book'}
      </Button>
      <Modal
        title='Title'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Do you want to book the session()?</p>
      </Modal>
    </>
  )
}

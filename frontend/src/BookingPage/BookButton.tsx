import { Button, Modal, notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../utils/AuthProvider'

export default function BookButton({
  roomCode,
  time,
  isBooked,
  isSelected,
  getData,
}: {
  roomCode: string
  time: string
  isBooked: boolean
  isSelected: boolean | undefined
  getData: () => Promise<void>
}) {
  if (typeof isSelected !== 'undefined') {
    console.log(isSelected, roomCode, time)
  }
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] =
    useState(false)
  const auth = useAuth()

  const cancelReservation = async () => {
    await axios.post('/blockchain/transact', {
      action: 'Delete',
      username: auth.user,
      roomCode,
      time,
    })
  }

  const createReservation = () => {
    axios.post('/blockchain/transact', {
      action: 'Add',
      username: auth.user,
      roomCode,
      time,
    })
  }

  const onClick = () => {
    if ((isBooked && isSelected) || !isBooked) {
      setVisible(true)
    }
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const handleOk = async () => {
    setConfirmLoading(true)
    const isCancel = isBooked && isSelected
    const isCreate = !isSelected && !isBooked
    console.log(isBooked, isSelected)
    if (isCancel) {
      await cancelReservation()
      notification.info({
        key: 'editBlockchain',
        message: 'Reservation has been canceled.',
      })
    } else if (isCreate) {
      await createReservation()
      notification.info({
        key: 'editBlockchain',
        message:
          'Reservation has been added to blockchain!',
      })
    }
    await getData()
    setConfirmLoading(false)
    setVisible(false)
  }
  return (
    <>
      <Button
        onClick={onClick}
        danger={isBooked}
        type='primary'
        style={{
          height: '100px',
          width: '80px',
          margin: 0,
        }}
      >
        {isBooked
          ? !isSelected
            ? 'unavailable'
            : 'Cancel'
          : 'book'}
      </Button>
      <Modal
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

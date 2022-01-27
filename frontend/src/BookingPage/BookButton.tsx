import { Button } from 'antd'
import axios from 'axios'
import { AvailableData } from '.'
import { useAuth } from '../utils/AuthProvider'

export default function BookButton({
  roomCode,
  time,
  isBooked,
  isSelected,
  setData,
}: {
  roomCode: string
  time: string
  isBooked: boolean
  isSelected: boolean | undefined
  setData: React.Dispatch<
    React.SetStateAction<AvailableData[] | undefined>
  >
}) {
  if (typeof isSelected !== 'undefined') {
    console.log(isSelected, roomCode, time)
  }
  const auth = useAuth()

  const cancelReservation = async () => {
    const data = await axios.post<AvailableData[]>(
      '/blockchain/transact',
      {
        action: 'Delete',
        user: auth.user,
        roomCode,
        time,
      }
    )
    if (data) {
      setData(data.data)
    }
  }

  const createReservation = async () => {
    const { data } = await axios.post(
      '/blockchain/transact',
      {
        action: 'Add',
        user: auth.user,
        roomCode,
        time,
      }
    )
    if (data) {
      setData(data.data)
    }
  }

  const onClick = async () => {
    if (isBooked && !isSelected) return
    const isCancel = isBooked && isSelected
    const isCreate = !isSelected && !isBooked
    if (isCancel) {
      await cancelReservation()
    } else if (isCreate) {
      await createReservation()
    }
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
            ? 'N/A'
            : 'Cancel'
          : 'book'}
      </Button>
    </>
  )
}

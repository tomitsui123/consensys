import { Button } from 'antd'
import { useState } from 'react'

export default function BookButton() {
  const [isBooked, setIsBook] = useState(false)
  return (
    <Button
      onClick={() => setIsBook(!isBooked)}
      danger={isBooked}
      type='primary'
      style={{ height: '100px', width: '100%' }}
    >
      {isBooked ? 'Cancel' : 'book now'}
    </Button>
  )
}

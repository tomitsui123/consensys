import { Row, Col, message } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthProvider'
import BookButton from './BookButton'
import './index.css'

export interface AvailableData {
  isSelect?: boolean
  isOccupy?: boolean
  roomCode: string
  time: string
}

export default function BookingPage() {
  const [availableData, setAvailableData] =
    useState<AvailableData[]>()
    const auth = useAuth()
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `/blockchain/available/${auth.user}`
      )
      setAvailableData(data.data)
    } catch (e) {
      message.error('Please refresh the page.')
    }
  }
  const roomCodeList = [
    'P1',
    'P2',
    'P3',
    'P4',
    'P5',
    'P6',
    'P7',
    'P8',
    'P9',
    'P10',
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'C7',
    'C8',
    'C9',
    'C10',
  ]
  return (
    <Row>
      <Col span={24}>
        <table>
          <tr>
            <td style={{ width: 60 }} />
            {Array.apply(null, Array(24)).map((_, idx) => (
              <td style={{ textAlign: 'center' }}>
                {idx + 1}:00
              </td>
            ))}
          </tr>
          {roomCodeList.map((roomCode: string) => (
            <tr>
              <td
                className={
                  roomCode.indexOf('P') > -1
                    ? 'pepsi'
                    : 'coca'
                }
              >
                <strong>{roomCode}</strong>
              </td>
              {Array.apply(null, Array(24)).map(
                (_, idx) => {
                  const filteredData = availableData?.find(
                    (d) =>
                      d.roomCode === roomCode &&
                      d.time === (idx + 1).toString() &&
                      (d.isSelect || d.isOccupy)
                  )
                  const isBooked =
                    typeof filteredData !== 'undefined'
                  return (
                    <td>
                      <BookButton
                        setData={setAvailableData}
                        isSelected={
                          filteredData &&
                          filteredData.isSelect
                        }
                        isBooked={isBooked}
                        roomCode={roomCode}
                        time={(idx + 1).toString()}
                      />
                    </td>
                  )
                }
              )}
            </tr>
          ))}
        </table>
      </Col>
    </Row>
  )
}

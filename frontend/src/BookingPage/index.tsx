import { Row, Col } from 'antd'
import BookButton from './BookButton'

export default function BookingPage() {
  const tableName = [
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
            <td />
            {Array.apply(null, Array(24)).map((_, idx) => (
              <td style={{ textAlign: 'center' }}>{idx + 1}:00</td>
            ))}
          </tr>
          {tableName.map((tableName: string) => (
            <tr>
              <td>{tableName}</td>
              {Array.apply(null, Array(24)).map(
                (_, idx) => (
                  <td>
                    <BookButton />
                  </td>
                )
              )}
            </tr>
          ))}
        </table>
      </Col>
    </Row>
  )
}

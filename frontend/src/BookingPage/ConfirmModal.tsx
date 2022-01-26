import { Space } from 'antd'
import { createContext } from 'react'

const ModalContext = createContext({})

const config = {
  content: (
    <>
      <ModalContext.Consumer>
        {(name) => `Reachable: ${name}!`}
      </ModalContext.Consumer>
    </>
  ),
}

export default function ConfirmModal() {
  return (
    <ModalContext.Provider value="">
      <Space>
        
      </Space>
    </ModalContext.Provider>
  )
}

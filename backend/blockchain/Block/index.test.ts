import {
  expect,
  describe,
  beforeEach,
  it,
} from '@jest/globals'
import { Block } from './index'

describe('Block', () => {
  let data, lastBlock, block

  beforeEach(() => {
    data = 'bar'
    lastBlock = Block.genesis()
    block = Block.mintBlock(lastBlock, data)
  })

  it('sets the `data` to match the input', () => {
    expect(block.data).toEqual(data)
  })

  it('sets the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash)
  })
})

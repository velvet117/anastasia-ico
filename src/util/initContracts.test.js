import contract from 'truffle-contract'
import {loadPresale} from './contracts/loadPresale'
import initContracts from './initContracts'
import PresaleABI from 'AnastasiaIco/build/contracts/AnastasiaICO.json'
import TokenABI from 'AnastasiaIco/build/contracts/AnastasiaToken.json'
const setProviderMock = jest.fn()
jest.mock('./contracts/loadPresale')
jest.mock('truffle-contract')

describe('#initContracts', () => {
  it('default function ', () => {
  
    const setProviderMock = jest.fn()
    const setNetworkMock = jest.fn()
    const defaultsMock = jest.fn()
    let params;
    contract.mockImplementation(() => {
        return {setProvider: setProviderMock, setNetwork: setNetworkMock, defaults: defaultsMock}
    })
    loadPresale.mockImplementation((_params) => {
        params = _params
        return _params
    })
    const dispatch = jest.fn()
    initContracts({web3: {currentProvider: 'testProvider', eth: {accounts: ['0x123']}}, netId: '42'})(dispatch)
    expect(contract).toBeCalledWith(PresaleABI)
    expect(contract).toBeCalledWith(TokenABI)
    expect(setProviderMock).toBeCalledWith('testProvider')
    expect(setProviderMock.mock.calls.length).toBe(2)
    expect(setNetworkMock).toHaveBeenCalledWith('42')
    expect(setNetworkMock.mock.calls.length).toBe(2)
    expect(defaultsMock).toHaveBeenCalledWith({
      from: '0x123',
      gas: 3000000
    })
    expect(defaultsMock).toHaveBeenCalledWith({
      from: '0x123'
    })
    expect(dispatch).toBeCalledWith(params)
  })
})
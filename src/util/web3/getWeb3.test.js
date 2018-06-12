import getWeb3 from './getWeb3'
import Web3 from 'web3'
import store from '../../store'
import jsdom from 'jsdom'
jest.mock('web3')

describe('#getWeb3', () => {
    afterEach(() => {
        window.web3 = undefined
        jest.resetAllMocks()
    })
    test('sets mainnet with netId = 1 with metamask enabled', async () => {
        const web3 = {
            version: {
                getNetwork: (cb) => {
                    const err = null
                    const netId = "1"
                    cb(err, netId)
                }
            }
        };
        Web3.mockImplementation(() => {
            return web3
        })
        const dispatch = jest.fn()
        window.web3 = {
            currentProvider: ''
        }
        const actual = await store.dispatch(getWeb3())
        const expected = {
            type: 'WEB3_INITIALIZED',
            payload:
            {
                web3Instance: web3,
                netIdName: 'MAINNET',
                injectedWeb3: true,
                netId: '1'
            }
        }
        expect(actual).toEqual(expected)


    })

    test('sets KOVAN infura provider if no web3 detected', async () => {
        Web3.mockImplementation(() => {
            return {
                web3: 'yes'
            }
        })

        const expected = {
            type: 'WEB3_INITIALIZED',
            payload:
            {
                web3Instance: {web3: 'yes'},
                netIdName: 'KOVAN',
                injectedWeb3: false,
                netId: '42'
            }
        }
        const dispatch = jest.fn()


        const actual = await store.dispatch(getWeb3())
        const provider = Web3.providers.HttpProvider.mock.calls[0][0]
        expect(provider).toEqual('https://kovan.infura.io/metamask')
        expect(actual).toEqual(expected)

    })

})
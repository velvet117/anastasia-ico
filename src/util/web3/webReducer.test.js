import web3Reducer from './web3Reducer'
describe('#web3Reducer', () => {
    it('should set payload', () => {
        const action = {
            type: 'WEB3_INITIALIZED',
            payload: { foo: 'zoo' }
        }
        const actual = web3Reducer({ foo: 'bar' }, action)
        const expected = {
            foo: 'zoo'
        }
        expect(actual).toEqual(expected)
    })
})
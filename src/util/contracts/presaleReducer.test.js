import presaleReducer from './presaleReducer'
describe('#web3Reducer', () => {
    it('should set payload when type is PRESALE_INITIALIZED', () => {
        const action = {
            type: 'PRESALE_INITIALIZED',
            payload: { foo: 'zoo' }
        }
        const actual = presaleReducer({ foo: 'bar' }, action)
        const expected = {
            foo: 'zoo'
        }
        expect(actual).toEqual(expected)
    })

    it('should set payload when type is OTHER', () => {
        const action = {
            type: 'OTHER',
            payload: { foo: 'zoo' }
        }
        const actual = presaleReducer({ foo: 'bar' }, action)
        const expected = {
            foo: 'zoo'
        }
        expect(actual).toEqual(expected)
    })

    it('returns default state if no action.type is matched', () => {
        const initState = { foo: 'bar' }
        const actual = presaleReducer(initState, {type: 'foo'})
        expect(actual).toEqual(initState)
    })
})
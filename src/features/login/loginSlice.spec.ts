import loginReducer, { LoginResponse } from '../ricerca/ricercaSlice'

describe('login reducer', () => {
    const initialState: LoginResponse = {
        data: {
            AZIENDA_ID: '1',
            cf: {},
            azienda: {
                AZIENDA_ID: 0,
                RAGIONE_SOCIALE: '',
                COD_CF: '',
                FLAG_CALC_PROT: 0,
            },
        },
        message: 'login',
    }
    it('should handle initial state', () => {
        expect(loginReducer(undefined, { type: 'unknown' })).toEqual({
            value: 0,
            status: 'idle',
        })
    })

    // it('should handle increment', () => {
    //     const actual = loginReducer(initialState, increment())
    //     expect(actual.value).toEqual(4)
    // })

    // it('should handle decrement', () => {
    //     const actual = loginReducer(initialState, decrement())
    //     expect(actual.value).toEqual(2)
    // })

    // it('should handle incrementByAmount', () => {
    //     const actual = loginReducer(initialState, incrementByAmount(2))
    //     expect(actual.value).toEqual(5)
    // })
})

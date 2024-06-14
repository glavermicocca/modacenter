import valoriReducer from './ricercaSlice'

describe('valori reducer', () => {
    // const initialState: DdtAllResponse = {
    //     data: [],
    //     message: 'count',
    //     rowCount: 0,
    //     dataBarcode: [],
    //     clienteTemplateReportStampa: []
    // }
    it('should handle initial state', () => {
        expect(valoriReducer(undefined, { type: 'unknown' })).toEqual({
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

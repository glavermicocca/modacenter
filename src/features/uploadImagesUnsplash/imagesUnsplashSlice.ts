import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ImageObjSlicer } from '../ricerca/ricercaSlice'

export interface ImageItemResponse {
    total: number
    total_pages: number
    results: Array<ImageDetailItem>
    dataImages: ImageObjSlicer[]
}

export interface ImageDetailItem {
    id: string
    urls: Urls
}

export interface Urls {
    raw: string
    full?: string
    regular?: string
    small?: string
    thumb?: string
    small_s3?: string
}

export interface GenericQuerySearch {
    search: string
    page?: number
}

const initialState = {}

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched. Thunks are
// // typically used to make async requests.
// export const incrementAsync = createAsyncThunk('login/fetchCount', async (amount: number) => {
//     const response = await fetchCount(amount)
//     // The value we return becomes the `fulfilled` action payload
//     return response.data
// })

export const imageUnsplashSlice = createSlice({
    name: 'imagesUnsplashApi',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            //
            //state.ddtAll.data[0].NR_RIGHE += 1
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
    extraReducers: (builder) => {
        // builder
        //     .addMatcher(imagesUnsplashApi.endpoints.getRicercaArtAna.matchFulfilled, (state, { payload }) => {
        //         state.ricercaArtAna = payload.data
        //     })
        //     .addMatcher(imagesUnsplashApi.endpoints.getCarrelloAppoggio.matchFulfilled, (state, { payload }) => {
        //         state.carrelloAppoggio = payload.data
        //     })
        //     .addMatcher(imagesUnsplashApi.endpoints.getListini.matchFulfilled, (state, { payload }) => {
        //         state.artListPrezzi = payload.data
        //         state.listini = payload.listini
        //     })
    },

    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(imagesUnsplashApi.endpoints.getCarrelloList.matchFulfilled, (state, { payload, type, meta }) => {
    //             state.carrelloAppoggio = payload.data as CarrelloAppoggioObj[]
    //         })
    //         .addMatcher(imagesUnsplashApi.endpoints.getRicercaArtAna.matchFulfilled, (state, { payload, type, meta }) => {
    //             state.ricercaArtAna = payload.data as ArtAna[]

    //             console.log(state.carrelloAppoggio.entries, payload.data)

    //             state.ricercaArtAna.forEach((item) => {
    //                 item.carrello = state.carrelloAppoggio.find((it) => {
    //                     console.log(it, item)
    //                     return it.COD_ART == item.COD_ART
    //                 })
    //             })
    //         })
    // },

    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(incrementAsync.pending, (state) => {
    //             state.status = 'loading'
    //         })
    //         .addCase(incrementAsync.fulfilled, (state, action) => {
    //             state.status = 'idle'
    //             state.value += action.payload
    //         })
    //         .addCase(incrementAsync.rejected, (state) => {
    //             state.status = 'failed'
    //         })
    // },
})

export const { increment } = imageUnsplashSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.login.value)`
export const selectState = (state: RootState) => state.imageUnsplash

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = selectCount(getState())
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount))
//         }
//     }

export default imageUnsplashSlice.reducer

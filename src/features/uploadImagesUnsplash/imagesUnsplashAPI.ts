import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GenericQuerySearch, ImageItemResponse } from './imagesUnsplashSlice'

export const imagesUnsplashApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_UNSPLASH_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`)
            return headers
        },
    }),
    reducerPath: 'imagesUnsplashApi',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    keepUnusedDataFor: 30,
    endpoints: (build) => ({
        getRicerca: build.query<ImageItemResponse, GenericQuerySearch>({
            query: (data) => ({
                url: `search/photos?query=${data.search}&page=${data.page}`,
                method: 'GET',
            }),
            transformResponse: (response: ImageItemResponse, meta, args) => {
                response.dataImages = response.results.map((item) => {
                    return {
                        label: item.id + '',
                        imgPath: item.urls.small + '',
                    }
                })
                return response
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRicercaQuery, useLazyGetRicercaQuery } = imagesUnsplashApi

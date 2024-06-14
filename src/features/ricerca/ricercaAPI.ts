import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GenericQueryPagination, GenericResponse } from '../../components/GenericListItem'
import {
    ArtAnaResponse,
    ArtImageInsertRequest,
    ArtImageResponse,
    CarrelloAppoggioObj,
    CarrelloAppoggioResponse,
    CarrelloConfirmResponse,
    CarrelloRequestDuplicate,
    CarrelloTestataAppoggioObj,
    CfCliUserObj,
    GenericDeleteRequest,
    GenericDeleteResponse,
    GenericInsertResponse,
    GenericListImageRequest,
    LoginRequest,
    LoginResponse,
    RegistrationRequest,
    RegistrationResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    TIPO_IMAGE,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
} from './ricercaSlice'

export const ricercaApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_ENDPOINT }),
    reducerPath: 'ricercaApi',
    tagTypes: ['all', 'searchArtAna', 'categorie', 'carrello', 'listini', 'images', 'ordine'],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    keepUnusedDataFor: 30,
    endpoints: (build) => ({
        registrationPost: build.mutation<RegistrationResponse, RegistrationRequest>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (data: RegistrationRequest) => ({
                url: `/registration`,
                method: 'POST',
                body: data,
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        resetPassword: build.mutation<ResetPasswordResponse, ResetPasswordRequest>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (data: RegistrationRequest) => ({
                url: `/resetPassword`,
                method: 'POST',
                body: data,
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        updatePassworPost: build.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (data: UpdatePasswordRequest) => ({
                url: `/updatePassword`,
                method: 'POST',
                body: data,
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        loginPost: build.mutation<LoginResponse, LoginRequest>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (data: LoginRequest) => ({
                url: `/login`,
                method: 'POST',
                body: data,
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        logoutPost: build.mutation<LoginResponse, LoginRequest>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (data: LoginRequest) => ({
                url: `/logout`,
                method: 'POST',
                body: data,
            }),
            // transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
            // invalidatesTags: ['all', 'searchArtAna', 'carrello', 'listini', 'images', 'ordine'],
        }),
        // ART ANA
        getRicercaArtAna: build.query<ArtAnaResponse, GenericQueryPagination>({
            providesTags: ['searchArtAna'],
            query: (qp) => {
                const filter = qp.filter != null ? qp.filter.join(',') : ''

                return {
                    url: `artAna?search=${qp.search}&page=${qp.page}&pageSize=${qp.pageSize}&history=${qp.history}&listino=${qp.listino}&filter=${filter}`,
                    method: 'GET',
                }
            },
            transformResponse: (response: ArtAnaResponse, meta, args) => {
                return response
            },
        }),
        // CATEGORIE MERCIOLOGICHE
        getCategorie: build.query<GenericResponse<any>, void>({
            providesTags: ['categorie'],
            query: (queryPagination) => ({
                url: `artAna/categorie`,
                method: 'GET',
            }),
            transformResponse: (response: GenericResponse<any>, meta, args) => {
                return response
            },
        }),
        // ART LIST PREZZI
        getListiniOfferte: build.query<ArtAnaResponse, GenericQueryPagination>({
            providesTags: ['listini'],
            query: (queryPagination) => ({
                url: `listiniOfferte?search=${queryPagination.search}&page=${queryPagination.page}&pageSize=${queryPagination.pageSize}`,
                method: 'GET',
            }),
            transformResponse: (response: ArtAnaResponse, meta, args) => {
                return response
            },
        }),
        // --------------------------------------------------------------------------------------------
        // ------------------------------------------- LIST CF ----------------------------------------
        // --------------------------------------------------------------------------------------------
        getCf: build.query<GenericResponse<CfCliUserObj>, void>({
            query: (data) => ({
                url: `cf`,
                method: 'GET',
            }),
        }),
        // --------------------------------------------------------------------------------------------
        // ------------------------------------------- LIST CARRELLO ----------------------------------
        // --------------------------------------------------------------------------------------------
        getCarrelloAppoggio: build.query<CarrelloAppoggioResponse, void>({
            providesTags: ['carrello'],
            query: (data) => ({
                url: `carrelloAppoggio`,
                method: 'GET',
            }),
        }),
        getCarrelloTestataAppoggio: build.query<
            GenericResponse<Array<CarrelloTestataAppoggioObj>>,
            GenericQueryPagination
        >({
            providesTags: ['ordine'],
            query: (queryPagination) => ({
                url: `carrelloAppoggio/inviati/?page=${queryPagination.page}&pageSize=${queryPagination.pageSize}`,
                method: 'GET',
            }),
            transformResponse: (response: GenericResponse<any>, meta, args) => {
                return response
            },
        }),
        insertUpdateCarrelloAppoggio: build.mutation<CarrelloAppoggioResponse, CarrelloAppoggioObj>({
            // note: an optional `queryFn` may be used in place of `query`
            invalidatesTags: ['carrello'],
            query: (data: CarrelloAppoggioObj) => ({
                url: `/carrelloAppoggio/insert`,
                method: 'PUT',
                body: data,
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        duplicateCarrelloAppoggio: build.mutation<GenericDeleteResponse, CarrelloRequestDuplicate>({
            // note: an optional `queryFn` may be used in place of `query`
            invalidatesTags: ['carrello'],
            query: (data: CarrelloRequestDuplicate) => ({
                url: `/carrelloAppoggio/duplicate`,
                method: 'PUT',
                body: data,
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        insertOrdine: build.mutation<GenericInsertResponse<CarrelloConfirmResponse>, CarrelloTestataAppoggioObj>({
            // note: an optional `queryFn` may be used in place of `query`
            invalidatesTags: ['carrello', 'searchArtAna', 'ordine'],
            query: (data: CarrelloTestataAppoggioObj) => ({
                url: `/carrelloTestataAppoggio/insertOrdine`,
                method: 'PUT',
                body: data,
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        deleteRigaOrdine: build.mutation<GenericInsertResponse<number>, CarrelloAppoggioObj>({
            // note: an optional `queryFn` may be used in place of `query`
            invalidatesTags: ['carrello'],
            query: (data: CarrelloAppoggioObj) => ({
                url: `/carrelloAppoggio`,
                method: 'DELETE',
                body: data,
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        deleteOrdine: build.mutation<GenericInsertResponse<number>, void>({
            // note: an optional `queryFn` may be used in place of `query`
            invalidatesTags: ['carrello'],
            query: () => ({
                url: `/carrelloAppoggio/ordine`,
                method: 'DELETE',
            }),
            //transformResponse: (response: { data: LoginResponse }, meta, arg) => response.data,
        }),
        // --------------------------------------------------------------------------------------------
        // ------------------------------------------- IMMAGINE ---------------------------------------
        // --------------------------------------------------------------------------------------------
        getListImages: build.query<ArtImageResponse, GenericListImageRequest>({
            providesTags: ['images'],
            query: (request) => ({
                url: `/imageGeneric/listImages?TIPO=${request.TIPO}&id=${request.id}`,
                method: 'GET',
            }),
            transformResponse: (response: ArtImageResponse, meta, args) => {
                response.dataImages = response.data.map((item) => {
                    return {
                        label: item.COD_TIPO_IMAGE_ART + '',
                        imgPath: `${process.env.REACT_APP_ENDPOINT}/imageGeneric/imageBin?id=${encodeURIComponent(
                            item.ART_IMAGE_ID
                        )}&TIPO=${TIPO_IMAGE.ART_ANA}&HASH=${item.HASH}`,
                    }
                })
                return response
            },
        }),
        insertImage: build.mutation<GenericInsertResponse<number>, ArtImageInsertRequest>({
            invalidatesTags: ['images'],
            query: (data: ArtImageInsertRequest) => {
                return {
                    headers: {
                        'Content-Type': 'image/jpeg',
                    },
                    url: `/imageGeneric?COD_ART=${data.COD_ART}&COD_TIPO_IMAGE_ART=${data.COD_TIPO_IMAGE_ART}&IMAGE_WIDTH=${data.IMAGE_WIDTH}&IMAGE_HEIGHT=${data.IMAGE_HEIGHT}`,
                    method: 'POST',
                    body: data.ART_IMAGE,
                }
            },
        }),
        deleteImage: build.mutation<GenericDeleteResponse, GenericDeleteRequest>({
            invalidatesTags: ['images'],
            query: (data: GenericDeleteRequest) => ({
                url: `/imageGeneric`,
                method: 'DELETE',
                body: data,
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetCarrelloTestataAppoggioQuery,
    useGetRicercaArtAnaQuery,
    useGetCarrelloAppoggioQuery,
    useLazyGetCarrelloAppoggioQuery,
    useGetCategorieQuery,
    useDeleteRigaOrdineMutation,
    useDeleteOrdineMutation,
    useGetListiniOfferteQuery,
    useDuplicateCarrelloAppoggioMutation,
    useInsertUpdateCarrelloAppoggioMutation,
    useGetListImagesQuery,
    useInsertImageMutation,
    useDeleteImageMutation,
    useInsertOrdineMutation,
    useLoginPostMutation,
    useLogoutPostMutation,
    useRegistrationPostMutation,
    useUpdatePassworPostMutation,
    useResetPasswordMutation,
    useGetCfQuery,
    useLazyGetCfQuery,
} = ricercaApi

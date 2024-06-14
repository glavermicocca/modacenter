import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ricercaApi } from './ricercaAPI'
import { TempoConsegna } from '../destinazione/TempoItem'

const STORAGE_KEY = 'USER'

export interface ReturnObj {
    cf: CfObj
}

export interface CfObj {
    COD_CF?: string
    RAG_SOC_CF?: string
    INDI_CF?: string
    CAP_CF?: string
    COMUNE_CF?: string
    PROVINCIA_CF?: string
    STATO_CF?: string
    E_MAIL_CF?: string
    P_IVA_CF?: string
    COD_FISC_CF?: string
    PASS_WEB?: string
    X_FLAG_CESSATA?: boolean
    AZIENDA_ID?: string
}

export interface LoginRequest {
    E_MAIL_CF: string
    PASS_WEB?: string
}

export interface AziendaObj {
    AZIENDA_ID: number
    RAGIONE_SOCIALE: string
    COD_CF: string
    FLAG_CALC_PROT: number
}

export interface LoginResponse {
    data?: {
        cf: CfObj
        AZIENDA_ID: string
        azienda?: AziendaObj
    }
    message?: string
}

export interface RegistrationRequest {
    RAG_SOC_CF: string
    INDI_CF: string
    CAP_CF: string
    COMUNE_CF: string
    PROVINCIA_CF: string
    STATO_CF: string
    P_IVA_CF: string
    COD_FISC_CF: string
    E_MAIL_CF: string
}

export interface ResetPasswordRequest {
    E_MAIL_CF: string
}
export interface ResetPasswordResponse {}

export interface RegistrationResponse {
    data?: ReturnObj
    message?: string
}

export enum REGISTRATION_TYPE {
    STEP_ONE_FARE_LOGIN = 'STEP_ONE_FARE_LOGIN',
    STEP_TWO_NO_EMAIL = 'STEP_TWO_NO_EMAIL',
    STEP_TWO_NO_PASSWORD = 'STEP_TWO_NO_PASSWORD',
    STEP_TWO_ALTRA_EMAIL_ASSOCIATA = 'STEP_TWO_ALTRA_EMAIL_ASSOCIATA',
    STEP_TWO_TOO_MANY_EMAIL = 'STEP_TWO_TOO_MANY_EMAIL',
    STEP_THREE_CREAZIONE_CF = 'STEP_THREE_CREAZIONE_CF',
}

export interface UpdatePasswordRequest {
    TOKEN: string
    PASS_WEB: string
}

export interface UpdatePasswordResponse {}

const initialState: LoginResponse = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}') || null

export enum TIPO_IMAGE {
    COLLI_CONFEZ = 'COLLI_CONFEZ',
    COLLI_CONFEZ_RIGHE = 'COLLI_CONFEZ_RIGHE',
    ART_ANA = 'ART_ANA',
}

export interface CustomError {
    data: {
        message: string
        stack: string
    }
    status: number
}

export interface GenericListImageRequest {
    TIPO: TIPO_IMAGE
    id: string
    HASH?: string
}

export interface CarrelloAppoggioRequest {}

export interface CarrelloAppoggioObj {
    artAna?: ArtAna

    WEB_DISABILITATO?: number
    WEB_NOTA_1?: string
    WEB_NOTA_2?: string
    WEB_NOTA_3?: string

    AZIENDA_ID?: number
    RIF_CLI_NR?: string
    DOC_ID?: string
    NUM_RIGA?: number
    DOC_RIGA_ID?: string
    COD_CF?: string
    DATA_DOC?: Date
    COD_ART: string
    DES_RIGA?: string
    UM?: string
    NUM_UM?: number
    UM_CONFEZIONE?: string
    NUMERO_CONFEZIONI?: number
    CONT_1_CONFEZIONE?: number
    QUANT_RIGA?: number
    NOTE?: string
    UM_BASE?: string
    CONVERS_UM_BASE?: number
    QUANT_UM_BASE?: number
    SOLO_MULTIPLI_CONFEZIONE?: number

    COD_LIST: string
    DEFAULT_COD_LIST?: string

    DES_CAT?: string
    ICON_ID?: number

    NUM_DEST_COPY?: number
}

export interface CarrelloRequestDuplicate {
    RIF_CLI_NR?: string
}

export interface CarrelloTestataAppoggioObj {
    carrelloAppoggioList?: Array<CarrelloAppoggioObj>

    AZIENDA_ID?: number
    COD_CF?: string
    COD_CHIAVE?: string
    DATA_DOC: Date
    DATA_ORA_RICHIESTA: Date
    NOTE_STAMPA?: string
    NUM_DEST: number
    RIF_CLI_NR?: string
    TIPO_DOCUMENTO?: string
    DES_DEST_MERCE?: string
    INDI_DEST_MERCE?: string
    CAP_DEST_MERCE?: string
    COMUNE_DEST_MERCE?: string
    PROVINCIA_DEST_MERCE?: string
    STATO_DEST_MERCE?: string
    TEL_DEST_MERCE?: string

    TEMPO_CONSEGNA: TempoConsegna
}

export interface CarrelloConfirmResponse {
    carrelloAppoggio: CarrelloAppoggioObj[]
    carrelloTestataAppoggio: CarrelloTestataAppoggioObj
}

// -----------------------------------------------------------------------------
// ------------------------------------ IMAGES ---------------------------------
// -----------------------------------------------------------------------------

export interface GenericDeleteResponse {
    data: number
    message: string
}

export interface GenericDeleteRequest {
    id: string
    TIPO: TIPO_IMAGE
}

export interface GenericEmptyRequest {}

export interface GenericInsertResponse<T> {
    data?: T
    message?: string
}

export interface ArtImageInsertRequest {
    ART_IMAGE: Buffer
    COD_TIPO_IMAGE_ART?: string
    COD_ART?: string
    IMAGE_WIDTH?: number
    IMAGE_HEIGHT?: number
}

export interface ArtImageObj {
    HASH?: string

    COD_TIPO_IMAGE_ART?: string
    COD_ART?: string
    ART_IMAGE_ID: string
    ART_IMAGE: Buffer
    FLAG_OLE?: number
    FLAG_WEB?: number
    IMAGE_WIDTH?: number
    IMAGE_HEIGHT?: number
}

export interface ImageObjSlicer {
    label: string
    imgPath: string
}

export interface ArtImageResponse {
    data: ArtImageObj[]
    dataImages: ImageObjSlicer[]
    message: string
    rowCount: number
}

// -----------------------------------------------------------------------------
// ------------------------------------ ART ANA --------------------------------
// -----------------------------------------------------------------------------

export interface ArtAnaResponse {
    listini: ListiniGPO
    data: ArtAna[]
    message: string
    rowCount: number
}

export interface ArtAnaListiniResponse {
    data: ArtAna[]
    listini: ListiniObj
    message: string
    rowCount: number
}

export interface CarrelloAppoggioResponse {
    listini: ListiniGPO
    data: Array<CarrelloAppoggioObj>
    message: string
    rowCount: number
}

export interface ListiniResponse {
    data: {
        artListPrezzi: Array<ArtAnaWrapperObj>
        listini: ListiniObj
    }
    message: string
    rowCount: number
}

export interface DdtAllPaginationFilterRequest {
    gridSordModel?: any //GridSortModel
    gridFilterModel?: any //GridFilterModel
    page: number
    pageSize: number
    FLAG_ALLESTITO: number
}

export interface ArtListPrezziObj {
    COD_ART?: string
    COD_LIST?: string
    AZIENDA_ID?: number
    COD_ART_LIST?: string
    ID?: number
    SELEZIONE?: string
    COD_ART_LIST_PREZZO: string
    DESCR_SELEZIONE?: string
    COD_DIVISA?: string
    PREZZO_LISTINO?: number
    FLAG_OBSOLETO?: number
    SCONTO1?: number
    SCONTO2?: number
    SCONTO3?: number
    FLAG_SCONTI_X_CAT?: number
    FORMULA_PREZZO?: string
    FORMULA_SCONTO?: string
    NUM_UM?: number
    UM?: string
    TEMPO_CONSEGNA?: number
    COD_VAR?: string
    COD_ART_VAR?: string
    QUANT_MIN?: number
    QUANT_MAX?: number
    FLAG_SEL_PREZZO_X_QT?: number
    FLAG_SEL_PREZZO_CALC?: number
    X_DATA_VALIDITA?: Date
    X_NOTE?: string
    AVVIAMENTO?: number
}

export interface ListiniObj {
    COD_TIPO_LIST: string
    DES_TIPO_LIST: string
    DIVISA_LIST?: string
    LIST_ID?: number
    COD_LIST: string
    AZIENDA_ID?: number
    DES_AGG_LIST?: string
    FLAG_OBSOLETO?: number
    DATA_INIZIO_VALIDITA?: Date
    DATA_FINE_VALIDITA?: Date
    FLAG_ACQ?: number
    FLAG_PERS?: number
    COD_DES_TIPO_LIST?: string
    COD_DES_LIST?: string
    SELEZIONE?: string
    DIVISA_TIPO_LIST?: string
    NUM_VARIANTE?: number
    COD_DES_VAR_LIST?: string
    COD_LIST_PADRE?: string
    DES_LIST_PADRE?: string
    COD_LIST_OLD?: string
    X_FLAG_COMPR_IVA?: number
    FLAG_PROMOZIONE?: number
}

export interface ValoriReorder {
    id: number
    id_ref: number

    oldIndex: number
    targetIndex: number
}

export interface CatMerceObj {
    COD_CAT: string
    DES_CAT: string
    index: number
    icon: string

    COD_CAT_PADRE?: string
    DES_CAT_PADRE?: string
}

export interface ArtAna {
    artUmList?: Array<ArtUmObj>
    carrelloAppoggio?: CarrelloAppoggioObj
    catMerce: CatMerceObj
    artListPrezzi?: ArtListPrezziObj

    // CATEGORIA MERCIOLOGICA
    DES_CAT?: string

    // LISTINI
    PREZZO_LISTINO?: string
    COD_LIST: string
    DEFAULT_COD_LIST?: string

    // USER
    WEB_DISABILITATO: number
    WEB_NOTA_1: string
    WEB_NOTA_2: string
    WEB_NOTA_3: string

    COD_ART: string
    DES_ART?: string
    COD_CAT?: string
    TIPO_APPR_STAND?: number
    FLAG_APPR_ALT?: number
    COD_ATG?: string
    COD_COSTR?: string
    COD_CAT_STAT?: string
    NOTE_ART?: string
    NUM_LIV_VAR?: number
    NUM_LIV_PREZ_VAR?: number
    FLAG_NO_GIAC?: number
    FLAG_NO_INVENT?: number
    FLAG_LOTTI_E_MATR?: number
    FLAG_INATTIVO?: number
    DATA_INSERIMENTO?: Date
    UM_BASE?: string
    NUM_DEC_UM_BASE?: string
    ARROT_UM_BASE?: number
    FLAG_UM_ALTERNATIVE?: number
    COD_TIPO_VAR?: string
    FLAG_SOTTOMOVIMENTI?: number
    COD_CAT_FISC?: string
    FLAG_CALCOLO_PESO?: number
    AZIENDA_ID?: number
    FLAG_PRIVATO?: number
    FLAG_DIST?: number
    FLAG_DIST_DA_ATG?: number
    COD_TAB_PROVV?: string
    COSTO_RIF_VU1?: number
    PREZZO_RIF_VU1?: number
    QUANT_RIF_DIST?: number
    LOTTO_MINIMO?: number
    LOTTO_ECONOMICO?: number
    FLAG_SOLO_MULTIPLI_MINIMO?: number
    FLAG_ART_FANTASMA?: number
    COD_ART_CONF?: string
    PROGR_ART_GEN?: string
    NOMENCLATURA_COMB_ACQ?: string
    NOMENCLATURA_COMB_VEND?: string
    PROV_ORIG_DEST?: string
    UM_SUPPLEMENTARE?: string
    MOLTIPLICATORE_UM_SUPP?: number
    MASSA_NETTA_ART?: number
    FLAG_DATA_SCAD?: number
    FLAG_SCAD_GG_O_MESI?: number
    GG_O_MESI_SCAD?: string
    FLAG_DATA_PROD?: number
    FLAG_PROMPT_LOTTO?: number
    TIPO_CALC_MRP?: number
    COD_CF?: string
    COD_DEP?: string
    MODO_CALCOLO_PREZZO?: number
    MODO_CALCOLO_SCONTO?: number
    GG_ACCORP_PROD?: number
    GG_LEAD_TIME?: string
    FLAG_OBSOLETO?: number
    DATA_OBSOLESCENZA?: Date
    COD_ART_NEW?: string
    FLAG_INSERT_VAR_CONF?: number
    FLAG_MATRICOLA?: number
    FLAG_MATRICOLA_CAR?: number
    FLAG_MATRICOLA_SCAR?: number
    ROOT_MATR?: string
    COUNTER_MATR?: string
    LEN_PROGR_MATR?: number
    FLAG_ART_CRITICO_MRP?: number
    FLAG_CONF?: number
    X_STATUS?: string
    X_COD_REP?: string
    X_FLAG_IVA_DA_REP?: number
    X_COD_STAGIONATURA?: string
    X_COD_ART_CALO?: string
    X_FLAG_PROD_CONF?: number
    X_COD_CLASS_CONF?: string
    X_COD_IVA_CONF?: string
    X_FLAG_PALMARE?: number
    X_FLAG_OBBLIGO_MATR?: number
    FLAG_NO_MRP?: number
    FLAG_CREA_ORP_DA_ORD_CLI?: number
    X_FLAG_PREPAR_IN_COLLI?: number
    FLAG_SC_FIN_ART?: number
    COD_SC_FIN_ART?: string
    FLAG_COMP_PRINC?: number
    COD_CF_CLI?: string
    FLAG_COMP_VRF_EV_ORDFOR?: number
    DESC_PALMARE?: string
    FLAG_ART_INTRA?: number
    NOMENCLATURA_COMB?: string
    COD_TIPO_FATT?: string
    FLAG_SOGG_RIT_ACC?: number
    FLAG_SOGG_CONTR_PREV?: number
    FLAG_SOGG_CONTR_INT?: number
    FLAG_SOGG_SPESE?: number
    FLAG_RIMBORSO?: number
    TIPO_COSTO_DIST?: string
    FLAG_ART_NO_IN_ORDPRO?: number
    COD_TEDP?: string
    GG_ACCORP_ACQ?: number
    GG_ANT_FABB_ACQ?: number
    LOTTO_PROD_MINIMO?: number
    FLAG_PROD_SOLO_MULT_MIN?: number
    LOTTO_PROD_ECON?: number
    GG_PROD_LEAD_TIME?: string
    GG_ANT_FABB_PROD?: number
    FLAG_PROD_TPRLE?: number
    TIPO_CALC_PROD_LT?: number
    FLAG_IN_ESAUR?: number
    FLAG_VERSAMENTI?: number
    NR_VERSAMENTI?: number
    FLAG_NO_PROVV?: number
    FLAG_TIPO_VAL?: number
    COD_MARCHIO?: string
    COD_STAPRO?: string
    DATA_UV_METEL?: Date
    KY_MDS1_INSART?: string
    COD_DISEGNO?: string
    FLAG_LISTINO_CF_EMAIL?: number
    FLAG_NOCG_PROD_ACCORP?: number
    FLAG_NOCG_PROD_LOTTI?: number
    FLAG_NOCG_PROD_ANTIC?: number
    FLAG_NOCG_PROD_LEAD?: number
    FLAG_NOCG_ACQ_ACCORP?: number
    FLAG_NOCG_ACQ_LOTTI?: number
    FLAG_NOCG_ACQ_ANTIC?: number
    FLAG_NOCG_ACQ_LEAD?: number
    FLAG_ENSRC?: number
    FLAG_WFCGC?: number
    FLAG_NOCG_ESIG_DCPR?: number
    PAESE_ORIG_CESS?: string
}

export interface CfNewObj {
    COD_CF: string
    RAG_SOC_CF: string
    RAG_SOC_CF_INT: string
    INDI_CF: string
    CAP_CF: string
    COMUNE_CF: string
    PROVINCIA_CF: string
    STATO_CF: string
    TEL_CF: string
    FAX_CF: string
    E_MAIL_CF: string
    NOTE_CF: string
    P_IVA_CF: string
    COD_FISC_CF: string
    FLAG_CLI: number
    FLAG_FOR: number
    TITOLO_CF?: string
    FLAG_PIU_SEDI_AMM: number
    FLAG_PIU_SEDI_COMM: number
    FLAG_CAMPI_CALC: number
    COD_LINGUA?: string
    FLAG_PRIVATO: number
    STRINGA_SEL_AZIENDE: string
    PASSWORD?: string
    COD_CAT?: string
    OLD_COD_CF?: string
    FLAG_EXP_IMP_RSM: number
    X_FLAG_AZIENDA: number
    X_DTA_VAR?: string
    X_RAG_SOC_VAR?: string
    X_COMUNE_NASCITA?: string
    X_DATA_NASCITA?: string
    X_NUM_ALBO?: string
    X_TEL_CELL_CF: string
    X_REA_CF?: string
    SESSO?: string
    COGNOME?: string
    NOME?: string
    PROV_NASCITA?: string
    DTA_RICON?: string
    REGIONE?: string
    COD_COMUNE_CF: string
    COD_FORMA_SOC?: string
    CAP_SOCIALE_CF: number
    FATTURATO_CF: number
    NUM_DIP_CF: number
    FAM_CF: number
    NUM_SEDI_CF: number
    VALUT_SOGGETTIVA: number
    COD_AREA?: string
    COD_RILEVANZA: string
    UTENTE_INS: string
    DISTANZA: number
    FLAG_VUOTI_MAG_SCAR: number
    FLAG_VUOTI_DDT_CLI: number
    FLAG_VUOTI_FATT_CLI: number
    FLAG_DOC_STP_VUOTI_CLI: number
    FLAG_VUOTI_MAG_CAR: number
    FLAG_VUOTI_DDT_FOR: number
    FLAG_VUOTI_FATT_FOR: number
    FLAG_DOC_STP_VUOTI_FOR: number
    COD_FISC_LR?: string
    VALORE_QUO_V1?: string
    SPESE_ISC_V1?: string
    RAEE?: string
    MATR_ENPALS?: string
    FLAG_ESE_ENPALS?: string
    DATA_REA?: string
    PROV_REA?: string
    ESCLUDI_BLACK_LIST: number
    NUM_ISCR_CAF?: string
    UIC_STATO_FED: number
    CONTEA?: string
    COD_ATECO?: string
    PEDAGGIO_V1?: string
    DATA_GEN_NOM?: string
    COD_UFF_PA?: string
    COD_REG_FISC?: string
    FLAG_STLIQ?: string
    SRL_SOCIOUNICO?: string
    REP_BINDELLI?: string
    RIP2_COD_ART_DI?: string
    COORD_GEO?: string
    COD_ZONA?: string
    PEC_E_MAIL_CF: string
    COD_DEST_B2B: string
    TIPO_FATT_ELETTR: number
    FLAG_GCP?: string
    FLAG_ESOCPEC: number
    UTENTE_ESOCPEC?: string
    DATAORA_ESOCPEC?: string
    cfDestMerce: Array<CfDestMerceObj>
    cfCliUser: CfCliUserNewObj
}

export interface TempoConsegnaItem {
    value: TempoConsegna
    label: string
    icon: any
    end: any
    start: any
    labelInfo: string
  }

export interface CfCliUserObj {
    azienda: AziendaObj
    cf: CfNewObj
    currentTime: number
    tempo: Array<TempoConsegnaItem>
}

export interface CfCliUserNewObj {
    AZIENDA_ID: number
    CF_ID: string
    COD_CF: string
    FLAG_CONTROLLO: number
    FLAG_FT_DDT: number
    FLAG_WEB_LISTINO: number
    FLAG_WEB_OFFERTE: number
}

export interface ListiniObj {
    COD_TIPO_LIST: string
    DES_TIPO_LIST: string
    DIVISA_LIST?: string
    LIST_ID?: number
    COD_LIST: string
    AZIENDA_ID?: number
    DES_AGG_LIST?: string
    FLAG_OBSOLETO?: number
    DATA_INIZIO_VALIDITA?: Date
    DATA_FINE_VALIDITA?: Date
    FLAG_ACQ?: number
    FLAG_PERS?: number
    COD_DES_TIPO_LIST?: string
    COD_DES_LIST?: string
    SELEZIONE?: string
    DIVISA_TIPO_LIST?: string
    NUM_VARIANTE?: number
    COD_DES_VAR_LIST?: string
    COD_LIST_PADRE?: string
    DES_LIST_PADRE?: string
    COD_LIST_OLD?: string
    X_FLAG_COMPR_IVA?: number
    FLAG_PROMOZIONE?: number
}

export interface ListiniGPO {
    listiniGruppo: ListiniObj
    listiniPersonalizzati: ListiniObj
    listiniOfferte: ListiniObj
}

export interface CfDestMerceObj {
    NUM_DEST: number
    DES_DEST_MERCE?: string
    COD_CF: string
    // CF_DEST_ID: string
    INDI_DEST_MERCE?: string
    CAP_DEST_MERCE?: string
    COMUNE_DEST_MERCE?: string
    PROVINCIA_DEST_MERCE?: string
    STATO_DEST_MERCE?: string
    TEL_DEST_MERCE?: string
    FAX_DEST_MERCE?: string
    E_MAIL_DEST_MERCE?: string
    RIFERIMENTO_DEST_MERCE?: string
    NOTE_DEST_MERCE?: string
    CAMPO_1_DEST_MERCE?: string
    CAMPO_2_DEST_MERCE?: string
    CAMPO_3_DEST_MERCE?: string
    FORMULA_SELEZ_MAG?: string
    FLAG_DEST_DEFAULT: number
    COD_DEP?: string
    X_COD_AGE_RESP?: string
    X_COD_ZONA?: string
    STRINGA_VETTORI?: string
    COD_TIPO_TRAS?: string
    COD_UFF_PA?: string
    RIP2_COD_ART_DI?: string
    PEC_E_MAIL_CF?: string
    COD_DEST_B2B?: string
    COD_ISTAT?: string
}

export interface DefUmUtente {
    NUM_UM?: string
    UM_DESC?: string
    FLAG_UM_ACQ?: string
    FLAG_UM_VEND?: string
    FLAG_UM_MOV?: string
    NUM_UM_ACQ?: string
    NUM_UM_VEND?: number
    NUM_UM_MAG?: number
}

export interface ArtUmObj {
    NUM_UM?: number
    COD_ART_NUM_UM?: string
    COD_ART?: string
    UM?: string
    DESC_UM?: string
    CONF_UM?: string
    CONVERS_UM?: number
    NUM_DEC_UM?: number
    ARROT_UM?: number
    FLAG_CONVERS_EDITABILE?: number
    SOLO_MULTIPLI?: number

    // DEF_UM
    FLAG_UM_ACQ?: number
    FLAG_UM_VEND?: number
    FLAG_UM_MOV?: number
    UM_DESC?: string

    // GESTIONE SHOP
    isDefault: boolean
}

export interface ArtConfObj {
    NUM_CONF: number
    COD_ART_NUM_CONF: string
    COD_ART: string
    CONF: string
    DESC_CONF: string
    CONVERS_CONF: number
    SOLO_MULTIPLI: number
    UM: string
    NUM_DEC_CONF: number
    ARROT_CONF: number
    FLAG_DEFAULT: number
    DESC_CONF_NEW: string
}

export interface ArtAnaWrapperObj {
    artAna: ArtAna
    artUmList: Array<ArtUmObj>
    artConf: Array<ArtConfObj>
}

// const initialState = {
//     carrelloAppoggio: [] as CarrelloAppoggioObj[],
//     ricercaArtAna: [] as ArtAna[],
//     artListPrezzi: [] as ArtAna[],
//     listini: {} as ListiniObj,
// }

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

export const ricercaSlice = createSlice({
    name: 'ricercaApi',
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
    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(ricercaApi.endpoints.getRicercaArtAna.matchFulfilled, (state, { payload }) => {
    //             state.ricercaArtAna = payload.data
    //         })
    //         .addMatcher(ricercaApi.endpoints.getCarrelloAppoggio.matchFulfilled, (state, { payload }) => {
    //             state.carrelloAppoggio = payload.data
    //         })
    //         .addMatcher(ricercaApi.endpoints.getListini.matchFulfilled, (state, { payload }) => {
    //             state.artListPrezzi = payload.data
    //             state.listini = payload.listini
    //         })
    extraReducers: (builder) => {
        builder
            .addMatcher(ricercaApi.endpoints.loginPost.matchFulfilled, (state, { payload }) => {
                state.data = payload.data
                state.message = payload.message
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
            })
            .addMatcher(ricercaApi.endpoints.logoutPost.matchFulfilled, (state, { payload }) => {
                delete state.data
                delete state.message
                window.localStorage.removeItem(STORAGE_KEY)
                //document.cookie = ''
            })
    },

    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(ricercaApi.endpoints.getCarrelloList.matchFulfilled, (state, { payload, type, meta }) => {
    //             state.carrelloAppoggio = payload.data as CarrelloAppoggioObj[]
    //         })
    //         .addMatcher(ricercaApi.endpoints.getRicercaArtAna.matchFulfilled, (state, { payload, type, meta }) => {
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

export const { increment } = ricercaSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.login.value)`

export const selectUser = (state: RootState) => state.ricerca.data

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

export default ricercaSlice.reducer

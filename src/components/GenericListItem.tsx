import { Stack, Typography } from '@mui/material'
import { fruttaEVerduraEmoji, mescolaArray } from '../features/fatta/Fatta'

export interface GenericQueryPagination {
    search?: string
    page: number
    pageSize: number

    filter: Array<string> | null

    listino: boolean
    history: boolean
}

export interface GenericResponse<T> {
    data: T
    message: string
    rowCount: number
}

export interface ListProps<T = unknown> {
    data: Array<T> | undefined
    render: (item: T) => React.ReactElement
    isLoading: boolean
}

export const GenericListItems =
    <T extends any>(): React.FC<ListProps<T>> =>
    ({ data, render, isLoading }): any => {
        return data != null && data.length > 0 ? (
            data.map(render)
        ) : isLoading == true ? (
            <Stack
                display="flex"
                flexDirection="column"
                direction="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                mt={5}
                sx={{ maxWidth: 'sm' }}
            >
                <Typography variant="h1">⏳</Typography>
            </Stack>
        ) : (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                mt={5}
                sx={{ maxWidth: 'sm' }}
            >
                <Typography variant="h1">🫣</Typography>
                <Typography color="primary" variant="h3" sx={{ p: 5 }}>
                    LISTA VUOTA
                </Typography>
                <Typography variant="h3">{mescolaArray(fruttaEVerduraEmoji)}</Typography>
            </Stack>
        )
    }

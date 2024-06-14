import { Stack, Typography } from '@mui/material'

import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/it'
import { useEffect, useState } from 'react'
import { GenericListItems } from '../../components/GenericListItem'
import { CfCliUserObj, TempoConsegnaItem } from '../ricerca/ricercaSlice'
import { TempoConsegna, TempoItem } from './TempoItem'
import 'dayjs/locale/it'
import 'dayjs/plugin/isBetween'

const TempoConsegnaLL = GenericListItems<TempoConsegnaItem>()

export interface Props {
    setDate: (dateTime: Dayjs) => void
    setTempoSelected: (tempoSelected: TempoConsegna | null) => void
    cfCliUserObj: CfCliUserObj
}

export default function DataOraConsegna({ setDate, setTempoSelected, cfCliUserObj }: Props) {
    const initialCurrentTime = dayjs(new Date(cfCliUserObj.currentTime))

    const [currentTime, setCurrentTime] = useState<Dayjs>(initialCurrentTime)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime((prev) => {
                return prev.add(1, 'second')
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const [currentDate, setCurrentDate] = useState<Dayjs>(initialCurrentTime)
    const [currentTempoSelected, setCurrentTempoSelected] = useState<TempoConsegna | null>(null)

    const hours = currentTime.get('hours').toString().padStart(2, '0')
    const minutes = currentTime.get('minutes').toString().padStart(2, '0')
    const seconds = currentTime.get('seconds').toString().padStart(2, '0')

    const isDisabled = (tempoConsegnaItem: TempoConsegnaItem): boolean => {
        const isToday = currentDate.get('D') == initialCurrentTime.get('D')

        if (isToday) {
            switch (tempoConsegnaItem.value) {
                case TempoConsegna.MATTINA:
                    const isAfterMattina = currentTime.isAfter(tempoConsegnaItem.end)
                    if (isAfterMattina && currentTempoSelected == TempoConsegna.MATTINA) {
                        setCurrentTempoSelected(null)
                        setTempoSelected(null)
                    }
                    return isAfterMattina
                case TempoConsegna.PRANZO:
                    const isAfterPranzo = currentTime.isAfter(tempoConsegnaItem.end)
                    if (isAfterPranzo && currentTempoSelected == TempoConsegna.PRANZO) {
                        setCurrentTempoSelected(null)
                        setTempoSelected(null)
                    }
                    return isAfterPranzo
                case TempoConsegna.EMERGENZE:
                    if (currentDate.day() == 0) {
                        // DOMENICA
                        if (currentTempoSelected == TempoConsegna.EMERGENZE) {
                            setCurrentTempoSelected(null)
                            setTempoSelected(null)
                        }
                        return true
                    } else {
                        const isBetweenEmergenze = !currentTime.isBetween(
                            tempoConsegnaItem.start,
                            tempoConsegnaItem.end
                        )
                        if (isBetweenEmergenze && currentTempoSelected == TempoConsegna.EMERGENZE) {
                            setCurrentTempoSelected(null)
                            setTempoSelected(null)
                        }
                        return isBetweenEmergenze
                    }
            }
        } else {
            switch (tempoConsegnaItem.value) {
                case TempoConsegna.MATTINA:
                    return false
                case TempoConsegna.PRANZO:
                    return false
                case TempoConsegna.EMERGENZE:
                    return true
            }
        }
    }

    // funzione che restituisce true se FLAG_CALC_PROT è attivo e se non è domenica usando la variabile currentTime
    const isFlagCalcProtActive = (): boolean => {
        if (cfCliUserObj.azienda.FLAG_CALC_PROT === 1) {
            if (currentDate.day() === 0) {
                // è domenica
                return false
            }
        }

        return true
    }

    return (
        <Stack direction={{ xs: 'column' }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={3}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                    <StaticDatePicker
                        disablePast={true}
                        localeText={{ toolbarTitle: '' }}
                        value={currentDate}
                        onChange={(newValue) => {
                            if (newValue != null) {
                                setDate(newValue)
                                setCurrentDate(dayjs(newValue))
                                setCurrentTempoSelected(null)
                                setTempoSelected(null)
                            }
                        }}
                        slotProps={{
                            // actionBar: { actions: ['today', 'accept'] },
                            actionBar: { actions: [] },
                        }}
                    />
                </LocalizationProvider>
                <Stack direction={{ xs: 'column' }} display="flex" justifyContent="center" alignItems="center" mt={3}>
                    <Stack direction="row" alignItems="baseline" alignContent="baseline">
                        <Typography variant="h4">
                            {hours}:{minutes}
                        </Typography>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                            {seconds}
                        </Typography>
                    </Stack>
                    {isFlagCalcProtActive() && cfCliUserObj.tempo.length > 0 && (
                        <TempoConsegnaLL
                            isLoading={false}
                            data={cfCliUserObj.tempo}
                            render={(tempoConsegnaItem) => (
                                <TempoItem
                                    isDisabled={isDisabled(tempoConsegnaItem)}
                                    TEMPO_SELECTED={currentTempoSelected}
                                    item={tempoConsegnaItem}
                                    key={tempoConsegnaItem.value}
                                    setValue={function (value: TempoConsegna) {
                                        setCurrentTempoSelected(value as TempoConsegna)
                                        setTempoSelected(value as TempoConsegna)
                                    }}
                                />
                            )}
                        />
                    )}
                </Stack>
            </Stack>
            <Typography variant="body1" fontStyle="italic" mt={1}>
                😎 Note per il giorno corrente e per darci il tempo di preparare il tuo ordine al meglio :
            </Typography>
            {isFlagCalcProtActive() && cfCliUserObj.tempo.length > 0 ? (
                <TempoConsegnaLL
                    isLoading={false}
                    data={cfCliUserObj.tempo}
                    render={(tempoConsegnaItem) => (
                        <Typography variant="body1" fontStyle="italic" key={tempoConsegnaItem.value}>
                            {tempoConsegnaItem.labelInfo}
                        </Typography>
                    )}
                />
            ) : (
                <Typography variant="body1" fontStyle="italic">
                    Oggi siamo chiusi, non è possibile ordinare 😓😶‍🌫️
                </Typography>
            )}
        </Stack>
    )
}

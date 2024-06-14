import moment from 'moment'

export function GenericDateFormat(data?: string | Date) {
    
    if (data == null) return '-'
    var dateMomentObject

    if (typeof data === 'string') {
        dateMomentObject = moment(new Date(data))
    } else {
        dateMomentObject = moment(data)
    }

    const format = dateMomentObject?.format('ddd D MMM YYYY HH:mm.ss')
    return format
}

export function GenericDateFormatShort(data?: string | Date) {
    
    if (data == null) return '-'
    var dateMomentObject

    if (typeof data === 'string') {
        dateMomentObject = moment(new Date(data))
    } else {
        dateMomentObject = moment(data)
    }

    const format = dateMomentObject?.format('ddd D MMM')
    return format
}

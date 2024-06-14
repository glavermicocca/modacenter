import confirm from './confirm.wav'
import fail from './fail.wav'
import pop from './pop.wav'
import posizionato from './posizionato.wav'
import warning from './warning.wav'

export function playConfirm() {
    var snd = new Audio(confirm)
    snd.play()
}

export function playWarning() {
    var snd = new Audio(warning)
    snd.play()
}

export function playFail() {
    var snd = new Audio(fail)
    snd.play()
}

export function playPop() {
    var snd = new Audio(pop)
    snd.play()
}

export function playPosizionato() {
    var snd = new Audio(posizionato)
    snd.play()
}

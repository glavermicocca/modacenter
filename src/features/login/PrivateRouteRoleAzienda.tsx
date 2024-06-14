import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../ricerca/ricercaSlice'

export default function PrivateRouteRoleAzienda({ children }: any) {
    const user = useAppSelector(selectUser)

    return user?.azienda !== null ? children : <></>
}

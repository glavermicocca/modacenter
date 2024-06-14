import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../ricerca/ricercaSlice'

export default function PrivateRoute({ children }: any) {
    const user = useAppSelector(selectUser)

    return user?.cf.COD_CF !== null ? children : <Navigate replace to="/login" />
}

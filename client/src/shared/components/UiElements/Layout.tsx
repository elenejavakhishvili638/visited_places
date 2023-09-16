import { ReactNode } from 'react'
import MainNavigation from '../Navigation/MainNavigation'

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <MainNavigation />
            <main style={{ marginTop: "5rem" }}>
                {children}
            </main>
        </>
    )
}

export default Layout
import React, { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'

type DashboardChil = {
    children: ReactNode
}
export default function Layout({ children }: DashboardChil) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
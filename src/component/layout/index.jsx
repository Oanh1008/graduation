import React from 'react'
import Footer from '../footer'
import Header from '../header/Header'

const Layout = ({ children }) => {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    )
}

export default Layout

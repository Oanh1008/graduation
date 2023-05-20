import React from 'react'
import Footer from '../footer'
import Header from '../header/Header'

const Layout = ({ children, className }) => {
    return (
        <main>
            <Header />
            <div className={className}>
                {children}

            </div>
            <Footer />
        </main>
    )
}

export default Layout

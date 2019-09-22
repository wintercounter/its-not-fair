import React, { memo, createContext, useEffect, useState } from 'react'

import Client from '@inf/client'

import { main, content } from './styles.scss'

export const ClientContext = createContext()

const ClientLayout = memo(({ children }) => {
    const [client, setClient] = useState(null)
    useEffect(() => {
        setClient(new Client())
    }, [])

    if (!client) {
        return null
    }

    return (
        <main className={main}>
            <section className={content}>
                <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
            </section>
        </main>
    )
})

export default ClientLayout

import React, { memo } from 'react'

import { main, content } from './styles.scss'

const Main = memo(({ children }) => (
    <main className={main}>
        <section className={content}>{children}</section>
    </main>
))

export default Main

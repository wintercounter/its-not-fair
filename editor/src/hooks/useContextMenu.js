import { useEffect, useState } from 'react'

const useContextMenu = () => {
    const [contextMenu, setContextMenu] = useState({ open: false })

    useEffect(() => {
        const handleContextMenu = e => {
            e.preventDefault()
            return setContextMenu({ open: true, x: e.clientX, y: e.clientY })
        }
        window.addEventListener('contextmenu', handleContextMenu)

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu)
        }
    }, [])

    return contextMenu
}
export default useContextMenu

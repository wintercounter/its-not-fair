import { useEffect, useState } from 'react'

const useBeforeUnload = () => {
    const [willUnload, setWillUnload] = useState(false)

    useEffect(() => {
        const handleBeforeUnload = () => setWillUnload(true)
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    return willUnload
}
export default useBeforeUnload

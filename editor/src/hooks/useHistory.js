import { useEffect, useState, useContext } from 'react'
import { StoreContext } from '@/store'
import { undo, redo } from '@/store/actions'

const useKeyDown = () => {
    const [ctrlPressed, setCtrlPressed] = useState(true)
    const { dispatch } = useContext(StoreContext)

    useEffect(() => {
        const handleKeyDown = ({ keyCode }) => {
            switch (keyCode) {
                case 17: // ctrl key
                    setCtrlPressed(true)
                    break
                case 90: // Z key
                    ctrlPressed && dispatch(undo())
                    break
                case 89: // Y key
                    ctrlPressed && dispatch(redo())
                    break
                default:
            }
        }
        const handleKeyUp = ({ keyCode }) => {
            switch (keyCode) {
                case 17: // ctrl key
                    //setCtrlPressed(false)
                    break
                default:
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [ctrlPressed])
}
export default useKeyDown

const keyboardEvents = function(value) {
    const key = {
        value,
        isDown: false,
        isUp: true,
        press: () => {},
        release: () => {},
        unsubscribe: () => {},
        handleDown(ev) {
            if (ev.key !== key.value) return

            if (key.isUp && key.press) key.press()
            key.isDown = true
            key.isUp = false
            ev.preventDefault()
        },
        handleUp(ev) {
            if (ev.key !== key.value) return

            if (key.isDown && key.release) key.release()
            key.isDown = false
            key.isUp = true
            ev.preventDefault()
        }
    }

    //Attach event listeners
    const downListener = key.handleDown.bind(key)
    const upListener = key.handleUp.bind(key)

    window.addEventListener('keydown', downListener, false)
    window.addEventListener('keyup', upListener, false)

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener('keydown', downListener)
        window.removeEventListener('keyup', upListener)
    }

    return key
}

export default keyboardEvents

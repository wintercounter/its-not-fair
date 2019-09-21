import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'
import One from 'its-not-fair/dist/maps/One'
import { Canvas, AttributeEditor } from '@/components'
import { loadLevel } from '@/store/actions'
import Store, { StoreContext } from '@/store'

const CANVAS_SIZE = 704

let map

Math.rad = function(degrees) {
    const pi = Math.PI
    return degrees * (pi / 180)
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 500px;
    min-width: 550px;
`

const StyledCanvasContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    align-items: center;
`

const Wrapper = styled.div`
    width: ${CANVAS_SIZE + 20}px;
    height: ${CANVAS_SIZE + 20}px;
    position: relative;
    margin: 0 auto;
`

const setup = el => {
    const loop = () => {
        map.draw()
    }

    const app = new PIXI.Application({
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        antialias: true,
        transparent: false,
        resolution: 1
    })

    map = new One()

    app.renderer.backgroundColor = 0x000000
    app.stage.addChild(map.baseLayer)
    app.stage.addChild(map.graphicsLayer)
    app.stage.addChild(map.animationLayer)
    el.appendChild(app.view)
    app.ticker.add(loop)
    return map
}

const ContextContainer = () => {
    const { dispatch, level, resetted } = useContext(StoreContext)
    const container = useRef(null)

    useEffect(() => {
        setup(container.current)
        const localState =
            window.localStorage.getItem('its-not-fair-map-editor') &&
            JSON.parse(window.localStorage.getItem('its-not-fair-map-editor'))

        if (localState && localState.level && localState.level.length) {
            map.matrix = localState.level
            dispatch(loadLevel(map.matrix))
            map.renderRows()
        } else {
            dispatch(loadLevel(map.matrix))
        }
    }, [resetted])

    useEffect(() => {
        if (map instanceof One) {
            map.matrix = level
            map.renderRows()
        }
    }, [level])

    return (
        <>
            <StyledCanvasContainer>
                <Wrapper ref={container}>
                    <Canvas size={CANVAS_SIZE} />
                </Wrapper>
                <AttributeEditor />
            </StyledCanvasContainer>
        </>
    )
}

const App = () => {
    useEffect(() => {
        const handleContextMenu = e => {
            e.preventDefault()
        }
        window.addEventListener('contextmenu', handleContextMenu)

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu)
        }
    }, [])
    return (
        <Container>
            <Store>
                <ContextContainer />
            </Store>
        </Container>
    )
}

export default App

/* eslint-disable react/no-array-index-key */
import React, { useContext, useState } from 'react'
import { number } from 'prop-types'
import styled from 'styled-components'
import { StoreContext } from '@/store'
import { useBeforeUnload, useHistory } from '@/hooks'
import { saveLocal, paintCell, clearCell } from '@/store/actions'

const CELL_TYPES = {
    empty: 0,
    wall: 1,
    spawnLeft: 2,
    spawnRight: 3
}

const CELL_COLORS = {
    [CELL_TYPES.empty]: 'rgba(0,0,0,0.5)',
    [CELL_TYPES.wall]: 'rgba(0, 100, 150, 0.5)',
    [CELL_TYPES.spawnRight]: 'rgba(255,255,255, 0)',
    [CELL_TYPES.spawnLeft]: 'rgba(255,255,255, 0)'
}

const Container = styled.div`
    height: ${({ size }) => size + 20}px;
    min-height: ${({ size }) => size + 20}px;
    width: ${({ size }) => size + 20}px;
    min-width: ${({ size }) => size + 20}px;
    overflow: hidden;
    margin: 10px auto 0;
    position: absolute;
    border: solid 10px #ffffff;
    top: 0;
    left: 0;
    z-index: 2;
`

const Cell = styled.div`
    width: 32px;
    height: 32px;
    border-right: solid 1px rgba(255, 255, 255, 0.2);
    border-bottom: solid 1px rgba(255, 255, 255, 0.2);
    cursor: crosshair;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ type }) => CELL_COLORS[type]};

    &::after {
        display: block;
        font-weight: bold;
        font-size: 26px;
        line-height: 26px;
        color: white;
    }

    &[type='2']::after {
        content: '←';
    }

    &[type='3']::after {
        content: '→';
    }

    &:hover {
        border: solid 1px red !important;
    }
`

const Row = styled.div`
    height: 32px;
    width: 960px;
    display: flex;
    flex-wrap: nowrap;
`

const Canvas = ({ size }) => {
    const store = useContext(StoreContext)
    const { level, tool, dispatch } = store
    const [mouseButton, setMouseButton] = useState(null)

    const willUnload = useBeforeUnload()

    useHistory()

    if (willUnload) {
        dispatch(saveLocal())
    }

    const editCell = (button, row, col) => {
        switch (button) {
            case 0:
                dispatch(paintCell({ row, col, cellType: CELL_TYPES[tool] }))
                break
            case 2:
                dispatch(clearCell({ row, col }))
        }
    }

    const handleCellMouseDown = (ev, row, col) => {
        setMouseButton(ev.button)
        editCell(ev.button, row, col)
    }

    const handleCellMouseEnter = (row, col) => {
        editCell(mouseButton, row, col)
    }

    const handleMouseUp = () => {
        setMouseButton(null)
    }

    return (
        <Container size={size} onMouseUp={handleMouseUp}>
            {level.map((row, rowIndex) => (
                <Row key={`row${rowIndex}`}>
                    {row.map((col, colIndex) => (
                        <Cell
                            onMouseDown={ev => handleCellMouseDown(ev, rowIndex, colIndex)}
                            onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                            onDragStart={ev => ev.preventDefault()}
                            key={`col${colIndex}`}
                            type={col}
                        />
                    ))}
                </Row>
            ))}
        </Container>
    )
}

Canvas.propTypes = {
    size: number.isRequired
}

export default Canvas

import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { number } from 'prop-types'
import { selectTool } from '@/store/actions'
import { StoreContext } from '@/store'

const StyledContextMenu = styled.div.attrs(props => ({
    style: {
        left: `${props.left}px`,
        top: `${props.top}px`
    }
}))`
    position: absolute;
    background: black;
    color: white;
    font-size: 10px;
    padding: 3px 5px;
    z-index: 2;
    text-align: center;
    transform-origin: 0 0;
    min-width: 62px;

    ul {
        padding: 0;
        margin: 0;
    }
`

const Item = styled.li`
    list-style: none;
    padding: 10px;
    cursor: pointer;
    text-transform: capitalize;
    background: ${props => (props.isActive ? '#984646' : 'transparent')}

    &:hover {
        background: #984646;
    }
`

const toolItems = ['move', 'peg', 'brick', 'curved brick', 'eraser']

const ContextMenu = ({ x, y }) => {
    const { tool, dispatch } = useContext(StoreContext)
    const handleToolClick = useCallback(selectedTool => {
        dispatch(selectTool(selectedTool))
    })
    return (
        <StyledContextMenu left={x} top={y}>
            <ul>
                {toolItems.map(item => (
                    <Item
                        key={item}
                        isActive={tool === item}
                        onClick={() => {
                            handleToolClick(item)
                        }}
                    >
                        {item}
                    </Item>
                ))}
            </ul>
        </StyledContextMenu>
    )
}

ContextMenu.propTypes = {
    x: number.isRequired,
    y: number.isRequired
}

export default ContextMenu

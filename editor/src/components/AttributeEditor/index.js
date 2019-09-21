import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { StoreContext } from '@/store'
import { saveLevel, selectTool, resetEditor } from '@/store/actions'

const VERSION = '1.0'

const StyledAttributeEditor = styled.div`
    background: rgba(12, 12, 12, 0.5);
    color: white;
    font-size: 12px;
    padding: 3px 5px;
    z-index: 2;
    width: 300px;
    min-width: 210px;
    height: 100%;
    border-left: solid 1px rgba(193, 56, 56, 0.5);
    position: relative;

    h2 {
        padding: 0;
        text-transform: uppercase;
        font-size: 14px;
        background: rgba(100, 0, 0, 0.5);
        box-sizing: content-box;
        width: 100%;
        padding: 8px 5px;
        margin: 0 0 0 -5px;
        border: solid 1px rgba(193, 56, 56, 0.5);
        border-right: 0;
        border-left: 0;
        display: flex;
        justify-content: space-between;
    }

    > div {
        padding: 8px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    > label {
        padding: 8px 0;
        align-items: center;
    }

    button {
        display: inline-block;
        padding: 4px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        margin: 0;
        border-radius: 1px;
        box-sizing: border-box;
        font-weight: 300;
        color: #ffffff;
        text-align: center;
        transition: all 0.2s;
        background-color: transparent;
        cursor: pointer;
        font-size: 12px;

        &:hover {
            color: #000000;
            background-color: #ffffff;
        }
    }
`

const Version = styled.span`
    position: absolute;
    bottom: 5px;
    left: 5px;
    padding: 3px 0;
`

const ResetEditorButton = styled.button`
    position: absolute;
    bottom: 5px;
    right: 5px;
`

const Item = styled.button`
    margin: 5px !important;
    text-transform: capitalize;
    background-color: ${props => (props.isActive ? '#ffffff' : 'transparent')} !important;
    color: ${props => (props.isActive ? '#000000' : '#ffffff')} !important;
`
const toolItems = ['wall', 'spawnLeft', 'spawnRight']

const AttributeEditor = () => {
    const store = useContext(StoreContext)
    const { level, tool, dispatch } = store

    const handleSaveLevelButtonClick = useCallback(() => {
        dispatch(saveLevel())
    })

    const handleToolClick = useCallback(selectedTool => {
        dispatch(selectTool(selectedTool))
    })

    const handleResetEditorButtonClick = useCallback(() => {
        dispatch(resetEditor())
    })

    if (!level.length) {
        return null
    }
    return (
        <StyledAttributeEditor>
            <div>
                <button type="button" onClick={handleSaveLevelButtonClick}>
                    Save map
                </button>
            </div>
            <h2>Tool</h2>
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

            <Version>{VERSION}</Version>
            <ResetEditorButton
                type="button"
                onClick={e => {
                    if (window.confirm(`Are you sure you wish to reset the editor? All changes will be lost!`))
                        handleResetEditorButtonClick(e)
                }}
            >
                Reset Editor
            </ResetEditorButton>
        </StyledAttributeEditor>
    )
}

export default AttributeEditor

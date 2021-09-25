import { useState, useEffect } from "react"

export const useDrag = (control, id, timeline) => {

    const [state, setState] = useState({
        isDraging: false,
        origin: { x: 0, y: 0 },
        translation: { x: 0, y: 0 }
    })


    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [state.isDraging])



    const handleMouseMove = ({ clientX, clientY }) => {
        const translation = { x: clientX - state.origin.x, y: clientY - state.origin.y }
        if (state.isDraging === true) {
            setState({ ...state, translation })

            control({
                type: "translate",
                offset: translation.x,
                offsetX: translation.x,
                offsetY: translation.y,
                clientX:clientX,
                clientY:clientY,
                id: id,
                timeline: timeline
            })
        }
    }

    const handleMouseDown = (e) => {
        const clientX = e.clientX
        const clientY = e.clientY
        e.stopPropagation()

        control({
            type: "isDragging",
            id: id,
            offset: 0,
            clientX: clientX,
            clientY: clientY,
            timeline: timeline
        })
        setState(prevState => ({
            ...state,
            isDraging: true,
            origin: { x: clientX, y: clientY }
        }))
    }

    const handleMouseUp = () => {
        setState(prevState => ({ ...state, isDraging: false, origin: { x: 0, y: 0 } }))
    }

    return handleMouseDown
}
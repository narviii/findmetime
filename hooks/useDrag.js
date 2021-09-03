import { useState,useEffect } from "react"

export const useDrag = (control,id) => {

    ///test comment
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

    useEffect(() => {
        if (state.isDraging === true) {
        }

    }, [state.isDraging])

    const handleMouseMove = ({ clientX, clientY }) => {
        const translation = { x: clientX - state.origin.x, y: clientY - state.origin.y }
        if (state.isDraging === true) {
            setState({ ...state, translation })

            control({ type: "translate", offset: translation.x,id:id })
        }
    }

    const handleMouseDown = ({ clientX, clientY }) => {
        control({ type: "isDragging",id:id,offset:0})
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
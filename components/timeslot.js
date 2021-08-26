import { useEffect, useRef, useState } from "react"
import moment from "moment";
import { Brackets } from "../components/brackets"
import React from "react";



const buttonStyle = (label) => {
    const isCentral = (label) => label === moment().hour()
    const btnClassTempl = "left-1/2  disable-select transition-all   absolute  text-center h-10 leading-10  rounded-sm m-1   w-32  "
    let btnClass
    if (isCentral(label)) {
        btnClass = btnClassTempl + "bg-gray-100"
    } else {
        btnClass = btnClassTempl + "bg-gray-500"
    }
    return btnClass
}


const isVisible = (parentRect, elementRect, label) => {
    if (parentRect && elementRect) {
        /*
        console.log("PARENT")
        console.log(parentRect)
        console.log("ELEMENT")
        console.log(elementRect)
        */
        return (
            elementRect.x >= parentRect.x &&

            elementRect.right <= parentRect.right

        )
    }
}

export function HourSlot({position, label, currentSlot }) {
    /*
    useEffect(() => {
        const actualVis = isVisible(timeLineRect, buttonRef.current.getBoundingClientRect())
        const presumedVis = (buttonRef.current.getAttribute('data-inview') === 'true')
        console.log(label, "actual", actualVis)
        console.log(label, "presumed", presumedVis)
        if (actualVis && actualVis === true && presumedVis == false) {
            buttonRef.current.setAttribute('data-inView', 'true')
            console.log('more')
            
        } else {

        }

    })
    */
    //let position = null
    //const buttonRef = useRef(null)

    


    return (
        <li style={{ left: position }}  key={label} className={buttonStyle(label)} >
            {label}
        </li>
    )
}
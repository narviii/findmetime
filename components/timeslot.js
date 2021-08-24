import { useEffect, useRef, useState } from "react"
import moment from "moment";
import { Brackets } from "../components/brackets"
import React from "react";

export function HourSlot({  label,timeLineWidth, currentSlot,timeLineOffset }) {
    const buttonRef = useRef(null)

    

    const isCentral = (label) => label === moment().hour()
    const btnClassTempl = "disable-select transition-all   absolute  text-center h-10 leading-10  rounded-sm m-1   w-32  "
    let btnClass

    const position  = timeLineWidth/2-128/2 + currentSlot.index*128 + timeLineOffset

    if (isCentral(label)) {
        btnClass = btnClassTempl + "bg-gray-100"
    } else {
        btnClass = btnClassTempl + "bg-gray-500"
    }

    return (
        <li ref = {buttonRef} style={{left:position}}  key={label} className={btnClass} >
                {label}
        </li>
    )
}
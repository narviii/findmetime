import { useEffect, useRef, useState } from "react"
import moment from "moment";
import { Brackets } from "../components/brackets"
import React from "react";



const buttonStyle = (label) => {
    const isCentral = (label) => label === moment().hour()
    const btnClassTempl = "left-1/2  disable-select    absolute  text-center h-10 leading-10  rounded-sm  "
    let btnClass
    if (isCentral(label)) {
        btnClass = btnClassTempl + "bg-gray-100"
    } else {
        btnClass = btnClassTempl + "bg-gray-500"
    }
    return btnClass
}

export function HourSlot({position, label,hourWidth, currentSlot }) {


    return (
        <li style={{ left: position,width:"128px" }}  key={label} className={buttonStyle(label)} >
            {label}
        </li>
    )
}
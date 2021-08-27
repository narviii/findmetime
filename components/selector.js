import React, { useEffect, useState, useRef, useReducer } from 'react'


export function Selector({left,width, children }) {

    return (
        <div style={{left:left,width:width}} className="left-1/2 disable-select transition-all w-96  absolute  text-center h-10 leading-10  rounded-sm m-1 z-40 bg-green-300 opacity-50  ">
        
        </div>
    )
}
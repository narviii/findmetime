import moment from "moment"
import React from "react"
import { useState } from "react"

const formatPercent = (n) => {
    return parseFloat(n * 100).toFixed(1) + "%"
}


function Bracket({ selectedInterval, currentSlot, type, setSelectedInterval, children }) {

    const [isDragging, setDragging] = useState(false)

    const handleMouseMove = ({ clientX, clientY }) => {
        if (!isDragging) {
            return;
        }

        setSelectedInterval((prevState) => {

            const newState = {
                start: prevState.start.add(clientX, "seconds"),
                end: prevState.end
            }

            return newState
        })


    }

    const handleMouseDown = (e) => {
        window.addEventListener('mousemove',handleMouseMove);
        setDragging(true)
    }


    if (selectedInterval.start.isBetween(currentSlot.start, currentSlot.end) && type === "start") {
        const shiftLeft = formatPercent(moment.duration(selectedInterval.start.clone().subtract(currentSlot.start.clone())).asHours())
        return (
            <svg var="start" onMouseDown={handleMouseDown} style={{ left: shiftLeft }} className="bracket-left" height="2.5rem" viewBox="10 0 25 100" version="1.0">
                <path
                    var="start"
                    d="m31.8455 93.594467c-0.000029 1.181626-0.134303 2.014144-0.402823 2.497559-0.268577 0.483381-0.653497 0.72508-1.15476 0.725097h-13.749701c-0.429692-0.000017-0.841466-0.06268-1.235325-0.187988-0.393884-0.125342-0.751948-0.331234-1.074195-0.617676-0.32227-0.286474-0.581867-0.671402-0.778792-1.154785-0.196946-0.483413-0.295414-1.083185-0.295404-1.799316v-84.8095705c-0.00001-0.6802665 0.098458-1.2621344 0.295404-1.7456055 0.196925-0.4833248 0.456522-0.8772046 0.778792-1.1816406 0.322247-0.3042874 0.680311-0.5191309 1.074195-0.6445313 0.393859-0.1252504 0.805633-0.1879131 1.235325-0.1879882h13.749701c0.214811 0.0000751 0.420699 0.053786 0.617662 0.1611328 0.196908 0.1074967 0.366988 0.3044366 0.510243 0.5908203 0.143197 0.2865324 0.250617 0.6356532 0.322258 1.0473633 0.07159 0.4118567 0.107391 0.9221101 0.10742 1.5307617-0.000029 1.145904-0.134303 1.9694709-0.402823 2.470703-0.268577 0.501371-0.653497 0.752022-1.15476 0.751953h-8.754693v79.277344h8.754693c0.214811-0.000011 0.420699 0.0537 0.617662 0.161133 0.196908 0.107411 0.366988 0.295399 0.510243 0.563965 0.143197 0.268543 0.250617 0.608712 0.322258 1.020507 0.07159 0.411771 0.107391 0.922025 0.10742 1.530762z"
                    stroke="red"
                    fill="red"
                />
            </svg>
        )
    } else if (selectedInterval.end.isBetween(currentSlot.start, currentSlot.end) && type === "end") {
        const shiftRight = formatPercent(moment.duration(currentSlot.end.clone().subtract(selectedInterval.end.clone())).asHours())
        return (
            <svg var="end" onMouseDown={handleMouseDown} style={{ right: shiftRight }} className="bracket-right" height="2.5rem" viewBox="10 0 25 100" version="1.0">
                <path
                    var="start"
                    d="m31.8455 93.594467c-0.000029 1.181626-0.134303 2.014144-0.402823 2.497559-0.268577 0.483381-0.653497 0.72508-1.15476 0.725097h-13.749701c-0.429692-0.000017-0.841466-0.06268-1.235325-0.187988-0.393884-0.125342-0.751948-0.331234-1.074195-0.617676-0.32227-0.286474-0.581867-0.671402-0.778792-1.154785-0.196946-0.483413-0.295414-1.083185-0.295404-1.799316v-84.8095705c-0.00001-0.6802665 0.098458-1.2621344 0.295404-1.7456055 0.196925-0.4833248 0.456522-0.8772046 0.778792-1.1816406 0.322247-0.3042874 0.680311-0.5191309 1.074195-0.6445313 0.393859-0.1252504 0.805633-0.1879131 1.235325-0.1879882h13.749701c0.214811 0.0000751 0.420699 0.053786 0.617662 0.1611328 0.196908 0.1074967 0.366988 0.3044366 0.510243 0.5908203 0.143197 0.2865324 0.250617 0.6356532 0.322258 1.0473633 0.07159 0.4118567 0.107391 0.9221101 0.10742 1.5307617-0.000029 1.145904-0.134303 1.9694709-0.402823 2.470703-0.268577 0.501371-0.653497 0.752022-1.15476 0.751953h-8.754693v79.277344h8.754693c0.214811-0.000011 0.420699 0.0537 0.617662 0.161133 0.196908 0.107411 0.366988 0.295399 0.510243 0.563965 0.143197 0.268543 0.250617 0.608712 0.322258 1.020507 0.07159 0.411771 0.107391 0.922025 0.10742 1.530762z"
                    stroke="red"
                    fill="red"
                />
            </svg>
        )

    } else return null
}


export function Brackets({ selectedInterval, currentSlot, setSelectedInterval, children }) {
    return (
        <React.Fragment>
            <Bracket
                selectedInterval={selectedInterval}
                setSelectedInterval={setSelectedInterval}
                currentSlot={currentSlot}
                type="start" />
            {children}
            <Bracket selectedInterval={selectedInterval}
                setSelectedInterval={setSelectedInterval}
                currentSlot={currentSlot}
                type="end" />
        </React.Fragment>
    )
}
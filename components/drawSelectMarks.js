import { PositionElement } from "./positionElement"
import React from "react"
import moment from 'moment';

export function DrawSelectMarks({ timeLine, isSelected,sessionUsers }) {
    if (!sessionUsers) return null

    const usersList = Object.keys(sessionUsers)

    const marks = usersList.map((user) => {
        return (
            <PositionElement start={moment(sessionUsers[user].start)} end={moment(sessionUsers[user].end)} timeLine={timeLine}>
                <div className="bg-red-500 h-2 rounded-md">

                </div>
            </PositionElement>
        )
    })

    if (isSelected.start && isSelected.end) {

        return (
            <React.Fragment>
                {marks}

            </React.Fragment>


        )
    } else return null
}
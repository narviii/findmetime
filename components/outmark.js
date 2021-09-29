
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export function OutMark({ timeLine, isSelected }) {

    if (!isSelected.start) return null

    if (isSelected.start.clone().isAfter(timeLine.end.clone())) {
        return (
            <div className={"  absolute  z-50 h-12 right-0   text-red-500"}>
                <FontAwesomeIcon icon={faArrowRight} className="h-full" />
            </div>
        )
        position = " right-0 "
    } else if (isSelected.end.clone().isBefore(timeLine.start.clone())) {
        return (
            <div className=" absolute  z-50 h-12 left-0 text-red-500">
                <FontAwesomeIcon icon={faArrowLeft} className="h-full" />
            </div>
        )
    }

    return null


}
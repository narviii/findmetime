import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'



export function CopyToClipboard() {
    const [curPath, setCurPath] = useState("")
    const [color, setColor] = useState("text-black")

    useEffect(() => {
        setCurPath(window.location.href)

    }, [])

    const handleClick = () => {
        navigator.clipboard.writeText(curPath)
        setColor("text-red-500")
        setTimeout(() => {
            setColor("text-black")
        }, 1000);
    }


    return (
        <React.Fragment>

            <div className="mx-auto flex-col justify-center  p-5 max-w-screen-xl">
                <h1 className="w-max mx-auto text-2xl">
                    Schedulling Biggle
                </h1>
                <p className="w-max mx-auto text-base m-3">
                    How this works?
                </p>
                <ol className="mx-auto text-center text-sm m-3">
                    <p >
                        1. Send the link bellow to your friend, collegue or collegues..
                    </p>
                    <p>
                        2. Select the time interval you are available for a call or a meeting in your.
                    </p>
                    <p>
                        3. See in realtime what intervals everybody selected in realtime.
                    </p>
                    <p>
                        4. See if any intersection of intervals in the window bellow.
                    </p>
                </ol>

                <div className="rounded-md mr-2 ml-2 bg-gray-100 text-xs font-bold text-center" >
                    <span className={color + " mr-2 transition-all"}>
                        {curPath}
                    </span>
                    <FontAwesomeIcon onClick={handleClick} icon={faCopy} className="cursor-pointer" />
                </div>


            </div>
        </React.Fragment>
    )
}
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
                <h1 className="w-max mx-auto text-2xl mb-3">
                    Find Me Time
                </h1>
                
                    
                        <p className="text-center mb-3" >
                            Send the link bellow to your friend, collegue or collegues:
                        </p>
                        
               

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
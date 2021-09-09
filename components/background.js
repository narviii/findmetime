
export function Background({ children }) {
    return (
        <div className="bg-green-200 h-screen flex flex-col justify-center   ">
            <div className="bg-gray-100 h-2/5 w-10/12 mx-auto block rounded-lg ">
                {children}
            </div>
        </div>
    )
}
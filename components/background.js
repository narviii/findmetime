
export function Background({ children }) {
    return (
        <div className="bg-gray-100 h-screen flex flex-col justify-center   ">
            <div className="fixWidth mx-auto">
                {children}
            </div>
        </div>
    )
}
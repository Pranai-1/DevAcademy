export default function Animation(){
    return(
        <div className="relative bg-gray-200 h-[350px] w-[300px] rounded-lg overflow-hidden shadow-md mt-1">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent to-white animate-ray">
                </div>
            </div>
       </div>
    )
}  
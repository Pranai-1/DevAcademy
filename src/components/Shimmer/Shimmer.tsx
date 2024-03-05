import Animation from "./Animation"

export default function Shimmer(){
    return(
        <div className="h-[350px] w-screen  flex flex-wrap justify-center gap-10 overflow-auto mt-5">
          <Animation/>
          <Animation/>
          <Animation/>
        </div>
    )
}
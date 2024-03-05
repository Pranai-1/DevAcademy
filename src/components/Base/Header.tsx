import image1 from "@/components/images/header-img1.png" ;
import image2 from "@/components/images/header-img2.png";
import image3 from "@/components/images/header-img3.png";
import image4 from "@/components/images/header-img4.png";
import image5 from "@/components/images/header-img5.png";
import { useContext, useState } from "react";
import { emailContext } from "../EmailContextProvider";
import Image from "next/image"
function Header() {
  const {emailState} = useContext(emailContext);
  const userEmail=emailState?.email
  const name =userEmail?.split("@")[0];

  const images = [image4, image5, image3, image2, image1];

  const [imageIndex, setImageIndex] = useState(0);

  function handleLeftClick(): void {
    setImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  }

  function handleRightClick(): void {
    setImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  }

  return (
    <>
      {userEmail ? (
        <h1 className="font-bold text-2xl text-center text-orange-600 py-4">
          Welcome to Dev Academy, {name}!
        </h1>
      ) : (
        <h1 className="font-bold text-2xl text-center text-orange-600 py-4">
          Welcome to Dev Academy
        </h1>
      )}
      <p className="text-center text-white">
        We're thrilled to have you as part of our learning community.
      </p>
      <div className="relative flex justify-center pt-4 z-0">
        <button
          className=" bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold 
       absolute top-36  md:top-60  left-0 md:left-56 hover:bg-gray-600"
          onClick={handleLeftClick}
        >
          &lt;
        </button>
        <Image
          src={images[imageIndex].src}
          width={760}
          height={620}
          alt="header-image1"
          
        />
        <button
          className=" bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold 
       absolute top-36 md:top-60  right-0 md:right-56 hover:bg-gray-600"
          onClick={handleRightClick}
        >
          &gt;
        </button>
      </div>
    </>
  );
}

export default Header;

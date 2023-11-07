import { useRecoilValue } from "recoil";
import { UserEmail } from "@/store/selectors/userDetails";
import image1 from "@/components/images/header-img1.png" ;
import image2 from "@/components/images/header-img2.png";
import image3 from "@/components/images/header-img3.png";
import image4 from "@/components/images/header-img4.png";
import image5 from "@/components/images/header-img5.png";
import { useState } from "react";

function Header() {
  const userEmail = useRecoilValue(UserEmail);
  const name = userEmail?.split("@")[0];

  const images = [image1, image2, image3, image4, image5];

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
        <h1 className="font-bold text-2xl text-center text-gray-800 py-4">
          Welcome to Dev Academy, {name}!
        </h1>
      ) : (
        <h1 className="font-bold text-2xl text-center text-gray-800 py-4">
          Welcome to Dev Academy
        </h1>
      )}
      <p className="text-center text-gray-600 ">
        We're thrilled to have you as part of our learning community.
      </p>
      <div className="relative flex justify-center pt-4">
        <button
          className=" bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold 
       absolute top-24 md:top-28  left-12 md:left-56 hover:bg-gray-600"
          onClick={handleLeftClick}
        >
          &lt;
        </button>
        <img
          src={images[imageIndex].src}
          alt="header-image1"
          className="h-[180px] w-1/2 md:h-[320px] flex justify-center items-center"
        />
        <button
          className=" bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold 
       absolute top-24 md:top-28  right-12 md:right-56 hover:bg-gray-600"
          onClick={handleRightClick}
        >
          &gt;
        </button>
      </div>
    </>
  );
}

export default Header;

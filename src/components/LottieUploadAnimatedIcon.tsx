import type { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef } from "react";
import uploadAnimation from "@/assets/images/upload.json"
import Lottie from "lottie-react";

const LottieUploadAnimatedIcon = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

     useEffect(() => {
        if (lottieRef.current) {
          lottieRef.current.setSpeed(0.5); // Set to 0.5x speed
        }
      }, []);
  return (
   <div className="flex items-center justify-center">
         <div className="max-w-[70px] md:max-w-[150px]">
      <Lottie
        lottieRef={lottieRef}

      animationData={uploadAnimation} loop={true} />
    </div>
        </div>
  )
}

export default LottieUploadAnimatedIcon

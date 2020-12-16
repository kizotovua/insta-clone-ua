import {useEffect, useState} from "react";
import defineWidth from "../utils/defineWidth";
import {lgScreen, mdScreen} from "../utils/variables";


export const useResize = (myRef, screenSize) => {


  const [width, setWidth] = useState(screenSize)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth)
      setHeight(myRef.current.offsetHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [myRef])

  return { width, height }
}
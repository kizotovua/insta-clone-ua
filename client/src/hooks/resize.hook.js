import {useEffect, useState} from "react";
import {mediumScreen} from "../utils/variables";


export const useResize = (myRef) => {
  const [width, setWidth] = useState(mediumScreen)
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
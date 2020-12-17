import {useEffect, useState} from "react";
import {lgScreen, mdScreen, smScreen, xsScreen} from "../utils/variables";

export const useResize = (myRef) => {
  let initialWidth;
  if(window.screen.width >= lgScreen) {
    initialWidth = mdScreen;
  } else if (window.screen.width >= smScreen) {
    initialWidth = smScreen
  } else {
    initialWidth = xsScreen;
  }

  const [width, setWidth] = useState(initialWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { width }
}
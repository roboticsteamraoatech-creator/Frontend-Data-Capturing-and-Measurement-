"use client"

import { useEffect, useState } from "react";
import MeasurementMobile from "../measure-mobile/page";
import MeasurementDesktop from "../measure/page";


const Measurement = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return isMobile ? <MeasurementMobile /> : <MeasurementDesktop />;
};

export default Measurement;
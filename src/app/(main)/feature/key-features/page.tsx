


"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

const KeyFeatures = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const features = [
    {
      id: 1,
      title: "Capture Image Recognition",
      description: "Upload a single photo — our AI automatically detects shapes, edges, and proportions to deliver accurate measurements in seconds.",
      iconSrc: "/assets/Frame 248.png",
    },
    {
      id: 2,
      title: "Smart Dimension Mapping",
      description: "Break down dimensions precisely across multiple points. From body measurements to room layouts, every angle counts.",
      iconSrc: "/assets/Frame 248 (1).png",
    },
    {
      id: 3,
      title: "Auto Data Storage",
      description: "Keep track of your measurements effortlessly. Save, export, or revisit past captures with a single click.",
      iconSrc: "/assets/Frame 248 (2).png",
    },
    {
      id: 4,
      title: "AI Precision Engine",
      description: "Powered by advanced machine learning algorithms. Built to refine scan — improving accuracy and adaptability over time.",
      iconSrc: "/assets/Frame 248 (3).png",
    },
    {
      id: 5,
      title: "Multi-Use Capability",
      description: "From fashion to fitness, and from furniture to engineering — one tool fits all industries that rely on accuracy.",
      iconSrc: "/assets/Frame 248 (4).png",
    },
    {
      id: 6,
      title: "Privacy-First Design",
      description: "Your data stays yours. Images are processed securely, and we never store or share them without your permission.",
      iconSrc: "/assets/Frame 248 (5).png",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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

  return (
    <div className="relative bg-white">
      <style jsx>{`
        /* Base styles */
        .container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
        }
        
        /* Desktop styles */
        @media (min-width: 768px) {
          .section-container {
            width: 1283px;
            height: 893px;
            margin: 0 auto;
            padding-top: 30px;
          }
          
          .header-container {
            width: 566px;
            height: 113px;
            margin: 0 auto;
            text-align: center;
            margin-bottom: 70px;
          }
          
          .cards-container {
            width: 1283px;
            height: 680px;
          }
          
          .cards-row {
            display: flex;
            width: 1283px;
            height: 310px;
            gap: 22px;
            margin-bottom: 22px;
          }
          
          .card {
            width: 413px;
            height: 310px;
            border-radius: 10px;
            border: 1px solid #E4D8F3;
            box-shadow: 0px 4px 16px 0px #1A1A1A40;
            background: #FFFFFF;
            position: relative;
          }
          
          .icon-container {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 30px;
            left: 30px;
            border-radius: 25px;
            background: #FCFBFE;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .text-container {
            width: 344px;
            height: 164px;
            position: absolute;
            top: 120px;
            left: 30px;
          }
          
          .card-title {
            width: 344px;
            height: 38px;
            font-family: "Manrope", sans-serif;
            font-weight: 500;
            font-size: 28px;
            line-height: 100%;
            color: #1A1A1A;
            margin-bottom: 18px;
          }
          
          .card-description {
            width: 344px;
            height: 108px;
            font-family: "Manrope", sans-serif;
            font-weight: 300;
            font-size: 20px;
            line-height: 100%;
            color: #6E6E6EB2;
          }
          
          .section-title {
            width: 566px;
            height: 43px;
            font-family: "Monument Extended", sans-serif;
            font-size: 36px;
            font-weight: 400;
            line-height: 100%;
            color: #1A1A1A;
            margin: 0;
            margin-bottom: 16px;
          }
          
          .section-subtitle {
            width: 566px;
            height: 54px;
            font-family: "Manrope", sans-serif;
            font-weight: 400;
            font-size: 20px;
            line-height: 100%;
            color: #6E6E6EB2;
            margin: 0;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 767px) {
          .container {
            width: 100%;
            padding: 40px 20px 60px 20px;
            min-height: 2000px;
          }
          
          .section-container {
            width: 100%;
            height: auto;
          }
          
          /* Fixed header position - now visible at top */
          .header-container {
            width: 284px;
            height: 89px;
            margin: 0 auto 40px auto;
            text-align: center;
            position: relative;
            top: 0;
            left: 0;
            transform: none;
          }
          
          /* Cards container with proper spacing */
          .cards-container {
            width: 100%;
            height: auto;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          
          .mobile-cards {
            width: 310px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .card {
            width: 310px;
            height: 250px;
            border-radius: 10px;
            border: 1px solid #E4D8F3;
            box-shadow: 0px 4px 16px 0px #1A1A1A40;
            // background: #FFFFFF;
            position: relative;
          }
          
          /* Larger icon container */
          .icon-container {
            width: 66px;
            height: 66px;
            position: absolute;
            top: 30px;
            left: 30px;
            border-radius: 33px;
            background: #FCFBFE;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 13px;
          }
          
          .text-container {
            width: 250px;
            height: 119px;
            position: absolute;
            top: 116px;
            left: 30px;
            gap: 18px;
          }
          
          .card-title {
            width: 250px;
            height: auto;
            font-family: "Manrope", sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 110%;
            color: #1A1A1A;
            margin-bottom: 12px;
          }
          
          .card-description {
            width: 250px;
            height: auto;
            font-family: "Manrope", sans-serif;
            font-weight: 300;
            font-size: 14px;
            line-height: 130%;
            color: #6E6E6EB2;
          }
          
          .section-title {
            width: 284px;
            height: auto;
            font-family: "Monument Extended", sans-serif;
            font-size: 24px;
            font-weight: 400;
            line-height: 100%;
            color: #1A1A1A;
            margin: 0;
            margin-bottom: 16px;
          }
          
          .section-subtitle {
            width: 284px;
            height: auto;
            font-family: "Manrope", sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 120%;
            text-align: center;
            color: #6E6E6EB2;
            margin: 0;
          }
        }
      `}</style>
      
      <div className="container">
        <div className="section-container">
          {/* Header - now properly positioned at top for mobile */}
          <div className="header-container">
            <h2 className="section-title">
              Key features
            </h2>
            <p className="section-subtitle">
              Smart tools that handle the hard work, so you can focus on what matters.
            </p>
          </div>

          {/* Cards container */}
          <div className="cards-container">
            {/* Mobile: Single column layout */}
            {isMobile ? (
              <div className="mobile-cards">
                {features.map((feature) => (
                  <div key={feature.id} className="card">
                    <div className="icon-container">
                      <Image 
                        src={feature.iconSrc} 
                        alt="" 
                        width={66}
                        height={66}
                        style={{
                          borderRadius: "33px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    
                    <div className="text-container">
                      <h3 className="card-title">
                        {feature.title}
                      </h3>
                      <p className="card-description">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop: Two rows of 3 cards each */
              <>
                <div className="cards-row">
                  {features.slice(0, 3).map((feature) => (
                    <div key={feature.id} className="card">
                      <div className="icon-container">
                        <Image 
                          src={feature.iconSrc} 
                          alt="" 
                          width={50}
                          height={50}
                          style={{
                            borderRadius: "25px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      
                      <div className="text-container">
                        <h3 className="card-title">
                          {feature.title}
                        </h3>
                        <p className="card-description">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="cards-row">
                  {features.slice(3, 6).map((feature) => (
                    <div key={feature.id} className="card">
                      <div className="icon-container">
                        <Image 
                          src={feature.iconSrc} 
                          alt="" 
                          width={50}
                          height={50}
                          style={{
                            borderRadius: "25px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      
                      <div className="text-container">
                        <h3 className="card-title">
                          {feature.title}
                        </h3>
                        <p className="card-description">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
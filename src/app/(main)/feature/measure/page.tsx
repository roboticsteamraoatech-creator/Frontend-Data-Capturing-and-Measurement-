

"use client"

import Image from "next/image";

const MeasurementDesktop = () => {
  return (
    <div className="relative">
      <style jsx>{`
        .container { 
          width: 100%; 
          max-width: 1440px; 
          margin: 0 auto; 
        }
        
        .measureWrap { 
          position: relative; 
          width: 1255px; 
          height: 550px; 
          margin-left: 80px; 
          margin-top: 100px; 
        }
        
        .imgBox { 
          position: absolute; 
          top: 0; 
          left: 0; 
          width: 602px; 
          height: 550px; 
          border-radius: 20px; 
          overflow: hidden;
          background-color: #FCFBFE;
        }
        
        .textBox { 
          position: absolute; 
          top: 174px; 
          left: 694px; 
          width: 561px; 
          height: 197px; 
          gap: 30px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
      `}</style>


      <div className="container">
        <div className="measureWrap">
          <div className="imgBox">
            <Image
              alt="Measurement illustration"
              src="/assets/Frame 1707479253.png"
              width={350}
              height={350}
              style={{
                position: "absolute",
                top: "100px", 
                left: "126px",
              }}
            />
          </div>
          
          <div className="textBox">
            <h1
              style={{
                width: "561px",
                height: "86px",
                fontFamily: "Monument Extended, sans-serif",
                fontWeight: 400,
                fontSize: "36px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#1A1A1A",
                margin: 0,
              }}
            >
              Built to measure
              <br />
              anything, anywhere
            </h1>
            <p
              style={{
                width: "561px",
                height: "81px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#6E6E6EB2",
                margin: 0,
              }}
            >
              From human bodies to complex objects and interior spaces, Data Capturing adapts seamlessly — analyzing shape, proportion, and scale in one intelligent scan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementDesktop;
"use client"

import Image from "next/image";

const MeasurementMobile = () => {
  return (
    <div className="relative">
      <style jsx>{`
        .container { 
          width: 100%; 
          max-width: 1440px; 
          margin: 0 auto; 
        }
        
        .measureWrap { 
          width: 100%;
          height: auto;
          min-height: 671px;
          margin: 0;
          padding: 80px 0 0 0;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .imgBox { 
          position: relative;
          width: 90%;
          max-width: 390px;
          height: 358px;
          border-radius: 20px;
          background-color: #FCFBFE;
          margin: 0 auto 30px auto;
          overflow: visible;
        }
        
        .textBox { 
          position: relative;
          width: 294px;
          height: auto;
          margin: 0 auto 30px auto;
          gap: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      `}</style>
      
      <div className="container">
        <div className="measureWrap">
          <div className="textBox">
            <h1
              style={{
                width: "294px",
                height: "auto",
                fontFamily: "Monument Extended, sans-serif",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#1A1A1A",
                textAlign: "center",
                margin: 0,
              }}
            >
              Built to measure
              <br />
              anything, anywhere
            </h1>
            <p
              style={{
                width: "294px",
                height: "auto",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "0%",
                color: "#6E6E6EB2",
                textAlign: "center",
                margin: 0,
              }}
            >
              From human bodies to complex objects and interior spaces, Data Capturing adapts seamlessly — analyzing shape, proportion, and scale in one intelligent scan.
            </p>
          </div>
          
          <div className="imgBox">
            <Image
              alt="Measurement illustration"
              src="/assets/Frame 1707479253.png"
              width={274}
              height={274}
              style={{
                position: "absolute",
                top: "42px",
                left: "50%",
                marginLeft: "-137px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementMobile;
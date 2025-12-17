"use client";

import Image from "next/image"

export function GoalsSection() {
  const goals = [
    { iconSrc: "/assets/pin.png", title: "To Make Work Seamless", description: "We eliminate complexity by tackling friction and inefficiencies — bringing clarity and ease to your workflows" },
    { iconSrc: "/assets/arror.png", title: "To Make Empowering Work", description: "We cultivate purpose by fueling trust, confidence, and performance through meaningful engagement" },
    { iconSrc: "/assets/h.png", title: "To Match Client Success With Ours", description: "We're invested in your growth — because your achievements fuel ours" },
  ]

  return (
    <section className="w-full">
      <style jsx>{`
        /* Mobile styles */
        @media (max-width: 767px) {
          .mobile-container {
            width: 100%;
            position: relative;
            padding: 40px 20px 60px;
          }
          
          .header-container-mobile {
            width: 284px;
            height: auto;
            margin: 0 auto 40px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .mobile-title {
            width: 100%;
            height: auto;
            font-family: "Monument Extended", sans-serif;
            font-weight: 400;
            font-size: 24px;
            line-height: 100%;
            text-align: center;
            color: #1A1A1A;
            margin: 0;
          }
          
          .mobile-subtitle {
            width: 100%;
            height: auto;
            font-family: "Manrope", sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 130%;
            text-align: center;
            color: #6E6E6EB2;
            margin: 0;
          }
          
          .cards-container-mobile {
            width: 100%;
            max-width: 310px;
            height: auto;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
          
          .card-mobile {
            width: 310px;
            height: 250px;
            border-radius: 10px;
            border: 1px solid #E4D8F3;
            position: relative;
            margin: 0 auto;
            background: #FFFFFF;
          }
          
          .icon-container-mobile {
            width: 100px;
            height: 100px;
            position: absolute;
            top: 30px;
            left: 30px;
            border-radius: 50px;
            padding: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            opacity: 1;
            transform: rotate(0deg);
            background: #FCFBFE;
          }
          
          .text-content-mobile {
            width: 250px;
            height: auto;
            position: absolute;
            top: 148px;
            left: 30px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .card-title-mobile {
            width: 100%;
            height: auto;
            font-family: "Manrope", sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 120%;
            color: #1A1A1A;
            margin: 0;
          }
          
          .card-description-mobile {
            width: 100%;
            height: auto;
            font-family: "Manrope", sans-serif;
            font-weight: 300;
            font-size: 14px;
            line-height: 140%;
            color: #6E6E6EB2;
            margin: 0;
          }
        }
      `}</style>

      {/* Desktop precise layout */}
      <div className="relative hidden md:block" style={{ width: "1283px", height: "543px", margin: "0 auto" }}>
        {/* Header */}
        <div className="absolute" style={{ width: "566px", height: "113px", left: "359px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", justifyContent: "center" }}>
          <h2
            style={{
              fontFamily: "Monument Extended, sans-serif",
              fontWeight: 400,
              fontSize: "36px",
              lineHeight: "100%",
              textAlign: "center",
              color: "#1A1A1A",
              width: "566px",
              height: "43px",
              margin: 0,
            }}
          >
            Our Goals
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "100%",
              textAlign: "center",
              color: "#6E6E6EB2",
              width: "566px",
              height: "54px",
              margin: 0,
            }}
          >
            We &apos;re driven by simplicity, empowerment, and shared success.
          </p>
        </div>

        {/* Cards Row */}
        <div className="absolute" style={{ width: "1283px", height: "330px", top: "213px", display: "flex", gap: "22px" }}>
          {goals.map((goal, index) => (
            <div key={index} style={{ 
              width: "413px", 
              height: "330px", 
              borderRadius: "10px", 
              border: "1px solid #E4D8F3", 
              position: "relative", 
              padding: "30px",
              background: "#FFFFFF"
            }}>
            
              <div style={{ 
                width: "100px", 
                height: "100px", 
                borderRadius: "50px", 
                position: "absolute", 
                top: "30px", 
                left: "30px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: "#FCFBFE",
                padding: "13px",
                gap: "10px",
                opacity: "1",
                transform: "rotate(0deg)"
              }}>
                <Image 
                  src={goal.iconSrc} 
                  alt={goal.title} 
                  width={74} 
                  height={74} 
                  style={{ objectFit: "contain" }} 
                />
              </div>
              <div style={{ marginTop: "142px" }}>
                <h3
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 500,
                    fontSize: "28px",
                    lineHeight: "100%",
                    color: "#1A1A1A",
                    width: "312px",
                    height: "76px",
                    margin: 0,
                  }}
                >
                  {goal.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "130%",
                    color: "#6E6E6EB2",
                    marginTop: "10px",
                  }}
                >
                  {goal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden mobile-container">
        <div className="header-container-mobile">
          <h2 className="mobile-title">Our Goals</h2>
          <p className="mobile-subtitle">
            We&apos;re driven by simplicity, empowerment, and shared success.
          </p>
        </div>
        
        <div className="cards-container-mobile">
          {goals.map((goal, index) => (
            <div key={index} className="card-mobile">
              <div className="icon-container-mobile">
                <Image 
                  src={goal.iconSrc} 
                  alt={goal.title} 
                  width={74}
                  height={74}
                  style={{ 
                    objectFit: "contain",
                    width: "100%",
                    height: "100%" 
                  }} 
                />
              </div>
              
              <div className="text-content-mobile">
                <h3 className="card-title-mobile">{goal.title}</h3>
                <p className="card-description-mobile">{goal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GoalsSection

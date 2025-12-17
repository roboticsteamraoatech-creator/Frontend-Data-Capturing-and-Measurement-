
"use client";
import Image from "next/image"

export function ValueSection() {
  const goals = [
    { icon: "/Frame 1707479188.png", title: "Innovation", description: "We explore new ways to blend AI and usability for smarter results." },
    { icon: "/Frame 1707479188 (1).png", title: "Accuracy", description: "Precision isn't an option; it's our foundation." },
    { icon: "/Frame 1707479188 (2).png", title: "Accessibility", description: "Everyone deserves access to tools that make their work easier." },
    { icon: "/Frame 1707479188 (3).png", title: "Integrity", description: "We build with honesty, transparency, and purpose." },
  ]

  return (
    <section className="w-full">
      {/* Desktop Version */}
      <div className="hidden md:block" style={{ width: "1279px", margin: "0 auto", position: "relative" }}>
        <div style={{ width: "566px", height: "86px", position: "absolute", left: "428px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ fontFamily: "Monument Extended, sans-serif", fontWeight: 400, fontSize: "36px", lineHeight: "100%", textAlign: "center", color: "#1A1A1A", width: "566px", height: "43px", margin: 0 }}>Our Values</h2>
          <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "100%", textAlign: "center", color: "#6E6E6EB2", width: "566px", height: "27px", margin: 0 }}>
            Technology is only as powerful as the impact it creates.
          </p>
        </div>
        <div style={{ width: "1279px", display: "flex", flexWrap: "wrap", gap: "31px", paddingTop: "110px" }}>
          {goals.map((goal, index) => (
            <div key={index} style={{ width: "624px", height: "450px", borderRadius: "10px", border: "1px solid #E4D8F3", overflow: "hidden", background: "#FFFFFF" }}>
              <div className="relative" style={{ width: "624px", height: "277px" }}>
                <Image src={goal.icon} alt={goal.title} fill className="object-cover" sizes="624px" />
              </div>
              <div style={{ height: "173px", padding: "20px 34px", display: "flex", flexDirection: "column", gap: "18px" }}>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "28px", lineHeight: "100%", color: "#1A1A1A", margin: 0 }}>{goal.title}</h3>
                <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 300, fontSize: "16px", lineHeight: "130%", color: "#6E6E6EB2", margin: 0 }}>{goal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden" style={{ width: "100%", padding: "40px 0 60px", position: "relative" }}>
        <style jsx>{`
          @media (max-width: 767px) {
            .mobile-container {
              width: 100%;
              height: auto;
            }
            
            .header-container-mobile {
              width: 248px;
              height: 89px;
              margin: 0 auto 40px;
              display: flex;
              flex-direction: column;
              gap: 16px;
              opacity: 1;
              transform: rotate(0deg);
              text-align: center;
            }
            
            .mobile-title {
              font-family: "Monument Extended", sans-serif;
              font-weight: 400;
              font-size: 24px;
              line-height: 100%;
              text-align: center;
              color: #1A1A1A;
              width: 248px;
              height: 29px;
              margin: 0;
              opacity: 1;
              transform: rotate(0deg);
            }
            
            .mobile-subtitle {
              font-family: "Manrope", sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 100%;
              text-align: center;
              color: #6E6E6EB2;
              width: 248px;
              height: 44px;
              margin: 0;
              opacity: 1;
              transform: rotate(0deg);
            }
            
            .cards-container-mobile {
              width: 100%;
              max-width: 350px;
              height: auto;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
              gap: 40px;
              opacity: 1;
              transform: rotate(0deg);
            }
            
            .card-mobile {
              width: 100%;
              max-width: 350px;
              height: 450px;
              border-radius: 10px;
              border: 1px solid #E4D8F3;
              opacity: 1;
              transform: rotate(0deg);
              position: relative;
              overflow: hidden;
              background: #FFFFFF;
              margin: 0 auto;
            }
            
            .image-container-mobile {
              width: 100%;
              height: 320px;
              position: relative;
            }
            
            .text-container-mobile {
              width: 282px;
              height: 90px;
              position: absolute;
              top: 340px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              flex-direction: column;
              gap: 12px;
              opacity: 1;
            }
            
            .card-title-mobile {
              font-family: "Manrope", sans-serif;
              font-weight: 500;
              font-size: 18px;
              line-height: 100%;
              text-align: center;
              vertical-align: middle;
              color: #1A1A1A;
              width: 100%;
              height: 25px;
              margin: 0;
              opacity: 1;
            }
            
            .card-description-mobile {
              font-family: "Manrope", sans-serif;
              font-weight: 300;
              font-size: 14px;
              line-height: 130%;
              text-align: center;
              color: #6E6E6EB2;
              width: 100%;
              height: auto;
              margin: 0;
            }
          }
        `}</style>
        
        <div className="header-container-mobile">
          <h2 className="mobile-title">Our Values</h2>
          <p className="mobile-subtitle">
            Technology is only as powerful as 
            the impact it creates.
          </p>
        </div>
        
        <div className="cards-container-mobile">
          {goals.map((goal, index) => (
            <div key={index} className="card-mobile">
              <div className="image-container-mobile">
                <Image 
                  src={goal.icon} 
                  alt={goal.title} 
                  fill
                  className="object-cover"
                  sizes="350px"
                />
              </div>
              <div className="text-container-mobile">
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

export default ValueSection


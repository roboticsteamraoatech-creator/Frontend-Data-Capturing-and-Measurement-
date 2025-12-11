
"use client";
import { useState } from "react";
import Image from "next/image";

const DataCapturingRealWorld = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const useCases = [
    {
      id: 1,
      title: "Fashion & Retail",
      description: "Designers and brands use it for accurate sizing, reducing returns.",
      image: "/assets/unsplash_77Ga1TXf3vQ.png",
    },
    {
      id: 2,
      title: "Engineering & Design",
      description: "Used to capture precise measurements, improve product accuracy, and speed up the design process.",
      image: "/assets/engineering-design.png",
    },
    {
      id: 3,
      title: "Fitness & Wellness",
      description: "Helps trainers and users track body changes, set goals, and personalize workout plans.",
      image: "/assets/fitness.png",
    },
    {
      id: 4,
      title: "Interior Planning",
      description: "Enables quick room measurements, accurate layout planning, and better visualization of furniture and space.",
      image: "/assets/interion-planing.png",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="relative"
      style={{ width: "1441px", height: "871px", margin: "0 auto", background: "#F4EFFA" }}
    >
      <div
        className="absolute"
        style={{
          width: "602px",
          height: "156px",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h2
          style={{
            width: "602px",
            height: "86px",
            fontFamily: "Monument Extended, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "36px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            textWrap: "balance",
            color: "#1A1A1A",
          }}
        >
          How data capturing works in the real world
        </h2>
        <p
          style={{
            width: "602px",
            height: "54px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            color: "#6E6E6EB2",
            margin: 0,
          }}
        >
          Designed for versatility — empowering individuals and professionals across industries to measure smarter.
        </p>
      </div>

      <div
        className="absolute"
        style={{ width: "1288px", height: "450px", top: "356px", left: "80px" }}
      >
        {/* Image Section - Fixed border issue */}
        <div
          className="absolute"
          style={{ 
            width: "607px", 
            height: "416px", 
            top: "17px", 
            left: "0px", 
            borderRadius: "10px", 
            overflow: "hidden", 
            border: "7px solid #FFFFFF",
            boxSizing: "border-box" 
          }}
        >
          <Image
            src={useCases[activeIndex || 0].image}
            alt={useCases[activeIndex || 0].title}
            fill
            className="object-cover"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }}
          />
        </div>

        <div
          className="absolute"
          style={{ width: "583px", height: "363px", top: "50px", left: "683px" }}
        >
          {[0, 1, 2, 3].map((idx) => {
            const item = useCases[idx];
            const open = activeIndex === idx;
            return (
              <div
                key={item.id}
                style={{ 
                  width: "583px", 
                  height: open ? "auto" : "81px", 
                  borderTop: "1px solid #E4D8F3", 
                  display: "flex", 
                  alignItems: "flex-start",
                  cursor: "pointer",
                  padding: "20px 0",
                }}
                onClick={() => toggleAccordion(idx)}
              >
                <div 
                  style={{ 
                    width: "28px", 
                    color: "#1A1A1A",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    paddingTop: "4px",
                    flexShrink: 0, 
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ 
                  marginLeft: "16px", 
                  flex: 1,
                  minWidth: 0, 
                }}>
                  <div
                    style={{
                      width: "341px",
                      height: "33px",
                      fontFamily: "Manrope",
                      fontWeight: 500,
                      fontStyle: "Medium",
                      fontSize: "24px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      color: "#000000",
                      marginBottom: open ? "12px" : "0", 
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.title}
                  </div>
                  {open && (
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "341px", 
                        height: "auto", 
                        fontFamily: "Manrope",
                        fontWeight: 300,
                        fontStyle: "Light",
                        fontSize: "16px",
                        lineHeight: "140%", 
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        color: "#666666B2",
                        opacity: 1,
                        paddingRight: "20px", 
                        wordWrap: "break-word", 
                        whiteSpace: "normal", 
                      }}
                    >
                      {item.description}
                    </div>
                  )}
                </div>
                <div style={{ 
                  width: "24px", 
                  height: "24px", 
                  position: "relative", 
                  marginTop: "4px",
                  flexShrink: 0, 
                }}>
                  <div style={{ 
                    position: "absolute", 
                    top: "11px", 
                    left: 0, 
                    right: 0, 
                    borderTop: "2.2px solid #000000" 
                  }} />
                  {!open && <div style={{ 
                    position: "absolute", 
                    left: "11px", 
                    top: 0, 
                    bottom: 0, 
                    borderLeft: "2.2px solid #000000" 
                  }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DataCapturingRealWorld;
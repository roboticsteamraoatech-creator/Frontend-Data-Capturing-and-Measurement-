"use client";

import React, { memo, useState } from "react";

const Audience: React.FC = () => {
  const targetAudience = [
    {
      id: 1,
      image: "/lucas-favre-v8JtKauvvDk-unsplash 1.png",
      title: "Fashion\nDesigner",
      bgColor: "#D78686",
      tall: true,
    },
    {
      id: 2,
      image: "/thisisengineering-CUA-_IGpXXo-unsplash 1.png",
      title: "Engineer/\nTechnician",
      bgColor: "#86C5D7",
      tall: false,
    },
    {
      id: 3,
      image: "/roberto-cortese-ejhjSZKTeeg-unsplash 1.png",
      title: "Online\nRetailer",
      bgColor: "#D7C586",
      tall: false,
    },
    {
      id: 4,
      image: "/collov-home-design-js8AQlw71HA-unsplash 1.png",
      title: "Interior\nDesigners",
      bgColor: "#A586D7",
      tall: false,
    },
    {
      id: 5,
      image: "/image 7.png",
      title: "Fitness\nCoaches",
      bgColor: "#86D7A5",
      tall: false,
    },
    {
      id: 6,
      image: "/image 8.png",
      title: "Individuals-\nYou",
      bgColor: "#D786C5",
      tall: true,
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="bg-white"
      // ensure nothing unexpected clips the header or image row
      style={{ overflow: "visible" }}
    >
      {/* ---------- DESKTOP: unchanged ---------- */}
      <div className="hidden lg:block py-20" style={{ marginBottom: "200px" }}>
        <div
          className="mx-auto px-4 md:px-20"
          style={{
            maxWidth: "1440px",
            width: "100%",
          }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-monument">
              Who is it for
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-manrope">
              Whether you design, build, or create, we help you measure smarter.
            </p>
          </div>

          {/* Image Row - All 6 images in one row */}
          <div className="flex overflow-hidden" style={{ 
            maxWidth: "1281px",
            minHeight: "622px",
            margin: "0 auto",
            height: "700px", 
            position: "relative",
          }}>
            {targetAudience.map((person, index) => (
              <div
                key={person.id}
                className="group relative rounded-[20px] overflow-hidden flex-shrink-0"
                style={{
                  width: hoveredIndex === index ? "350px" : "230px", // Increased width to better fill the container
                  height: "650px", // Increased height
                  borderRadius: "20px",
                  backgroundColor: person.bgColor,
                  transition: "all 0.3s ease",
                  position: "relative",
                  zIndex: hoveredIndex === index ? "10" : "1",
                  marginRight: "-30px", // Reduced overlap
                  overflow: "hidden",
                  top: "40px", // Adjusted vertical position",
                  boxShadow: hoveredIndex === index ? "0 20px 40px rgba(0,0,0,0.2)" : "none",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.image}
                  alt={person.title}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "cover" }}
                />

                {/* Overlay title */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
                  style={{
                    height: "102px",
                  }}>
                  <p
                    className="text-center whitespace-pre-line font-manrope text-white"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 400,
                      fontSize: "24px",
                      lineHeight: "100%",
                      textAlign: "center",
                      color: "#FFFFFFB2",
                      width: "100%",
                      height: "66px",
                      margin: "0 auto",
                    }}
                  >
                    {person.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- MOBILE: fixed header + horizontal scroll ---------- */}
      <div className="lg:hidden" style={{ paddingTop: 20, paddingBottom: 40 }}>
        {/* Header (width 298 x 89) — placed above scroll and given high z-index */}
        <div
          className="mx-auto"
          style={{
            width: 298,
            height: 89,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
            position: "relative",
            zIndex: 20, // <-- ensures header sits above the image row
            background: "transparent",
          }}
        >
          <h2
            style={{
              fontFamily: "Monument Extended, sans-serif",
              fontWeight: 400,
              fontSize: 24,
              lineHeight: "100%",
              textAlign: "center",
              color: "#1A1A1A",
              width: 298,
              height: 29,
              margin: 0,
              display: "block",
            }}
          >
            Who is it for
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "100%",
              textAlign: "center",
              color: "#6E6E6EB2",
              width: 298,
              height: 44,
              margin: 0,
              display: "block",
            }}
          >
            Whether you design, build, or create, we{" "}
            <br />
            help you measure smarter.
          </p>
        </div>

        {/* Horizontal scroll container */}
        <div
          className="overflow-x-auto"
          style={{
            paddingLeft: 19, // mimic left:19px from Figma
            paddingRight: 16,
            marginTop: 16,
            // ensure scroll sits below header and doesn't overlap it visually
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            className="flex items-start"
            style={{
              gap: 8,
              height: 419,
              // ensure content width fits cards
            }}
          >
            {targetAudience.map((person, idx) => {
              // All cards are now 197px wide per spec
              const cardWidth = 197;
              return (
                <div
                  key={person.id}
                  className="relative rounded-[20px] overflow-hidden flex-shrink-0"
                  style={{
                    width: cardWidth,
                    height: 419,
                    borderRadius: 20,
                    backgroundColor: person.bgColor,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.image}
                    alt={person.title}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover", display: "block" }}
                  />

                  {/* Overlay title */}
                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
                    style={{
                      height: 102,
                      pointerEvents: "none",
                      top: 317,
                    }}
                  >
                    <p
                      className="text-center whitespace-pre-line"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 400,
                        fontSize: 18,
                        lineHeight: "100%",
                        textAlign: "center",
                        color: "#FFFFFFB2",
                        width: 197,
                        height: 66,
                        margin: "0 auto",
                        display: "block",
                      }}
                    >
                      {person.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Audience);
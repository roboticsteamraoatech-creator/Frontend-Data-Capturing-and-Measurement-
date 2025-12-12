
// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// const DataCapturingRealWorld = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   const useCases = [
//     {
//       id: 1,
//       title: "Fashion & Retail",
//       description: "Designers and brands use it for accurate sizing, reducing returns.",
//       image: "/assets/unsplash_77Ga1TXf3vQ.png",
//     },
//     {
//       id: 2,
//       title: "Engineering & Design",
//       description: "Used to capture precise measurements, improve product accuracy, and speed up the design process.",
//       image: "/assets/engineering-design.png",
//     },
//     {
//       id: 3,
//       title: "Fitness & Wellness",
//       description: "Helps trainers and users track body changes, set goals, and personalize workout plans.",
//       image: "/assets/fitness.png",
//     },
//     {
//       id: 4,
//       title: "Interior Planning",
//       description: "Enables quick room measurements, accurate layout planning, and better visualization of furniture and space.",
//       image: "/assets/interion-planing.png",
//     },
//   ];

//   useEffect(() => {
//     setIsMounted(true);
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     // Initial check
//     checkMobile();
    
//     // Add event listener
//     window.addEventListener("resize", checkMobile);
    
//     // Cleanup
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const toggleAccordion = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   // Don't render on server to avoid hydration mismatch
//   if (!isMounted) {
//     return null;
//   }

//   if (isMobile) {
//     return (
//       <section
//         className="relative bg-[#F4EFFA]"
//         style={{ 
//           width: "100%", 
//           minHeight: "auto", 
//           margin: "0 auto", 
//           padding: "40px 20px 60px 20px"
//         }}
//       >
//         {/* Header Container */}
//         <div
//           style={{
//             width: "299px",
//             height: "auto",
//             margin: "0 auto 40px auto",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "16px",
//           }}
//         >
//           <h2
//             style={{
//               width: "299px",
//               height: "auto",
//               fontFamily: "Monument Extended, sans-serif",
//               fontWeight: 400,
//               fontStyle: "normal",
//               fontSize: "24px",
//               lineHeight: "100%",
//               letterSpacing: "0%",
//               textAlign: "center",
//               color: "#1A1A1A",
//               margin: 0,
//             }}
//           >
//             How data capturing works in the real world
//           </h2>
//           <p
//             style={{
//               width: "299px",
//               height: "auto",
//               fontFamily: "Manrope, sans-serif",
//               fontWeight: 400,
//               fontStyle: "normal",
//               fontSize: "16px",
//               lineHeight: "100%",
//               letterSpacing: "0%",
//               textAlign: "center",
//               color: "#6E6E6EB2",
//               margin: 0,
//             }}
//           >
//             Designed for versatility — empowering individuals and professionals across industries to measure smarter.
//           </p>
//         </div>

//         {/* Image Container */}
//         <div
//           style={{ 
//             width: "351px", 
//             height: "250px",
//             margin: "0 auto 20px auto",
//             position: "relative"
//           }}
//         >
//           <div
//             style={{ 
//               width: "100%", 
//               height: "100%", 
//               borderRadius: "10px", 
//               overflow: "hidden", 
//               border: "3px solid rgba(255, 255, 255, 0.7)",
//               boxShadow: "0px 4px 16px 0px rgba(93, 42, 139, 0.1)",
//               boxSizing: "border-box",
//               position: "relative"
//             }}
//           >
//             <Image
//               src={useCases[activeIndex || 0].image}
//               alt={useCases[activeIndex || 0].title}
//               fill
//               style={{ 
//                 objectFit: "cover",
//                 width: "100%",
//                 height: "100%"
//               }}
//             />
//           </div>
//         </div>

//         {/* Accordion Items Container - BELOW the image */}
//         <div style={{ 
//           width: "351px", 
//           margin: "0 auto",
//         }}>
//           {useCases.map((item, idx) => {
//             const open = activeIndex === idx;
            
//             return (
//               <div
//                 key={item.id}
//                 style={{ 
//                   width: "351px",
//                   height: open ? "auto" : "81px",
//                   borderTop: "1px solid #E4D8F3",
//                   display: "flex", 
//                   alignItems: "flex-start",
//                   cursor: "pointer",
//                   padding: "20px 0",
//                   backgroundColor: "transparent",
//                 }}
//                 onClick={() => toggleAccordion(idx)}
//               >
//                 {/* Number */}
//                 <div 
//                   style={{ 
//                     width: "28px", 
//                     color: "#1A1A1A",
//                     fontFamily: "Manrope, sans-serif",
//                     fontWeight: 500,
//                     fontSize: "16px",
//                     lineHeight: "24px",
//                     flexShrink: 0,
//                     marginRight: "16px",
//                   }}
//                 >
//                   {idx + 1}
//                 </div>
                
//                 {/* Title and Description Container */}
//                 <div style={{ 
//                   width: "241px",
//                   height: "auto",
//                   gap: "8px",
//                   display: "flex",
//                   flexDirection: "column",
//                   flex: 1,
//                   marginRight: "16px",
//                 }}>
//                   <div
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       fontFamily: "Manrope, sans-serif",
//                       fontWeight: 500,
//                       fontStyle: "normal",
//                       fontSize: "18px",
//                       lineHeight: "100%",
//                       letterSpacing: "0%",
//                       color: "#000000",
//                       marginBottom: open ? "8px" : "0",
//                     }}
//                   >
//                     {item.title}
//                   </div>
//                   {open && (
//                     <div
//                       style={{
//                         width: "100%",
//                         height: "auto",
//                         fontFamily: "Manrope, sans-serif",
//                         fontWeight: 300,
//                         fontStyle: "normal",
//                         fontSize: "14px",
//                         lineHeight: "130%",
//                         letterSpacing: "0%",
//                         color: "#666666B2",
//                         wordWrap: "break-word",
//                         whiteSpace: "normal",
//                       }}
//                     >
//                       {item.description}
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Plus/Minus Icon */}
//                 <div style={{ 
//                   width: "16px",
//                   height: "16px",
//                   position: "relative",
//                   flexShrink: 0,
//                   marginTop: "4px",
//                 }}>
//                   <div style={{ 
//                     position: "absolute", 
//                     top: "7px", 
//                     left: "0px", 
//                     right: "0px", 
//                     borderTop: "2.2px solid #000000" 
//                   }} />
//                   {!open && <div style={{ 
//                     position: "absolute", 
//                     left: "7px", 
//                     top: "0px", 
//                     bottom: "0px", 
//                     borderLeft: "2.2px solid #000000" 
//                   }} />}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     );
//   }

//   // Desktop Version (keep your original desktop code)
//   return (
//     <section
//       className="relative"
//       style={{ width: "1441px", height: "871px", margin: "0 auto", background: "#F4EFFA" }}
//     >
//       <div
//         className="absolute"
//         style={{
//           width: "602px",
//           height: "156px",
//           top: "100px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "16px",
//         }}
//       >
//         <h2
//           style={{
//             width: "602px",
//             height: "86px",
//             fontFamily: "Monument Extended, sans-serif",
//             fontWeight: 400,
//             fontStyle: "normal",
//             fontSize: "36px",
//             lineHeight: "100%",
//             letterSpacing: "0%",
//             textAlign: "center",
//             textWrap: "balance",
//             color: "#1A1A1A",
//           }}
//         >
//           How data capturing works in the real world
//         </h2>
//         <p
//           style={{
//             width: "602px",
//             height: "54px",
//             fontFamily: "Manrope, sans-serif",
//             fontWeight: 400,
//             fontStyle: "normal",
//             fontSize: "20px",
//             lineHeight: "100%",
//             letterSpacing: "0%",
//             textAlign: "center",
//             color: "#6E6E6EB2",
//             margin: 0,
//           }}
//         >
//           Designed for versatility — empowering individuals and professionals across industries to measure smarter.
//         </p>
//       </div>

//       <div
//         className="absolute"
//         style={{ width: "1288px", height: "450px", top: "356px", left: "80px" }}
//       >
//         {/* Image Section - Fixed border issue */}
//         <div
//           className="absolute"
//           style={{ 
//             width: "607px", 
//             height: "416px", 
//             top: "17px", 
//             left: "0px", 
//             borderRadius: "10px", 
//             overflow: "hidden", 
//             border: "7px solid #FFFFFF",
//             boxSizing: "border-box" 
//           }}
//         >
//           <Image
//             src={useCases[activeIndex || 0].image}
//             alt={useCases[activeIndex || 0].title}
//             fill
//             style={{ 
//               width: "100%", 
//               height: "100%", 
//               objectFit: "cover" 
//             }}
//           />
//         </div>

//         <div
//           className="absolute"
//           style={{ width: "583px", height: "363px", top: "50px", left: "683px" }}
//         >
//           {[0, 1, 2, 3].map((idx) => {
//             const item = useCases[idx];
//             const open = activeIndex === idx;
//             return (
//               <div
//                 key={item.id}
//                 style={{ 
//                   width: "583px", 
//                   height: open ? "auto" : "81px", 
//                   borderTop: "1px solid #E4D8F3", 
//                   display: "flex", 
//                   alignItems: "flex-start",
//                   cursor: "pointer",
//                   padding: "20px 0",
//                 }}
//                 onClick={() => toggleAccordion(idx)}
//               >
//                 <div 
//                   style={{ 
//                     width: "28px", 
//                     color: "#1A1A1A",
//                     fontFamily: "Manrope, sans-serif",
//                     fontWeight: 500,
//                     fontSize: "16px",
//                     lineHeight: "24px",
//                     paddingTop: "4px",
//                     flexShrink: 0, 
//                   }}
//                 >
//                   {idx + 1}
//                 </div>
//                 <div style={{ 
//                   marginLeft: "16px", 
//                   flex: 1,
//                   minWidth: 0, 
//                 }}>
//                   <div
//                     style={{
//                       width: "341px",
//                       height: "33px",
//                       fontFamily: "Manrope",
//                       fontWeight: 500,
//                       fontStyle: "Medium",
//                       fontSize: "24px",
//                       lineHeight: "100%",
//                       letterSpacing: "0%",
//                       verticalAlign: "middle",
//                       color: "#000000",
//                       marginBottom: open ? "12px" : "0", 
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     {item.title}
//                   </div>
//                   {open && (
//                     <div
//                       style={{
//                         width: "100%",
//                         maxWidth: "341px", 
//                         height: "auto", 
//                         fontFamily: "Manrope",
//                         fontWeight: 300,
//                         fontStyle: "Light",
//                         fontSize: "16px",
//                         lineHeight: "140%", 
//                         letterSpacing: "0%",
//                         verticalAlign: "middle",
//                         color: "#666666B2",
//                         opacity: 1,
//                         paddingRight: "20px", 
//                         wordWrap: "break-word", 
//                         whiteSpace: "normal", 
//                       }}
//                     >
//                       {item.description}
//                     </div>
//                   )}
//                 </div>
//                 <div style={{ 
//                   width: "24px", 
//                   height: "24px", 
//                   position: "relative", 
//                   marginTop: "4px",
//                   flexShrink: 0, 
//                 }}>
//                   <div style={{ 
//                     position: "absolute", 
//                     top: "11px", 
//                     left: 0, 
//                     right: 0, 
//                     borderTop: "2.2px solid #000000" 
//                   }} />
//                   {!open && <div style={{ 
//                     position: "absolute", 
//                     left: "11px", 
//                     top: 0, 
//                     bottom: 0, 
//                     borderLeft: "2.2px solid #000000" 
//                   }} />}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DataCapturingRealWorld;



"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const DataCapturingRealWorld = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  const toggleAccordion = (index: number) => {
    setActiveIndex(index);
  };

  // Get the active item (default to first item if none is active)
  const activeItem = activeIndex !== null ? useCases[activeIndex] : useCases[0];

  // Get only the items that are NOT active
  const inactiveItems = useCases.filter((_, idx) => idx !== activeIndex);

  // Don't render on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (isMobile) {
    return (
      <section
        className="relative bg-[#F4EFFA]"
        style={{ 
          width: "100%", 
          minHeight: "auto", 
          margin: "0 auto", 
          padding: "40px 20px 60px 20px"
        }}
      >
        {/* Main Header - Always visible */}
        <div
          style={{
            width: "299px",
            height: "auto",
            margin: "0 auto 40px auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <h2
            style={{
              width: "299px",
              height: "auto",
              fontFamily: "Monument Extended, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "24px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              color: "#1A1A1A",
              margin: 0,
            }}
          >
            How data capturing works in the real world
          </h2>
          <p
            style={{
              width: "299px",
              height: "auto",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
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

        {/* Border between header and active item */}
        <div style={{ 
          width: "351px", 
          margin: "0 auto",
          borderTop: "1px solid #E4D8F3",
        }} />

        {/* Active Item Content - Appears ABOVE the image */}
        <div
          style={{ 
            width: "351px", 
            margin: "0 auto",
            padding: "20px 0",
            background: "transparent",
          }}
        >
          <div style={{ 
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}>
            {/* Active Item Number */}
            <div 
              style={{ 
                width: "28px", 
                color: "#1A1A1A",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                flexShrink: 0,
                marginRight: "16px",
              }}
            >
              {activeItem.id}
            </div>
            
            {/* Active Item Title and Description Container */}
            <div style={{ 
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}>
              {/* Active Item Title */}
              <div
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                  fontSize: "20px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                }}
              >
                {activeItem.title}
              </div>
              
              {/* Active Item Description */}
              <div
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 300,
                  fontStyle: "normal",
                  fontSize: "16px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  color: "#666666B2",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {activeItem.description}
              </div>
            </div>
            
            {/* Minus Icon for Active Item */}
            <div style={{ 
              width: "16px",
              height: "16px",
              position: "relative",
              flexShrink: 0,
              marginTop: "4px",
            }}>
              <div style={{ 
                position: "absolute", 
                top: "7px", 
                left: "0px", 
                right: "0px", 
                borderTop: "2.2px solid #000000" 
              }} />
            </div>
          </div>
        </div>

        {/* Border between active item and image */}
        <div style={{ 
          width: "351px", 
          margin: "0 auto",
          borderTop: "1px solid #E4D8F3",
        }} />

        {/* Image Container - Shows active item's image */}
        <div
          style={{ 
            width: "351px", 
            height: "250px",
            margin: "20px auto",
            position: "relative",
          }}
        >
          <div
            style={{ 
              width: "100%", 
              height: "100%", 
              borderRadius: "10px", 
              overflow: "hidden", 
              border: "3px solid rgba(255, 255, 255, 0.7)",
              boxShadow: "0px 4px 16px 0px rgba(93, 42, 139, 0.1)",
              boxSizing: "border-box",
              position: "relative"
            }}
          >
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              style={{ 
                objectFit: "cover",
                width: "100%",
                height: "100%"
              }}
            />
          </div>
        </div>

        {/* Border between image and accordion list */}
        <div style={{ 
          width: "351px", 
          margin: "0 auto",
          borderTop: "1px solid #E4D8F3",
        }} />

        {/* Inactive Items Container - Only shows items NOT currently selected */}
        <div style={{ 
          width: "351px", 
          margin: "0 auto",
        }}>
          {inactiveItems.map((item, idx) => {
            // Find the original index to know the correct order
            const originalIndex = useCases.findIndex(useCase => useCase.id === item.id);
            
            return (
              <div
                key={item.id}
                style={{ 
                  width: "351px",
                  height: "81px",
                  borderTop: idx === 0 ? "none" : "1px solid #E4D8F3",
                  display: "flex", 
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "0",
                  backgroundColor: "transparent",
                }}
                onClick={() => toggleAccordion(originalIndex)}
              >
                {/* Number */}
                <div 
                  style={{ 
                    width: "28px", 
                    color: "#1A1A1A",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    flexShrink: 0,
                    marginRight: "16px",
                    marginLeft: "0",
                  }}
                >
                  {item.id}
                </div>
                
                {/* Title Only */}
                <div style={{ 
                  width: "241px",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  marginRight: "16px",
                  justifyContent: "center",
                }}>
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 500,
                      fontStyle: "normal",
                      fontSize: "18px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                    }}
                  >
                    {item.title}
                  </div>
                </div>
                
                {/* Plus Icon for inactive items */}
                <div style={{ 
                  width: "16px",
                  height: "16px",
                  position: "relative",
                  flexShrink: 0,
                }}>
                  <div style={{ 
                    position: "absolute", 
                    top: "7px", 
                    left: "0px", 
                    right: "0px", 
                    borderTop: "2.2px solid #000000" 
                  }} />
                  <div style={{ 
                    position: "absolute", 
                    left: "7px", 
                    top: "0px", 
                    bottom: "0px", 
                    borderLeft: "2.2px solid #000000" 
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Desktop Version - Updated to match mobile behavior
  return (
    <section
      className="relative"
      style={{ 
        width: "1441px", 
        height: "871px", 
        margin: "0 auto", 
        background: "#F4EFFA",
      }}
    >
      {/* Main Header */}
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

      {/* Content Area with Borders */}
      <div
        className="absolute"
        style={{ 
          width: "1288px", 
          height: "450px", 
          top: "356px", 
          left: "80px",
        }}
      >
        {/* Border between header and image area */}
        <div style={{ 
          width: "100%",
          borderTop: "1px solid #E4D8F3",
          position: "absolute",
          top: "-17px",
        }} />

        {/* Image Section */}
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
            src={activeItem.image}
            alt={activeItem.title}
            fill
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }}
          />
        </div>

        {/* Active Item Content on Right Side */}
        <div
          className="absolute"
          style={{ 
            width: "583px", 
            top: "17px", 
            left: "683px",
            padding: "33px 0",
            borderBottom: "1px solid #E4D8F3",
          }}
        >
          <div style={{ 
            display: "flex",
            alignItems: "flex-start",
          }}>
            {/* Active Item Number */}
            <div 
              style={{ 
                width: "28px", 
                color: "#1A1A1A",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                flexShrink: 0,
                marginRight: "16px",
              }}
            >
              {activeItem.id}
            </div>
            
            {/* Active Item Title and Description */}
            <div style={{ 
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              <div
                style={{
                  width: "341px",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontStyle: "Medium",
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                }}
              >
                {activeItem.title}
              </div>
              <div
                style={{
                  width: "341px",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 300,
                  fontStyle: "Light",
                  fontSize: "16px",
                  lineHeight: "140%", 
                  letterSpacing: "0%",
                  color: "#666666B2",
                  wordWrap: "break-word", 
                  whiteSpace: "normal", 
                }}
              >
                {activeItem.description}
              </div>
            </div>
            
            {/* Minus Icon for Active Item */}
            <div style={{ 
              width: "24px", 
              height: "24px", 
              position: "relative", 
              flexShrink: 0,
              marginTop: "4px",
            }}>
              <div style={{ 
                position: "absolute", 
                top: "11px", 
                left: "0px", 
                right: "0px", 
                borderTop: "2.2px solid #000000" 
              }} />
            </div>
          </div>
        </div>

        {/* Inactive Items List on Right Side */}
        <div
          className="absolute"
          style={{ 
            width: "583px", 
            top: "160px", 
            left: "683px",
          }}
        >
          {inactiveItems.map((item, idx) => {
            // Find the original index
            const originalIndex = useCases.findIndex(useCase => useCase.id === item.id);
            
            return (
              <div
                key={item.id}
                style={{ 
                  width: "583px", 
                  height: "81px", 
                  borderTop: idx === 0 ? "none" : "1px solid #E4D8F3", 
                  display: "flex", 
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "0",
                  backgroundColor: "transparent",
                }}
                onClick={() => toggleAccordion(originalIndex)}
              >
                <div 
                  style={{ 
                    width: "28px", 
                    color: "#1A1A1A",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    flexShrink: 0, 
                    marginLeft: "0",
                  }}
                >
                  {item.id}
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
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.title}
                  </div>
                </div>
                <div style={{ 
                  width: "24px", 
                  height: "24px", 
                  position: "relative", 
                  flexShrink: 0, 
                }}>
                  <div style={{ 
                    position: "absolute", 
                    top: "11px", 
                    left: "0px", 
                    right: "0px", 
                    borderTop: "2.2px solid #000000" 
                  }} />
                  <div style={{ 
                    position: "absolute", 
                    left: "11px", 
                    top: "0px", 
                    bottom: "0px", 
                    borderLeft: "2.2px solid #000000" 
                  }} />
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
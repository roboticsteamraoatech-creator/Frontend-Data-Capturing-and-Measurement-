

// "use client"
// import Image from "next/image";
// import { memo, useState } from "react";

// const steps = [
//   {
//     step: 1,
//     title: "Upload Your Image",
//     description: "Start by uploading a clear image of yourself or an object.",
//     image: "/assets/Frame 1707479275.png",
//   },
//   {
//     step: 2,
//     title: "AI Analysis",
//     description: "Our AI analyzes the image and detects key points for measurement.",
//     image: "/assets/AI-Analysis.png",
//   },
 
//   {
//     step: 3,
//     title: "View Measurements Instantly",
//     description: "Receive accurate measurements in seconds.",
//     image: "/assets/Frame 1707479275 (2).png",
//   },
// ];

// const SimpleSteps = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const nextStep = () => {
//     setCurrentStep((prev) => (prev + 1) % steps.length);
//   };

//   const prevStep = () => {
//     setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
//   };

//   return (
//     <section className="flex flex-col items-center bg-white py-20 px-4">
//       {/* Header Container */}
//       <div 
//         className="text-center mb-16"
//         style={{
//           width: "566px",
//           maxWidth: "100%",
//           height: "129px",
//           gap: "16px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <h2
//           style={{
//             width: "566px",
//             maxWidth: "100%",
//             height: "86px",
//             background: "#1A1A1A",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text",
//             fontFamily: "Monument Extended, sans-serif",
//             fontWeight: 400,
//             fontSize: "36px",
//             lineHeight: "100%",
//             letterSpacing: "0%",
//             textAlign: "center",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           Simple Steps, Smart Results
//         </h2>
//         <p
//           style={{
//             width: "566px",
//             maxWidth: "100%",
//             height: "27px",
//             fontFamily: "Manrope, sans-serif",
//             fontWeight: 400,
//             fontSize: "20px",
//             lineHeight: "100%",
//             letterSpacing: "0%",
//             textAlign: "center",
//             color: "#6E6E6E",
//           }}
//         >
//           Just upload, wait a moment, and let our AI do the rest.
//         </p>
//       </div>

//       {/* Mobile Step Indicators */}
//       <div className="flex justify-center mb-6 lg:hidden">
//         <div className="flex gap-2">
//           {steps.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentStep(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 index === currentStep ? "bg-purple-600" : "bg-gray-300"
//               }`}
//               aria-label={`Go to step ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Carousel Container */}
//       <div className="relative w-full max-w-[1440px] flex justify-center items-center">
//         {/* Navigation Buttons - Desktop */}
//         <button
//           aria-label="previous step"
//           onClick={prevStep}
//           className="hidden lg:flex absolute left-4 xl:left-20 top-1/2 transform -translate-y-1/2 
//                      items-center justify-center w-16 h-16 xl:w-20 xl:h-20 
//                      rounded-full bg-purple-50 hover:bg-purple-100 transition-colors 
//                      border-none cursor-pointer z-20"
//         >
//           <Image
//             src="/assets/SVG (1).png"
//             alt="previous"
//             width={60}
//             height={60}
//             style={{ objectFit: "contain" }}
//           />
//         </button>

//         {/* Step Content Card */}
//         <div 
//           className="w-full max-w-[998px] bg-white rounded-[20px] p-8 lg:p-12 relative"
//           style={{
//             height: "519px",
//             border: "1px solid #F0D4FF", // Lighter border color
//             boxShadow: "0px 4px 16px 0px #E4D8F3", // Lighter shadow color
//           }}
//         >
//           {/* Step Badge */}
//           <div 
//             className="absolute top-6 left-6 px-4 py-2 rounded-lg"
//             style={{
//               background: "#F3E8FF",
//               color: "#5D2A8B",
//               fontFamily: "Manrope, sans-serif",
//               fontSize: "14px",
//               fontWeight: 500,
//             }}
//           >
//             Step {steps[currentStep].step}
//           </div>

//           {/* Content Layout */}
//           <div className="flex flex-col lg:flex-row items-center justify-between h-full pt-12">
//             {/* Image/Illustration */}
//             <div className="w-full lg:w-[45%] h-64 lg:h-full relative flex items-center justify-center">
//               <div className="relative w-full h-full max-h-[400px]">
//                 <Image
//                   src={steps[currentStep].image}
//                   alt={steps[currentStep].title}
//                   fill
//                   style={{ objectFit: "contain" }}
//                   sizes="(max-width: 1024px) 100vw, 45vw"
//                 />
//               </div>
//             </div>

//             {/* Text Content Container */}
//             <div 
//               className="w-full lg:w-[45%] flex flex-col justify-center"
//               style={{
//                 gap: "18px",
//               }}
//             >
//               <h3
//                 style={{
//                   background: "#1A1A1A",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   backgroundClip: "text",
//                   fontFamily: "Manrope, sans-serif",
//                   fontWeight: 500,
//                   fontSize: "28px",
//                   lineHeight: "100%",
//                   letterSpacing: "0%",
//                   textAlign: "left",
//                 }}
//               >
//                 {steps[currentStep].title}
//               </h3>
//               <p
//                 style={{
//                   fontFamily: "Manrope, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "18px",
//                   lineHeight: "140%",
//                   color: "#6E6E6E",
//                   textAlign: "left",
//                 }}
//               >
//                 {steps[currentStep].description}
//               </p>
//             </div>
//           </div>

//           {/* Decorative Icon */}
//           <div className="absolute top-6 right-6 w-10 h-10 opacity-60">
//             <Image
//               src="/Warm.png"
//               alt="decorative icon"
//               fill
//               style={{ objectFit: "contain" }}
//               sizes="40px"
//             />
//           </div>
//         </div>

//         {/* Next Button - Desktop */}
//         <button
//           aria-label="next step"
//           onClick={nextStep}
//           className="hidden lg:flex absolute right-4 xl:right-20 top-1/2 transform -translate-y-1/2 
//                      items-center justify-center w-16 h-16 xl:w-20 xl:h-20 
//                      rounded-full bg-purple-50 hover:bg-purple-100 transition-colors 
//                      border-none cursor-pointer z-20"
//         >
//           <Image
//             src="/assets/SVG.png"
//             alt="next"
//             width={60}
//             height={60}
//             style={{ objectFit: "contain" }}
//           />
//         </button>

//         {/* Mobile Navigation Buttons */}
//         <div className="flex justify-center gap-4 mt-6 lg:hidden absolute -bottom-20 left-1/2 transform -translate-x-1/2">
//           <button
//             onClick={prevStep}
//             className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 
//                        hover:bg-purple-100 transition-colors border-none cursor-pointer"
//             aria-label="Previous step"
//           >
//             <Image
//               src="/assets/SVG (1).png"
//               alt="previous"
//               width={60}
//               height={60}
//               style={{ objectFit: "contain" }}
//             />
//           </button>
//           <button
//             onClick={nextStep}
//             className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 
//                        hover:bg-purple-100 transition-colors border-none cursor-pointer"
//             aria-label="Next step"
//           >
//             <Image
//               src="/assets/SVG.png"
//               alt="next"
//               width={16}
//               height={16}
//               style={{ objectFit: "contain" }}
//             />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default memo(SimpleSteps);


"use client"
import Image from "next/image";
import { memo, useState } from "react";

const steps = [
  {
    step: 1,
    title: "Upload Your Image",
    description: "Start by uploading a clear image of yourself or an object.",
    image: "/assets/Frame 1707479275.png",
    decorativeIcon: "/Warm.png",
    decorativeIconSize: { width: 100, height: 57 },
  },
  {
    step: 2,
    title: "AI Analysis",
    // description: "Our AI analyzes the image and detects key points for measurement.",
    image: "/assets/AI-Analysis.png",
    decorativeIcon: "/assets/Depth.png",
    decorativeIconSize: { width: 70, height: 70 },
    aiContainerStyle: {
      width: "306px",
      height: "148px",
      gap: "18px",
    },
    imageStyle: {
      width: "478px",
      height: "378px",
      borderRadius: "20px",
    },
    titleStyle: {
      width: "141px",
      height: "76px",
    }
  },
  {
    step: 3,
    title: "View Measurements Instantly",
    // description: "Receive accurate measurements in seconds.",
    image: "/assets/Frame 1707479275 (2).png",
    decorativeIcon: "/assets/Magnet.png",
    decorativeIconSize: { width: 67, height: 70 },
    imageStyle: {
      width: "478px",
      height: "378px",
      borderRadius: "20px",
    },
    titleStyle: {
      width: "270px",
      height: "76px",
    }
  },
];

const SimpleSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepData = steps[currentStep];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="flex flex-col items-center bg-white py-20 px-4">
      {/* Header Container */}
      <div 
        className="text-center mb-16"
        style={{
          width: "566px",
          maxWidth: "100%",
          height: "129px",
          gap: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            width: "566px",
            maxWidth: "100%",
            height: "86px",
            background: "#1A1A1A",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "Monument Extended, sans-serif",
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Simple Steps, Smart Results
        </h2>
        <p
          style={{
            width: "566px",
            maxWidth: "100%",
            height: "27px",
            fontFamily: "Manrope",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            color: "#6E6E6E",
          }}
        >
          Just upload, wait a moment, and let our AI do the rest.
        </p>
      </div>

      {/* Mobile Step Indicators */}
      <div className="flex justify-center mb-6 lg:hidden">
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep ? "bg-purple-600" : "bg-gray-300"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-[1440px] flex justify-center items-center">
        {/* Navigation Buttons - Desktop */}
        <button
          aria-label="previous step"
          onClick={prevStep}
          className="hidden lg:flex absolute left-4 xl:left-20 top-1/2 transform -translate-y-1/2 
                     items-center justify-center w-16 h-16 xl:w-20 xl:h-20 
                     rounded-full bg-purple-50 hover:bg-purple-100 transition-colors 
                     border-none cursor-pointer z-20"
        >
          <Image
            src="/assets/SVG (1).png"
            alt="previous"
            width={60}
            height={60}
            style={{ objectFit: "contain" }}
          />
        </button>

        {/* Step Content Card */}
        <div 
          className="w-full max-w-[998px] bg-white rounded-[20px] p-8 lg:p-12 relative"
          style={{
            height: "519px",
            border: "1px solid #F0D4FF",
            boxShadow: "0px 4px 16px 0px #E4D8F3",
          }}
        >
          {/* Step Badge */}
          <div 
            className="absolute top-6 left-6 px-4 py-2 rounded-lg"
            style={{
              background: "#F3E8FF",
              color: "#5D2A8B",
              fontFamily: "Manrope, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Step {currentStepData.step}
          </div>

          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between h-full pt-12">
            {/* Image/Illustration */}
            <div 
              className="w-full lg:w-[45%] h-64 lg:h-full relative flex items-center justify-center"
              style={
                currentStepData.imageStyle ? {
                  width: "478px",
                  maxWidth: "100%",
                  height: "378px",
                } : {}
              }
            >
              <div 
                className="relative w-full h-full"
                style={
                  currentStepData.imageStyle ? {
                    width: "100%",
                    height: "100%",
                    borderRadius: currentStepData.imageStyle.borderRadius || "0px",
                  } : {
                    maxHeight: "400px",
                  }
                }
              >
                <Image
                  src={currentStepData.image}
                  alt={currentStepData.title}
                  fill
                  style={{ 
                    objectFit: "contain",
                    borderRadius: currentStepData.imageStyle?.borderRadius || "0px",
                  }}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>

            {/* Text Content Container */}
            <div 
              className="w-full lg:w-[45%] flex flex-col justify-center"
              style={{
                gap: "18px",
                ...(currentStepData.step === 2 ? {
                  width: "306px",
                  height: "148px",
                } : {}),
              }}
            >
              <h3
                style={{
                  background: "#1A1A1A",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontStyle: "Medium",
                  fontSize: "28px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "left",
                  verticalAlign: "middle",
                  opacity: 1,
                  ...(currentStepData.titleStyle ? {
                    width: currentStepData.titleStyle.width,
                    height: currentStepData.titleStyle.height,
                  } : {}),
                }}
              >
                {currentStepData.title}
              </h3>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "140%",
                  color: "#6E6E6E",
                  textAlign: "left",
                }}
              >
                {currentStepData.description}
              </p>
            </div>
          </div>

          {/* Decorative Icon - Positioned absolutely as per your coordinates */}
          <div 
            className="absolute"
            style={{
              top: "54px",
              left: "861px",
              width: currentStepData.decorativeIconSize.width,
              height: currentStepData.decorativeIconSize.height,
              opacity: 1,
              zIndex: 10,
            }}
          >
            <Image
              src={currentStepData.decorativeIcon}
              alt="decorative icon"
              fill
              style={{ objectFit: "contain" }}
              sizes={`${currentStepData.decorativeIconSize.width}px`}
            />
          </div>
        </div>

        {/* Next Button - Desktop */}
        <button
          aria-label="next step"
          onClick={nextStep}
          className="hidden lg:flex absolute right-4 xl:right-20 top-1/2 transform -translate-y-1/2 
                     items-center justify-center w-16 h-16 xl:w-20 xl:h-20 
                     rounded-full bg-purple-50 hover:bg-purple-100 transition-colors 
                     border-none cursor-pointer z-20"
        >
          <Image
            src="/assets/SVG.png"
            alt="next"
            width={60}
            height={60}
            style={{ objectFit: "contain" }}
          />
        </button>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6 lg:hidden absolute -bottom-20 left-1/2 transform -translate-x-1/2">
          <button
            onClick={prevStep}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 
                       hover:bg-purple-100 transition-colors border-none cursor-pointer"
            aria-label="Previous step"
          >
            <Image
              src="/assets/SVG (1).png"
              alt="previous"
              width={60}
              height={60}
              style={{ objectFit: "contain" }}
            />
          </button>
          <button
            onClick={nextStep}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 
                       hover:bg-purple-100 transition-colors border-none cursor-pointer"
            aria-label="Next step"
          >
            <Image
              src="/assets/SVG.png"
              alt="next"
              width={16}
              height={16}
              style={{ objectFit: "contain" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(SimpleSteps);
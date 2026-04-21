// import React , { useState} from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "../css/Virtualtryon.css"; // Custom CSS for styling
// import Header from "./Header";
// import step1 from "../assets/step1.webp";
// import step2 from "../assets/step2.webp";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import step3 from "../assets/step3.webp";



// export default function Virtualtryon() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);


//   if (loading)
//     return (
//       <div
//         className="fullscreen-loader page-title-main-name"
//         style={{
//           minHeight: "100vh",
//           width: "100%",
//         }}
//       >
//         <div className="text-center">
//           <DotLottieReact style={{ height: '80%', width: '100%' }}
//             src="https:lottie.host/73673e65-df58-41a5-87e7-b837c5d00fe8/dJVGVbJuYJ.lottie"
//             loop
//             autoplay
//           />


//           <p className="text-muted mb-0">
//             Please wait while we prepare the best products for you...
//           </p>
//         </div>
//       </div>
//     );

//   const handleNextClick = () => {
//     navigate("/Mainvirtualtryon"); // Navigate to your main virtual try-on page
//   };

//   return (
//     <>

//       <Header />
//       <div className="virtualtryon-container pt-5 mt-2">

//         {/* Hero Section */}
//         <header className="hero-section">

//         </header>

//         {/* How It Works Section */}
//         <section className="how-it-works-section">
//           <h2 className="section-title page-title-main-name">How It Works</h2>
//           <div className="steps-container">
//             <div className="step-card">
//               <img
//                 src={step1}
//                 alt="Step 1"
//                 className="step-image"
//               />
//               <h3 className="step-number page-title-main-name">Step 1</h3>
//               <p className="step-description page-title-main-name">Not Sure which shade is right for you?</p>
//             </div>
//             <div className="step-card">
//               <img
//                 src={step2}
//                 alt="Step 2"
//                 className="step-image"
//               />
//               <h3 className="step-number page-title-main-name">Step 2</h3>
//               <p className="step-description page-title-main-name">Not Sure which shade is right for you?</p>
//             </div>
//             <div className="step-card">
//               <img
//                 src={step3}
//                 alt="Step 3"
//                 className="step-image"
//               />
//               <h3 className="step-number page-title-main-name">Step 3</h3>
//               <p className="step-description page-title-main-name">Not Sure which shade is right for you?</p>
//             </div>
//           </div>
//         </section>

//         {/* Next Button */}
//         <div className="next-button-container page-title-main-name bg-black">
//           <div className="next-button-main">
//             <button className="next-button page-title-main-name" onClick={handleNextClick}>
//               Next <FaArrowRight className="next-icon" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
















import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/Virtualtryon.css"; // Custom CSS for styling
import Header from "./Header";
import step1 from "../assets/step1.webp";
import step2 from "../assets/step2.webp";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import step3 from "../assets/step3.webp";

export default function Virtualtryon() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Set loading to false after component mounts or after a timeout
  useEffect(() => {
    // Option 1: Set loading to false after a short delay (for animation visibility)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds

    // Option 2: If you want to hide loader immediately after mount
    // setLoading(false);

    return () => clearTimeout(timer);
  }, []);

  const handleNextClick = () => {
    navigate("/Mainvirtualtryon"); // Navigate to your main virtual try-on page
  };

  if (loading) {
    return (
      <div
        className="fullscreen-loader page-title-main-name"
        style={{
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div className="text-center">
          <DotLottieReact 
            style={{ height: '80%', width: '100%' }}
            src="https://lottie.host/73673e65-df58-41a5-87e7-b837c5d00fe8/dJVGVbJuYJ.lottie"
            loop
            autoplay
          />
          <p className="text-muted mb-0">
            Please wait while we prepare the best products for you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="virtualtryon-container pt-5 mt-2">
        {/* Hero Section */}
        <header className="hero-section mt-lg-5 mt-2 pt-lg-5">
        </header>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <h2 className="section-title page-title-main-name">How It Works</h2>
          <div className="steps-container">
            <div className="step-card">
              <img
                src={step1}
                alt="Step 1"
                className="step-image"
              />
              <h3 className="step-number page-title-main-name">Step 1</h3>
              <p className="step-description page-title-main-name">Not Sure which shade is right for you?</p>
            </div>
            <div className="step-card">
              <img
                src={step2}
                alt="Step 2"
                className="step-image"
              />
              <h3 className="step-number page-title-main-name">Step 2</h3>
              <p className="step-description page-title-main-name">Not Sure which shade is right for you?</p>
            </div>
            <div className="step-card">
              <img
                src={step3}
                alt="Step 3"
                className="step-image"
              />
              <h3 className="step-number page-title-main-name">Step 3</h3>
              <p className="step-description page-title-main-name">Not Sure which shade is right for you?</p>
            </div>
          </div>
        </section>

        {/* Next Button */}
        <div className="next-button-container page-title-main-name bg-black">
          <div className="next-button-main">
            <button className="next-button page-title-main-name" onClick={handleNextClick}>
              Next <FaArrowRight className="next-icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
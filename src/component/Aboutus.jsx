// import React from "react";
// import "../css/about.css";
// import dott from "../assets/Dott.png";
// import aboutus from "../assets/about-us.jpg";
// import MissionVisionSection from "./MissionVisionSection";
// import TeamSlider from "./TeamSlider";
// import Header from "./Header";
// import Footer from "./Footer";
// import AboutusHero from "./AboutusHero";

// const Aboutus = () => {
//   return (
//     <>

//     <Header />


//     <AboutusHero />







//     <section className="container width founder-section py-5 mt-5">
//       <div className="">
//         <div className="row justify-content-center">
//           <div className="col-lg-10 col-md-11 col-12 founder-box p-4 p-md-5 rounded-4">
//             <h2 className="text-center fw-bold founder-title mb-4">
//               A Note From Our Founder
//               <img src={dott} alt="Image-not-Found"  className="img-fluid dott" />

//             </h2>
//             <p className="text-center founder-text">
//               “Joyory Beauty began with a simple belief: that beauty should
//               never be about comparison—it should be about connection. We each
//               have a unique story, and within that story lives the essence of
//               who we are—our beauty, our joy, our truth.”
//             </p>
//             <p className="text-center founder-text mb-0">
//               This brand is for the bold, the soft, the radiant, the real—for
//               anyone ready to celebrate themselves as they are. My hope is that
//               when you use Joyory, you feel empowered to own your story, express
//               your joy, and embrace your beauty unapologetically.”
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>



    

//      <div className="main-title container">
        
//           <h2 className="top-categories-title fw-bold mb-3 pb-3 text-center mt-5">Our Core Values</h2>

//                 <img src={aboutus} alt="Image-Not-Found"  className="img-fluid" />

//       </div>

     
//       <MissionVisionSection />


//       <TeamSlider />

//   <Footer />

// </>


//   );
// };

// export default Aboutus;

















import React from "react";
import "../css/about.css";
import dott from "../assets/Dott.png";
import aboutus from "../assets/about-us.jpg";
import MissionVisionSection from "./MissionVisionSection";
import TeamSlider from "./TeamSlider";
import Header from "./Header";
import Footer from "./Footer";
import AboutusHero from "./AboutusHero";

const Aboutus = () => {
  return (
    <>

    <Header />


    <AboutusHero />







    {/* <section className="container width founder-section py-5 mt-5">
      <div className="">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-11 col-12 founder-box p-4 p-md-5 rounded-4">
            <h2 className="text-center fw-bold founder-title mb-4">
              A Note From Our Founder
              <img src={dott} alt="Image-not-Found"  className="img-fluid dott" />

            </h2>
            <p className="text-center founder-text">
              “Joyory Beauty began with a simple belief: that beauty should
              never be about comparison—it should be about connection. We each
              have a unique story, and within that story lives the essence of
              who we are—our beauty, our joy, our truth.”
            </p>
            <p className="text-center founder-text mb-0">
              This brand is for the bold, the soft, the radiant, the real—for
              anyone ready to celebrate themselves as they are. My hope is that
              when you use Joyory, you feel empowered to own your story, express
              your joy, and embrace your beauty unapologetically.”
            </p>
          </div>
        </div>
      </div>
    </section> */}



    

     {/* <div className="main-title container">
        
          <h2 className="top-categories-title fw-bold mb-3 pb-3 text-center mt-5">Our Core Values</h2>

                <img src={aboutus} alt="Image-Not-Found"  className="img-fluid" />

      </div> */}

     
      <MissionVisionSection />


      {/* <TeamSlider /> */}

  <Footer />

</>


  );
};

export default Aboutus;

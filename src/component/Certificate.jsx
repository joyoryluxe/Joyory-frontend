// // Certificate.jsx
// import React from 'react';
// import "../css/Certificate.css";
// import checkmark from "../assets/checkmark.svg";
// import containertruck from "../assets/container-truck.svg";
// import beautify from "../assets/beautify.svg";
// import returns from "../assets/return.svg";


// import "../App.css";

// const Certificate = () => {
//   return (
//     <div className="Virtualtryonhome-container-width Virtualtryonhome-container-width-responsive bg-white">
//       <div className="banner page-title-main-name">


//         {/* <div className="container"> */}

//         <div className="row">

//           <div className="col-lg-3 col-6 mt-lg-3 mt-4">
//             <div className="item p-0">
//               <div className="icon"><img src={checkmark} className='me-auto d-block' width={"40px"} alt="Image-Not-Found" /></div>
//               <div className="title mt-lg-3 mt-3 title-main text-start fs-6">100% Authentic</div>
//               <div className="mt-2 subtitle-Certificate text-start fs-6">All our products are directly sourced from brands</div>
//             </div>
//           </div>


//    <div className="col-lg-3 col-6 mt-lg-3 mt-4">

//           <div className="item p-0">
//             <div className="icon"><img src={containertruck} className='me-auto d-block' width={"40px"} alt="Image-Not-Found" /></div>
//             <div className="title mt-lg-3 mt-3 title-main text-start fs-6">Free Shipping</div>
//             <div className="mt-2 subtitle-Certificate text-start fs-6">On all orders above ₹299</div>
//           </div>
//    </div>

//       <div className="col-lg-3 col-6 mt-lg-3 mt-4">

//           <div className="item p-0">
//             <div className="icon"><img src={beautify} className='me-auto d-block' width={"40px"} alt="Image-Not-Found" /></div>
//             <div className="title mt-lg-3 mt-3 title-main text-start fs-6">Certified Beauty Advisors</div>
//             <div className="mt-2 subtitle-Certificate text-start fs-6">Get expert consultations</div>
//           </div>
//       </div>

//          <div className="col-lg-3 col-6 mt-lg-3 mt-4">

//           <div className="item p-0">
//             <div className="icon"><img src={returns} className='me-auto d-block' width={"40px"} alt="Image-Not-Found" /></div>
//             <div className="title mt-lg-3 mt-3 title-main text-start fs-6">Easy Returns</div>
//             <div className="mt-2 subtitle-Certificate text-start fs-6">Hassle-free pick-ups and refunds</div>
//           </div>
//          </div>

//         </div>

//         {/* </div> */}


//       </div>
//     </div>
//   );
// };

// export default Certificate;
























// Certificate.jsx
import React from 'react';
import "../css/Certificate.css";
import checkmark from "../assets/checkmark.svg";
import containertruck from "../assets/container-truck.svg";
import beautify from "../assets/beautify.svg";
import returns from "../assets/return.svg";


import "../App.css";

const Certificate = () => {
  return (
    <div className='container-fluid ms-lg-5 ms-2'>
      <div className="row">

        <div className="col-lg-3 col-6 mt-lg-3 mt-4">
          <div className="item p-0">
            <div className="icon"><img src={checkmark} className='me-auto d-block' width={"40px"} alt="Image-Not-Found" /></div>
            <div className="title mt-lg-3 mt-3 title-main text-start fs-6">100% Authentic</div>
            <div className="mt-2 subtitle-Certificate text-start fs-6">All our products are directly sourced from brands</div>
          </div>
        </div>


        <div className="col-lg-3 col-6 mt-lg-3 mt-4">

          <div className="item p-0">
            <div className="icon"><img src={containertruck} className='me-auto d-block' width={"40px"} alt="Image-Not-Found" /></div>
            <div className="title mt-lg-3 mt-3 title-main text-start fs-6">Free Shipping</div>
            <div className="mt-2 subtitle-Certificate text-start fs-6">On all orders above ₹299</div>
          </div>
        </div>

        <div className="col-lg-3 col-6 mt-lg-3 mt-4">

          <div className="item p-0">
            <div className="icon"><img src={beautify} className='me-auto d-block' width={"40px"} alt="Image-Not-Found" /></div>
            <div className="title mt-lg-3 mt-3 title-main text-start fs-6">Certified Beauty Advisors</div>
            <div className="mt-2 subtitle-Certificate text-start fs-6">Get expert consultations</div>
          </div>
        </div>

        <div className="col-lg-3 col-6 mt-lg-3 mt-4">

          <div className="item p-0">
            <div className="icon"><img src={returns} className='me-auto d-block' width={"40px"} alt="Image-Not-Found" /></div>
            <div className="title mt-lg-3 mt-3 title-main text-start fs-6">Easy Returns</div>
            <div className="mt-2 subtitle-Certificate text-start fs-6">Hassle-free pick-ups and refunds</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Certificate;
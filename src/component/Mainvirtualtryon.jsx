// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "@vladmandic/face-api";
// import axios from "axios";
// import Slider from "react-slick";
// import "../css/VirtualTryOn.css"; // Assuming you have custom styles for the component

// export default function VirtualTryOn() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);

//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [selectedShade, setSelectedShade] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [faceArea, setFaceArea] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [products, setProducts] = useState([]);

//   // Fetch product data from the API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://beauty.joyory.com/api/user/products");
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Load face-api models
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = window.location.origin + "/models";
//       try {
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//         ]);
//         setModelsLoaded(true);
//       } catch (err) {
//         console.error("Error loading models:", err);
//       }
//     };
//     loadModels();
//   }, []);

//   // Draw the shape (for lips or eyes)
//   const drawShape = (ctx, points, fillStyle) => {
//     ctx.beginPath();
//     ctx.moveTo(points[0].x, points[0].y);
//     for (let i = 1; i < points.length; i++) {
//       ctx.lineTo(points[i].x, points[i].y);
//     }
//     ctx.closePath();
//     ctx.fillStyle = fillStyle;
//     ctx.fill();
//   };

//   // Process webcam feed
//   useEffect(() => {
//     if (!modelsLoaded || uploadedImage) return;

//     const interval = setInterval(async () => {
//       if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//         const video = webcamRef.current.video;
//         const detections = await faceapi
//           .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks();

//         if (detections) {
//           const dims = { width: video.videoWidth, height: video.videoHeight };
//           const canvas = canvasRef.current;
//           faceapi.matchDimensions(canvas, dims);

//           const resized = faceapi.resizeResults(detections, dims);
//           const ctx = canvas.getContext("2d");
//           ctx.clearRect(0, 0, canvas.width, canvas.height);

//           if (faceArea && selectedShade) {
//             if (faceArea === "lips") {
//               const lips = resized.landmarks.getMouth();
//               drawShape(ctx, lips, selectedShade.hex);
//             } else if (faceArea === "eyes") {
//               drawShape(ctx, resized.landmarks.getLeftEye(), selectedShade.hex);
//               drawShape(ctx, resized.landmarks.getRightEye(), selectedShade.hex);
//             }
//           }
//         }
//       }
//     }, 200);

//     return () => clearInterval(interval);
//   }, [modelsLoaded, faceArea, selectedShade, uploadedImage]);

//   // Handle image upload
//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Slider settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="container py-4">
//       <div className="row">
//         {/* LEFT SIDE: webcam or uploaded image */}
//         <div className="col-md-6 text-center">
//           <div style={{ position: "relative", display: "inline-block" }}>
//             {!uploadedImage ? (
//               <Webcam
//                 ref={webcamRef}
//                 audio={false}
//                 screenshotFormat="image/jpeg"
//                 className="w-100 rounded shadow"
//               />
//             ) : (
//               <img
//                 ref={imageRef}
//                 src={uploadedImage}
//                 alt="Uploaded"
//                 className="w-100 rounded shadow"
//                 onLoad={() => {
//                   if (modelsLoaded) {
//                     setTimeout(() => {
//                       if (faceArea && selectedShade) {
//                         setSelectedShade({ ...selectedShade });
//                       }
//                     }, 200);
//                   }
//                 }}
//               />
//             )}
//             <canvas ref={canvasRef} className="overlay-canvas" />
//           </div>
//           <div className="mt-3">
//             <input type="file" accept="image/*" onChange={handleUpload} />
//             {uploadedImage && (
//               <button
//                 className="btn btn-sm btn-outline-danger mt-2"
//                 onClick={() => setUploadedImage(null)}
//               >
//                 Remove Photo
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDE: Product Slider & Controls */}
//         <div className="col-md-6">
//           {/* Product Slider */}
//           <div>
//             <h5>Select Product</h5>
//             <Slider {...sliderSettings}>
//               {products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="product-slider-item"
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setSelectedShade(null); // Reset selected shade when product changes
//                   }}
//                 >
//                   <img
//                     src={product.image} // Assuming `image` exists in product data
//                     alt={product.name}
//                     className="img-fluid rounded"
//                   />
//                   <h6>{product.name}</h6>
//                 </div>
//               ))}
//             </Slider>
//           </div>

//           {/* Shade selection */}
//           {selectedProduct && selectedProduct.shadeOptions && (
//             <div>
//               <h5>Select Shade</h5>
//               <div className="d-flex flex-wrap gap-2">
//                 {selectedProduct.shadeOptions.map((shade, index) => (
//                   <div
//                     key={index}
//                     className="shade-dot"
//                     style={{
//                       backgroundColor: selectedProduct.colorOptions[index],
//                       border:
//                         selectedShade === shade
//                           ? "3px solid #007bff"
//                           : "1px solid #ccc",
//                     }}
//                     onClick={() => setSelectedShade(shade)}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Select face area */}
//           {!faceArea && !selectedProduct && (
//             <div>
//               <h5>Select Face Area</h5>
//               <button
//                 className="btn btn-outline-primary m-2"
//                 onClick={() => setFaceArea("lips")}
//               >
//                 Lips
//               </button>
//               <button
//                 className="btn btn-outline-success m-2"
//                 onClick={() => setFaceArea("eyes")}
//               >
//                 Eyes
//               </button>
//             </div>
//           )}

//           {/* Reset button */}
//           <button
//             className="btn btn-secondary mt-3"
//             onClick={() => {
//               setFaceArea(null);
//               setSelectedShade(null);
//               setSelectedProduct(null);
//             }}
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




















// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "@vladmandic/face-api";
// import axios from "axios";
// import Slider from "react-slick";
// import "../css/VirtualTryOn.css"; // Assuming you have custom styles for the component

// export default function VirtualTryOn() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);

//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [selectedShade, setSelectedShade] = useState(null);  // Store selected shade
//   const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product
//   const [faceArea, setFaceArea] = useState(null); // Face area (lips or eyes)
//   const [uploadedImage, setUploadedImage] = useState(null); // For uploaded photo
//   const [products, setProducts] = useState([]); // Store product data

//   // Fetch product data from the API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://beauty.joyory.com/api/user/products");
//         console.log("Fetched Products: ", response.data.products);  // Log products to check
//         setProducts(response.data.products);  // Update the state with the products data
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Load face-api models
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = window.location.origin + "/models";
//       try {
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//         ]);
//         setModelsLoaded(true);
//       } catch (err) {
//         console.error("Error loading models:", err);
//       }
//     };
//     loadModels();
//   }, []);

//   // Draw the shape (for lips or eyes) based on selected shade
//   const drawShape = (ctx, points, fillStyle) => {
//     ctx.beginPath();
//     ctx.moveTo(points[0].x, points[0].y);
//     for (let i = 1; i < points.length; i++) {
//       ctx.lineTo(points[i].x, points[i].y);
//     }
//     ctx.closePath();
//     ctx.fillStyle = fillStyle;
//     ctx.fill();
//   };

//   // Process webcam feed to detect face landmarks
//   useEffect(() => {
//     if (!modelsLoaded || uploadedImage) return;

//     const interval = setInterval(async () => {
//       if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//         const video = webcamRef.current.video;
//         const detections = await faceapi
//           .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks();

//         if (detections) {
//           const dims = { width: video.videoWidth, height: video.videoHeight };
//           const canvas = canvasRef.current;
//           faceapi.matchDimensions(canvas, dims);

//           const resized = faceapi.resizeResults(detections, dims);
//           const ctx = canvas.getContext("2d");
//           ctx.clearRect(0, 0, canvas.width, canvas.height);

//           if (faceArea && selectedShade) {
//             if (faceArea === "lips") {
//               const lips = resized.landmarks.getMouth();
//               drawShape(ctx, lips, selectedShade);  // Apply selected shade color
//             } else if (faceArea === "eyes") {
//               drawShape(ctx, resized.landmarks.getLeftEye(), selectedShade);
//               drawShape(ctx, resized.landmarks.getRightEye(), selectedShade);
//             }
//           }
//         }
//       }
//     }, 200);

//     return () => clearInterval(interval);
//   }, [modelsLoaded, faceArea, selectedShade, uploadedImage]);

//   // Handle image upload
//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Slider settings for the product carousel
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="container py-4">
//       <div className="row">
//         {/* LEFT SIDE: webcam or uploaded image */}
//         <div className="col-md-6 text-center">
//           <div style={{ position: "relative", display: "inline-block" }}>
//             {!uploadedImage ? (
//               <Webcam
//                 ref={webcamRef}
//                 audio={false}
//                 screenshotFormat="image/jpeg"
//                 className="w-100 rounded shadow"
//               />
//             ) : (
//               <img
//                 ref={imageRef}
//                 src={uploadedImage}
//                 alt="Uploaded"
//                 className="w-100 rounded shadow"
//                 onLoad={() => {
//                   if (modelsLoaded) {
//                     setTimeout(() => {
//                       if (faceArea && selectedShade) {
//                         setSelectedShade({ ...selectedShade });
//                       }
//                     }, 200);
//                   }
//                 }}
//               />
//             )}
//             <canvas ref={canvasRef} className="overlay-canvas" />
//           </div>
//           <div className="mt-3">
//             <input type="file" accept="image/*" onChange={handleUpload} />
//             {uploadedImage && (
//               <button
//                 className="btn btn-sm btn-outline-danger mt-2"
//                 onClick={() => setUploadedImage(null)}
//               >
//                 Remove Photo
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDE: Product Slider & Controls */}
//         <div className="col-md-6">
//           {/* Product Slider */}
//           <div>
//             <h5>Select Product</h5>
//             {products.length > 0 ? (
//               <Slider {...sliderSettings}>
//                 {products.map((product) => (
//                   <div
//                     key={product._id}
//                     className="product-slider-item"
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setSelectedShade(null); // Reset selected shade when product changes
//                     }}
//                   >
//                     <img
//                       src={product.image} // Assuming `image` exists in product data
//                       alt={product.name}
//                       className="img-fluid rounded"
//                     />
//                     <h6>{product.name}</h6>
//                   </div>
//                 ))}
//               </Slider>
//             ) : (
//               <p>No products available.</p>
//             )}
//           </div>

//           {/* Shade selection */}
//           {selectedProduct && selectedProduct.shadeOptions && (
//             <div>
//               <h5>Select Shade</h5>
//               <div className="d-flex flex-wrap gap-2">
//                 {selectedProduct.shadeOptions.map((shade, index) => (
//                   <div
//                     key={index}
//                     className="shade-dot"
//                     style={{
//                       backgroundColor: selectedProduct.colorOptions[index],
//                       border:
//                         selectedShade === selectedProduct.colorOptions[index]
//                           ? "3px solid #007bff"
//                           : "1px solid #ccc",
//                     }}
//                     onClick={() => setSelectedShade(selectedProduct.colorOptions[index])} // Set the selected shade color dynamically
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Select face area */}
//           {!faceArea && !selectedProduct && (
//             <div>
//               <h5>Select Face Area</h5>
//               <button
//                 className="btn btn-outline-primary m-2"
//                 onClick={() => setFaceArea("lips")}
//               >
//                 Lips
//               </button>
//               <button
//                 className="btn btn-outline-success m-2"
//                 onClick={() => setFaceArea("eyes")}
//               >
//                 Eyes
//               </button>
//             </div>
//           )}

//           {/* Reset button */}
//           <button
//             className="btn btn-secondary mt-3"
//             onClick={() => {
//               setFaceArea(null);
//               setSelectedShade(null);
//               setSelectedProduct(null);
//             }}
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






















// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "@vladmandic/face-api";
// import axios from "axios";
// import Slider from "react-slick";
// import "../css/VirtualTryOn.css";

// export default function VirtualTryOn() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);

//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [selectedShade, setSelectedShade] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [faceArea, setFaceArea] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [products, setProducts] = useState([]);

//   // Fetch product data
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "https://beauty.joyory.com/api/user/products"
//         );
//         console.log("Fetched Products:", response.data.products);
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Load face-api models
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = window.location.origin + "/models";
//       try {
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//         ]);
//         setModelsLoaded(true);
//       } catch (err) {
//         console.error("Error loading models:", err);
//       }
//     };
//     loadModels();
//   }, []);

//   // Draw shade (lips/eyes)
//   const drawShape = (ctx, points, fillStyle) => {
//     ctx.beginPath();
//     ctx.moveTo(points[0].x, points[0].y);
//     for (let i = 1; i < points.length; i++) {
//       ctx.lineTo(points[i].x, points[i].y);
//     }
//     ctx.closePath();
//     ctx.fillStyle = fillStyle;
//     ctx.globalAlpha = 0.6; // Slight transparency for natural look
//     ctx.fill();
//     ctx.globalAlpha = 1.0;
//   };

//   // Detect face and apply shade
//   useEffect(() => {
//     if (!modelsLoaded || uploadedImage) return;

//     const interval = setInterval(async () => {
//       if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//         const video = webcamRef.current.video;
//         const detections = await faceapi
//           .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks();

//         if (detections) {
//           const dims = { width: video.videoWidth, height: video.videoHeight };
//           const canvas = canvasRef.current;
//           faceapi.matchDimensions(canvas, dims);

//           const resized = faceapi.resizeResults(detections, dims);
//           const ctx = canvas.getContext("2d");
//           ctx.clearRect(0, 0, canvas.width, canvas.height);

//           if (faceArea && selectedShade) {
//             if (faceArea === "lips") {
//               drawShape(ctx, resized.landmarks.getMouth(), selectedShade);
//             } else if (faceArea === "eyes") {
//               drawShape(ctx, resized.landmarks.getLeftEye(), selectedShade);
//               drawShape(ctx, resized.landmarks.getRightEye(), selectedShade);
//             }
//           }
//         }
//       }
//     }, 200);

//     return () => clearInterval(interval);
//   }, [modelsLoaded, faceArea, selectedShade, uploadedImage]);

//   // Handle image upload
//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setUploadedImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // Slider configuration
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 992, settings: { slidesToShow: 2 } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <div className="virtual-tryon container py-4">
//       <div className="row align-items-start g-4">
//         {/* LEFT SIDE: Webcam or Uploaded Image */}
//         <div className="col-12 col-md-6 text-center">
//           <div className="tryon-camera-wrapper position-relative mx-auto">
//             {!uploadedImage ? (
//               <Webcam
//                 ref={webcamRef}
//                 audio={false}
//                 screenshotFormat="image/jpeg"
//                 className="tryon-video rounded shadow w-100"
//               />
//             ) : (
//               <img
//                 ref={imageRef}
//                 src={uploadedImage}
//                 alt="Uploaded Face"
//                 className="tryon-uploaded rounded shadow w-100"
//               />
//             )}
//             <canvas ref={canvasRef} className="overlay-canvas" />
//           </div>

//           <div className="mt-3">
//             <input
//               type="file"
//               accept="image/*"
//               className="form-control"
//               onChange={handleUpload}
//             />
//             {uploadedImage && (
//               <button
//                 className="btn btn-outline-danger btn-sm mt-2"
//                 onClick={() => setUploadedImage(null)}
//               >
//                 Remove Photo
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDE: Controls */}
//         <div className="col-12 col-md-6">
//           {/* Product Slider */}
//           <h5 className="fw-bold mb-3 text-center text-md-start">
//             Select Product
//           </h5>
//           {products.length > 0 ? (
//             <Slider {...sliderSettings}>
//               {products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="product-slider-item text-center"
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setSelectedShade(null);
//                   }}
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="img-fluid rounded mb-2"
//                   />
//                   <p className="small fw-semibold">{product.name}</p>
//                 </div>
//               ))}
//             </Slider>
//           ) : (
//             <p className="text-muted">No products available.</p>
//           )}

//           {/* Shade Selection */}
//           {selectedProduct?.shadeOptions && (
//             <div className="mt-4">
//               <h6 className="fw-semibold mb-2">Select Shade</h6>
//               <div className="d-flex flex-wrap gap-2">
//                 {selectedProduct.shadeOptions.map((shade, i) => (
//                   <div
//                     key={i}
//                     className="shade-dot"
//                     style={{
//                       backgroundColor: selectedProduct.colorOptions[i],
//                       border:
//                         selectedShade === selectedProduct.colorOptions[i]
//                           ? "3px solid #007bff"
//                           : "1px solid #ccc",
//                     }}
//                     onClick={() =>
//                       setSelectedShade(selectedProduct.colorOptions[i])
//                     }
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Face Area Buttons */}
//           {!faceArea && (
//             <div className="mt-4 text-center text-md-start">
//               <h6 className="fw-semibold mb-2">Select Face Area</h6>
//               <button
//                 className="btn btn-outline-primary m-1"
//                 onClick={() => setFaceArea("lips")}
//               >
//                 Lips
//               </button>
//               <button
//                 className="btn btn-outline-success m-1"
//                 onClick={() => setFaceArea("eyes")}
//               >
//                 Eyes
//               </button>
//             </div>
//           )}

//           {/* Reset */}
//           <div className="mt-4 text-center text-md-start">
//             <button
//               className="btn btn-secondary"
//               onClick={() => {
//                 setFaceArea(null);
//                 setSelectedShade(null);
//                 setSelectedProduct(null);
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






















/* --------------  VirtualTryOn.jsx  -------------- */
// import React, { useRef, useState, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "@vladmandic/face-api";
// import axios from "axios";
// import Slider from "react-slick";
// import "../css/VirtualTryOn.css";

// /* ----------  tiny Nykaa-like UI helpers  ---------- */
// const IconCamera = () => (
//   <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
//     <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.345a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
//     <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
//   </svg>
// );

// const IconFlip = () => (
//   <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
//     <path d="M7.5 3.5A1.5 1.5 0 0 0 6 5v6a1.5 1.5 0 0 0 3 0V5A1.5 1.5 0 0 0 7.5 3.5z" />
//     <path d="M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2h-1.5v.5l.82.82a1 1 0 0 1-1.41 1.41L10 7.71V11a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zM2 11a1 1 0 0 1-1 1h4a1 1 0 0 1 0-2H3.5v-.5l-.82-.82A1 1 0 0 1 4.1 6.27L6 8.17V5a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1z" />
//   </svg>
// );

// export default function VirtualTryOn() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const downloadAnchor = useRef(null);

//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedProd, setSelectedProd] = useState(null);
//   const [selectedShade, setSelectedShade] = useState(null);
//   const [faceArea, setFaceArea] = useState(null); // 'lips' | 'eyes'
//   const [uploaded, setUploaded] = useState(null); // data-url
//   const [mirrored, setMirrored] = useState(false);
//   const [capturing, setCapturing] = useState(false);

//   /* ------------------  DATA  ------------------ */
//   useEffect(() => {
//     axios
//       .get("https://beauty.joyory.com/api/user/products")
//       .then((res) => setProducts(res.data.products || []))
//       .catch((err) => console.error("products fetch", err));
//   }, []);

//   useEffect(() => {
//     const MODEL_URL = window.location.origin + "/models";
//     Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//     ])
//       .then(() => setModelsLoaded(true))
//       .catch((err) => console.error("face-api load", err));
//   }, []);

//   /* --------------  DRAW HELPERS  -------------- */
//   const drawShape = (ctx, pts, fill) => {
//     ctx.beginPath();
//     ctx.moveTo(pts[0].x, pts[0].y);
//     for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
//     ctx.closePath();
//     ctx.fillStyle = fill;
//     ctx.globalAlpha = 0.65;
//     ctx.fill();
//     ctx.globalAlpha = 1;
//   };

//   /* --------------  FACE LOOP  -------------- */
//   useEffect(() => {
//     if (!modelsLoaded) return;
//     const id = setInterval(async () => {
//       const src = uploaded ? imageRef.current : webcamRef.current?.video;
//       if (!src || src.readyState !== 4) return;

//       const detect = await faceapi
//         .detectSingleFace(src, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks();
//       if (!detect) return;

//       const dims = { width: src.videoWidth || src.naturalWidth, height: src.videoHeight || src.naturalHeight };
//       const canvas = canvasRef.current;
//       faceapi.matchDimensions(canvas, dims);
//       const resized = faceapi.resizeResults(detect, dims);
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       if (!selectedShade || !faceArea) return;
//       if (faceArea === "lips") drawShape(ctx, resized.landmarks.getMouth(), selectedShade);
//       if (faceArea === "eyes") {
//         drawShape(ctx, resized.landmarks.getLeftEye(), selectedShade);
//         drawShape(ctx, resized.landmarks.getRightEye(), selectedShade);
//       }
//     }, 100);
//     return () => clearInterval(id);
//   }, [modelsLoaded, selectedShade, faceArea, uploaded]);

//   /* --------------  SCREENSHOT  -------------- */
//   const capture = useCallback(() => {
//     const canvas = document.createElement("canvas");
//     const vid = uploaded ? imageRef.current : webcamRef.current.video;
//     canvas.width = vid.videoWidth || vid.naturalWidth;
//     canvas.height = vid.videoHeight || vid.naturalHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.save();
//     if (!uploaded && mirrored) {
//       ctx.scale(-1, 1);
//       ctx.drawImage(vid, -canvas.width, 0, canvas.width, canvas.height);
//     } else ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
//     ctx.restore();
//     // overlay
//     const overlay = canvasRef.current;
//     if (overlay) ctx.drawImage(overlay, 0, 0);
//     const data = canvas.toDataURL("image/jpeg");
//     downloadAnchor.current.href = data;
//     downloadAnchor.current.download = "joyory-tryon.jpg";
//     downloadAnchor.current.click();
//   }, [mirrored, uploaded]);

//   /* --------------  UI  -------------- */
//   const sliderSets = {
//     dots: false,
//     infinite: false,
//     speed: 300,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }],
//   };

//   return (
//     <div className="virtual-tryon-wrapper">
//       <div className="container py-4">
//         <div className="row gx-4 gy-4">
//           {/* -----  CAMERA / IMAGE  ----- */}
//           <div className="col-lg-6">
//             <div className="camera-card">
//               <div className="camera-box position-relative">
//                 {!uploaded ? (
//                   <Webcam
//                     ref={webcamRef}
//                     audio={false}
//                     mirrored={mirrored}
//                     screenshotFormat="image/jpeg"
//                     className="camera-feed"
//                   />
//                 ) : (
//                   <img ref={imageRef} src={uploaded} alt="uploaded" className="camera-feed" />
//                 )}
//                 <canvas ref={canvasRef} className="overlay-canvas" />
//               </div>

//               <div className="camera-toolbar">
//                 <label className="btn-upload">
//                   <input type="file" accept="image/*" onChange={(e) => setUploaded(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} hidden />
//                   Upload Photo
//                 </label>
//                 <button className="btn-icon" onClick={() => setMirrored((m) => !m)} title="Mirror">
//                   <IconFlip />
//                 </button>
//                 <button className="btn-icon" onClick={capture} title="Capture">
//                   <IconCamera />
//                 </button>
//                 {uploaded && (
//                   <button className="btn-retake" onClick={() => setUploaded(null)}>
//                     Retake
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* -----  CONTROLS  ----- */}
//           <div className="col-lg-6 controls-column">
//             <h5 className="block-title">Choose Product</h5>
//             {products.length ? (
//               <Slider {...sliderSets}>
//                 {products.map((p) => (
//                   <div key={p._id} className="product-card" onClick={() => setSelectedProd(p)}>
//                     <img src={p.images?.[0]} alt={p.name} />
//                     <p className="small mb-0">{p.name}</p>
//                   </div>
//                 ))}
//               </Slider>
//             ) : (
//               <p className="text-muted small">No products found</p>
//             )}

//             {selectedProd?.shadeOptions?.length ? (
//               <>
//                 <h6 className="block-title mt-4">Pick Shade</h6>
//                 <div className="shade-palette">
//                   {selectedProd.shadeOptions.map((shade, i) => (
//                     <button
//                       key={i}
//                       className={`shade-swatch ${selectedShade === selectedProd.colorOptions[i] ? "active" : ""}`}
//                       style={{ backgroundColor: selectedProd.colorOptions[i] }}
//                       onClick={() => setSelectedShade(selectedProd.colorOptions[i])}
//                       title={shade}
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : null}

//             {!faceArea ? (
//               <>
//                 <h6 className="block-title mt-4">Try on</h6>
//                 <div className="area-selector">
//                   <button className="btn-area" onClick={() => setFaceArea("lips")}>
//                     Lips
//                   </button>
//                   <button className="btn-area" onClick={() => setFaceArea("eyes")}>
//                     Eyes
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="mt-3">
//                 <button className="btn-reset" onClick={() => setFaceArea(null)}>
//                   Change area
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <a ref={downloadAnchor} style={{ display: "none" }} />
//     </div>
//   );
// }
























// /* --------------  VirtualTryOn.jsx  -------------- */
// import React, { useRef, useState, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "@vladmandic/face-api";
// import axios from "axios";
// import Slider from "react-slick";
// import "../css/VirtualTryOn.css";

// /* ----------  tiny Nykaa-like UI helpers  ---------- */
// const IconCamera = () => (
//   <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
//     <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.345a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
//     <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
//   </svg>
// );

// const IconFlip = () => (
//   <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
//     <path d="M7.5 3.5A1.5 1.5 0 0 0 6 5v6a1.5 1.5 0 0 0 3 0V5A1.5 1.5 0 0 0 7.5 3.5z" />
//     <path d="M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2h-1.5v.5l.82.82a1 1 0 0 1-1.41 1.41L10 7.71V11a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zM2 11a1 1 0 0 1-1 1h4a1 1 0 0 1 0-2H3.5v-.5l-.82-.82A1 1 0 0 1 4.1 6.27L6 8.17V5a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1z" />
//   </svg>
// );

// /* --------------  MAIN COMPONENT  -------------- */
// export default function VirtualTryOn() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const downloadAnchor = useRef(null);

//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [categories, setCategories] = useState([]);        // NEW
//   const [activeCat, setActiveCat] = useState("");          // NEW
//   const [products, setProducts] = useState([]);            // now per category
//   const [selectedProd, setSelectedProd] = useState(null);
//   const [selectedShade, setSelectedShade] = useState(null);
//   const [faceArea, setFaceArea] = useState(null);
//   const [uploaded, setUploaded] = useState(null);
//   const [mirrored, setMirrored] = useState(false);

//   /* ----------  FETCH TOP-CATEGORIES  ---------- */
//   useEffect(() => {
//     axios
//       // .get("https://beauty.joyory.com/api/user/products/top-categories")
//       .get("https://beauty.joyory.com/api/user/products/top-categories")
//       .then((res) => setCategories(res.data?.categories || []))
//       .catch((err) => console.error("top-categories fetch", err));
//   }, []);

//   /* ----------  AUTO-SELECT FIRST CATEGORY  ---------- */
//   useEffect(() => {
//     if (categories.length && !activeCat) setActiveCat(categories[0].slug);
//   }, [categories, activeCat]);

//   /* ----------  FETCH PRODUCTS OF ACTIVE CATEGORY  ---------- */
//   useEffect(() => {
//     if (!activeCat) return;
//     axios
//       // .get(`https://beauty.joyory.com/api/user/products/category/${activeCat}`)
//       .get(`https://beauty.joyory.com/api/user/products/category/${activeCat}`)
//       .then((res) => setProducts(res.data?.products || []))
//       .catch((err) => console.error("category products fetch", err));
//   }, [activeCat]);

//   /* ----------  LOAD FACE-API MODELS  ---------- */
//   useEffect(() => {
//     const MODEL_URL = window.location.origin + "/models";
//     Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//     ])
//       .then(() => setModelsLoaded(true))
//       .catch((err) => console.error("face-api load", err));
//   }, []);

//   /* ----------  DRAWING HELPERS  ---------- */
//   const drawShape = (ctx, pts, fill) => {
//     ctx.beginPath();
//     ctx.moveTo(pts[0].x, pts[0].y);
//     for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
//     ctx.closePath();
//     ctx.fillStyle = fill;
//     ctx.globalAlpha = 0.65;
//     ctx.fill();
//     ctx.globalAlpha = 1;
//   };

//   /* ----------  FACE DETECTION LOOP  ---------- */
//   useEffect(() => {
//     if (!modelsLoaded) return;
//     const id = setInterval(async () => {
//       const src = uploaded ? imageRef.current : webcamRef.current?.video;
//       if (!src || src.readyState !== 4) return;

//       const detect = await faceapi
//         .detectSingleFace(src, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks();
//       if (!detect) return;

//       const dims = {
//         width: src.videoWidth || src.naturalWidth,
//         height: src.videoHeight || src.naturalHeight,
//       };
//       const canvas = canvasRef.current;
//       faceapi.matchDimensions(canvas, dims);
//       const resized = faceapi.resizeResults(detect, dims);
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (selectedShade && faceArea) {
//         if (faceArea === "lips") drawShape(ctx, resized.landmarks.getMouth(), selectedShade);
//         if (faceArea === "eyes") {
//           drawShape(ctx, resized.landmarks.getLeftEye(), selectedShade);
//           drawShape(ctx, resized.landmarks.getRightEye(), selectedShade);
//         }
//       }
//     }, 100);
//     return () => clearInterval(id);
//   }, [modelsLoaded, selectedShade, faceArea, uploaded]);

//   /* ----------  CAPTURE SCREENSHOT  ---------- */
//   const capture = useCallback(() => {
//     const canvas = document.createElement("canvas");
//     const vid = uploaded ? imageRef.current : webcamRef.current.video;
//     canvas.width = vid.videoWidth || vid.naturalWidth;
//     canvas.height = vid.videoHeight || vid.naturalHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.save();
//     if (!uploaded && mirrored) {
//       ctx.scale(-1, 1);
//       ctx.drawImage(vid, -canvas.width, 0, canvas.width, canvas.height);
//     } else ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
//     ctx.restore();
//     const overlay = canvasRef.current;
//     if (overlay) ctx.drawImage(overlay, 0, 0);
//     const data = canvas.toDataURL("image/jpeg");
//     downloadAnchor.current.href = data;
//     downloadAnchor.current.download = "joyory-tryon.jpg";
//     downloadAnchor.current.click();
//   }, [mirrored, uploaded]);

//   /* ----------  SLIDER SETTINGS  ---------- */
//   const sliderSets = {
//     dots: false,
//     infinite: false,
//     speed: 300,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }],
//   };

//   /* ----------  CATEGORY PILL BAR  ---------- */
//   const CategoryPills = () => (
//     <div className="category-pills">
//       {categories.map((cat) => (
//         <button
//           key={cat._id}
//           className={`pill ${activeCat === cat.slug ? "active" : ""}`}
//           onClick={() => setActiveCat(cat.slug)}
//         >
//           {cat.name}
//         </button>
//       ))}
//     </div>
//   );

//   /* ----------  RENDER  ---------- */
//   return (
//     <div className="virtual-tryon-wrapper">
//       <div className="container py-4">
//         <div className="row gx-4 gy-4">
//           {/* -----  CAMERA / IMAGE  ----- */}
//           <div className="col-lg-6">
//             <div className="camera-card">
//               <div className="camera-box position-relative">
//                 {!uploaded ? (
//                   <Webcam
//                     ref={webcamRef}
//                     audio={false}
//                     mirrored={mirrored}
//                     screenshotFormat="image/jpeg"
//                     className="camera-feed"
//                   />
//                 ) : (
//                   <img ref={imageRef} src={uploaded} alt="uploaded" className="camera-feed" />
//                 )}
//                 <canvas ref={canvasRef} className="overlay-canvas" />
//               </div>

//               <div className="camera-toolbar">
//                 <label className="btn-upload">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setUploaded(
//                         e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null
//                       )
//                     }
//                     hidden
//                   />
//                   Upload Photo
//                 </label>
//                 <button className="btn-icon" onClick={() => setMirrored((m) => !m)} title="Mirror">
//                   <IconFlip />
//                 </button>
//                 <button className="btn-icon" onClick={capture} title="Capture">
//                   <IconCamera />
//                 </button>
//                 {uploaded && (
//                   <button className="btn-retake" onClick={() => setUploaded(null)}>
//                     Retake
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* -----  CONTROLS  ----- */}
//           <div className="col-lg-6 controls-column">
//             {/* 1. categories */}
//             <h5 className="block-title">Categories</h5>
//             <CategoryPills />

//             {/* 2. products slider */}
//             <h6 className="block-title mt-4">Choose Product</h6>
//             {products.length ? (
//               <Slider {...sliderSets}>
//                 {products.map((p) => (
//                   <div
//                     key={p._id}
//                     className="product-card"
//                     onClick={() => setSelectedProd(p)}
//                   >
//                     <img src={p.images?.[0]} alt={p.name} />
//                     <p className="small mb-0">{p.name}</p>
//                   </div>
//                 ))}
//               </Slider>
//             ) : (
//               <p className="text-muted small">No products in this category</p>
//             )}

//             {/* 3. shades */}
//             {selectedProd?.shadeOptions?.length ? (
//               <>
//                 <h6 className="block-title mt-4">Pick Shade</h6>
//                 <div className="shade-palette">
//                   {selectedProd.shadeOptions.map((shade, i) => (
//                     <button
//                       key={i}
//                       className={`shade-swatch ${selectedShade === selectedProd.colorOptions[i] ? "active" : ""}`}
//                       style={{ backgroundColor: selectedProd.colorOptions[i] }}
//                       onClick={() => setSelectedShade(selectedProd.colorOptions[i])}
//                       title={shade}
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : null}

//             {/* 4. face area */}
//             {!faceArea ? (
//               <>
//                 <h6 className="block-title mt-4">Try on</h6>
//                 <div className="area-selector">
//                   <button className="btn-area" onClick={() => setFaceArea("lips")}>
//                     Lips
//                   </button>
//                   <button className="btn-area" onClick={() => setFaceArea("eyes")}>
//                     Eyes
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="mt-3">
//                 <button className="btn-reset" onClick={() => setFaceArea(null)}>
//                   Change area
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <a ref={downloadAnchor} style={{ display: "none" }} />
//     </div>
//   );
// }































































// import React, { useRef, useState, useEffect, useCallback } from "react";
// import { useSearchParams } from 'react-router-dom';
// import Webcam from "react-webcam";
// import * as faceapi from "@vladmandic/face-api";
// import axios from "axios";
// import Slider from "react-slick";
// import "../css/Mainvirtualtryon.css";

// // ... (keep your existing icons)

// export default function Mainvirtualtryon() {
//   const [searchParams] = useSearchParams();
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const downloadAnchor = useRef(null);

//   // 🔥 NEW STATES FOR API DATA
//   const [vtoProducts, setVtoProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [selectedProd, setSelectedProd] = useState(null);
//   const [selectedShade, setSelectedShade] = useState(null);
//   const [faceArea, setFaceArea] = useState(null);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [uploaded, setUploaded] = useState(null);
//   const [mirrored, setMirrored] = useState(false);

//   // 🔥 LOAD PRODUCTS FROM URL PARAMS OR API
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         // 🔥 FIRST CHECK URL PARAMS (from banner click)
//         const productsParam = searchParams.get('products');
//         if (productsParam) {
//           console.log('🔥 Loading products from URL params');
//           const parsedProducts = JSON.parse(decodeURIComponent(productsParam));
//           setVtoProducts(parsedProducts);
//           if (parsedProducts.length > 0) {
//             setSelectedProd(parsedProducts[0]); // Auto-select first
//           }
//         } else {
//           // 🔥 FALLBACK: CALL API DIRECTLY
//           console.log('🔥 Loading products from API');
//           const response = await axios.get('https://beauty.joyory.com/api/vto/enabled');
//           setVtoProducts(response.data.products);
//           if (response.data.products.length > 0) {
//             setSelectedProd(response.data.products[0]);
//           }
//         }
//       } catch (error) {
//         console.error('❌ Products load error:', error);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };

//     loadProducts();
//   }, [searchParams]);

//   // 🔥 LOAD FACE-API MODELS (keep your existing code)
//   useEffect(() => {
//     const MODEL_URL = window.location.origin + "/models";
//     Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//     ])
//       .then(() => setModelsLoaded(true))
//       .catch((err) => console.error("face-api load", err));
//   }, []);

//   // 🔥 YOUR EXISTING DRAWING & DETECTION CODE (keep as is)
//   const drawShape = (ctx, pts, fill) => {
//     ctx.beginPath();
//     ctx.moveTo(pts[0].x, pts[0].y);
//     for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
//     ctx.closePath();
//     ctx.fillStyle = fill;
//     ctx.globalAlpha = 0.65;
//     ctx.fill();
//     ctx.globalAlpha = 1;
//   };

//   useEffect(() => {
//     if (!modelsLoaded) return;
//     const id = setInterval(async () => {
//       const src = uploaded ? imageRef.current : webcamRef.current?.video;
//       if (!src || src.readyState !== 4) return;
//       const detect = await faceapi
//         .detectSingleFace(src, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks();
//       if (!detect) return;
//       const dims = {
//         width: src.videoWidth || src.naturalWidth,
//         height: src.videoHeight || src.naturalHeight,
//       };
//       const canvas = canvasRef.current;
//       faceapi.matchDimensions(canvas, dims);
//       const resized = faceapi.resizeResults(detect, dims);
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       if (selectedShade && faceArea) {
//         if (faceArea === "lips") drawShape(ctx, resized.landmarks.getMouth(), selectedShade.hex);
//         if (faceArea === "eyes") {
//           drawShape(ctx, resized.landmarks.getLeftEye(), selectedShade.hex);
//           drawShape(ctx, resized.landmarks.getRightEye(), selectedShade.hex);
//         }
//       }
//     }, 100);
//     return () => clearInterval(id);
//   }, [modelsLoaded, selectedShade, faceArea, uploaded]);

//   // 🔥 CAPTURE (keep your existing)
//   const capture = useCallback(() => {
//     const canvas = document.createElement("canvas");
//     const vid = uploaded ? imageRef.current : webcamRef.current.video;
//     canvas.width = vid.videoWidth || vid.naturalWidth;
//     canvas.height = vid.videoHeight || vid.naturalHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.save();
//     if (!uploaded && mirrored) {
//       ctx.scale(-1, 1);
//       ctx.drawImage(vid, -canvas.width, 0, canvas.width, canvas.height);
//     } else ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
//     ctx.restore();
//     const overlay = canvasRef.current;
//     if (overlay) ctx.drawImage(overlay, 0, 0);
//     const data = canvas.toDataURL("image/jpeg");
//     downloadAnchor.current.href = data;
//     downloadAnchor.current.download = `joyory-tryon-${selectedProd?.name || 'makeup'}.jpg`;
//     downloadAnchor.current.click();
//   }, [mirrored, uploaded, selectedProd]);

//   // 🔥 SLIDER SETTINGS
//   const sliderSets = {
//     dots: false,
//     infinite: false,
//     speed: 300,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1200, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } }
//     ],
//   };

//   // 🔥 RENDER PRODUCTS SLIDER
//   const ProductsSlider = () => (
//     <Slider {...sliderSets}>
//       {vtoProducts.map((product) => (
//         <div
//           key={product._id}
//           className={`product-card ${selectedProd?._id === product._id ? 'active' : ''}`}
//           onClick={() => {
//             setSelectedProd(product);
//             setSelectedShade(null); // Reset shade
//           }}
//         >
//           <div className="product-image-wrapper">
//             <img 
//               src={product.images?.[0] || product.selectedVariant?.images?.[0]} 
//               alt={product.name} 
//               className="product-image"
//             />
//             {product.brand && (
//               <div className="brand-badge">
//                 {product.brand.name}
//               </div>
//             )}
//           </div>
//           <div className="product-info">
//             <h6 className="product-name">{product.name}</h6>
//             <div className="product-price">
//               <span className="current-price">₹{product.selectedVariant?.discountedPrice || product.price}</span>
//               {product.selectedVariant?.discountPercent > 0 && (
//                 <span className="original-price">₹{product.selectedVariant?.originalPrice}</span>
//               )}
//               {product.selectedVariant?.discountPercent > 0 && (
//                 <span className="discount-badge">{product.selectedVariant?.discountPercent}% OFF</span>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );

//   // 🔥 RENDER SHADES
//   const ShadesPalette = () => {
//     if (!selectedProd?.variants?.length) return null;

//     return (
//       <div className="shade-palette mt-4">
//         {selectedProd.variants.map((variant, index) => (
//           <button
//             key={variant.sku}
//             className={`shade-swatch ${selectedShade?.sku === variant.sku ? 'active' : ''}`}
//             style={{ 
//               backgroundColor: variant.hex,
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               border: '3px solid white',
//               boxShadow: selectedShade?.sku === variant.sku ? '0 0 0 3px #007bff' : 'none'
//             }}
//             onClick={() => setSelectedShade(variant)}
//             title={`${variant.shadeName} - ₹${variant.discountedPrice}`}
//           >
//             {selectedShade?.sku === variant.sku && (
//               <span className="shade-check">✓</span>
//             )}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   if (loadingProducts) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-4" style={{ width: '3rem', height: '3rem' }} />
//           <h4>Loading Virtual Try On...</h4>
//           <p className="text-muted">Fetching makeup products</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="virtual-tryon-wrapper">
//       <div className="container-fluid py-4">
//         {/* 🔥 HEADER */}
//         <div className="row mb-4">
//           <div className="col-12 text-center">
//             <h1 className="display-5 fw-bold text-primary mb-2">
//               <i className="bi bi-magic"></i> Virtual Try On
//             </h1>
//             <p className="lead text-muted mb-0">
//               Try {vtoProducts.length} makeup products instantly with AR
//             </p>
//           </div>
//         </div>

//         <div className="row g-4">
//           {/* ----- CAMERA ----- */}
//           <div className="col-lg-7">
//             <div className="camera-card shadow-lg">
//               <div className="camera-box position-relative">
//                 {!uploaded ? (
//                   <Webcam
//                     ref={webcamRef}
//                     audio={false}
//                     mirrored={mirrored}
//                     screenshotFormat="image/jpeg"
//                     className="camera-feed"
//                   />
//                 ) : (
//                   <img ref={imageRef} src={uploaded} alt="uploaded" className="camera-feed" />
//                 )}
//                 <canvas ref={canvasRef} className="overlay-canvas" />
//               </div>

//               {/* 🔥 TRY ON STATUS */}
//               {selectedShade && faceArea && (
//                 <div className="tryon-status position-absolute top-20px end-20px bg-primary bg-opacity-90 text-white rounded-pill px-3 py-2">
//                   <i className="bi bi-check-circle-fill me-2"></i>
//                   Trying {selectedShade.shadeName} on {faceArea}
//                 </div>
//               )}

//               <div className="camera-toolbar mt-3">
//                 <label className="btn btn-outline-primary me-2">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setUploaded(
//                         e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null
//                       )
//                     }
//                     hidden
//                   />
//                   📸 Upload Photo
//                 </label>
//                 <button 
//                   className="btn btn-outline-secondary btn-sm me-2" 
//                   onClick={() => setMirrored((m) => !m)}
//                 >
//                   <i className="bi bi-arrow-repeat"></i>
//                 </button>
//                 <button 
//                   className="btn btn-success" 
//                   onClick={capture} 
//                   disabled={!selectedShade || !faceArea}
//                 >
//                   <i className="bi bi-download"></i> Download Look
//                 </button>
//                 {uploaded && (
//                   <button className="btn btn-outline-danger ms-2" onClick={() => setUploaded(null)}>
//                     <i className="bi bi-camera-video"></i> Live Camera
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ----- PRODUCTS & CONTROLS ----- */}
//           <div className="col-lg-5">
//             <div className="controls-card shadow-lg p-4 h-100">
//               {/* 🔥 PRODUCTS */}
//               <div className="mb-4">
//                 <h5 className="block-title mb-3">
//                   <i className="bi bi-bag-heart text-primary me-2"></i>
//                   Makeup Products ({vtoProducts.length})
//                 </h5>
//                 {vtoProducts.length ? (
//                   <ProductsSlider />
//                 ) : (
//                   <div className="text-center py-4">
//                     <i className="bi bi-heartbreak fs-1 text-muted mb-3"></i>
//                     <p className="text-muted">No VTO products available</p>
//                   </div>
//                 )}
//               </div>

//               {/* 🔥 SHADES */}
//               {selectedProd && <ShadesPalette />}

//               {/* 🔥 FACE AREA */}
//               {!faceArea ? (
//                 <div className="mt-4">
//                   <h6 className="block-title mb-3">
//                     <i className="bi bi-target me-2"></i>Try on Area
//                   </h6>
//                   <div className="d-flex gap-2">
//                     <button 
//                       className="btn btn-outline-danger btn-lg flex-fill" 
//                       onClick={() => setFaceArea("lips")}
//                       disabled={!selectedShade}
//                     >
//                       <i className="bi bi-lipstick"></i><br/>Lips
//                     </button>
//                     <button 
//                       className="btn btn-outline-primary btn-lg flex-fill" 
//                       onClick={() => setFaceArea("eyes")}
//                       disabled={!selectedShade}
//                     >
//                       <i className="bi bi-eye"></i><br/>Eyes
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="mt-4 text-center">
//                   <div className="alert alert-success">
//                     <i className="bi bi-check-circle"></i>
//                     Ready to try {selectedShade?.shadeName} on {faceArea}!
//                   </div>
//                   <button 
//                     className="btn btn-outline-secondary w-100" 
//                     onClick={() => { 
//                       setFaceArea(null); 
//                       setSelectedShade(null); 
//                     }}
//                   >
//                     <i className="bi bi-arrow-repeat"></i> Change Selection
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <a ref={downloadAnchor} style={{ display: "none" }} />
//     </div>
//   );
// }












import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';
import Webcam from "react-webcam";
import * as faceapi from "@vladmandic/face-api";
import axios from "axios";
import Slider from "react-slick";
import "../css/Mainvirtualtryon.css";

export default function Mainvirtualtryon() {
  const [searchParams] = useSearchParams();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const downloadAnchor = useRef(null);

  const [vtoProducts, setVtoProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProd, setSelectedProd] = useState(null);
  const [selectedShade, setSelectedShade] = useState(null);
  const [faceArea, setFaceArea] = useState(null); // "lips" or "eyes" — only this area gets shade
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const [mirrored, setMirrored] = useState(false);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsParam = searchParams.get('products');
        let products = [];

        if (productsParam) {
          products = JSON.parse(decodeURIComponent(productsParam));
        } else {
          // const response = await axios.get('https://beauty.joyory.com/api/vto/enabled');
          const response = await axios.get('https://beauty.joyory.com/api/user/products/all?supportsVTO=true');
          products = response.data.products || [];
        }

        setVtoProducts(products);
        setFilteredProducts(products);

        if (products.length > 0) {
          setSelectedProd(products[0]);
        }
      } catch (error) {
        console.error('Products load error:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, [searchParams]);

  // Filter products when faceArea changes (Lips/Eyes/All via reset)
  useEffect(() => {
    let filtered = [...vtoProducts];

    if (faceArea === "lips") {
      filtered = filtered.filter(p =>
        p.category?.name?.toLowerCase() === "lips" ||
        p.name?.toLowerCase().includes("lip") ||
        p.name?.toLowerCase().includes("mousse")
      );
    } else if (faceArea === "eyes") {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes("kajal") ||
        p.name?.toLowerCase().includes("eye")
      );
    }
    // faceArea === null => show all

    setFilteredProducts(filtered);

    // Auto-select first product in filtered list (if exists)
    if (filtered.length > 0) {
      const firstProd = filtered[0];
      setSelectedProd(firstProd);
      setSelectedShade(null); // reset shade when category changes
    } else {
      setSelectedProd(null);
      setSelectedShade(null);
    }
  }, [vtoProducts, faceArea]);

  // Load face-api models
  useEffect(() => {
    const MODEL_URL = window.location.origin + "/models";
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ])
      .then(() => setModelsLoaded(true))
      .catch((err) => console.error("face-api load", err));
  }, []);

  // Drawing helper
  const drawShape = (ctx, pts, fill) => {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.globalAlpha = 0.65;
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  // Face detection & overlay
  useEffect(() => {
    if (!modelsLoaded) return;

    const id = setInterval(async () => {
      const src = uploaded ? imageRef.current : webcamRef.current?.video;
      if (!src || src.readyState !== 4) return;

      const detect = await faceapi
        .detectSingleFace(src, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (!detect) {
        const canvas = canvasRef.current;
        if (canvas) canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const dims = {
        width: src.videoWidth || src.naturalWidth,
        height: src.videoHeight || src.naturalHeight,
      };
      const canvas = canvasRef.current;
      faceapi.matchDimensions(canvas, dims);
      const resized = faceapi.resizeResults(detect, dims);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply shade only if selected and faceArea matches
      if (selectedShade && faceArea) {
        if (faceArea === "lips") {
          drawShape(ctx, resized.landmarks.getMouth(), selectedShade.hex);
        } else if (faceArea === "eyes") {
          drawShape(ctx, resized.landmarks.getLeftEye(), selectedShade.hex);
          drawShape(ctx, resized.landmarks.getRightEye(), selectedShade.hex);
        }
      }
    }, 100);

    return () => clearInterval(id);
  }, [modelsLoaded, selectedShade, faceArea, uploaded]);

  // Capture
  const capture = useCallback(() => {
    const canvas = document.createElement("canvas");
    const vid = uploaded ? imageRef.current : webcamRef.current.video;
    canvas.width = vid.videoWidth || vid.naturalWidth;
    canvas.height = vid.videoHeight || vid.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.save();
    if (!uploaded && mirrored) {
      ctx.scale(-1, 1);
      ctx.drawImage(vid, -canvas.width, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
    }
    ctx.restore();
    const overlay = canvasRef.current;
    if (overlay) ctx.drawImage(overlay, 0, 0);
    const data = canvas.toDataURL("image/jpeg");
    downloadAnchor.current.href = data;
    downloadAnchor.current.download = `joyory-tryon-${selectedProd?.name || 'makeup'}.jpg`;
    downloadAnchor.current.click();
  }, [mirrored, uploaded, selectedProd]);

  // Slider settings
  const sliderSets = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ],
  };

  // Products Slider
  const ProductsSlider = () => (
    <Slider {...sliderSets}>
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          className={`product-card ${selectedProd?._id === product._id ? 'active' : ''}`}
          onClick={() => {
            setSelectedProd(product);
            setSelectedShade(null);
          }}
        >
          <div className="product-image-wrapper">
            <img
              src={product.images?.[0] || product.selectedVariant?.images?.[0]}
              alt={product.name}
              className="product-image"
            />
            {product.brand && (
              <div className="brand-badge">
                {product.brand.name}
              </div>
            )}
          </div>
          <div className="product-info">
            <h6 className="product-name">{product.name}</h6>
            <div className="product-price">
              <span className="current-price">₹{product.selectedVariant?.discountedPrice || product.price}</span>
              {product.selectedVariant?.discountPercent > 0 && (
                <span className="original-price">₹{product.selectedVariant?.originalPrice}</span>
              )}
              {product.selectedVariant?.discountPercent > 0 && (
                <span className="discount-badge">{product.selectedVariant?.discountPercent}% OFF</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );

  // Shades Palette
  const ShadesPalette = () => {
    if (!selectedProd?.variants?.length) return null;

    return (
      <div className="shade-palette mt-4">
        {selectedProd.variants.map((variant) => (
          <button
            key={variant.sku}
            className={`shade-swatch ${selectedShade?.sku === variant.sku ? 'active' : ''}`}
            style={{
              backgroundColor: variant.hex,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: selectedShade?.sku === variant.sku ? '0 0 0 3px #007bff' : 'none'
            }}
            onClick={() => setSelectedShade(variant)}
            title={`${variant.shadeName} - ₹${variant.discountedPrice}`}
          >
            {selectedShade?.sku === variant.sku && (
              <span className="shade-check">✓</span>
            )}
          </button>
        ))}
      </div>
    );
  };

  if (loadingProducts) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-4" style={{ width: '3rem', height: '3rem' }} />
          <h4>Loading Virtual Try On...</h4>
          <p className="text-muted">Fetching makeup products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="virtual-tryon-wrapper">
      <div className="container-fluid py-4">
        {/* HEADER */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="display-5 fw-bold text-primary mb-2">
              Virtual Try On
            </h1>
            <p className="lead text-muted mb-0">
              Try {filteredProducts.length} makeup products instantly with AR
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* CAMERA */}
          <div className="col-lg-7">
            <div className="camera-card shadow-lg">
              <div className="camera-box position-relative">
                {!uploaded ? (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    mirrored={mirrored}
                    screenshotFormat="image/jpeg"
                    className="camera-feed"
                  />
                ) : (
                  <img ref={imageRef} src={uploaded} alt="uploaded" className="camera-feed" />
                )}
                <canvas ref={canvasRef} className="overlay-canvas" />
              </div>

              {/* TRY ON STATUS */}
              {selectedShade && faceArea && (
                <div className="tryon-status position-absolute top-20px end-20px bg-primary bg-opacity-90 text-white rounded-pill px-3 py-2">
                  Trying {selectedShade.shadeName} on {faceArea}
                </div>
              )}

              <div className="camera-toolbar mt-3">
                <label className="btn btn-outline-primary me-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setUploaded(
                        e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null
                      )
                    }
                    hidden
                  />
                  📸 Upload Photo
                </label>
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => setMirrored((m) => !m)}
                >
                  Flip
                </button>
                <button
                  className="btn btn-success"
                  onClick={capture}
                  disabled={!selectedShade || !faceArea}
                >
                  Download Look
                </button>
                {uploaded && (
                  <button className="btn btn-outline-danger ms-2" onClick={() => setUploaded(null)}>
                    Live Camera
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCTS & CONTROLS */}
          <div className="col-lg-5">
            <div className="controls-card shadow-lg p-4 h-100">

              <div className="mb-4">
                {!faceArea ? (
                  <div className="mt-4">
                    <h6 className="block-title mb-3">
                      Try on Area
                    </h6>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-danger btn-lg flex-fill"
                        onClick={() => {
                          setFaceArea("lips"); // this will trigger filtering via useEffect
                        }}
                        disabled={!selectedShade && filteredProducts.length === 0}
                      >
                        Lips
                      </button>
                      <button
                        className="btn btn-outline-primary btn-lg flex-fill"
                        onClick={() => {
                          setFaceArea("eyes"); // this will trigger filtering
                        }}
                        disabled={!selectedShade && filteredProducts.length === 0}
                      >
                        Eyes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-center">
                    <div className="alert alert-success">
                      Ready to try {selectedShade?.shadeName || "a shade"} on {faceArea}!
                    </div>
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={() => {
                        setFaceArea(null); // resets to show all products
                        setSelectedShade(null);
                      }}
                    >
                      Change Area / Product
                    </button>
                  </div>
                )}

              </div>




              {/* PRODUCTS */}
              <div className="mb-4">
                <h5 className="block-title mb-3">
                  Makeup Products ({filteredProducts.length})
                </h5>
                {filteredProducts.length ? (
                  <ProductsSlider />
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">No products available for selected area</p>
                  </div>
                )}
              </div>

              {/* SHADES */}
              {selectedProd && <ShadesPalette />}

              {/* FACE AREA SELECTION (also filters products) */}

            </div>
          </div>
        </div>
      </div>

      <a ref={downloadAnchor} style={{ display: "none" }} />
    </div>
  );
}




















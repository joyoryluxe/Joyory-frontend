
// import React, { useState, useEffect, useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import '../Css/Chatbot.css';

// const ENDPOINT = 'https://beauty.joyory.com/api/user/products/all';

// const fetchProducts = async () => {
//   const res = await fetch(ENDPOINT);
//   const json = await res.json();
//   return json.products ?? [];
// };

// const MAIN_OPTIONS = [
//   { key: 'products', label: '🛍️ Products' },
//   { key: 'orders',   label: '📦 Orders' },
//   { key: 'support',  label: '💬 Support' },
// ];
// const SUB_CATEGORIES = ['Makeup','Skin','HairCare','Face','Eyeliner','LipMask','LipBalm','Eyes'];

// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen]       = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage]     = useState('main');
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({}); // productId -> variantSku

//   const messagesRef = useRef();
//   const scroll = () => messagesRef.current?.scrollTo({ top: 1e9, behavior: 'smooth' });
//   useEffect(() => scroll(), [messages]);

//   const handleOpen = () => {
//     setOpen(true);
//     if (!messages.length) greet();
//   };
//   const handleClose = () => setOpen(false);
//   const greet = () =>
//     setMessages([{ from: 'bot', text: 'Hi! 👋 What can I help you with today?' }]);

//   /* ---------- choose main option ---------- */
//   const pickMain = (key, label) => {
//     setMessages(prev => [...prev, { from: 'user', text: label }]);
//     if (key === 'products') {
//       setMessages(prev => [...prev, { from: 'bot', text: 'Choose a category:' }]);
//       setStage('categories');
//       return;
//     }
//     const map = {
//       orders: { text: 'Track your order in My Orders → click the item.', data: null },
//       support: { text: 'Drop us a mail at support@joyory.in', data: null },
//     };
//     setMessages(prev => [...prev, { ...map[key], from: 'bot' }]);
//     setMessages(prev => [...prev, { from: 'bot', text: 'Anything else?' }]);
//   };

//   /* ---------- choose category → fetch & show slider ---------- */
//   const pickCategory = async (cat) => {
//     setMessages(prev => [...prev, { from: 'user', text: cat }]);
//     setLoading(true);
//     const prods = await fetchProducts();
//     const filtered = prods.filter(p => p.category?.name === cat);
//     setLoading(false);

//     if (!filtered.length) {
//       setMessages(prev => [...prev, { from: 'bot', text: `No products in “${cat}” right now.` }]);
//       setMessages(prev => [...prev, { from: 'bot', text: 'Anything else?' }]);
//       return;
//     }

//     setProducts(filtered);
//     // auto-select 1st variant for each product
//     const variants = {};
//     filtered.forEach(p => {
//       variants[p._id] = p.variants?.[0]?.sku || p.shadeOptions?.[0]?.sku || '';
//     });
//     setSelectedVariants(variants);

//     setMessages(prev => [...prev, { from: 'bot', text: `Here are our ${cat} products:`, data: { slider: true } }]);
//     setMessages(prev => [...prev, { from: 'bot', text: 'Anything else?' }]);
//   };

//   /* ---------- variant selector change ---------- */
//   const handleVariantChange = (productId, sku) => {
//     setSelectedVariants(prev => ({ ...prev, [productId]: sku }));
//   };

//   /* ---------- get chosen variant for a product ---------- */
//   const getVariant = (p) => {
//     const sku = selectedVariants[p._id];
//     return (
//       p.variants?.find(v => v.sku === sku) ||
//       p.shadeOptions?.find(s => s.sku === sku) ||
//       p.variants?.[0] ||
//       p.shadeOptions?.[0]
//     );
//   };

//   /* ---------- render swiper slider inside chat ---------- */
//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper
//         slidesPerView={1.2}
//         spaceBetween={12}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Pagination, Navigation]}
//         className="product-swiper"
//       >
//         {products.map(p => {
//           const v = getVariant(p);
//           const inStock = v?.stock > 0;
//           return (
//             <SwiperSlide key={p._id}>
//               <div className="slide-card">
//                 <img src={v?.images?.[0] || ''} alt={p.name} className="slide-img" />
//                 <div className="slide-info">
//                   <h6>{p.name}</h6>
//                   <div className="price-row">
//                     <span className="price">₹{v?.discountedPrice || p.price}</span>
//                     {v?.originalPrice && <s className="mrp">₹{v.originalPrice}</s>}
//                     {v?.discountPercent && <span className="badge">-{v.discountPercent}%</span>}
//                   </div>

//                   {/* variant selector */}
//                   {p.variants && p.variants.length > 1 && (
//                     <select
//                       className="variant-select"
//                       value={selectedVariants[p._id] || ''}
//                       onChange={e => handleVariantChange(p._id, e.target.value)}
//                     >
//                       {p.variants.map(v => (
//                         <option key={v.sku} value={v.sku}>{v.shadeName}</option>
//                       ))}
//                     </select>
//                   )}

//                   <button
//                     className="add-btn"
//                     onClick={() => onAddToCart && onAddToCart({ ...p, selectedVariant: v })}
//                     disabled={!inStock}
//                   >
//                     {inStock ? 'Add to Cart' : 'Out of Stock'}
//                   </button>
//                 </div>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );

//   /* ---------- jsx ---------- */
//   return (
//     <>
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           <span>💬</span>
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div className="title">
//               <span className="avatar">🤖</span>
//               <div>
//                 <p>Joyory Assistant</p>
//                 <small>Online</small>
//               </div>
//             </div>
//             <button className="close-btn" onClick={handleClose}>✕</button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   {m.text}
//                   {m.data?.slider && renderSlider()}
//                 </div>
//               </div>
//             ))}

//             {loading && <div className="loader">Loading products…</div>}

//             <div className="options">
//               {stage === 'main' &&
//                 MAIN_OPTIONS.map(opt => (
//                   <button className="opt-btn" key={opt.key} onClick={() => pickMain(opt.key, opt.label)}>
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === 'categories' && (
//                 <>
//                   {SUB_CATEGORIES.map(cat => (
//                     <button className="opt-btn" key={cat} onClick={() => pickCategory(cat)}>
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage('main')}>Back</button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;
































// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import '../Css/Chatbot.css';
// import { CartContext } from '../context/CartContext';   //  SAME as BrandPage

// const ENDPOINT = 'https://beauty.joyory.com/api/user/products/all';

// const fetchProducts = async () => {
//   const res = await fetch(ENDPOINT);
//   const json = await res.json();
//   return json.products ?? [];
// };

// const MAIN_OPTIONS = [
//   { key: 'products', label: '🛍️ Products' },
//   { key: 'orders',   label: '📦 Orders' },
//   { key: 'support',  label: '💬 Support' },
// ];
// const SUB_CATEGORIES = ['Makeup','Skin','HairCare','Face','Eyeliner','LipMask','LipBalm','Eyes'];

// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen]       = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage]     = useState('main');
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({}); // productId -> variantSku

//   const messagesRef = useRef();
//   const { addToCart } = useContext(CartContext);   //  SAME hook BrandPage uses

//   const scroll = () => messagesRef.current?.scrollTo({ top: 1e9, behavior: 'smooth' });
//   useEffect(() => scroll(), [messages]);

//   const handleOpen = () => {
//     setOpen(true);
//     if (!messages.length) greet();
//   };
//   const handleClose = () => setOpen(false);
//   const greet = () =>
//     setMessages([{ from: 'bot', text: 'Hi! 👋 What can I help you with today?' }]);

//   /* ---------- choose main option ---------- */
//   const pickMain = (key, label) => {
//     setMessages(prev => [...prev, { from: 'user', text: label }]);
//     if (key === 'products') {
//       setMessages(prev => [...prev, { from: 'bot', text: 'Choose a category:' }]);
//       setStage('categories');
//       return;
//     }
//     const map = {
//       orders: { text: 'Track your order in My Orders → click the item.', data: null },
//       support: { text: 'Drop us a mail at support@joyory.in', data: null },
//     };
//     setMessages(prev => [...prev, { ...map[key], from: 'bot' }]);
//     setMessages(prev => [...prev, { from: 'bot', text: 'Anything else?' }]);
//   };

//   /* ---------- choose category → fetch & show slider ---------- */
//   const pickCategory = async (cat) => {
//     setMessages(prev => [...prev, { from: 'user', text: cat }]);
//     setLoading(true);
//     const prods = await fetchProducts();
//     const filtered = prods.filter(p => p.category?.name === cat);
//     setLoading(false);

//     if (!filtered.length) {
//       setMessages(prev => [...prev, { from: 'bot', text: `No products in “${cat}” right now.` }]);
//       setMessages(prev => [...prev, { from: 'bot', text: 'Anything else?' }]);
//       return;
//     }

//     setProducts(filtered);
//     // auto-select 1st variant for each product
//     const variants = {};
//     filtered.forEach(p => {
//       variants[p._id] = p.variants?.[0]?.sku || p.shadeOptions?.[0]?.sku || '';
//     });
//     setSelectedVariants(variants);

//     setMessages(prev => [...prev, { from: 'bot', text: `Here are our ${cat} products:`, data: { slider: true } }]);
//     setMessages(prev => [...prev, { from: 'bot', text: 'Anything else?' }]);
//   };

//   /* ---------- variant selector change ---------- */
//   const handleVariantChange = (productId, sku) => {
//     setSelectedVariants(prev => ({ ...prev, [productId]: sku }));
//   };

//   /* ---------- get chosen variant for a product ---------- */
//   const getVariant = (p) => {
//     const sku = selectedVariants[p._id];
//     return (
//       p.variants?.find(v => v.sku === sku) ||
//       p.shadeOptions?.find(s => s.sku === sku) ||
//       p.variants?.[0] ||
//       p.shadeOptions?.[0]
//     );
//   };

//   /* ---------- add to cart (same logic as BrandPage) ---------- */
//   const addToCartHandler = async (product, variant) => {
//     await addToCart(product, variant);   //  uses CartContext → identical to BrandPage
//     onAddToCart?.();                     //  optional parent callback (toast / nav)
//   };

//   /* ---------- render swiper slider inside chat ---------- */
//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper
//         slidesPerView={1.2}
//         spaceBetween={12}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Pagination, Navigation]}
//         className="product-swiper"
//       >
//         {products.map(p => {
//           const v = getVariant(p);
//           const inStock = v?.stock > 0;
//           return (
//             <SwiperSlide key={p._id}>
//               <div className="slide-card">
//                 <img src={v?.images?.[0] || ''} alt={p.name} className="slide-img" />
//                 <div className="slide-info">
//                   <h6>{p.name}</h6>
//                   <div className="price-row">
//                     <span className="price">₹{v?.discountedPrice || p.price}</span>
//                     {v?.originalPrice && <s className="mrp">₹{v.originalPrice}</s>}
//                     {v?.discountPercent && <span className="badge">-{v.discountPercent}%</span>}
//                   </div>

//                   {/* variant selector */}
//                   {p.variants && p.variants.length > 1 && (
//                     <select
//                       className="variant-select"
//                       value={selectedVariants[p._id] || ''}
//                       onChange={e => handleVariantChange(p._id, e.target.value)}
//                     >
//                       {p.variants.map(v => (
//                         <option key={v.sku} value={v.sku}>{v.shadeName}</option>
//                       ))}
//                     </select>
//                   )}

//                   <button
//                     className="add-btn"
//                     onClick={() => addToCartHandler(p, v)}
//                     disabled={!inStock}
//                   >
//                     {inStock ? 'Add to Cart' : 'Out of Stock'}
//                   </button>
//                 </div>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );

//   /* ---------- jsx ---------- */
//   return (
//     <>
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           <span>💬</span>
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div className="title">
//               <span className="avatar">🤖</span>
//               <div>
//                 <p>Joyory Assistant</p>
//                 <small>Online</small>
//               </div>
//             </div>
//             <button className="close-btn" onClick={handleClose}>✕</button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   {m.text}
//                   {m.data?.slider && renderSlider()}
//                 </div>
//               </div>
//             ))}

//             {loading && <div className="loader">Loading products…</div>}

//             <div className="options">
//               {stage === 'main' &&
//                 MAIN_OPTIONS.map(opt => (
//                   <button className="opt-btn" key={opt.key} onClick={() => pickMain(opt.key, opt.label)}>
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === 'categories' && (
//                 <>
//                   {SUB_CATEGORIES.map(cat => (
//                     <button className="opt-btn" key={cat} onClick={() => pickCategory(cat)}>
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage('main')}>Back</button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;

































// // src/components/Chatbot.jsx
// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "../Css/Chatbot.css";
// import { CartContext } from "../context/CartContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ENDPOINT = "https://beauty.joyory.com/api/user/products/all";

// const VARIANT_CACHE_KEY = "chatbotVariantCache";

// // Utility: returns SKU whether backend uses `sku` or `variantSku`
// const getSku = (v) => v?.sku || v?.variantSku || null;

// // Utility: detect "black" hex in various formats
// const isBlackHex = (hex) => {
//   if (!hex) return false;
//   const cleaned = String(hex).toLowerCase().replace(/\s/g, "").replace("#", "");
//   return cleaned === "000000" || cleaned === "000" || cleaned === "black";
// };

// const fetchProducts = async () => {
//   try {
//     const res = await fetch(ENDPOINT);
//     const json = await res.json();
//     return json.products ?? [];
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };

// const MAIN_OPTIONS = [
//   { key: "products", label: "🛍️ Products" },
//   { key: "orders", label: "📦 Orders" },
//   { key: "support", label: "💬 Support" },
// ];

// const ORDER_OPTIONS = [
//   "Track My Order",
//   "Cancel Order",
//   "Return / Refund",
//   "Payment & Invoice",
//   "Contact Support",
// ];

// const SUB_CATEGORIES = [
//   "Makeup",
//   "Skin",
//   "HairCare",
//   "Face",
//   "Eyeliner",
//   "LipMask",
//   "LipBalm",
//   "Eyes",
// ];

// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage] = useState("main");
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [selectedImages, setSelectedImages] = useState({});
//   const [orderInput, setOrderInput] = useState("");
//   const [showAllVariants, setShowAllVariants] = useState({});

//   const messagesRef = useRef();
//   const { addToCart } = useContext(CartContext);

//   const scroll = () => messagesRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
//   useEffect(() => scroll(), [messages]);

//   // Initialize default variants when products are loaded
//   useEffect(() => {
//     if (products.length === 0) return;

//     const defaultVariants = {};
//     const defaultImages = {};

//     products.forEach((product) => {
//       const variants = product.variants || [];
//       if (variants.length === 0) return;

//       // find black variant first, otherwise first variant
//       const blackVariant = variants.find((v) => isBlackHex(v?.hex));
//       const selected = blackVariant || variants[0];

//       defaultVariants[product._id] = {
//         shadeName: selected?.shadeName || selected?.size || "Default",
//         hex: selected?.hex,
//         image: selected?.image || selected?.images?.[0] || null,
//         discountedPrice: selected?.discountedPrice ?? selected?.price ?? 0,
//         originalPrice: selected?.originalPrice ?? selected?.price ?? 0,
//         variantSku: getSku(selected),
//         stock: selected?.stock ?? 0,
//       };

//       defaultImages[product._id] = selected?.image || selected?.images?.[0] || product?.images?.[0] || null;
//     });

//     setSelectedVariants(defaultVariants);
//     setSelectedImages(defaultImages);
//   }, [products]);

//   const handleOpen = () => {
//     setOpen(true);
//     if (!messages.length) greet();
//   };

//   const handleClose = () => setOpen(false);

//   const greet = () =>
//     setMessages([{ from: "bot", text: "Hi! 👋 What can I help you with today?" }]);

//   const pickMain = (key, label) => {
//     setMessages((prev) => [...prev, { from: "user", text: label }]);

//     if (key === "products") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Choose a category:" }]);
//       setStage("categories");
//       return;
//     }

//     if (key === "orders") {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Select what you need help with:" },
//       ]);
//       setStage("orders");
//       return;
//     }

//     if (key === "support") {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Email us at support@joyory.in anytime!" },
//       ]);
//     }
//   };

//   const pickOrderOption = (option) => {
//     setMessages((prev) => [...prev, { from: "user", text: option }]);

//     if (option === "Track My Order") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Enter your Order ID:" }]);
//       setStage("track-input");
//       return;
//     }

//     if (option === "Cancel Order") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Provide Order ID to cancel:" }]);
//       setStage("cancel-input");
//       return;
//     }

//     if (option === "Return / Refund") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Enter Order ID to request return:" }]);
//       setStage("return-input");
//       return;
//     }

//     if (option === "Payment & Invoice") {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Enter Order ID to download invoice:" },
//       ]);
//       setStage("invoice-input");
//       return;
//     }

//     if (option === "Contact Support") {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Connecting to support…" },
//       ]);
//       setStage("main");
//     }
//   };

//   const handleOrderSubmit = async () => {
//     setMessages((prev) => [...prev, { from: "user", text: orderInput }]);
//     setMessages((prev) => [...prev, { from: "bot", text: "Checking your order details…" }]);
//     setStage("main");
//     setOrderInput("");

//     // 🔥 API HERE
//     // const res = await fetch(`https://your-api/orders/${orderInput}`);
//     // const data = await res.json();
//     // Display status

//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: `Order Status Example: 📦 Shipped, arriving soon!` },
//     ]);
//   };

//   const pickCategory = async (cat) => {
//     setMessages((prev) => [...prev, { from: "user", text: cat }]);
//     setLoading(true);

//     const prods = await fetchProducts();
//     const filtered = prods.filter((p) => 
//       p.category?.name === cat || 
//       p.categories?.some(c => c.name === cat) ||
//       p.name?.toLowerCase().includes(cat.toLowerCase())
//     );

//     setLoading(false);
//     if (!filtered.length) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `No products in "${cat}" right now.` },
//       ]);
//       return;
//     }

//     setProducts(filtered);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: `Found ${filtered.length} products in ${cat}:`, data: { slider: true } },
//     ]);
//   };

//   const handleVariantChange = (productId, variant) => {
//     if (variant.stock !== undefined && variant.stock <= 0) {
//       toast.warning("This variant is out of stock");
//       return;
//     }

//     setSelectedVariants((prev) => ({
//       ...prev,
//       [productId]: {
//         shadeName: variant.shadeName || variant.size || "Default",
//         hex: variant.hex,
//         image: variant.image || variant.images?.[0] || null,
//         discountedPrice: variant.discountedPrice ?? variant.price ?? 0,
//         originalPrice: variant.originalPrice ?? variant.price ?? 0,
//         stock: variant.stock ?? 0,
//         variantSku: getSku(variant),
//       },
//     }));

//     if (variant.image || variant.images?.[0]) {
//       setSelectedImages((prev) => ({
//         ...prev,
//         [productId]: variant.image || variant.images[0],
//       }));
//     }
//   };

//   const addToCartHandler = async (product) => {
//     try {
//       let isLoggedIn = false;
//       try {
//         await fetch("https://beauty.joyory.com/api/user/profile", { 
//           method: 'GET',
//           credentials: 'include'
//         });
//         isLoggedIn = true;
//       } catch {
//         isLoggedIn = false;
//       }

//       const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
//       const selectedVariant = selectedVariants[product._id];
//       let variantToAdd = null;

//       if (hasVariants) {
//         const availableVariants = product.variants.filter((v) => v.stock > 0);
//         if (availableVariants.length === 0) {
//           toast.warning("All variants are out of stock.");
//           return;
//         }

//         if (selectedVariant && selectedVariant.variantSku) {
//           // find using normalized sku
//           const matchedVariant = product.variants.find((v) => getSku(v) === selectedVariant.variantSku);
//           if (matchedVariant && matchedVariant.stock > 0) {
//             variantToAdd = matchedVariant;
//           } else {
//             // fallback by shadeName
//             const matchedByName = product.variants.find((v) => 
//               (v.shadeName || "").toLowerCase() === (selectedVariant.shadeName || "").toLowerCase()
//             );
//             if (matchedByName && matchedByName.stock > 0) variantToAdd = matchedByName;
//           }
//           if (!variantToAdd) {
//             toast.warning("Selected variant is out of stock or unavailable.");
//             return;
//           }
//         } else {
//           variantToAdd = availableVariants[0];
//         }
//       } else {
//         if (product.stock <= 0) {
//           toast.warning("Product is out of stock.");
//           return;
//         }
//         variantToAdd = {
//           sku: `sku-${product._id}-default`,
//           shadeName: "Default",
//           hex: "#ccc",
//           image: product.images?.[0] || "/placeholder.png",
//           originalPrice: product.mrp || product.price,
//           discountedPrice: product.price,
//           stock: product.stock ?? 1,
//         };
//       }

//       // cache variant
//       const cache = JSON.parse(localStorage.getItem(VARIANT_CACHE_KEY) || "{}");
//       cache[product._id] = variantToAdd;
//       localStorage.setItem(VARIANT_CACHE_KEY, JSON.stringify(cache));

//       // prepare payload
//       const variantSkuToSend = getSku(variantToAdd) || variantToAdd.sku;
//       const cartPayload = {
//         productId: product._id,
//         variants: [{ variantSku: variantSkuToSend, quantity: 1 }],
//       };

//       if (isLoggedIn) {
//         await addToCart(product, variantToAdd);
//         toast.success("Product added to cart!");
//         onAddToCart?.();
//       } else {
//         const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         const existingIndex = guestCart.findIndex(
//           (item) => item.productId === product._id && item.variantSku === variantSkuToSend
//         );
//         if (existingIndex !== -1) {
//           guestCart[existingIndex].quantity += 1;
//         } else {
//           guestCart.push({ 
//             productId: product._id, 
//             variantSku: variantSkuToSend, 
//             product: product, 
//             variant: variantToAdd, 
//             quantity: 1 
//           });
//         }
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         toast.success("Added to cart as guest!");
//       }
//     } catch (err) {
//       console.error("Add to Cart error:", err?.response?.data || err?.message);
//       toast.error("Failed to add product.");
//     }
//   };

//   const renderProductCard = (product) => {
//     const variants = product.variants || [];
//     const selectedVariant = selectedVariants[product._id] || variants[0] || {};
    
//     const colorVariants = variants.filter((v) => v.hex);
//     const otherVariants = variants.filter((v) => !v.hex);
    
//     const isExpanded = showAllVariants[product._id] || false;
//     const visibleColorVariants = isExpanded ? colorVariants : colorVariants.slice(0, 3);
//     const visibleOtherVariants = isExpanded ? otherVariants : otherVariants.slice(0, 3);

//     const price = Number(selectedVariant?.discountedPrice ?? product.price ?? 0);
//     const mrp = Number(selectedVariant?.originalPrice ?? product.mrp ?? price);
//     const hasDiscount = mrp > price;
//     const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return (
//       <div className="chatbot-product-card">
//         <img
//           src={selectedImages[product._id] || selectedVariant?.image || product.images?.[0]}
//           alt={product.name}
//           className="chatbot-product-image"
//         />
        
//         <div className="chatbot-product-info">
//           <h6 className="chatbot-product-title">{product.name}</h6>

//           {/* Color Variants */}
//           {colorVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleColorVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;

//                 return (
//                   <div
//                     key={variantSku || `${product._id}-cv-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-color-swatch ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                     style={{ backgroundColor: variant.hex || '#ccc' }}
//                     title={outOfStock ? `${variant.shadeName} (Out of Stock)` : variant.shadeName}
//                   >
//                     {outOfStock && <span className="out-of-stock-cross">✕</span>}
//                   </div>
//                 );
//               })}
              
//               {colorVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants((prev) => ({ 
//                     ...prev, 
//                     [product._id]: !isExpanded 
//                   }))}
//                 >
//                   {isExpanded ? "−" : `+${colorVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Other Variants */}
//           {otherVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleOtherVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;

//                 return (
//                   <button
//                     key={variantSku || `${product._id}-ov-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-size-btn ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                   >
//                     {variant.size || variant.shadeName || "Option"}
//                   </button>
//                 );
//               })}
              
//               {otherVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants((prev) => ({ 
//                     ...prev, 
//                     [product._id]: !isExpanded 
//                   }))}
//                 >
//                   {isExpanded ? "−" : `+${otherVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Selected Variant */}
//           {selectedVariant && (
//             <div className="chatbot-selected-variant">
//               Selected: {selectedVariant.shadeName || selectedVariant.size || "Default"}
//             </div>
//           )}

//           {/* Price */}
//           <div className="chatbot-price-section">
//             <span className="chatbot-price">₹{price}</span>
//             {hasDiscount && (
//               <>
//                 <span className="chatbot-mrp">₹{mrp}</span>
//                 <span className="chatbot-discount">({discountPercent}% OFF)</span>
//               </>
//             )}
//           </div>

//           {/* Add to Cart Button */}
//           <button 
//             className="chatbot-add-btn"
//             onClick={() => addToCartHandler(product)}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper 
//         slidesPerView={1.2} 
//         spaceBetween={12} 
//         pagination={{ clickable: true }} 
//         navigation 
//         modules={[Pagination, Navigation]}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>
//             {renderProductCard(product)}
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           💬
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div>
//               <p>Joyory Assistant</p>
//               <small>Online</small>
//             </div>
//             <button className="close-btn" onClick={handleClose}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   {m.text} 
//                   {m.data?.slider && renderSlider()}
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div className="loader">
//                 <div className="spinner"></div>
//                 Loading products...
//               </div>
//             )}

//             {(stage.includes("input") || stage === "track-input") && (
//               <div className="input-area">
//                 <input
//                   placeholder="Enter Order ID"
//                   value={orderInput}
//                   onChange={(e) => setOrderInput(e.target.value)}
//                   className="order-input"
//                 />
//                 <button onClick={handleOrderSubmit} className="send-btn">Send</button>
//               </div>
//             )}

//             <div className="options">
//               {stage === "main" &&
//                 MAIN_OPTIONS.map((opt) => (
//                   <button 
//                     key={opt.key} 
//                     className="opt-btn" 
//                     onClick={() => pickMain(opt.key, opt.label)}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "orders" &&
//                 ORDER_OPTIONS.map((o) => (
//                   <button 
//                     key={o} 
//                     className="opt-btn" 
//                     onClick={() => pickOrderOption(o)}
//                   >
//                     {o}
//                   </button>
//                 ))}

//               {stage === "categories" && (
//                 <>
//                   {SUB_CATEGORIES.map((cat) => (
//                     <button 
//                       className="opt-btn" 
//                       key={cat} 
//                       onClick={() => pickCategory(cat)}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;




























// // src/components/Chatbot.jsx
// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "../Css/Chatbot.css";
// import { CartContext } from "../context/CartContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const ENDPOINT = "https://beauty.joyory.com/api/user/products/all";
// const TRACKING_API = "https://beauty.joyory.com/api/user/cart/orders/track";
// const LOGIN_API = "https://beauty.joyory.com/api/user/login";
// const OTP_SEND_API = "https://beauty.joyory.com/api/user/send-otp";
// const OTP_VERIFY_API = "https://beauty.joyory.com/api/user/verify-otp";

// const VARIANT_CACHE_KEY = "chatbotVariantCache";

// // Utility: returns SKU whether backend uses `sku` or `variantSku`
// const getSku = (v) => v?.sku || v?.variantSku || null;

// // Utility: detect "black" hex in various formats
// const isBlackHex = (hex) => {
//   if (!hex) return false;
//   const cleaned = String(hex).toLowerCase().replace(/\s/g, "").replace("#", "");
//   return cleaned === "000000" || cleaned === "000" || cleaned === "black";
// };

// const fetchProducts = async () => {
//   try {
//     const res = await fetch(ENDPOINT);
//     const json = await res.json();
//     return json.products ?? [];
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };

// const MAIN_OPTIONS = [
//   { key: "products", label: "🛍️ Products" },
//   { key: "orders", label: "📦 Orders" },
//   { key: "support", label: "💬 Support" },
// ];

// const ORDER_OPTIONS = [
//   "Track My Order",
//   "Cancel Order",
//   "Return / Refund",
//   "Payment & Invoice",
//   "Contact Support",
// ];

// const SUB_CATEGORIES = [
//   "Makeup",
//   "Skin",
//   "HairCare",
//   "Face",
//   "Eyeliner",
//   "LipMask",
//   "LipBalm",
//   "Eyes",
// ];

// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage] = useState("main");
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [selectedImages, setSelectedImages] = useState({});
//   const [orderInput, setOrderInput] = useState("");
//   const [showAllVariants, setShowAllVariants] = useState({});
  
//   // 🔥 NEW STATES FOR ORDER TRACKING
//   const [trackingStage, setTrackingStage] = useState("email"); // email -> login -> shipment -> awb -> result
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [shipmentId, setShipmentId] = useState("");
//   const [awbNumber, setAwbNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [trackingResult, setTrackingResult] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const messagesRef = useRef();
//   const { addToCart } = useContext(CartContext);

//   const scroll = () => messagesRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
//   useEffect(() => scroll(), [messages]);

//   // Check if user is already logged in
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await fetch("https://beauty.joyory.com/api/user/profile", {
//           method: 'GET',
//           credentials: 'include'
//         });
//         setIsLoggedIn(res.ok);
//       } catch {
//         setIsLoggedIn(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   // Initialize default variants when products are loaded
//   useEffect(() => {
//     if (products.length === 0) return;

//     const defaultVariants = {};
//     const defaultImages = {};

//     products.forEach((product) => {
//       const variants = product.variants || [];
//       if (variants.length === 0) return;

//       const blackVariant = variants.find((v) => isBlackHex(v?.hex));
//       const selected = blackVariant || variants[0];

//       defaultVariants[product._id] = {
//         shadeName: selected?.shadeName || selected?.size || "Default",
//         hex: selected?.hex,
//         image: selected?.image || selected?.images?.[0] || null,
//         discountedPrice: selected?.discountedPrice ?? selected?.price ?? 0,
//         originalPrice: selected?.originalPrice ?? selected?.price ?? 0,
//         variantSku: getSku(selected),
//         stock: selected?.stock ?? 0,
//       };

//       defaultImages[product._id] = selected?.image || selected?.images?.[0] || product?.images?.[0] || null;
//     });

//     setSelectedVariants(defaultVariants);
//     setSelectedImages(defaultImages);
//   }, [products]);

//   const handleOpen = () => {
//     setOpen(true);
//     if (!messages.length) greet();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     // Reset tracking states when closing
//     setTrackingStage("email");
//     setEmail("");
//     setPassword("");
//     setShipmentId("");
//     setAwbNumber("");
//     setOtp("");
//     setShowOtpInput(false);
//     setTrackingResult(null);
//   };

//   const greet = () =>
//     setMessages([{ from: "bot", text: "Hi! 👋 What can I help you with today?" }]);

//   // 🔥 UPDATED ORDER TRACKING FLOW
//   const startOrderTracking = () => {
//     setMessages((prev) => [...prev, { from: "user", text: "Track My Order" }]);
    
//     if (isLoggedIn) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "You're logged in! Please enter your Shipment ID:" }
//       ]);
//       setTrackingStage("shipment");
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your email address to continue:" }
//       ]);
//       setTrackingStage("email");
//     }
//   };

//   // 🔥 HANDLE EMAIL INPUT
//   const handleEmailSubmit = async () => {
//     if (!email) {
//       toast.error("Please enter your email");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: email }]);
    
//     // Check if user exists and needs password or OTP
//     try {
//       setLoading(true);
      
//       // Try to send OTP first
//       const otpRes = await axios.post(OTP_SEND_API, { email });
//       if (otpRes.data.success) {
//         setMessages((prev) => [
//           ...prev,
//           { from: "bot", text: "OTP sent to your email! Please enter the OTP:" }
//         ]);
//         setShowOtpInput(true);
//         setTrackingStage("login");
//       }
//     } catch (error) {
//       // If OTP fails, ask for password
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your password:" }
//       ]);
//       setShowOtpInput(false);
//       setTrackingStage("login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 HANDLE LOGIN (PASSWORD OR OTP)
//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       let loginRes;

//       if (showOtpInput) {
//         // Login with OTP
//         loginRes = await axios.post(OTP_VERIFY_API, {
//           email,
//           otp
//         }, { withCredentials: true });
//       } else {
//         // Login with password
//         loginRes = await axios.post(LOGIN_API, {
//           email,
//           password
//         }, { withCredentials: true });
//       }

//       if (loginRes.data.success || loginRes.data.token) {
//         setIsLoggedIn(true);
//         setMessages((prev) => [
//           ...prev,
//           { from: "bot", text: "✅ Login successful! Now please enter your Shipment ID:" }
//         ]);
//         setTrackingStage("shipment");
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 HANDLE SHIPMENT ID INPUT
//   const handleShipmentIdSubmit = () => {
//     if (!shipmentId.trim()) {
//       toast.error("Please enter a valid Shipment ID");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: shipmentId }]);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "Great! Now please enter the AWB (Air Waybill) Number:" }
//     ]);
//     setTrackingStage("awb");
//   };

//   // 🔥 HANDLE AWB NUMBER AND FETCH TRACKING
//   const handleAwbSubmit = async () => {
//     if (!awbNumber.trim()) {
//       toast.error("Please enter a valid AWB Number");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: awbNumber }]);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "🔍 Tracking your order..." }
//     ]);
    
//     try {
//       setLoading(true);
      
//       // Call tracking API
//       const trackingRes = await axios.get(`${TRACKING_API}/${shipmentId}`, {
//         params: { awb: awbNumber },
//         withCredentials: true
//       });

//       setTrackingResult(trackingRes.data);
      
//       // Display tracking info
//       const order = trackingRes.data.order;
//       const shipment = order?.shipments?.find(s => s.shipmentId === shipmentId);
      
//       let trackingMessage = `📦 **Order Tracking Details**\n\n`;
//       trackingMessage += `Order ID: ${order?.orderId || shipmentId}\n`;
//       trackingMessage += `Status: ${shipment?.status || order?.status}\n`;
      
//       if (shipment?.awbNumber) {
//         trackingMessage += `AWB: ${shipment.awbNumber}\n`;
//       }
      
//       if (shipment?.carrier) {
//         trackingMessage += `Carrier: ${shipment.carrier}\n`;
//       }
      
//       if (shipment?.expectedDelivery) {
//         trackingMessage += `Expected Delivery: ${new Date(shipment.expectedDelivery).toLocaleDateString()}\n`;
//       }
      
//       if (shipment?.trackingHistory?.length > 0) {
//         trackingMessage += `\n📋 **Tracking History:**\n`;
//         shipment.trackingHistory.forEach((event, index) => {
//           if (index < 5) { // Show only last 5 events
//             trackingMessage += `• ${new Date(event.date).toLocaleString()}: ${event.status} - ${event.location || ''}\n`;
//           }
//         });
//       }

//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: trackingMessage }
//       ]);
      
//       setTrackingStage("result");
      
//     } catch (error) {
//       console.error("Tracking error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `❌ Unable to track order. Error: ${error.response?.data?.message || error.message}` }
//       ]);
//       setTrackingStage("shipment"); // Go back to shipment stage
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 UPDATED PICK ORDER OPTION
//   const pickOrderOption = (option) => {
//     setMessages((prev) => [...prev, { from: "user", text: option }]);

//     if (option === "Track My Order") {
//       startOrderTracking();
//       return;
//     }

//     if (option === "Cancel Order") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Provide Order ID to cancel:" }]);
//       setStage("cancel-input");
//       return;
//     }

//     if (option === "Return / Refund") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Enter Order ID to request return:" }]);
//       setStage("return-input");
//       return;
//     }

//     if (option === "Payment & Invoice") {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Enter Order ID to download invoice:" },
//       ]);
//       setStage("invoice-input");
//       return;
//     }

//     if (option === "Contact Support") {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Connecting to support…" },
//       ]);
//       setStage("main");
//     }
//   };

//   // 🔥 UPDATED PICK MAIN
//   const pickMain = (key, label) => {
//     setMessages((prev) => [...prev, { from: "user", text: label }]);

//     if (key === "products") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Choose a category:" }]);
//       setStage("categories");
//       return;
//     }

//     if (key === "orders") {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Select what you need help with:" },
//       ]);
//       setStage("orders");
//       return;
//     }

//     if (key === "support") {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Email us at support@joyory.in anytime!" },
//       ]);
//     }
//   };

//   const handleOrderSubmit = async () => {
//     setMessages((prev) => [...prev, { from: "user", text: orderInput }]);
//     setMessages((prev) => [...prev, { from: "bot", text: "Checking your order details…" }]);
//     setStage("main");
//     setOrderInput("");
//   };

//   const pickCategory = async (cat) => {
//     setMessages((prev) => [...prev, { from: "user", text: cat }]);
//     setLoading(true);

//     const prods = await fetchProducts();
//     const filtered = prods.filter((p) => 
//       p.category?.name === cat || 
//       p.categories?.some(c => c.name === cat) ||
//       p.name?.toLowerCase().includes(cat.toLowerCase())
//     );

//     setLoading(false);
//     if (!filtered.length) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `No products in "${cat}" right now.` },
//       ]);
//       return;
//     }

//     setProducts(filtered);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: `Found ${filtered.length} products in ${cat}:`, data: { slider: true } },
//     ]);
//   };

//   const handleVariantChange = (productId, variant) => {
//     if (variant.stock !== undefined && variant.stock <= 0) {
//       toast.warning("This variant is out of stock");
//       return;
//     }

//     setSelectedVariants((prev) => ({
//       ...prev,
//       [productId]: {
//         shadeName: variant.shadeName || variant.size || "Default",
//         hex: variant.hex,
//         image: variant.image || variant.images?.[0] || null,
//         discountedPrice: variant.discountedPrice ?? variant.price ?? 0,
//         originalPrice: variant.originalPrice ?? variant.price ?? 0,
//         stock: variant.stock ?? 0,
//         variantSku: getSku(variant),
//       },
//     }));

//     if (variant.image || variant.images?.[0]) {
//       setSelectedImages((prev) => ({
//         ...prev,
//         [productId]: variant.image || variant.images[0],
//       }));
//     }
//   };

//   const addToCartHandler = async (product) => {
//     try {
//       let isLoggedIn = false;
//       try {
//         await fetch("https://beauty.joyory.com/api/user/profile", { 
//           method: 'GET',
//           credentials: 'include'
//         });
//         isLoggedIn = true;
//       } catch {
//         isLoggedIn = false;
//       }

//       const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
//       const selectedVariant = selectedVariants[product._id];
//       let variantToAdd = null;

//       if (hasVariants) {
//         const availableVariants = product.variants.filter((v) => v.stock > 0);
//         if (availableVariants.length === 0) {
//           toast.warning("All variants are out of stock.");
//           return;
//         }

//         if (selectedVariant && selectedVariant.variantSku) {
//           const matchedVariant = product.variants.find((v) => getSku(v) === selectedVariant.variantSku);
//           if (matchedVariant && matchedVariant.stock > 0) {
//             variantToAdd = matchedVariant;
//           } else {
//             const matchedByName = product.variants.find((v) => 
//               (v.shadeName || "").toLowerCase() === (selectedVariant.shadeName || "").toLowerCase()
//             );
//             if (matchedByName && matchedByName.stock > 0) variantToAdd = matchedByName;
//           }
//           if (!variantToAdd) {
//             toast.warning("Selected variant is out of stock or unavailable.");
//             return;
//           }
//         } else {
//           variantToAdd = availableVariants[0];
//         }
//       } else {
//         if (product.stock <= 0) {
//           toast.warning("Product is out of stock.");
//           return;
//         }
//         variantToAdd = {
//           sku: `sku-${product._id}-default`,
//           shadeName: "Default",
//           hex: "#ccc",
//           image: product.images?.[0] || "/placeholder.png",
//           originalPrice: product.mrp || product.price,
//           discountedPrice: product.price,
//           stock: product.stock ?? 1,
//         };
//       }

//       const cache = JSON.parse(localStorage.getItem(VARIANT_CACHE_KEY) || "{}");
//       cache[product._id] = variantToAdd;
//       localStorage.setItem(VARIANT_CACHE_KEY, JSON.stringify(cache));

//       const variantSkuToSend = getSku(variantToAdd) || variantToAdd.sku;
//       const cartPayload = {
//         productId: product._id,
//         variants: [{ variantSku: variantSkuToSend, quantity: 1 }],
//       };

//       if (isLoggedIn) {
//         await addToCart(product, variantToAdd);
//         toast.success("Product added to cart!");
//         onAddToCart?.();
//       } else {
//         const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         const existingIndex = guestCart.findIndex(
//           (item) => item.productId === product._id && item.variantSku === variantSkuToSend
//         );
//         if (existingIndex !== -1) {
//           guestCart[existingIndex].quantity += 1;
//         } else {
//           guestCart.push({ 
//             productId: product._id, 
//             variantSku: variantSkuToSend, 
//             product: product, 
//             variant: variantToAdd, 
//             quantity: 1 
//           });
//         }
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         toast.success("Added to cart as guest!");
//       }
//     } catch (err) {
//       console.error("Add to Cart error:", err?.response?.data || err?.message);
//       toast.error("Failed to add product.");
//     }
//   };

//   const renderProductCard = (product) => {
//     const variants = product.variants || [];
//     const selectedVariant = selectedVariants[product._id] || variants[0] || {};
    
//     const colorVariants = variants.filter((v) => v.hex);
//     const otherVariants = variants.filter((v) => !v.hex);
    
//     const isExpanded = showAllVariants[product._id] || false;
//     const visibleColorVariants = isExpanded ? colorVariants : colorVariants.slice(0, 3);
//     const visibleOtherVariants = isExpanded ? otherVariants : otherVariants.slice(0, 3);

//     const price = Number(selectedVariant?.discountedPrice ?? product.price ?? 0);
//     const mrp = Number(selectedVariant?.originalPrice ?? product.mrp ?? price);
//     const hasDiscount = mrp > price;
//     const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return (
//       <div className="chatbot-product-card">
//         <img
//           src={selectedImages[product._id] || selectedVariant?.image || product.images?.[0]}
//           alt={product.name}
//           className="chatbot-product-image"
//         />
        
//         <div className="chatbot-product-info">
//           <h6 className="chatbot-product-title">{product.name}</h6>

//           {/* Color Variants */}
//           {colorVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleColorVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;

//                 return (
//                   <div
//                     key={variantSku || `${product._id}-cv-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-color-swatch ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                     style={{ backgroundColor: variant.hex || '#ccc' }}
//                     title={outOfStock ? `${variant.shadeName} (Out of Stock)` : variant.shadeName}
//                   >
//                     {outOfStock && <span className="out-of-stock-cross">✕</span>}
//                   </div>
//                 );
//               })}
              
//               {colorVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants((prev) => ({ 
//                     ...prev, 
//                     [product._id]: !isExpanded 
//                   }))}
//                 >
//                   {isExpanded ? "−" : `+${colorVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Other Variants */}
//           {otherVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleOtherVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;

//                 return (
//                   <button
//                     key={variantSku || `${product._id}-ov-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-size-btn ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                   >
//                     {variant.size || variant.shadeName || "Option"}
//                   </button>
//                 );
//               })}
              
//               {otherVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants((prev) => ({ 
//                     ...prev, 
//                     [product._id]: !isExpanded 
//                   }))}
//                 >
//                   {isExpanded ? "−" : `+${otherVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Selected Variant */}
//           {selectedVariant && (
//             <div className="chatbot-selected-variant">
//               Selected: {selectedVariant.shadeName || selectedVariant.size || "Default"}
//             </div>
//           )}

//           {/* Price */}
//           <div className="chatbot-price-section">
//             <span className="chatbot-price">₹{price}</span>
//             {hasDiscount && (
//               <>
//                 <span className="chatbot-mrp">₹{mrp}</span>
//                 <span className="chatbot-discount">({discountPercent}% OFF)</span>
//               </>
//             )}
//           </div>

//           {/* Add to Cart Button */}
//           <button 
//             className="chatbot-add-btn"
//             onClick={() => addToCartHandler(product)}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper 
//         slidesPerView={1.2} 
//         spaceBetween={12} 
//         pagination={{ clickable: true }} 
//         navigation 
//         modules={[Pagination, Navigation]}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>
//             {renderProductCard(product)}
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );

//   // 🔥 RENDER TRACKING INPUTS
//   const renderTrackingInputs = () => {
//     switch (trackingStage) {
//       case "email":
//         return (
//           <div className="input-area">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleEmailSubmit} 
//               className="send-btn"
//               disabled={loading}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       case "login":
//         return (
//           <div className="input-area">
//             {showOtpInput ? (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="order-input"
//                   autoFocus
//                 />
//                 <button 
//                   onClick={handleLogin} 
//                   className="send-btn"
//                   disabled={loading}
//                 >
//                   {loading ? "..." : "Verify OTP"}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="order-input"
//                   autoFocus
//                 />
//                 <button 
//                   onClick={handleLogin} 
//                   className="send-btn"
//                   disabled={loading}
//                 >
//                   {loading ? "..." : "Login"}
//                 </button>
//               </>
//             )}
//           </div>
//         );

//       case "shipment":
//         return (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Enter Shipment ID"
//               value={shipmentId}
//               onChange={(e) => setShipmentId(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleShipmentIdSubmit} 
//               className="send-btn"
//               disabled={loading}
//             >
//               {loading ? "..." : "Next"}
//             </button>
//           </div>
//         );

//       case "awb":
//         return (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Enter AWB Number"
//               value={awbNumber}
//               onChange={(e) => setAwbNumber(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleAwbSubmit} 
//               className="send-btn"
//               disabled={loading}
//             >
//               {loading ? "Tracking..." : "Track Order"}
//             </button>
//           </div>
//         );

//       case "result":
//         return (
//           <div className="tracking-result">
//             {trackingResult && (
//               <div className="result-card">
//                 <h6>📦 Tracking Details</h6>
//                 <p><strong>Order ID:</strong> {trackingResult.order?.orderId || shipmentId}</p>
//                 <p><strong>Status:</strong> <span className={`status-${trackingResult.order?.status?.toLowerCase()}`}>
//                   {trackingResult.order?.status}
//                 </span></p>
//                 {trackingResult.order?.shipments?.map((shipment, idx) => (
//                   <div key={idx} className="shipment-info">
//                     <p><strong>AWB:</strong> {shipment.awbNumber || "N/A"}</p>
//                     <p><strong>Carrier:</strong> {shipment.carrier || "N/A"}</p>
//                     <p><strong>Expected Delivery:</strong> {shipment.expectedDelivery ? 
//                       new Date(shipment.expectedDelivery).toLocaleDateString() : "N/A"}</p>
//                   </div>
//                 ))}
//                 <button 
//                   className="btn btn-sm btn-outline-primary mt-2"
//                   onClick={() => {
//                     setTrackingStage("shipment");
//                     setShipmentId("");
//                     setAwbNumber("");
//                     setTrackingResult(null);
//                   }}
//                 >
//                   Track Another Order
//                 </button>
//               </div>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           💬
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div>
//               <p>Joyory Assistant</p>
//               <small>Online</small>
//             </div>
//             <button className="close-btn" onClick={handleClose}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   {m.text} 
//                   {m.data?.slider && renderSlider()}
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div className="loader">
//                 <div className="spinner"></div>
//                 {trackingStage === "awb" ? "Tracking order..." : "Loading..."}
//               </div>
//             )}

//             {/* Render tracking inputs if in order tracking flow */}
//             {stage === "orders" && trackingStage !== "email" && renderTrackingInputs()}

//             {/* Original input areas for other stages */}
//             {(stage.includes("input") || stage === "track-input") && (
//               <div className="input-area">
//                 <input
//                   placeholder="Enter Order ID"
//                   value={orderInput}
//                   onChange={(e) => setOrderInput(e.target.value)}
//                   className="order-input"
//                 />
//                 <button onClick={handleOrderSubmit} className="send-btn">Send</button>
//               </div>
//             )}

//             <div className="options">
//               {stage === "main" &&
//                 MAIN_OPTIONS.map((opt) => (
//                   <button 
//                     key={opt.key} 
//                     className="opt-btn" 
//                     onClick={() => pickMain(opt.key, opt.label)}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "orders" && trackingStage === "email" &&
//                 ORDER_OPTIONS.map((o) => (
//                   <button 
//                     key={o} 
//                     className="opt-btn" 
//                     onClick={() => pickOrderOption(o)}
//                   >
//                     {o}
//                   </button>
//                 ))}

//               {stage === "categories" && (
//                 <>
//                   {SUB_CATEGORIES.map((cat) => (
//                     <button 
//                       className="opt-btn" 
//                       key={cat} 
//                       onClick={() => pickCategory(cat)}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;






























// /* --------------  Chatbot.jsx  –  FULLY UPDATED  -------------- */
// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "../Css/Chatbot.css";
// import { CartContext } from "../context/CartContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const ENDPOINT = "https://beauty.joyory.com/api/user/products/all";
// const VARIANT_CACHE_KEY = "chatbotVariantCache";

// /* ----------  UTILS  ---------- */
// const getSku = (v) => v?.sku || v?.variantSku || null;
// const isBlackHex = (hex) => {
//   if (!hex) return false;
//   const cleaned = String(hex).toLowerCase().replace(/\s/g, "").replace("#", "");
//   return cleaned === "000000" || cleaned === "000" || cleaned === "black";
// };

// /* ----------  CONSTANTS  ---------- */
// const MAIN_OPTIONS = [
//   { key: "products", label: "🛍️ Products" },
//   { key: "orders", label: "📦 Orders" },
//   { key: "support", label: "💬 Support" },
// ];

// const SUB_CATEGORIES = [
//   "Makeup", "Skin", "HairCare", "Face", "Eyeliner", "LipMask", "LipBalm", "Eyes"
// ];

// const ORDER_OPTIONS = [
//   "Track My Order", "Cancel Order", "Return / Refund", "Payment & Invoice", "Contact Support"
// ];

// /* ----------  MAIN COMPONENT  ---------- */
// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage] = useState("main");
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [selectedImages, setSelectedImages] = useState({});
//   const [orderInput, setOrderInput] = useState("");
//   const [showAllVariants, setShowAllVariants] = useState({});

//   /* ----------  TRACKING FLOW  ---------- */
//   const [email, setEmail] = useState("");
//   const [shipmentId, setShipmentId] = useState("");
//   const [awb, setAwb] = useState("");
//   const [trackingData, setTrackingData] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const messagesRef = useRef();
//   const { addToCart } = useContext(CartContext);

//   const scroll = () => messagesRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
//   useEffect(() => scroll(), [messages]);

//   /* ----------  CHECK LOGIN STATUS  ---------- */
//   useEffect(() => {
//     (async () => {
//       try {
//         await axios.get("https://beauty.joyory.com/api/user/profile", { withCredentials: true });
//         setIsLoggedIn(true);
//       } catch {
//         setIsLoggedIn(false);
//       }
//     })();
//   }, []);

//   /* ----------  E-MAIL VALIDATION  ---------- */
//   const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

//   /* ----------  FETCH PRODUCTS  ---------- */
//   const fetchProducts = async () => {
//     const { data } = await axios.get(ENDPOINT);
//     return data.products || data || [];
//   };

//   /* ----------  TRACKING HANDLERS  ---------- */
// const handleEmailSubmit = async () => {
//   if (!isValidEmail(email)) { toast.error("Please enter a valid e-mail"); return; }

//   localStorage.setItem("joyory-chat-email", email);
//   setMessages(prev => [...prev, { from: "user", text: email }]);

//   /* 1.  check if we already have a token in localStorage */
//   const existingToken = localStorage.getItem("joyory-token");
//   if (existingToken) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${existingToken}`;
//   }

//   setLoading(true);
//   try {
//     /* 2.  try profile with token (or without) */
//     await axios.get("https://beauty.joyory.com/api/user/profile", { withCredentials: true });
//     setIsLoggedIn(true);
//     setMessages(prev => [...prev, { from: "bot", text: "Great! Now enter your shipment ID:" }]);
//     setStage("shipment-input");
//   } catch {
//     /* 3.  not valid / no token → force login */
//     setIsLoggedIn(false);
//     setMessages(prev => [...prev, { from: "bot", text: "Please log in to continue. Redirecting…" }]);

//     /* open login page with return url that JS can read */
//     window.open(`/login?returnUrl=${encodeURIComponent(window.location.href)}`, "_blank");

//     /* small loop that waits until token appears */
//     const waitForToken = setInterval(() => {
//       const tk = localStorage.getItem("joyory-token");
//       if (tk) {
//         clearInterval(waitForToken);
//         axios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
//         setIsLoggedIn(true);
//         setMessages(prev => [...prev, { from: "bot", text: "Login successful! Now enter your shipment ID:" }]);
//         setStage("shipment-input");
//       }
//     }, 800);
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleShipmentSubmit = () => {
//     if (!shipmentId.trim()) { toast.error("Shipment ID is required"); return; }
//     setMessages(prev => [...prev, { from: "user", text: shipmentId }]);
//     setMessages(prev => [...prev, { from: "bot", text: "Enter your AWB / tracking number:" }]);
//     setStage("awb-input");
//   };

// const handleAwbSubmit = async () => {
//   if (!awb.trim()) { toast.error("AWB number is required"); return; }
//   setMessages(prev => [...prev, { from: "user", text: awb }]);
//   setMessages(prev => [...prev, { from: "bot", text: "Tracking your order…" }]);

//   /* make sure token is attached */
//   const token = localStorage.getItem("joyory-token");
//   if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//   try {
//     const { data } = await axios.get("https://beauty.joyory.com/api/orders/track", {
//       params: { shipmentId, awb },
//       withCredentials: true          /* cookies + auth header */
//     });
//     setTrackingData(data);
//     setMessages(prev => [...prev, { from: "bot", text: "Here is your tracking info:", data: { tracking: true } }]);
//     setStage("main");
//   } catch (err) {
//     const msg = err.response?.data?.message || "Tracking failed";
//     setMessages(prev => [...prev, { from: "bot", text: msg }]);
//     setStage("main");
//   }
// };

//   /* ----------  EXISTING CODE  ---------- */
//   const handleOpen = () => { setOpen(true); if (!messages.length) greet(); };
//   const handleClose = () => setOpen(false);
//   const greet = () => setMessages([{ from: "bot", text: "Hi! 👋 What can I help you with today?" }]);

//   const pickMain = (key, label) => {
//     setMessages(prev => [...prev, { from: "user", text: label }]);
//     if (key === "products") {
//       setMessages(prev => [...prev, { from: "bot", text: "Choose a category:" }]);
//       setStage("categories");
//       return;
//     }
//     if (key === "orders") {
//       setMessages(prev => [...prev, { from: "bot", text: "Select what you need help with:" }]);
//       setStage("orders");
//       return;
//     }
//     if (key === "support") {
//       setMessages(prev => [...prev, { from: "bot", text: "Email us at support@joyory.in anytime!" }]);
//     }
//   };

//   const pickOrderOption = (option) => {
//     setMessages(prev => [...prev, { from: "user", text: option }]);
//     if (option === "Track My Order") {
//       setMessages(prev => [...prev, { from: "bot", text: "Please enter your e-mail first:" }]);
//       setStage("email-input");
//       return;
//     }
//     setMessages(prev => [...prev, { from: "bot", text: `You selected: ${option}` }]);
//     setStage("main");
//   };

//   const handleOrderSubmit = async () => {
//     setMessages(prev => [...prev, { from: "user", text: orderInput }]);
//     setMessages(prev => [...prev, { from: "bot", text: "Checking your order details…" }]);
//     setStage("main"); setOrderInput("");
//     setMessages(prev => [...prev, { from: "bot", text: `Order Status Example: 📦 Shipped, arriving soon!` }]);
//   };

//   const pickCategory = async (cat) => {
//     setMessages(prev => [...prev, { from: "user", text: cat }]); setLoading(true);
//     const prods = await fetchProducts();
//     const filtered = prods.filter(p => p.category?.name === cat || p.categories?.some(c => c.name === cat) || p.name?.toLowerCase().includes(cat.toLowerCase()));
//     setLoading(false);
//     if (!filtered.length) { setMessages(prev => [...prev, { from: "bot", text: `No products in "${cat}" right now.` }]); return; }
//     setProducts(filtered);
//     setMessages(prev => [...prev, { from: "bot", text: `Found ${filtered.length} products in ${cat}:`, data: { slider: true } }]);
//   };

//   const handleVariantChange = (productId, variant) => {
//     if (variant.stock !== undefined && variant.stock <= 0) { toast.warning("This variant is out of stock"); return; }
//     setSelectedVariants(prev => ({ ...prev, [productId]: { shadeName: variant.shadeName || variant.size || "Default", hex: variant.hex, image: variant.image || variant.images?.[0] || null, discountedPrice: variant.discountedPrice ?? variant.price ?? 0, originalPrice: variant.originalPrice ?? variant.price ?? 0, stock: variant.stock ?? 0, variantSku: getSku(variant) } }));
//     if (variant.image || variant.images?.[0]) setSelectedImages(prev => ({ ...prev, [productId]: variant.image || variant.images[0] }));
//   };

//   const addToCartHandler = async (product) => {
//     try {
//       let isLoggedIn = false;
//       try { await axios.get("https://beauty.joyory.com/api/user/profile", { withCredentials: true }); isLoggedIn = true; } catch { isLoggedIn = false; }
//       const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
//       const selectedVariant = selectedVariants[product._id];
//       let variantToAdd = null;
//       if (hasVariants) {
//         const availableVariants = product.variants.filter(v => v.stock > 0);
//         if (availableVariants.length === 0) { toast.warning("All variants are out of stock."); return; }
//         if (selectedVariant && selectedVariant.variantSku) {
//           const matchedVariant = product.variants.find(v => getSku(v) === selectedVariant.variantSku);
//           if (matchedVariant && matchedVariant.stock > 0) variantToAdd = matchedVariant;
//           else {
//             const matchedByName = product.variants.find(v => (v.shadeName || "").toLowerCase() === (selectedVariant.shadeName || "").toLowerCase());
//             if (matchedByName && matchedByName.stock > 0) variantToAdd = matchedByName;
//           }
//           if (!variantToAdd) { toast.warning("Selected variant is out of stock or unavailable."); return; }
//         } else variantToAdd = availableVariants[0];
//       } else {
//         if (product.stock <= 0) { toast.warning("Product is out of stock."); return; }
//         variantToAdd = { sku: `sku-${product._id}-default`, shadeName: "Default", hex: "#ccc", image: product.images?.[0] || "/placeholder.png", originalPrice: product.mrp || product.price, discountedPrice: product.price, stock: product.stock ?? 1 };
//       }
//       const cache = JSON.parse(localStorage.getItem(VARIANT_CACHE_KEY) || "{}");
//       cache[product._id] = variantToAdd;
//       localStorage.setItem(VARIANT_CACHE_KEY, JSON.stringify(cache));
//       const variantSkuToSend = getSku(variantToAdd) || variantToAdd.sku;
//       const cartPayload = { productId: product._id, variants: [{ variantSku: variantSkuToSend, quantity: 1 }] };
//       if (isLoggedIn) { await addToCart(product, variantToAdd); toast.success("Product added to cart!"); onAddToCart?.(); } else {
//         const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         const existingIndex = guestCart.findIndex(item => item.productId === product._id && item.variantSku === variantSkuToSend);
//         if (existingIndex !== -1) guestCart[existingIndex].quantity += 1; else guestCart.push({ productId: product._id, variantSku: variantSkuToSend, product: product, variant: variantToAdd, quantity: 1 });
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         toast.success("Added to cart as guest!");
//       }
//     } catch (err) {
//       console.error("Add to Cart error:", err?.response?.data || err?.message);
//       toast.error("Failed to add product.");
//     }
//   };

//   const renderProductCard = (product) => {
//     const variants = product.variants || [];
//     const selectedVariant = selectedVariants[product._id] || variants[0] || {};
//     const colorVariants = variants.filter(v => v.hex);
//     const otherVariants = variants.filter(v => !v.hex);
//     const isExpanded = showAllVariants[product._id] || false;
//     const visibleColorVariants = isExpanded ? colorVariants : colorVariants.slice(0, 3);
//     const visibleOtherVariants = isExpanded ? otherVariants : otherVariants.slice(0, 3);
//     const price = Number(selectedVariant?.discountedPrice ?? product.price ?? 0);
//     const mrp = Number(selectedVariant?.originalPrice ?? product.mrp ?? price);
//     const hasDiscount = mrp > price;
//     const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return (
//       <div className="chatbot-product-card">
//         <img
//           src={selectedImages[product._id] || selectedVariant?.image || product.images?.[0]}
//           alt={product.name}
//           className="chatbot-product-image"
//         />
//         <div className="chatbot-product-info">
//           <h6 className="chatbot-product-title">{product.name}</h6>
//           {colorVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleColorVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <div
//                     key={variantSku || `${product._id}-cv-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-color-swatch ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                     style={{ backgroundColor: variant.hex || '#ccc' }}
//                     title={outOfStock ? `${variant.shadeName} (Out of Stock)` : variant.shadeName}
//                   >
//                     {outOfStock && <span className="out-of-stock-cross">✕</span>}
//                   </div>
//                 );
//               })}
//               {colorVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${colorVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}
//           {otherVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleOtherVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <button
//                     key={variantSku || `${product._id}-ov-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-size-btn ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                   >
//                     {variant.size || variant.shadeName || "Option"}
//                   </button>
//                 );
//               })}
//               {otherVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${otherVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}
//           {selectedVariant && (
//             <div className="chatbot-selected-variant">
//               Selected: {selectedVariant.shadeName || selectedVariant.size || "Default"}
//             </div>
//           )}
//           <div className="chatbot-price-section">
//             <span className="chatbot-price">₹{price}</span>
//             {hasDiscount && (
//               <>
//                 <span className="chatbot-mrp">₹{mrp}</span>
//                 <span className="chatbot-discount">({discountPercent}% OFF)</span>
//               </>
//             )}
//           </div>
//           <button className="chatbot-add-btn" onClick={() => addToCartHandler(product)}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper
//         slidesPerView={1.2}
//         spaceBetween={12}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Pagination, Navigation]}
//         breakpoints={{
//           640: { slidesPerView: 1.5 },
//           768: { slidesPerView: 2.2 },
//           1024: { slidesPerView: 2.5 },
//         }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>{renderProductCard(product)}</SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );

//   /* ----------  RENDER  ---------- */
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           💬
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div>
//               <p>Joyory Assistant</p>
//               <small>Online</small>
//             </div>
//             <button className="close-btn" onClick={handleClose}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   {m.text}
//                   {m.data?.slider && renderSlider()}
//                   {m.data?.tracking && trackingData && (
//                     <div className="chatbot-tracking-card">
//                       <h6>Tracking Result</h6>
//                       <p><strong>Status:</strong> {trackingData.status}</p>
//                       <p><strong>AWB:</strong> {trackingData.awb}</p>
//                       {trackingData.expectedDelivery && (
//                         <p><strong>Expected Delivery:</strong> {trackingData.expectedDelivery}</p>
//                       )}
//                       <button className="btn btn-sm btn-outline-primary" onClick={() => window.open(`/order-details/${shipmentId}`, "_blank")}>
//                         View Full Details
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div className="loader">
//                 <div className="spinner"></div>
//                 Loading products...
//               </div>
//             )}

//             {/* ----------  DYNAMIC INPUTS  ---------- */}
//             {stage === "email-input" && (
//               <div className="input-area">
//                 <input placeholder="Enter your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="order-input" />
//                 <button onClick={handleEmailSubmit} className="send-btn">Next</button>
//               </div>
//             )}

//             {stage === "shipment-input" && (
//               <div className="input-area">
//                 <input placeholder="Shipment ID" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} className="order-input" />
//                 <button onClick={handleShipmentSubmit} className="send-btn">Next</button>
//               </div>
//             )}

//             {stage === "awb-input" && (
//               <div className="input-area">
//                 <input placeholder="AWB / Tracking number" value={awb} onChange={(e) => setAwb(e.target.value)} className="order-input" />
//                 <button onClick={handleAwbSubmit} className="send-btn">Track</button>
//               </div>
//             )}

//             {(stage.includes("input") && !["email-input", "shipment-input", "awb-input"].includes(stage)) && (
//               <div className="input-area">
//                 <input placeholder="Enter Order ID" value={orderInput} onChange={(e) => setOrderInput(e.target.value)} className="order-input" />
//                 <button onClick={handleOrderSubmit} className="send-btn">Send</button>
//               </div>
//             )}

//             {/* ----------  OPTION BUTTONS  ---------- */}
//             <div className="options">
//               {stage === "main" &&
//                 MAIN_OPTIONS.map((opt) => (
//                   <button key={opt.key} className="opt-btn" onClick={() => pickMain(opt.key, opt.label)}>
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "orders" && (
//                 <>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Track My Order")}>
//                     Track My Order
//                   </button>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Cancel Order")}>
//                     Cancel Order
//                   </button>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Return / Refund")}>
//                     Return / Refund
//                   </button>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Payment & Invoice")}>
//                     Payment & Invoice
//                   </button>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Contact Support")}>
//                     Contact Support
//                   </button>
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}

//               {stage === "categories" && (
//                 <>
//                   {SUB_CATEGORIES.map((cat) => (
//                     <button className="opt-btn" key={cat} onClick={() => pickCategory(cat)}>
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;





































// /* --------------  Chatbot.jsx  –  FULLY UPDATED  -------------- */
// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "../Css/Chatbot.css";
// import { CartContext } from "../context/CartContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const ENDPOINT = "https://beauty.joyory.com/api/user/products/all";
// const VARIANT_CACHE_KEY = "chatbotVariantCache";

// /* ----------  UTILS  ---------- */
// const getSku = (v) => v?.sku || v?.variantSku || null;
// const isBlackHex = (hex) => {
//   if (!hex) return false;
//   const cleaned = String(hex).toLowerCase().replace(/\s/g, "").replace("#", "");
//   return cleaned === "000000" || cleaned === "000" || cleaned === "black";
// };

// /* ----------  CONSTANTS  ---------- */
// const MAIN_OPTIONS = [
//   { key: "products", label: "🛍️ Products" },
//   { key: "orders", label: "📦 Orders" },
//   { key: "support", label: "💬 Support" },
// ];

// const SUB_CATEGORIES = [
//   "Makeup", "Skin", "HairCare", "Face", "Eyeliner", "LipMask", "LipBalm", "Eyes"
// ];

// /* ----------  MAIN COMPONENT  ---------- */
// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage] = useState("main");
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [selectedImages, setSelectedImages] = useState({});
//   const [orderInput, setOrderInput] = useState("");
//   const [showAllVariants, setShowAllVariants] = useState({});

//   /* ----------  TRACKING FLOW  ---------- */
//   const [email, setEmail] = useState("");
//   const [shipmentId, setShipmentId] = useState("");
//   const [awb, setAwb] = useState("");
//   const [trackingData, setTrackingData] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const messagesRef = useRef();
//   const { addToCart } = useContext(CartContext);

//   const scroll = () => messagesRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
//   useEffect(() => scroll(), [messages]);

//   /* ----------  CHECK LOGIN STATUS  ---------- */
//   useEffect(() => {
//     (async () => {
//       const tk = localStorage.getItem("joyory-token");
//       if (tk) axios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
//       try {
//         await axios.get("https://beauty.joyory.com/api/user/profile", { withCredentials: true });
//         setIsLoggedIn(true);
//       } catch {
//         setIsLoggedIn(false);
//       }
//     })();
//   }, []);

//   /* ----------  E-MAIL VALIDATION  ---------- */
//   const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

//   /* ----------  FETCH PRODUCTS  ---------- */
//   const fetchProducts = async () => {
//     const { data } = await axios.get(ENDPOINT);
//     return data.products || data || [];
//   };

//   /* ----------  TRACKING HANDLERS  ---------- */
//   const handleEmailSubmit = async () => {
//     if (!isValidEmail(email)) { toast.error("Please enter a valid e-mail"); return; }
//     localStorage.setItem("joyory-chat-email", email);
//     setMessages(prev => [...prev, { from: "user", text: email }]);

//     const existingToken = localStorage.getItem("joyory-token");
//     if (existingToken) axios.defaults.headers.common["Authorization"] = `Bearer ${existingToken}`;

//     setLoading(true);
//     try {
//       await axios.get("https://beauty.joyory.com/api/user/profile", { withCredentials: true });
//       setIsLoggedIn(true);
//       setMessages(prev => [...prev, { from: "bot", text: "Great! Now enter your shipment ID:" }]);
//       setStage("shipment-input");
//     } catch {
//       setIsLoggedIn(false);
//       setMessages(prev => [...prev, { from: "bot", text: "Please log in to continue. Redirecting…" }]);
//       window.open(`/login?returnUrl=${encodeURIComponent(window.location.href)}`, "_blank");

//       const waitForToken = setInterval(() => {
//         const tk = localStorage.getItem("joyory-token");
//         if (tk) {
//           clearInterval(waitForToken);
//           axios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
//           setIsLoggedIn(true);
//           setMessages(prev => [...prev, { from: "bot", text: "Login successful! Now enter your shipment ID:" }]);
//           setStage("shipment-input");
//         }
//       }, 800);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleShipmentSubmit = () => {
//     if (!shipmentId.trim()) { toast.error("Shipment ID is required"); return; }
//     setMessages(prev => [...prev, { from: "user", text: shipmentId }]);
//     setMessages(prev => [...prev, { from: "bot", text: "Enter your AWB / tracking number:" }]);
//     setStage("awb-input");
//   };

//   const handleAwbSubmit = async () => {
//     if (!awb.trim()) { toast.error("AWB number is required"); return; }
//     setMessages(prev => [...prev, { from: "user", text: awb }]);
//     setMessages(prev => [...prev, { from: "bot", text: "Tracking your order…" }]);

//     const token = localStorage.getItem("joyory-token");
//     if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//     try {
//       const { data } = await axios.get("https://beauty.joyory.com/api/orders/track", {
//         params: { shipmentId, awb },
//         withCredentials: true
//       });
//       setTrackingData(data);
//       setMessages(prev => [...prev, { from: "bot", text: "Here is your tracking info:", data: { tracking: true } }]);
//       setStage("main");
//     } catch (err) {
//       const msg = err.response?.data?.message || "Tracking failed";
//       setMessages(prev => [...prev, { from: "bot", text: msg }]);
//       setStage("main");
//     }
//   };

//   /* ----------  REST OF ORIGINAL CODE  ---------- */
//   const handleOpen = () => { setOpen(true); if (!messages.length) greet(); };
//   const handleClose = () => setOpen(false);
//   const greet = () => setMessages([{ from: "bot", text: "Hi! 👋 What can I help you with today?" }]);

//   const pickMain = (key, label) => {
//     setMessages(prev => [...prev, { from: "user", text: label }]);
//     if (key === "products") {
//       setMessages(prev => [...prev, { from: "bot", text: "Choose a category:" }]);
//       setStage("categories"); return;
//     }
//     if (key === "orders") {
//       setMessages(prev => [...prev, { from: "bot", text: "Select what you need help with:" }]);
//       setStage("orders"); return;
//     }
//     if (key === "support") {
//       setMessages(prev => [...prev, { from: "bot", text: "Email us at support@joyory.in anytime!" }]);
//     }
//   };

//   const pickOrderOption = (option) => {
//     setMessages(prev => [...prev, { from: "user", text: option }]);
//     if (option === "Track My Order") {
//       setMessages(prev => [...prev, { from: "bot", text: "Please enter your e-mail first:" }]);
//       setStage("email-input"); return;
//     }
//     setMessages(prev => [...prev, { from: "bot", text: `You selected: ${option}` }]);
//     setStage("main");
//   };

//   const handleOrderSubmit = async () => {
//     setMessages(prev => [...prev, { from: "user", text: orderInput }]);
//     setMessages(prev => [...prev, { from: "bot", text: "Checking your order details…" }]);
//     setStage("main"); setOrderInput("");
//     setMessages(prev => [...prev, { from: "bot", text: `Order Status Example: 📦 Shipped, arriving soon!` }]);
//   };

//   const pickCategory = async (cat) => {
//     setMessages(prev => [...prev, { from: "user", text: cat }]); setLoading(true);
//     const prods = await fetchProducts();
//     const filtered = prods.filter(p => p.category?.name === cat || p.categories?.some(c => c.name === cat) || p.name?.toLowerCase().includes(cat.toLowerCase()));
//     setLoading(false);
//     if (!filtered.length) { setMessages(prev => [...prev, { from: "bot", text: `No products in "${cat}" right now.` }]); return; }
//     setProducts(filtered);
//     setMessages(prev => [...prev, { from: "bot", text: `Found ${filtered.length} products in ${cat}:`, data: { slider: true } }]);
//   };

//   const handleVariantChange = (productId, variant) => {
//     if (variant.stock !== undefined && variant.stock <= 0) { toast.warning("This variant is out of stock"); return; }
//     setSelectedVariants(prev => ({ ...prev, [productId]: { shadeName: variant.shadeName || variant.size || "Default", hex: variant.hex, image: variant.image || variant.images?.[0] || null, discountedPrice: variant.discountedPrice ?? variant.price ?? 0, originalPrice: variant.originalPrice ?? variant.price ?? 0, stock: variant.stock ?? 0, variantSku: getSku(variant) } }));
//     if (variant.image || variant.images?.[0]) setSelectedImages(prev => ({ ...prev, [productId]: variant.image || variant.images[0] }));
//   };

//   const addToCartHandler = async (product) => {
//     try {
//       let isLoggedIn = false;
//       try { await axios.get("https://beauty.joyory.com/api/user/profile", { withCredentials: true }); isLoggedIn = true; } catch { isLoggedIn = false; }
//       const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
//       const selectedVariant = selectedVariants[product._id];
//       let variantToAdd = null;
//       if (hasVariants) {
//         const availableVariants = product.variants.filter(v => v.stock > 0);
//         if (availableVariants.length === 0) { toast.warning("All variants are out of stock."); return; }
//         if (selectedVariant && selectedVariant.variantSku) {
//           const matchedVariant = product.variants.find(v => getSku(v) === selectedVariant.variantSku);
//           if (matchedVariant && matchedVariant.stock > 0) variantToAdd = matchedVariant;
//           else {
//             const matchedByName = product.variants.find(v => (v.shadeName || "").toLowerCase() === (selectedVariant.shadeName || "").toLowerCase());
//             if (matchedByName && matchedByName.stock > 0) variantToAdd = matchedByName;
//           }
//           if (!variantToAdd) { toast.warning("Selected variant is out of stock or unavailable."); return; }
//         } else variantToAdd = availableVariants[0];
//       } else {
//         if (product.stock <= 0) { toast.warning("Product is out of stock."); return; }
//         variantToAdd = { sku: `sku-${product._id}-default`, shadeName: "Default", hex: "#ccc", image: product.images?.[0] || "/placeholder.png", originalPrice: product.mrp || product.price, discountedPrice: product.price, stock: product.stock ?? 1 };
//       }
//       const cache = JSON.parse(localStorage.getItem(VARIANT_CACHE_KEY) || "{}");
//       cache[product._id] = variantToAdd;
//       localStorage.setItem(VARIANT_CACHE_KEY, JSON.stringify(cache));
//       const variantSkuToSend = getSku(variantToAdd) || variantToAdd.sku;
//       if (isLoggedIn) { await addToCart(product, variantToAdd); toast.success("Product added to cart!"); onAddToCart?.(); } else {
//         const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         const existingIndex = guestCart.findIndex(item => item.productId === product._id && item.variantSku === variantSkuToSend);
//         if (existingIndex !== -1) guestCart[existingIndex].quantity += 1; else guestCart.push({ productId: product._id, variantSku: variantSkuToSend, product: product, variant: variantToAdd, quantity: 1 });
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         toast.success("Added to cart as guest!");
//       }
//     } catch (err) {
//       console.error("Add to Cart error:", err?.response?.data || err?.message);
//       toast.error("Failed to add product.");
//     }
//   };

//   const renderProductCard = (product) => {
//     const variants = product.variants || [];
//     const selectedVariant = selectedVariants[product._id] || variants[0] || {};
//     const colorVariants = variants.filter(v => v.hex);
//     const otherVariants = variants.filter(v => !v.hex);
//     const isExpanded = showAllVariants[product._id] || false;
//     const visibleColorVariants = isExpanded ? colorVariants : colorVariants.slice(0, 3);
//     const visibleOtherVariants = isExpanded ? otherVariants : otherVariants.slice(0, 3);
//     const price = Number(selectedVariant?.discountedPrice ?? product.price ?? 0);
//     const mrp = Number(selectedVariant?.originalPrice ?? product.mrp ?? price);
//     const hasDiscount = mrp > price;
//     const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return (
//       <div className="chatbot-product-card">
//         <img
//           src={selectedImages[product._id] || selectedVariant?.image || product.images?.[0]}
//           alt={product.name}
//           className="chatbot-product-image"
//         />
//         <div className="chatbot-product-info">
//           <h6 className="chatbot-product-title">{product.name}</h6>
//           {colorVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleColorVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <div
//                     key={variantSku || `${product._id}-cv-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-color-swatch ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                     style={{ backgroundColor: variant.hex || '#ccc' }}
//                     title={outOfStock ? `${variant.shadeName} (Out of Stock)` : variant.shadeName}
//                   >
//                     {outOfStock && <span className="out-of-stock-cross">✕</span>}
//                   </div>
//                 );
//               })}
//               {colorVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${colorVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}
//           {otherVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleOtherVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <button
//                     key={variantSku || `${product._id}-ov-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-size-btn ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                   >
//                     {variant.size || variant.shadeName || "Option"}
//                   </button>
//                 );
//               })}
//               {otherVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${otherVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}
//           {selectedVariant && (
//             <div className="chatbot-selected-variant">
//               Selected: {selectedVariant.shadeName || selectedVariant.size || "Default"}
//             </div>
//           )}
//           <div className="chatbot-price-section">
//             <span className="chatbot-price">₹{price}</span>
//             {hasDiscount && (
//               <>
//                 <span className="chatbot-mrp">₹{mrp}</span>
//                 <span className="chatbot-discount">({discountPercent}% OFF)</span>
//               </>
//             )}
//           </div>
//           <button className="chatbot-add-btn" onClick={() => addToCartHandler(product)}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper
//         slidesPerView={1.2}
//         spaceBetween={12}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Pagination, Navigation]}
//         breakpoints={{
//           640: { slidesPerView: 1.5 },
//           768: { slidesPerView: 2.2 },
//           1024: { slidesPerView: 2.5 },
//         }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>{renderProductCard(product)}</SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );

//   /* ----------  RENDER  ---------- */
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           💬
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div>
//               <p>Joyory Assistant</p>
//               <small>Online</small>
//             </div>
//             <button className="close-btn" onClick={handleClose}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   {m.text}
//                   {m.data?.slider && renderSlider()}
//                   {m.data?.tracking && trackingData && (
//                     <div className="chatbot-tracking-card">
//                       <h6>Tracking Result</h6>
//                       <p><strong>Status:</strong> {trackingData.status}</p>
//                       <p><strong>AWB:</strong> {trackingData.awb}</p>
//                       {trackingData.expectedDelivery && (
//                         <p><strong>Expected Delivery:</strong> {trackingData.expectedDelivery}</p>
//                       )}
//                       <button className="btn btn-sm btn-outline-primary" onClick={() => window.open(`/order-details/${shipmentId}`, "_blank")}>
//                         View Full Details
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div className="loader">
//                 <div className="spinner"></div>
//                 Loading products...
//               </div>
//             )}

//             {/* ----------  DYNAMIC INPUTS  ---------- */}
//             {stage === "email-input" && (
//               <div className="input-area">
//                 <input placeholder="Enter your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="order-input" />
//                 <button onClick={handleEmailSubmit} className="send-btn">Next</button>
//               </div>
//             )}

//             {stage === "shipment-input" && (
//               <div className="input-area">
//                 <input placeholder="Shipment ID" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} className="order-input" />
//                 <button onClick={handleShipmentSubmit} className="send-btn">Next</button>
//               </div>
//             )}

//             {stage === "awb-input" && (
//               <div className="input-area">
//                 <input placeholder="AWB / Tracking number" value={awb} onChange={(e) => setAwb(e.target.value)} className="order-input" />
//                 <button onClick={handleAwbSubmit} className="send-btn">Track</button>
//               </div>
//             )}

//             {(stage.includes("input") && !["email-input", "shipment-input", "awb-input"].includes(stage)) && (
//               <div className="input-area">
//                 <input placeholder="Enter Order ID" value={orderInput} onChange={(e) => setOrderInput(e.target.value)} className="order-input" />
//                 <button onClick={handleOrderSubmit} className="send-btn">Send</button>
//               </div>
//             )}

//             {/* ----------  OPTION BUTTONS  ---------- */}
//             <div className="options">
//               {stage === "main" &&
//                 MAIN_OPTIONS.map((opt) => (
//                   <button key={opt.key} className="opt-btn" onClick={() => pickMain(opt.key, opt.label)}>
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "orders" && (
//                 <>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Track My Order")}>
//                     Track My Order
//                   </button>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Cancel Order")}>
//                     Cancel Order
//                   </button>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Return / Refund")}>
//                     Return / Refund
//                   </button>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Payment & Invoice")}>
//                     Payment & Invoice
//                   </button>
//                   <button className="opt-btn" onClick={() => pickOrderOption("Contact Support")}>
//                     Contact Support
//                   </button>
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}

//               {stage === "categories" && (
//                 <>
//                   {SUB_CATEGORIES.map((cat) => (
//                     <button className="opt-btn" key={cat} onClick={() => pickCategory(cat)}>
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;
































// // src/components/Chatbot.jsx
// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "../Css/Chatbot.css";
// import { CartContext } from "../context/CartContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const ENDPOINT = "https://beauty.joyory.com/api/user/products/all";
// const SHIPMENT_API = "https://beauty.joyory.com/api/user/cart/shipment"; // 🔥 USING THE CORRECT API
// const LOGIN_API = "https://beauty.joyory.com/api/user/login";
// const PROFILE_API = "https://beauty.joyory.com/api/user/profile";

// const VARIANT_CACHE_KEY = "chatbotVariantCache";

// /* ----------  UTILS  ---------- */
// const getSku = (v) => v?.sku || v?.variantSku || null;
// const isBlackHex = (hex) => {
//   if (!hex) return false;
//   const cleaned = String(hex).toLowerCase().replace(/\s/g, "").replace("#", "");
//   return cleaned === "000000" || cleaned === "000" || cleaned === "black";
// };

// /* ----------  CONSTANTS  ---------- */
// const MAIN_OPTIONS = [
//   { key: "products", label: "🛍️ Products" },
//   { key: "orders", label: "📦 Orders" },
//   { key: "support", label: "💬 Support" },
// ];

// const ORDER_OPTIONS = [
//   { key: "track", label: "📦 Track My Order" },
//   { key: "cancel", label: "❌ Cancel Order" },
//   { key: "return", label: "🔄 Return / Refund" },
//   { key: "invoice", label: "🧾 Payment & Invoice" },
//   { key: "support", label: "💬 Contact Support" },
// ];

// const SUB_CATEGORIES = [
//   "Makeup", "Skin", "HairCare", "Face", "Eyeliner", "LipMask", "LipBalm", "Eyes"
// ];

// /* ----------  FORMAT DATE UTILITY  ---------- */
// const formatDate = (dateStr) => {
//   if (!dateStr) return "N/A";
//   const d = new Date(dateStr);
//   return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${d.getFullYear()}`;
// };

// /* ----------  MAIN COMPONENT  ---------- */
// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage] = useState("main");
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [selectedImages, setSelectedImages] = useState({});
//   const [showAllVariants, setShowAllVariants] = useState({});

//   /* ----------  TRACKING FLOW STATES  ---------- */
//   const [trackingStage, setTrackingStage] = useState("check-auth"); // check-auth -> login -> shipment -> result
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [shipmentId, setShipmentId] = useState("");
//   const [trackingData, setTrackingData] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authChecked, setAuthChecked] = useState(false);

//   const messagesRef = useRef();
//   const { addToCart } = useContext(CartContext);

//   const scroll = () => messagesRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
//   useEffect(() => scroll(), [messages]);


//   useEffect(() => {
//   if (open) checkAuthentication();
// }, [open]);



//   const checkAuthentication = async () => {
//   try {
//     await axios.get(PROFILE_API, { withCredentials: true });
//     setIsLoggedIn(true);
//   } catch {
//     setIsLoggedIn(false);
//   }
// };

//   /* ----------  INITIALIZE CHAT  ---------- */
//   const handleOpen = () => {
//     setOpen(true);
//     if (!messages.length) greet();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     resetTrackingFlow();
//   };

//   const greet = () => {
//     setMessages([{ from: "bot", text: "Hi! 👋 What can I help you with today?" }]);
//   };

//   /* ----------  RESET TRACKING FLOW  ---------- */
//   const resetTrackingFlow = () => {
//     setTrackingStage("check-auth");
//     setEmail("");
//     setPassword("");
//     setShipmentId("");
//     setTrackingData(null);
//     setAuthChecked(false);
//   };

//   /* ----------  FETCH PRODUCTS  ---------- */
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(ENDPOINT);
//       return res.data.products || [];
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       return [];
//     }
//   };

//   /* ----------  MAIN MENU HANDLERS  ---------- */
//   const pickMain = (key, label) => {
//     setMessages((prev) => [...prev, { from: "user", text: label }]);
    
//     if (key === "products") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Choose a category:" }]);
//       setStage("categories");
//     } else if (key === "orders") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Select what you need help with:" }]);
//       setStage("orders");
//     } else if (key === "support") {
//       setMessages((prev) => [...prev, { from: "bot", text: "📧 Email us at: support@joyory.in\n📞 Call us at: 1800-XXX-XXXX\n⏰ Support Hours: 9 AM - 6 PM (Mon-Sat)" }]);
//     }
//   };

//   /* ----------  ORDER OPTIONS HANDLER  ---------- */
//   const pickOrderOption = (option) => {
//     setMessages((prev) => [...prev, { from: "user", text: option.label }]);
    
//     if (option.key === "track") {
//       startOrderTracking();
//     } else {
//       // For other options, show appropriate message
//       let response = "";
//       switch (option.key) {
//         case "cancel":
//           response = "To cancel your order, please:\n1. Go to 'My Orders' section\n2. Select the order you want to cancel\n3. Click 'Cancel Order' button\n\nYou can cancel within 24 hours of order placement.";
//           break;
//         case "return":
//           response = "For returns/refunds:\n1. Products can be returned within 7 days of delivery\n2. Items must be unused and in original packaging\n3. Visit 'My Orders' to initiate return\n\nRefunds are processed within 5-7 business days.";
//           break;
//         case "invoice":
//           response = "To download invoice:\n1. Go to 'My Orders'\n2. Click on the order\n3. Click 'Download Invoice' button\n\nYou can also email billing@joyory.in for invoice requests.";
//           break;
//         case "support":
//           response = "Our support team will contact you within 24 hours.\n\nYou can also:\n📧 Email: support@joyory.in\n📞 Call: 1800-XXX-XXXX\n💬 WhatsApp: +91-XXXXXXXXXX";
//           break;
//       }
      
//       setMessages((prev) => [...prev, { from: "bot", text: response }]);
//       setStage("main");
//     }
//   };

//   /* ----------  ORDER TRACKING FLOW  ---------- */
//   const startOrderTracking = () => {
//     resetTrackingFlow();
    
//     if (!authChecked) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "🔐 Checking your login status..." }
//       ]);
//       checkAuthentication();
//     }
    
//     if (isLoggedIn) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "✅ You're logged in! Please enter your Shipment ID:" }
//       ]);
//       setTrackingStage("shipment");
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your email address to continue:" }
//       ]);
//       setTrackingStage("login-email");
//     }
//   };

//   /* ----------  EMAIL INPUT HANDLER  ---------- */
//   const handleEmailSubmit = async () => {
//     if (!email || !validateEmail(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: email }]);
    
//     // Check if user exists with this email
//     try {
//       setLoading(true);
      
//       // In real implementation, you would check if email exists
//       // For now, we'll ask for password
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your password:" }
//       ]);
//       setTrackingStage("login-password");
      
//     } catch (error) {
//       console.error("Error checking email:", error);
//       toast.error("Error checking email. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async () => {
//   if (!password) { toast.error("Please enter your password"); return; }

//   try {
//     setLoading(true);
//     await axios.post(LOGIN_API, { email, password }, { withCredentials: true });
//     setIsLoggedIn(true);
//     setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Shipment ID:" }]);
//     setTrackingStage("shipment");
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Login failed");
//   } finally {
//     setLoading(false);
//   }
// };



//   /* ----------  SHIPMENT ID HANDLER  ---------- */
//   const handleShipmentSubmit = async () => {
//     if (!shipmentId.trim()) {
//       toast.error("Please enter a valid Shipment ID");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: shipmentId }]);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "🔍 Tracking your order..." }
//     ]);
    
//     setLoading(true);
    
//     try {
//       // Use the same API as OrderDetails page
//       const response = await axios.get(`${SHIPMENT_API}/${shipmentId}`, {
//         withCredentials: true
//       });

//       if (response.data?.success) {
//         setTrackingData(response.data);
//         displayTrackingInfo(response.data);
//         setTrackingStage("result");
//       } else {
//         throw new Error("Failed to fetch shipment details");
//       }
//     } catch (error) {
//       console.error("Tracking error:", error);
      
//       let errorMessage = "❌ Unable to track order. ";
      
//       if (error.response?.status === 401) {
//         errorMessage += "You need to login first. ";
//         setIsLoggedIn(false);
//         setTrackingStage("login-email");
//       } else if (error.response?.status === 404) {
//         errorMessage += "Shipment not found. Please check the Shipment ID.";
//       } else {
//         errorMessage += error.response?.data?.message || error.message || "Please try again.";
//       }
      
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: errorMessage }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------  DISPLAY TRACKING INFO  ---------- */
//   const displayTrackingInfo = (data) => {
//     const shipment = data;
    
//     let trackingMessage = "📦 **Order Tracking Details**\n\n";
//     trackingMessage += `**Shipment ID:** ${shipment.shipmentId}\n`;
    
//     if (shipment.orderInfo?.orderId) {
//       trackingMessage += `**Order ID:** ${shipment.orderInfo.orderId}\n`;
//     }
    
//     trackingMessage += `**Status:** ${getStatusWithIcon(shipment.shipmentStatus)}\n`;
    
//     if (shipment.expectedDelivery) {
//       trackingMessage += `**Expected Delivery:** ${formatDate(shipment.expectedDelivery)}\n`;
//     }
    
//     if (shipment.courier?.awb) {
//       trackingMessage += `**AWB Number:** ${shipment.courier.awb}\n`;
//     }
    
//     if (shipment.courier?.trackingUrl) {
//       trackingMessage += `**Tracking Link:** ${shipment.courier.trackingUrl}\n`;
//     }
    
//     // Add product information
//     if (shipment.products?.length > 0) {
//       trackingMessage += `\n**Products (${shipment.products.length}):**\n`;
//       shipment.products.forEach((product, index) => {
//         trackingMessage += `${index + 1}. ${product.name} - ${product.variant || "Standard"}\n`;
//       });
//     }
    
//     trackingMessage += `\n👉 **View full details:** [Click here to open Order Details page]`;
    
//     setMessages((prev) => [
//       ...prev,
//       { 
//         from: "bot", 
//         text: trackingMessage,
//         data: { 
//           tracking: true,
//           shipmentId: shipment.shipmentId,
//           trackingUrl: shipment.courier?.trackingUrl
//         }
//       }
//     ]);
//   };

//   /* ----------  VALIDATION FUNCTIONS  ---------- */
//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const getStatusWithIcon = (status) => {
//     const statusLower = status?.toLowerCase() || "";
//     switch (statusLower) {
//       case "confirmed": return "✅ Confirmed";
//       case "shipped": return "🚚 Shipped";
//       case "delivered": return "📦 Delivered";
//       case "cancelled": return "❌ Cancelled";
//       case "pending": return "⏳ Pending";
//       default: return status || "Unknown";
//     }
//   };

//   /* ----------  PRODUCT CATEGORY HANDLER  ---------- */
//   const pickCategory = async (cat) => {
//     setMessages((prev) => [...prev, { from: "user", text: cat }]);
//     setLoading(true);

//     const prods = await fetchProducts();
//     const filtered = prods.filter((p) => 
//       p.category?.name === cat || 
//       p.categories?.some(c => c.name === cat) ||
//       p.name?.toLowerCase().includes(cat.toLowerCase())
//     );

//     setLoading(false);
//     if (!filtered.length) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `No products in "${cat}" right now.` },
//       ]);
//       return;
//     }

//     setProducts(filtered);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: `Found ${filtered.length} products in ${cat}:`, data: { slider: true } },
//     ]);
//   };

//   /* ----------  PRODUCT VARIANT HANDLERS  ---------- */
//   useEffect(() => {
//     if (products.length === 0) return;

//     const defaultVariants = {};
//     const defaultImages = {};

//     products.forEach((product) => {
//       const variants = product.variants || [];
//       if (variants.length === 0) return;

//       const blackVariant = variants.find((v) => isBlackHex(v?.hex));
//       const selected = blackVariant || variants[0];

//       defaultVariants[product._id] = {
//         shadeName: selected?.shadeName || selected?.size || "Default",
//         hex: selected?.hex,
//         image: selected?.image || selected?.images?.[0] || null,
//         discountedPrice: selected?.discountedPrice ?? selected?.price ?? 0,
//         originalPrice: selected?.originalPrice ?? selected?.price ?? 0,
//         stock: selected?.stock ?? 0,
//         variantSku: getSku(selected),
//       };

//       defaultImages[product._id] = selected?.image || selected?.images?.[0] || product?.images?.[0] || null;
//     });

//     setSelectedVariants(defaultVariants);
//     setSelectedImages(defaultImages);
//   }, [products]);

//   const handleVariantChange = (productId, variant) => {
//     if (variant.stock !== undefined && variant.stock <= 0) {
//       toast.warning("This variant is out of stock");
//       return;
//     }

//     setSelectedVariants((prev) => ({
//       ...prev,
//       [productId]: {
//         shadeName: variant.shadeName || variant.size || "Default",
//         hex: variant.hex,
//         image: variant.image || variant.images?.[0] || null,
//         discountedPrice: variant.discountedPrice ?? variant.price ?? 0,
//         originalPrice: variant.originalPrice ?? variant.price ?? 0,
//         stock: variant.stock ?? 0,
//         variantSku: getSku(variant),
//       },
//     }));

//     if (variant.image || variant.images?.[0]) {
//       setSelectedImages((prev) => ({
//         ...prev,
//         [productId]: variant.image || variant.images[0],
//       }));
//     }
//   };

//   const addToCartHandler = async (product) => {
//     try {
//       let isLoggedIn = false;
//       try {
//         await axios.get(PROFILE_API, { withCredentials: true });
//         isLoggedIn = true;
//       } catch {
//         isLoggedIn = false;
//       }

//       const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
//       const selectedVariant = selectedVariants[product._id];
//       let variantToAdd = null;

//       if (hasVariants) {
//         const availableVariants = product.variants.filter((v) => v.stock > 0);
//         if (availableVariants.length === 0) {
//           toast.warning("All variants are out of stock.");
//           return;
//         }

//         if (selectedVariant && selectedVariant.variantSku) {
//           const matchedVariant = product.variants.find((v) => getSku(v) === selectedVariant.variantSku);
//           if (matchedVariant && matchedVariant.stock > 0) {
//             variantToAdd = matchedVariant;
//           } else {
//             const matchedByName = product.variants.find((v) => 
//               (v.shadeName || "").toLowerCase() === (selectedVariant.shadeName || "").toLowerCase()
//             );
//             if (matchedByName && matchedByName.stock > 0) variantToAdd = matchedByName;
//           }
//           if (!variantToAdd) {
//             toast.warning("Selected variant is out of stock or unavailable.");
//             return;
//           }
//         } else {
//           variantToAdd = availableVariants[0];
//         }
//       } else {
//         if (product.stock <= 0) {
//           toast.warning("Product is out of stock.");
//           return;
//         }
//         variantToAdd = {
//           sku: `sku-${product._id}-default`,
//           shadeName: "Default",
//           hex: "#ccc",
//           image: product.images?.[0] || "/placeholder.png",
//           originalPrice: product.mrp || product.price,
//           discountedPrice: product.price,
//           stock: product.stock ?? 1,
//         };
//       }

//       const cache = JSON.parse(localStorage.getItem(VARIANT_CACHE_KEY) || "{}");
//       cache[product._id] = variantToAdd;
//       localStorage.setItem(VARIANT_CACHE_KEY, JSON.stringify(cache));

//       const variantSkuToSend = getSku(variantToAdd) || variantToAdd.sku;
//       const cartPayload = {
//         productId: product._id,
//         variants: [{ variantSku: variantSkuToSend, quantity: 1 }],
//       };

//       if (isLoggedIn) {
//         await addToCart(product, variantToAdd);
//         toast.success("Product added to cart!");
//         onAddToCart?.();
//       } else {
//         const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         const existingIndex = guestCart.findIndex(
//           (item) => item.productId === product._id && item.variantSku === variantSkuToSend
//         );
//         if (existingIndex !== -1) {
//           guestCart[existingIndex].quantity += 1;
//         } else {
//           guestCart.push({ 
//             productId: product._id, 
//             variantSku: variantSkuToSend, 
//             product: product, 
//             variant: variantToAdd, 
//             quantity: 1 
//           });
//         }
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         toast.success("Added to cart as guest!");
//       }
//     } catch (err) {
//       console.error("Add to Cart error:", err?.response?.data || err?.message);
//       toast.error("Failed to add product.");
//     }
//   };

//   /* ----------  RENDER PRODUCT CARD  ---------- */
//   const renderProductCard = (product) => {
//     const variants = product.variants || [];
//     const selectedVariant = selectedVariants[product._id] || variants[0] || {};
    
//     const colorVariants = variants.filter((v) => v.hex);
//     const otherVariants = variants.filter((v) => !v.hex);
    
//     const isExpanded = showAllVariants[product._id] || false;
//     const visibleColorVariants = isExpanded ? colorVariants : colorVariants.slice(0, 3);
//     const visibleOtherVariants = isExpanded ? otherVariants : otherVariants.slice(0, 3);

//     const price = Number(selectedVariant?.discountedPrice ?? product.price ?? 0);
//     const mrp = Number(selectedVariant?.originalPrice ?? product.mrp ?? price);
//     const hasDiscount = mrp > price;
//     const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return (
//       <div className="chatbot-product-card">
//         <img
//           src={selectedImages[product._id] || selectedVariant?.image || product.images?.[0]}
//           alt={product.name}
//           className="chatbot-product-image"
//         />
//         <div className="chatbot-product-info">
//           <h6 className="chatbot-product-title">{product.name}</h6>

//           {colorVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleColorVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <div
//                     key={variantSku || `${product._id}-cv-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-color-swatch ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                     style={{ backgroundColor: variant.hex || '#ccc' }}
//                     title={outOfStock ? `${variant.shadeName} (Out of Stock)` : variant.shadeName}
//                   >
//                     {outOfStock && <span className="out-of-stock-cross">✕</span>}
//                   </div>
//                 );
//               })}
//               {colorVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${colorVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {otherVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleOtherVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <button
//                     key={variantSku || `${product._id}-ov-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-size-btn ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                   >
//                     {variant.size || variant.shadeName || "Option"}
//                   </button>
//                 );
//               })}
//               {otherVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${otherVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {selectedVariant && (
//             <div className="chatbot-selected-variant">
//               Selected: {selectedVariant.shadeName || selectedVariant.size || "Default"}
//             </div>
//           )}

//           <div className="chatbot-price-section">
//             <span className="chatbot-price">₹{price}</span>
//             {hasDiscount && (
//               <>
//                 <span className="chatbot-mrp">₹{mrp}</span>
//                 <span className="chatbot-discount">({discountPercent}% OFF)</span>
//               </>
//             )}
//           </div>
//           <button className="chatbot-add-btn" onClick={() => addToCartHandler(product)}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     );
//   };

//   /* ----------  RENDER PRODUCT SLIDER  ---------- */
//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper
//         slidesPerView={1.2}
//         spaceBetween={12}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Pagination, Navigation]}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 1 },
//           1024: { slidesPerView: 1 },
//         }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>{renderProductCard(product)}</SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );

//   /* ----------  RENDER TRACKING INPUTS  ---------- */
//   const renderTrackingInputs = () => {
//     switch (trackingStage) {
//       case "login-email":
//         return (
//           <div className="input-area">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleEmailSubmit} 
//               className="send-btn"
//               disabled={loading || !email}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       case "login-password":
//         return (
//           <div className="input-area">
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleLogin} 
//               className="send-btn"
//               disabled={loading || !password}
//             >
//               {loading ? "..." : "Login"}
//             </button>
//           </div>
//         );

//       case "shipment":
//         return (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Enter Shipment ID"
//               value={shipmentId}
//               onChange={(e) => setShipmentId(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleShipmentSubmit} 
//               className="send-btn"
//               disabled={loading || !shipmentId}
//             >
//               {loading ? "..." : "Track"}
//             </button>
//           </div>
//         );

//       case "result":
//         return (
//           <div className="tracking-result-actions">
//             <button 
//               className="btn btn-primary btn-sm me-2"
//               onClick={() => {
//                 // Open order details page
//                 window.open(`/order-details/${shipmentId}`, "_blank");
//               }}
//             >
//               View Full Details
//             </button>
//             <button 
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => {
//                 setStage("main");
//                 resetTrackingFlow();
//               }}
//             >
//               Back to Main
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   /* ----------  MAIN RENDER  ---------- */
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           💬
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div>
//               <p>Joyory Assistant</p>
//               <small>Online</small>
//             </div>
//             <button className="close-btn" onClick={handleClose}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {/* Messages */}
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   <div className="message-text" style={{ whiteSpace: 'pre-line' }}>
//                     {m.text}
//                     {m.data?.trackingUrl && (
//                       <div style={{ marginTop: '10px' }}>
//                         <a 
//                           href={m.data.trackingUrl} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-sm btn-outline-primary"
//                         >
//                           Track on Courier Site
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                   {m.data?.slider && renderSlider()}
//                 </div>
//               </div>
//             ))}

//             {/* Loading Indicator */}
//             {loading && (
//               <div className="loader">
//                 <div className="spinner"></div>
//                 {trackingStage === "shipment" ? "Tracking order..." : "Loading..."}
//               </div>
//             )}

//             {/* Tracking Inputs */}
//             {stage === "orders" && renderTrackingInputs()}

//             {/* Options */}
//             <div className="options">
//               {stage === "main" &&
//                 MAIN_OPTIONS.map((opt) => (
//                   <button 
//                     key={opt.key} 
//                     className="opt-btn" 
//                     onClick={() => pickMain(opt.key, opt.label)}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "orders" && trackingStage === "check-auth" &&
//                 ORDER_OPTIONS.map((opt) => (
//                   <button 
//                     key={opt.key} 
//                     className="opt-btn" 
//                     onClick={() => pickOrderOption(opt)}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "categories" && (
//                 <>
//                   {SUB_CATEGORIES.map((cat) => (
//                     <button 
//                       className="opt-btn" 
//                       key={cat} 
//                       onClick={() => pickCategory(cat)}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;

































// // src/components/Chatbot.jsx
// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "../Css/Chatbot.css";
// import { CartContext } from "../context/CartContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";

// const ENDPOINT = "https://beauty.joyory.com/api/user/products/all";
// const SHIPMENT_API = "https://beauty.joyory.com/api/user/cart/shipment";
// const LOGIN_API = "https://beauty.joyory.com/api/user/login";
// const PROFILE_API = "https://beauty.joyory.com/api/user/profile";
// const CANCEL_ORDER_API = "https://beauty.joyory.com/api/payment/cancel";

// const VARIANT_CACHE_KEY = "chatbotVariantCache";

// /* ----------  UTILS  ---------- */
// const getSku = (v) => v?.sku || v?.variantSku || null;
// const isBlackHex = (hex) => {
//   if (!hex) return false;
//   const cleaned = String(hex).toLowerCase().replace(/\s/g, "").replace("#", "");
//   return cleaned === "000000" || cleaned === "000" || cleaned === "black";
// };

// /* ----------  CONSTANTS  ---------- */
// const MAIN_OPTIONS = [
//   { key: "products", label: "🛍️ Products" },
//   { key: "orders", label: "📦 Orders" },
//   { key: "support", label: "💬 Support" },
// ];

// const ORDER_OPTIONS = [
//   { key: "track", label: "📦 Track My Order" },
//   { key: "cancel", label: "❌ Cancel Order" },
//   { key: "return", label: "🔄 Return / Refund" },
//   { key: "invoice", label: "🧾 Payment & Invoice" },
//   { key: "support", label: "💬 Contact Support" },
// ];

// const SUB_CATEGORIES = [
//   "Makeup", "Skin", "HairCare", "Face", "Eyeliner", "LipMask", "LipBalm", "Eyes"
// ];

// const CANCELLATION_REASONS = [
//   "Applicable discount/offer was not applied",
//   "Changed my mind. Don't need the product",
//   "Bought it from somewhere else",
//   "Wrong shade/size/colour ordered",
//   "Forgot to apply coupon/reward points",
//   "Wrong address/phone",
//   "Other",
// ];

// /* ----------  FORMAT DATE UTILITY  ---------- */
// const formatDate = (dateStr) => {
//   if (!dateStr) return "N/A";
//   const d = new Date(dateStr);
//   return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${d.getFullYear()}`;
// };

// /* -------------------- Cancel Success Popup Component -------------------- */
// const CancelSuccessPopup = ({ show, handleClose, onConfirm, refundMethods }) => (
//   <Modal show={show} onHide={handleClose} centered>
//     <Modal.Body className="text-center p-4">
//       <h5 className="fw-bold mb-3 text-success">Order Cancelled Successfully!</h5>
//       <p className="text-muted small mb-3">
//         Refund (if applicable) will be processed within 3–5 business days.
//       </p>

//       {refundMethods?.length > 0 && (
//         <div className="mb-3">
//           <h6 className="fw-semibold">Refund Method:</h6>
//           <ul className="list-unstyled mb-0">
//             {refundMethods.map((method, i) => (
//               <li key={i} className="text-muted">
//                 • {method.label} ({method.method})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <Button
//         onClick={() => {
//           handleClose();
//           onConfirm && onConfirm();
//         }}
//         className="w-100"
//         style={{
//           backgroundColor: "#4A90E2",
//           border: "none",
//           borderRadius: "8px",
//           fontWeight: "500",
//         }}
//       >
//         Okay
//       </Button>
//     </Modal.Body>
//   </Modal>
// );

// /* -------------------- Cancel Order Popup Component -------------------- */
// const CancelOrderPopup = ({
//   show,
//   handleClose,
//   orderId,
//   paymentMethod,
//   onCancelSuccess,
// }) => {
//   const [reason, setReason] = useState("");
//   const [otherDetails, setOtherDetails] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!reason) {
//       setMessage({ type: "danger", text: "Please select a cancellation reason." });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const res = await fetch(CANCEL_ORDER_API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           orderId,
//           reason: reason === "Other" ? otherDetails : reason,
//           method: paymentMethod?.toLowerCase() || "wallet",
//         }),
//       });

//       const data = await res.json();
//       if (res.ok && data.success) {
//         setMessage({
//           type: "success",
//           text: data.message || "Order cancelled successfully!",
//         });
//         setTimeout(() => {
//           handleClose();
//           onCancelSuccess && onCancelSuccess(data);
//         }, 800);
//       } else {
//         setMessage({
//           type: "danger",
//           text: data?.message || "Failed to cancel order. Please try again.",
//         });
//       }
//     } catch {
//       setMessage({
//         type: "danger",
//         text: "Network error. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Cancel Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {message && <Alert variant={message.type}>{message.text}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Reason for Cancellation*</Form.Label>
//             <Form.Select
//               required
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//             >
//               <option value="">Select a reason</option>
//               {CANCELLATION_REASONS.map((r, i) => (
//                 <option key={i} value={r}>
//                   {r}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           {reason === "Other" && (
//             <Form.Group className="mb-3">
//               <Form.Label>Other Details</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 maxLength={250}
//                 placeholder="Please specify your reason..."
//                 value={otherDetails}
//                 onChange={(e) => setOtherDetails(e.target.value)}
//               />
//               <div className="text-end small text-muted mt-1">
//                 {otherDetails.length}/250
//               </div>
//             </Form.Group>
//           )}

//           <Button
//             type="submit"
//             className="w-100"
//             disabled={loading}
//             style={{
//               backgroundColor: "#1e88e5",
//               border: "none",
//               borderRadius: "8px",
//               padding: "10px",
//               fontWeight: "500",
//             }}
//           >
//             {loading ? (
//               <>
//                 <Spinner animation="border" size="sm" /> Submitting...
//               </>
//             ) : (
//               "Submit"
//             )}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// /* -------------------- Main Chatbot Component -------------------- */
// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage] = useState("main");
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [selectedImages, setSelectedImages] = useState({});
//   const [showAllVariants, setShowAllVariants] = useState({});

//   /* ----------  TRACKING FLOW STATES  ---------- */
//   const [trackingStage, setTrackingStage] = useState("check-auth");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [shipmentId, setShipmentId] = useState("");
//   const [trackingData, setTrackingData] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authChecked, setAuthChecked] = useState(false);

//   /* ----------  CANCELLATION FLOW STATES  ---------- */
//   const [cancellationStage, setCancellationStage] = useState("check-auth");
//   const [orderIdToCancel, setOrderIdToCancel] = useState("");
//   const [showCancelPopup, setShowCancelPopup] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
//   const [refundMethods, setRefundMethods] = useState([]);

//   const messagesRef = useRef();
//   const { addToCart } = useContext(CartContext);

//   const scroll = () => messagesRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
//   useEffect(() => scroll(), [messages]);

//   useEffect(() => {
//     if (open) checkAuthentication();
//   }, [open]);

//   const checkAuthentication = async () => {
//     try {
//       await axios.get(PROFILE_API, { withCredentials: true });
//       setIsLoggedIn(true);
//     } catch {
//       setIsLoggedIn(false);
//     }
//   };

//   /* ----------  INITIALIZE CHAT  ---------- */
//   const handleOpen = () => {
//     setOpen(true);
//     if (!messages.length) greet();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     resetTrackingFlow();
//     resetCancellationFlow();
//   };

//   const greet = () => {
//     setMessages([{ from: "bot", text: "Hi! 👋 What can I help you with today?" }]);
//   };

//   /* ----------  RESET FLOWS  ---------- */
//   const resetTrackingFlow = () => {
//     setTrackingStage("check-auth");
//     setEmail("");
//     setPassword("");
//     setShipmentId("");
//     setTrackingData(null);
//     setAuthChecked(false);
//   };

//   const resetCancellationFlow = () => {
//     setCancellationStage("check-auth");
//     setOrderIdToCancel("");
//     setSelectedOrderForCancel(null);
//     setShowCancelPopup(false);
//     setShowSuccessPopup(false);
//     setRefundMethods([]);
//   };

//   /* ----------  FETCH PRODUCTS  ---------- */
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(ENDPOINT);
//       return res.data.products || [];
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       return [];
//     }
//   };

//   /* ----------  MAIN MENU HANDLERS  ---------- */
//   const pickMain = (key, label) => {
//     setMessages((prev) => [...prev, { from: "user", text: label }]);
    
//     if (key === "products") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Choose a category:" }]);
//       setStage("categories");
//     } else if (key === "orders") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Select what you need help with:" }]);
//       setStage("orders");
//     } else if (key === "support") {
//       setMessages((prev) => [...prev, { from: "bot", text: "📧 Email us at: support@joyory.in\n📞 Call us at: 1800-XXX-XXXX\n⏰ Support Hours: 9 AM - 6 PM (Mon-Sat)" }]);
//     }
//   };

//   /* ----------  ORDER OPTIONS HANDLER  ---------- */
//   const pickOrderOption = (option) => {
//     setMessages((prev) => [...prev, { from: "user", text: option.label }]);
    
//     if (option.key === "track") {
//       startOrderTracking();
//     } else if (option.key === "cancel") {
//       startOrderCancellation();
//     } else {
//       let response = "";
//       switch (option.key) {
//         case "return":
//           response = "For returns/refunds:\n1. Products can be returned within 7 days of delivery\n2. Items must be unused and in original packaging\n3. Visit 'My Orders' to initiate return\n\nRefunds are processed within 5-7 business days.";
//           break;
//         case "invoice":
//           response = "To download invoice:\n1. Go to 'My Orders'\n2. Click on the order\n3. Click 'Download Invoice' button\n\nYou can also email billing@joyory.in for invoice requests.";
//           break;
//         case "support":
//           response = "Our support team will contact you within 24 hours.\n\nYou can also:\n📧 Email: support@joyory.in\n📞 Call: 1800-XXX-XXXX\n💬 WhatsApp: +91-XXXXXXXXXX";
//           break;
//       }
      
//       setMessages((prev) => [...prev, { from: "bot", text: response }]);
//       setStage("main");
//     }
//   };

//   /* ----------  ORDER CANCELLATION FLOW  ---------- */
//   const startOrderCancellation = () => {
//     resetCancellationFlow();
    
//     if (!isLoggedIn) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "🔐 Please enter your email address to login and cancel order:" }
//       ]);
//       setCancellationStage("login-email");
//       setStage("cancellation");
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your Order ID:" }
//       ]);
//       setCancellationStage("order-id");
//       setStage("cancellation");
//     }
//   };

//   /* ----------  ORDER TRACKING FLOW  ---------- */
//   const startOrderTracking = () => {
//     resetTrackingFlow();
    
//     if (!authChecked) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "🔐 Checking your login status..." }
//       ]);
//       checkAuthentication();
//     }
    
//     if (isLoggedIn) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "✅ You're logged in! Please enter your Shipment ID:" }
//       ]);
//       setTrackingStage("shipment");
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your email address to continue:" }
//       ]);
//       setTrackingStage("login-email");
//     }
//   };

//   /* ----------  AUTHENTICATION HANDLERS  ---------- */
//   const handleEmailSubmit = async () => {
//     if (!email || !validateEmail(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: email }]);
    
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "Please enter your password:" }
//     ]);
    
//     if (stage === "cancellation") {
//       setCancellationStage("login-password");
//     } else {
//       setTrackingStage("login-password");
//     }
//   };

//   const handleLogin = async () => {
//     if (!password) { 
//       toast.error("Please enter your password"); 
//       return; 
//     }

//     try {
//       setLoading(true);
//       await axios.post(LOGIN_API, { email, password }, { withCredentials: true });
//       setIsLoggedIn(true);
      
//       if (stage === "cancellation") {
//         setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Order ID:" }]);
//         setCancellationStage("order-id");
//       } else {
//         setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Shipment ID:" }]);
//         setTrackingStage("shipment");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------  ORDER CANCELLATION HANDLERS  ---------- */
//   const handleOrderIdSubmit = () => {
//     if (!orderIdToCancel.trim()) {
//       toast.error("Please enter a valid Order ID");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: orderIdToCancel }]);
    
//     // Here you would typically fetch order details to verify
//     // For now, we'll just proceed with the cancellation
//     setSelectedOrderForCancel({
//       _id: orderIdToCancel,
//       paymentMethod: "Online" // This should come from API
//     });
    
//     setShowCancelPopup(true);
//   };

//   const handleCancelSuccess = (data) => {
//     setRefundMethods(data.refundMethodsAvailable || []);
//     setShowCancelPopup(false);
//     setShowSuccessPopup(true);
    
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "✅ Order cancelled successfully! Refund will be processed within 3-5 business days." }
//     ]);
//   };

//   /* ----------  SHIPMENT ID HANDLER  ---------- */
//   const handleShipmentSubmit = async () => {
//     if (!shipmentId.trim()) {
//       toast.error("Please enter a valid Shipment ID");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: shipmentId }]);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "🔍 Tracking your order..." }
//     ]);
    
//     setLoading(true);
    
//     try {
//       const response = await axios.get(`${SHIPMENT_API}/${shipmentId}`, {
//         withCredentials: true
//       });

//       if (response.data?.success) {
//         setTrackingData(response.data);
//         displayTrackingInfo(response.data);
//         setTrackingStage("result");
//       } else {
//         throw new Error("Failed to fetch shipment details");
//       }
//     } catch (error) {
//       console.error("Tracking error:", error);
      
//       let errorMessage = "❌ Unable to track order. ";
      
//       if (error.response?.status === 401) {
//         errorMessage += "You need to login first. ";
//         setIsLoggedIn(false);
//         setTrackingStage("login-email");
//       } else if (error.response?.status === 404) {
//         errorMessage += "Shipment not found. Please check the Shipment ID.";
//       } else {
//         errorMessage += error.response?.data?.message || error.message || "Please try again.";
//       }
      
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: errorMessage }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------  DISPLAY TRACKING INFO  ---------- */
//   const displayTrackingInfo = (data) => {
//     const shipment = data;
    
//     let trackingMessage = "📦 **Order Tracking Details**\n\n";
//     trackingMessage += `**Shipment ID:** ${shipment.shipmentId}\n`;
    
//     if (shipment.orderInfo?.orderId) {
//       trackingMessage += `**Order ID:** ${shipment.orderInfo.orderId}\n`;
//     }
    
//     trackingMessage += `**Status:** ${getStatusWithIcon(shipment.shipmentStatus)}\n`;
    
//     if (shipment.expectedDelivery) {
//       trackingMessage += `**Expected Delivery:** ${formatDate(shipment.expectedDelivery)}\n`;
//     }
    
//     if (shipment.courier?.awb) {
//       trackingMessage += `**AWB Number:** ${shipment.courier.awb}\n`;
//     }
    
//     if (shipment.courier?.trackingUrl) {
//       trackingMessage += `**Tracking Link:** ${shipment.courier.trackingUrl}\n`;
//     }
    
//     // Add product information
//     if (shipment.products?.length > 0) {
//       trackingMessage += `\n**Products (${shipment.products.length}):**\n`;
//       shipment.products.forEach((product, index) => {
//         trackingMessage += `${index + 1}. ${product.name} - ${product.variant || "Standard"}\n`;
//       });
//     }
    
//     trackingMessage += `\n👉 **View full details:** [Click here to open Order Details page]`;
    
//     setMessages((prev) => [
//       ...prev,
//       { 
//         from: "bot", 
//         text: trackingMessage,
//         data: { 
//           tracking: true,
//           shipmentId: shipment.shipmentId,
//           trackingUrl: shipment.courier?.trackingUrl
//         }
//       }
//     ]);
//   };

//   /* ----------  VALIDATION FUNCTIONS  ---------- */
//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const getStatusWithIcon = (status) => {
//     const statusLower = status?.toLowerCase() || "";
//     switch (statusLower) {
//       case "confirmed": return "✅ Confirmed";
//       case "shipped": return "🚚 Shipped";
//       case "delivered": return "📦 Delivered";
//       case "cancelled": return "❌ Cancelled";
//       case "pending": return "⏳ Pending";
//       default: return status || "Unknown";
//     }
//   };

//   /* ----------  PRODUCT CATEGORY HANDLER  ---------- */
//   const pickCategory = async (cat) => {
//     setMessages((prev) => [...prev, { from: "user", text: cat }]);
//     setLoading(true);

//     const prods = await fetchProducts();
//     const filtered = prods.filter((p) => 
//       p.category?.name === cat || 
//       p.categories?.some(c => c.name === cat) ||
//       p.name?.toLowerCase().includes(cat.toLowerCase())
//     );

//     setLoading(false);
//     if (!filtered.length) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `No products in "${cat}" right now.` },
//       ]);
//       return;
//     }

//     setProducts(filtered);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: `Found ${filtered.length} products in ${cat}:`, data: { slider: true } },
//     ]);
//   };

//   /* ----------  PRODUCT VARIANT HANDLERS  ---------- */
//   useEffect(() => {
//     if (products.length === 0) return;

//     const defaultVariants = {};
//     const defaultImages = {};

//     products.forEach((product) => {
//       const variants = product.variants || [];
//       if (variants.length === 0) return;

//       const blackVariant = variants.find((v) => isBlackHex(v?.hex));
//       const selected = blackVariant || variants[0];

//       defaultVariants[product._id] = {
//         shadeName: selected?.shadeName || selected?.size || "Default",
//         hex: selected?.hex,
//         image: selected?.image || selected?.images?.[0] || null,
//         discountedPrice: selected?.discountedPrice ?? selected?.price ?? 0,
//         originalPrice: selected?.originalPrice ?? selected?.price ?? 0,
//         stock: selected?.stock ?? 0,
//         variantSku: getSku(selected),
//       };

//       defaultImages[product._id] = selected?.image || selected?.images?.[0] || product?.images?.[0] || null;
//     });

//     setSelectedVariants(defaultVariants);
//     setSelectedImages(defaultImages);
//   }, [products]);

//   const handleVariantChange = (productId, variant) => {
//     if (variant.stock !== undefined && variant.stock <= 0) {
//       toast.warning("This variant is out of stock");
//       return;
//     }

//     setSelectedVariants((prev) => ({
//       ...prev,
//       [productId]: {
//         shadeName: variant.shadeName || variant.size || "Default",
//         hex: variant.hex,
//         image: variant.image || variant.images?.[0] || null,
//         discountedPrice: variant.discountedPrice ?? variant.price ?? 0,
//         originalPrice: variant.originalPrice ?? variant.price ?? 0,
//         stock: variant.stock ?? 0,
//         variantSku: getSku(variant),
//       },
//     }));

//     if (variant.image || variant.images?.[0]) {
//       setSelectedImages((prev) => ({
//         ...prev,
//         [productId]: variant.image || variant.images[0],
//       }));
//     }
//   };

//   const addToCartHandler = async (product) => {
//     try {
//       let isLoggedIn = false;
//       try {
//         await axios.get(PROFILE_API, { withCredentials: true });
//         isLoggedIn = true;
//       } catch {
//         isLoggedIn = false;
//       }

//       const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
//       const selectedVariant = selectedVariants[product._id];
//       let variantToAdd = null;

//       if (hasVariants) {
//         const availableVariants = product.variants.filter((v) => v.stock > 0);
//         if (availableVariants.length === 0) {
//           toast.warning("All variants are out of stock.");
//           return;
//         }

//         if (selectedVariant && selectedVariant.variantSku) {
//           const matchedVariant = product.variants.find((v) => getSku(v) === selectedVariant.variantSku);
//           if (matchedVariant && matchedVariant.stock > 0) {
//             variantToAdd = matchedVariant;
//           } else {
//             const matchedByName = product.variants.find((v) => 
//               (v.shadeName || "").toLowerCase() === (selectedVariant.shadeName || "").toLowerCase()
//             );
//             if (matchedByName && matchedByName.stock > 0) variantToAdd = matchedByName;
//           }
//           if (!variantToAdd) {
//             toast.warning("Selected variant is out of stock or unavailable.");
//             return;
//           }
//         } else {
//           variantToAdd = availableVariants[0];
//         }
//       } else {
//         if (product.stock <= 0) {
//           toast.warning("Product is out of stock.");
//           return;
//         }
//         variantToAdd = {
//           sku: `sku-${product._id}-default`,
//           shadeName: "Default",
//           hex: "#ccc",
//           image: product.images?.[0] || "/placeholder.png",
//           originalPrice: product.mrp || product.price,
//           discountedPrice: product.price,
//           stock: product.stock ?? 1,
//         };
//       }

//       const cache = JSON.parse(localStorage.getItem(VARIANT_CACHE_KEY) || "{}");
//       cache[product._id] = variantToAdd;
//       localStorage.setItem(VARIANT_CACHE_KEY, JSON.stringify(cache));

//       const variantSkuToSend = getSku(variantToAdd) || variantToAdd.sku;
//       const cartPayload = {
//         productId: product._id,
//         variants: [{ variantSku: variantSkuToSend, quantity: 1 }],
//       };

//       if (isLoggedIn) {
//         await addToCart(product, variantToAdd);
//         toast.success("Product added to cart!");
//         onAddToCart?.();
//       } else {
//         const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         const existingIndex = guestCart.findIndex(
//           (item) => item.productId === product._id && item.variantSku === variantSkuToSend
//         );
//         if (existingIndex !== -1) {
//           guestCart[existingIndex].quantity += 1;
//         } else {
//           guestCart.push({ 
//             productId: product._id, 
//             variantSku: variantSkuToSend, 
//             product: product, 
//             variant: variantToAdd, 
//             quantity: 1 
//           });
//         }
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         toast.success("Added to cart as guest!");
//       }
//     } catch (err) {
//       console.error("Add to Cart error:", err?.response?.data || err?.message);
//       toast.error("Failed to add product.");
//     }
//   };

//   /* ----------  RENDER PRODUCT CARD  ---------- */
//   const renderProductCard = (product) => {
//     const variants = product.variants || [];
//     const selectedVariant = selectedVariants[product._id] || variants[0] || {};
    
//     const colorVariants = variants.filter((v) => v.hex);
//     const otherVariants = variants.filter((v) => !v.hex);
    
//     const isExpanded = showAllVariants[product._id] || false;
//     const visibleColorVariants = isExpanded ? colorVariants : colorVariants.slice(0, 3);
//     const visibleOtherVariants = isExpanded ? otherVariants : otherVariants.slice(0, 3);

//     const price = Number(selectedVariant?.discountedPrice ?? product.price ?? 0);
//     const mrp = Number(selectedVariant?.originalPrice ?? product.mrp ?? price);
//     const hasDiscount = mrp > price;
//     const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return (
//       <div className="chatbot-product-card">
//         <img
//           src={selectedImages[product._id] || selectedVariant?.image || product.images?.[0]}
//           alt={product.name}
//           className="chatbot-product-image"
//         />
//         <div className="chatbot-product-info">
//           <h6 className="chatbot-product-title">{product.name}</h6>

//           {colorVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleColorVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <div
//                     key={variantSku || `${product._id}-cv-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-color-swatch ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                     style={{ backgroundColor: variant.hex || '#ccc' }}
//                     title={outOfStock ? `${variant.shadeName} (Out of Stock)` : variant.shadeName}
//                   >
//                     {outOfStock && <span className="out-of-stock-cross">✕</span>}
//                   </div>
//                 );
//               })}
//               {colorVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${colorVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {otherVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleOtherVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <button
//                     key={variantSku || `${product._id}-ov-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-size-btn ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                   >
//                     {variant.size || variant.shadeName || "Option"}
//                   </button>
//                 );
//               })}
//               {otherVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${otherVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {selectedVariant && (
//             <div className="chatbot-selected-variant">
//               Selected: {selectedVariant.shadeName || selectedVariant.size || "Default"}
//             </div>
//           )}

//           <div className="chatbot-price-section">
//             <span className="chatbot-price">₹{price}</span>
//             {hasDiscount && (
//               <>
//                 <span className="chatbot-mrp">₹{mrp}</span>
//                 <span className="chatbot-discount">({discountPercent}% OFF)</span>
//               </>
//             )}
//           </div>
//           <button className="chatbot-add-btn" onClick={() => addToCartHandler(product)}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     );
//   };

//   /* ----------  RENDER PRODUCT SLIDER  ---------- */
//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper
//         slidesPerView={1.2}
//         spaceBetween={12}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Pagination, Navigation]}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 1 },
//           1024: { slidesPerView: 1 },
//         }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>{renderProductCard(product)}</SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );

//   /* ----------  RENDER CANCELLATION INPUTS  ---------- */
//   const renderCancellationInputs = () => {
//     switch (cancellationStage) {
//       case "login-email":
//         return (
//           <div className="input-area">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleEmailSubmit} 
//               className="send-btn"
//               disabled={loading || !email}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       case "login-password":
//         return (
//           <div className="input-area">
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleLogin} 
//               className="send-btn"
//               disabled={loading || !password}
//             >
//               {loading ? "..." : "Login"}
//             </button>
//           </div>
//         );

//       case "order-id":
//         return (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Enter Order ID"
//               value={orderIdToCancel}
//               onChange={(e) => setOrderIdToCancel(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleOrderIdSubmit} 
//               className="send-btn"
//               disabled={loading || !orderIdToCancel}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   /* ----------  RENDER TRACKING INPUTS  ---------- */
//   const renderTrackingInputs = () => {
//     switch (trackingStage) {
//       case "login-email":
//         return (
//           <div className="input-area">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleEmailSubmit} 
//               className="send-btn"
//               disabled={loading || !email}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       case "login-password":
//         return (
//           <div className="input-area">
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleLogin} 
//               className="send-btn"
//               disabled={loading || !password}
//             >
//               {loading ? "..." : "Login"}
//             </button>
//           </div>
//         );

//       case "shipment":
//         return (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Enter Shipment ID"
//               value={shipmentId}
//               onChange={(e) => setShipmentId(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleShipmentSubmit} 
//               className="send-btn"
//               disabled={loading || !shipmentId}
//             >
//               {loading ? "..." : "Track"}
//             </button>
//           </div>
//         );

//       case "result":
//         return (
//           <div className="tracking-result-actions">
//             <button 
//               className="btn btn-primary btn-sm me-2"
//               onClick={() => {
//                 window.open(`/order-details/${shipmentId}`, "_blank");
//               }}
//             >
//               View Full Details
//             </button>
//             <button 
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => {
//                 setStage("main");
//                 resetTrackingFlow();
//               }}
//             >
//               Back to Main
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   /* ----------  MAIN RENDER  ---------- */
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           💬
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div>
//               <p>Joyory Assistant</p>
//               <small>Online</small>
//             </div>
//             <button className="close-btn" onClick={handleClose}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {/* Messages */}
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   <div className="message-text" style={{ whiteSpace: 'pre-line' }}>
//                     {m.text}
//                     {m.data?.trackingUrl && (
//                       <div style={{ marginTop: '10px' }}>
//                         <a 
//                           href={m.data.trackingUrl} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-sm btn-outline-primary"
//                         >
//                           Track on Courier Site
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                   {m.data?.slider && renderSlider()}
//                 </div>
//               </div>
//             ))}

//             {/* Loading Indicator */}
//             {loading && (
//               <div className="loader">
//                 <div className="spinner"></div>
//                 {trackingStage === "shipment" ? "Tracking order..." : 
//                  cancellationStage === "order-id" ? "Processing..." : "Loading..."}
//               </div>
//             )}

//             {/* Tracking Inputs */}
//             {stage === "orders" && trackingStage !== "check-auth" && renderTrackingInputs()}

//             {/* Cancellation Inputs */}
//             {stage === "cancellation" && renderCancellationInputs()}

//             {/* Options */}
//             <div className="options">
//               {stage === "main" &&
//                 MAIN_OPTIONS.map((opt) => (
//                   <button 
//                     key={opt.key} 
//                     className="opt-btn" 
//                     onClick={() => pickMain(opt.key, opt.label)}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "orders" && trackingStage === "check-auth" &&
//                 ORDER_OPTIONS.map((opt) => (
//                   <button 
//                     key={opt.key} 
//                     className="opt-btn" 
//                     onClick={() => pickOrderOption(opt)}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "categories" && (
//                 <>
//                   {SUB_CATEGORIES.map((cat) => (
//                     <button 
//                       className="opt-btn" 
//                       key={cat} 
//                       onClick={() => pickCategory(cat)}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}

//               {(stage === "cancellation" || stage === "orders") && (
//                 <button className="opt-btn back" onClick={() => {
//                   setStage("main");
//                   resetTrackingFlow();
//                   resetCancellationFlow();
//                 }}>
//                   Back to Main
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cancel Order Popup */}
//       <CancelOrderPopup
//         show={showCancelPopup}
//         handleClose={() => {
//           setShowCancelPopup(false);
//           setStage("main");
//           resetCancellationFlow();
//         }}
//         orderId={orderIdToCancel}
//         paymentMethod={selectedOrderForCancel?.paymentMethod}
//         onCancelSuccess={handleCancelSuccess}
//       />

//       {/* Cancel Success Popup */}
//       <CancelSuccessPopup
//         show={showSuccessPopup}
//         handleClose={() => {
//           setShowSuccessPopup(false);
//           setStage("main");
//           resetCancellationFlow();
//         }}
//         refundMethods={refundMethods}
//         onConfirm={() => {
//           setShowSuccessPopup(false);
//           setStage("main");
//           resetCancellationFlow();
//         }}
//       />
//     </>
//   );
// };

// export default Chatbot;

















// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "../Css/Chatbot.css";
// import { CartContext } from "../context/CartContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
// import InvoiceGenerator from "./InvoiceGenerator"; // Import InvoiceGenerator

// const ENDPOINT = "https://beauty.joyory.com/api/user/products/all";
// const SHIPMENT_API = "https://beauty.joyory.com/api/user/cart/shipment";
// const LOGIN_API = "https://beauty.joyory.com/api/user/login";
// const PROFILE_API = "https://beauty.joyory.com/api/user/profile";
// const CANCEL_ORDER_API = "https://beauty.joyory.com/api/payment/cancel";

// const VARIANT_CACHE_KEY = "chatbotVariantCache";

// /* ----------  UTILS  ---------- */
// const getSku = (v) => v?.sku || v?.variantSku || null;
// const isBlackHex = (hex) => {
//   if (!hex) return false;
//   const cleaned = String(hex).toLowerCase().replace(/\s/g, "").replace("#", "");
//   return cleaned === "000000" || cleaned === "000" || cleaned === "black";
// };

// /* ----------  FORMAT DATE UTILITY  ---------- */
// const formatDate = (dateStr) => {
//   if (!dateStr) return "N/A";
//   const d = new Date(dateStr);
//   return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${d.getFullYear()}`;
// };

// /* ----------  CONSTANTS  ---------- */
// const MAIN_OPTIONS = [
//   { key: "products", label: "🛍️ Products" },
//   { key: "orders", label: "📦 Orders" },
//   { key: "support", label: "💬 Support" },
// ];

// const ORDER_OPTIONS = [
//   { key: "track", label: "📦 Track My Order" },
//   { key: "cancel", label: "❌ Cancel Order" },
//   { key: "invoice", label: "🧾 Download Invoice" }, // Changed to Download Invoice
//   { key: "return", label: "🔄 Return / Refund" },
//   { key: "support", label: "💬 Contact Support" },
// ];

// const SUB_CATEGORIES = [
//   "Makeup", "Skin", "HairCare", "Face", "Eyeliner", "LipMask", "LipBalm", "Eyes"
// ];

// const CANCELLATION_REASONS = [
//   "Applicable discount/offer was not applied",
//   "Changed my mind. Don't need the product",
//   "Bought it from somewhere else",
//   "Wrong shade/size/colour ordered",
//   "Forgot to apply coupon/reward points",
//   "Wrong address/phone",
//   "Other",
// ];

// /* -------------------- Invoice Download Popup Component -------------------- */
// const InvoiceDownloadPopup = ({
//   show,
//   handleClose,
//   shipmentData,
//   onDownload
// }) => {
//   const [loading, setLoading] = useState(false);

//   if (!shipmentData) return null;

//   // Prepare data for InvoiceGenerator
//   const getInvoiceData = () => {
//     if (!shipmentData) return null;

//     const order = {
//       _id: shipmentData.orderInfo?.orderId,
//       products: shipmentData.products,
//       totalDiscount: shipmentData.priceDetails?.mrpTotal - 
//                     shipmentData.priceDetails?.sellingPriceTotal + 
//                     (shipmentData.priceDetails?.additionalDiscountTotal || 0),
//       shippingAddress: shipmentData.shippingAddress,
//     };

//     const items = shipmentData.products?.map((p) => ({
//       productId: {
//         name: p.name,
//         variant: p.variant,
//         images: [p.image],
//       },
//       quantity: p.qty,
//       price: p.sellingPrice,
//     })) || [];

//     const shippingAddress = shipmentData.shippingAddress || {};
    
//     const paymentMethod = shipmentData.paymentMethod || 
//                          (shipmentData.orderInfo?.paymentType === "cod" 
//                           ? "Cash on Delivery" 
//                           : "Online Payment");

//     return {
//       order,
//       items,
//       shippingAddress,
//       paymentMethod
//     };
//   };

//   const invoiceData = getInvoiceData();

//   const handleGenerateInvoice = () => {
//     if (onDownload) {
//       onDownload();
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Download Invoice</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {invoiceData ? (
//           <div>
//             <div className="mb-4">
//               <h6>Order Details:</h6>
//               <div className="card p-3">
//                 <p><strong>Shipment ID:</strong> {shipmentData.shipmentId}</p>
//                 <p><strong>Order ID:</strong> {shipmentData.orderInfo?.orderId}</p>
//                 <p><strong>Order Date:</strong> {formatDate(shipmentData.orderInfo?.orderDate)}</p>
//                 <p><strong>Status:</strong> {shipmentData.shipmentStatus}</p>
//                 <p><strong>Total Amount:</strong> ₹{shipmentData.priceDetails?.totalPaid || 0}</p>
//               </div>
//             </div>

//             {/* Invoice Generator Component */}
//             <div className="text-center">
//               <InvoiceGenerator
//                 order={invoiceData.order}
//                 items={invoiceData.items}
//                 shippingAddress={invoiceData.shippingAddress}
//                 paymentMethod={invoiceData.paymentMethod}
//                 onDownloadComplete={handleClose}
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="text-center">
//             <p>No order data available for invoice generation.</p>
//           </div>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// /* -------------------- Cancel Success Popup Component -------------------- */
// const CancelSuccessPopup = ({ show, handleClose, onConfirm, refundMethods }) => (
//   <Modal show={show} onHide={handleClose} centered>
//     <Modal.Body className="text-center p-4">
//       <h5 className="fw-bold mb-3 text-success">Order Cancelled Successfully!</h5>
//       <p className="text-muted small mb-3">
//         Refund (if applicable) will be processed within 3–5 business days.
//       </p>

//       {refundMethods?.length > 0 && (
//         <div className="mb-3">
//           <h6 className="fw-semibold">Refund Method:</h6>
//           <ul className="list-unstyled mb-0">
//             {refundMethods.map((method, i) => (
//               <li key={i} className="text-muted">
//                 • {method.label} ({method.method})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <Button
//         onClick={() => {
//           handleClose();
//           onConfirm && onConfirm();
//         }}
//         className="w-100"
//         style={{
//           backgroundColor: "#4A90E2",
//           border: "none",
//           borderRadius: "8px",
//           fontWeight: "500",
//         }}
//       >
//         Okay
//       </Button>
//     </Modal.Body>
//   </Modal>
// );

// /* -------------------- Cancel Order Popup Component -------------------- */
// const CancelOrderPopup = ({
//   show,
//   handleClose,
//   orderId,
//   paymentMethod,
//   onCancelSuccess,
// }) => {
//   const [reason, setReason] = useState("");
//   const [otherDetails, setOtherDetails] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!reason) {
//       setMessage({ type: "danger", text: "Please select a cancellation reason." });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const res = await fetch(CANCEL_ORDER_API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           orderId,
//           reason: reason === "Other" ? otherDetails : reason,
//           method: paymentMethod?.toLowerCase() || "wallet",
//         }),
//       });

//       const data = await res.json();
//       if (res.ok && data.success) {
//         setMessage({
//           type: "success",
//           text: data.message || "Order cancelled successfully!",
//         });
//         setTimeout(() => {
//           handleClose();
//           onCancelSuccess && onCancelSuccess(data);
//         }, 800);
//       } else {
//         setMessage({
//           type: "danger",
//           text: data?.message || "Failed to cancel order. Please try again.",
//         });
//       }
//     } catch {
//       setMessage({
//         type: "danger",
//         text: "Network error. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Cancel Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {message && <Alert variant={message.type}>{message.text}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Reason for Cancellation*</Form.Label>
//             <Form.Select
//               required
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//             >
//               <option value="">Select a reason</option>
//               {CANCELLATION_REASONS.map((r, i) => (
//                 <option key={i} value={r}>
//                   {r}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           {reason === "Other" && (
//             <Form.Group className="mb-3">
//               <Form.Label>Other Details</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 maxLength={250}
//                 placeholder="Please specify your reason..."
//                 value={otherDetails}
//                 onChange={(e) => setOtherDetails(e.target.value)}
//               />
//               <div className="text-end small text-muted mt-1">
//                 {otherDetails.length}/250
//               </div>
//             </Form.Group>
//           )}

//           <Button
//             type="submit"
//             className="w-100"
//             disabled={loading}
//             style={{
//               backgroundColor: "#1e88e5",
//               border: "none",
//               borderRadius: "8px",
//               padding: "10px",
//               fontWeight: "500",
//             }}
//           >
//             {loading ? (
//               <>
//                 <Spinner animation="border" size="sm" /> Submitting...
//               </>
//             ) : (
//               "Submit"
//             )}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// /* -------------------- Main Chatbot Component -------------------- */
// const Chatbot = ({ onAddToCart }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [stage, setStage] = useState("main");
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [selectedImages, setSelectedImages] = useState({});
//   const [showAllVariants, setShowAllVariants] = useState({});

//   /* ----------  TRACKING FLOW STATES  ---------- */
//   const [trackingStage, setTrackingStage] = useState("check-auth");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [shipmentId, setShipmentId] = useState("");
//   const [trackingData, setTrackingData] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authChecked, setAuthChecked] = useState(false);

//   /* ----------  INVOICE FLOW STATES  ---------- */
//   const [invoiceStage, setInvoiceStage] = useState("check-auth");
//   const [invoiceShipmentId, setInvoiceShipmentId] = useState("");
//   const [invoiceData, setInvoiceData] = useState(null);
//   const [showInvoicePopup, setShowInvoicePopup] = useState(false);

//   /* ----------  CANCELLATION FLOW STATES  ---------- */
//   const [cancellationStage, setCancellationStage] = useState("check-auth");
//   const [orderIdToCancel, setOrderIdToCancel] = useState("");
//   const [showCancelPopup, setShowCancelPopup] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
//   const [refundMethods, setRefundMethods] = useState([]);

//   const messagesRef = useRef();
//   const { addToCart } = useContext(CartContext);

//   const scroll = () => messagesRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
//   useEffect(() => scroll(), [messages]);

//   useEffect(() => {
//     if (open) checkAuthentication();
//   }, [open]);

//   const checkAuthentication = async () => {
//     try {
//       await axios.get(PROFILE_API, { withCredentials: true });
//       setIsLoggedIn(true);
//     } catch {
//       setIsLoggedIn(false);
//     }
//   };

//   /* ----------  INITIALIZE CHAT  ---------- */
//   const handleOpen = () => {
//     setOpen(true);
//     if (!messages.length) greet();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     resetTrackingFlow();
//     resetCancellationFlow();
//     resetInvoiceFlow();
//   };

//   const greet = () => {
//     setMessages([{ from: "bot", text: "Hi! 👋 What can I help you with today?" }]);
//   };

//   /* ----------  RESET FLOWS  ---------- */
//   const resetTrackingFlow = () => {
//     setTrackingStage("check-auth");
//     setEmail("");
//     setPassword("");
//     setShipmentId("");
//     setTrackingData(null);
//     setAuthChecked(false);
//   };

//   const resetCancellationFlow = () => {
//     setCancellationStage("check-auth");
//     setOrderIdToCancel("");
//     setSelectedOrderForCancel(null);
//     setShowCancelPopup(false);
//     setShowSuccessPopup(false);
//     setRefundMethods([]);
//   };

//   const resetInvoiceFlow = () => {
//     setInvoiceStage("check-auth");
//     setInvoiceShipmentId("");
//     setInvoiceData(null);
//     setShowInvoicePopup(false);
//   };

//   /* ----------  FETCH PRODUCTS  ---------- */
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(ENDPOINT);
//       return res.data.products || [];
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       return [];
//     }
//   };

//   /* ----------  FETCH SHIPMENT DATA FOR INVOICE  ---------- */
//   const fetchShipmentForInvoice = async (shipmentId) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${SHIPMENT_API}/${shipmentId}`, {
//         withCredentials: true
//       });

//       if (response.data?.success) {
//         setInvoiceData(response.data);
//         return { success: true, data: response.data };
//       } else {
//         throw new Error("Failed to fetch shipment details");
//       }
//     } catch (error) {
//       console.error("Error fetching shipment for invoice:", error);
//       return { 
//         success: false, 
//         error: error.response?.data?.message || error.message || "Failed to fetch order details" 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------  MAIN MENU HANDLERS  ---------- */
//   const pickMain = (key, label) => {
//     setMessages((prev) => [...prev, { from: "user", text: label }]);
    
//     if (key === "products") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Choose a category:" }]);
//       setStage("categories");
//     } else if (key === "orders") {
//       setMessages((prev) => [...prev, { from: "bot", text: "Select what you need help with:" }]);
//       setStage("orders");
//     } else if (key === "support") {
//       setMessages((prev) => [...prev, { from: "bot", text: "📧 Email us at: support@joyory.in\n📞 Call us at: 1800-XXX-XXXX\n⏰ Support Hours: 9 AM - 6 PM (Mon-Sat)" }]);
//     }
//   };

//   /* ----------  ORDER OPTIONS HANDLER  ---------- */
//   const pickOrderOption = (option) => {
//     setMessages((prev) => [...prev, { from: "user", text: option.label }]);
    
//     if (option.key === "track") {
//       startOrderTracking();
//     } else if (option.key === "cancel") {
//       startOrderCancellation();
//     } else if (option.key === "invoice") {
//       startInvoiceDownload();
//     } else {
//       let response = "";
//       switch (option.key) {
//         case "return":
//           response = "For returns/refunds:\n1. Products can be returned within 7 days of delivery\n2. Items must be unused and in original packaging\n3. Visit 'My Orders' to initiate return\n\nRefunds are processed within 5-7 business days.";
//           break;
//         case "support":
//           response = "Our support team will contact you within 24 hours.\n\nYou can also:\n📧 Email: support@joyory.in\n📞 Call: 1800-XXX-XXXX\n💬 WhatsApp: +91-XXXXXXXXXX";
//           break;
//       }
      
//       setMessages((prev) => [...prev, { from: "bot", text: response }]);
//       setStage("main");
//     }
//   };

//   /* ----------  INVOICE DOWNLOAD FLOW  ---------- */
//   const startInvoiceDownload = () => {
//     resetInvoiceFlow();
    
//     if (!isLoggedIn) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "🔐 Please enter your email address to login and download invoice:" }
//       ]);
//       setInvoiceStage("login-email");
//       setStage("invoice");
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your Shipment ID to download invoice:" }
//       ]);
//       setInvoiceStage("shipment");
//       setStage("invoice");
//     }
//   };

//   /* ----------  ORDER CANCELLATION FLOW  ---------- */
//   const startOrderCancellation = () => {
//     resetCancellationFlow();
    
//     if (!isLoggedIn) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "🔐 Please enter your email address to login and cancel order:" }
//       ]);
//       setCancellationStage("login-email");
//       setStage("cancellation");
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your Order ID:" }
//       ]);
//       setCancellationStage("order-id");
//       setStage("cancellation");
//     }
//   };

//   /* ----------  ORDER TRACKING FLOW  ---------- */
//   const startOrderTracking = () => {
//     resetTrackingFlow();
    
//     if (!authChecked) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "🔐 Checking your login status..." }
//       ]);
//       checkAuthentication();
//     }
    
//     if (isLoggedIn) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "✅ You're logged in! Please enter your Shipment ID:" }
//       ]);
//       setTrackingStage("shipment");
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Please enter your email address to continue:" }
//       ]);
//       setTrackingStage("login-email");
//     }
//   };

//   /* ----------  AUTHENTICATION HANDLERS  ---------- */
//   const handleEmailSubmit = async () => {
//     if (!email || !validateEmail(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: email }]);
    
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "Please enter your password:" }
//     ]);
    
//     if (stage === "cancellation") {
//       setCancellationStage("login-password");
//     } else if (stage === "invoice") {
//       setInvoiceStage("login-password");
//     } else {
//       setTrackingStage("login-password");
//     }
//   };

//   const handleLogin = async () => {
//     if (!password) { 
//       toast.error("Please enter your password"); 
//       return; 
//     }

//     try {
//       setLoading(true);
//       await axios.post(LOGIN_API, { email, password }, { withCredentials: true });
//       setIsLoggedIn(true);
      
//       if (stage === "cancellation") {
//         setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Order ID:" }]);
//         setCancellationStage("order-id");
//       } else if (stage === "invoice") {
//         setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Shipment ID:" }]);
//         setInvoiceStage("shipment");
//       } else {
//         setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Shipment ID:" }]);
//         setTrackingStage("shipment");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------  INVOICE DOWNLOAD HANDLERS  ---------- */
//   const handleInvoiceShipmentSubmit = async () => {
//     if (!invoiceShipmentId.trim()) {
//       toast.error("Please enter a valid Shipment ID");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: invoiceShipmentId }]);
    
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "🔍 Fetching order details for invoice..." }
//     ]);
    
//     setLoading(true);
    
//     const result = await fetchShipmentForInvoice(invoiceShipmentId);
    
//     if (result.success) {
//       setInvoiceData(result.data);
//       setShowInvoicePopup(true);
      
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `✅ Found shipment ${invoiceShipmentId}. Generating invoice...` }
//       ]);
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `❌ ${result.error}` }
//       ]);
//     }
    
//     setLoading(false);
//   };

//   /* ----------  ORDER CANCELLATION HANDLERS  ---------- */
//   const handleOrderIdSubmit = () => {
//     if (!orderIdToCancel.trim()) {
//       toast.error("Please enter a valid Order ID");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: orderIdToCancel }]);
    
//     // Here you would typically fetch order details to verify
//     // For now, we'll just proceed with the cancellation
//     setSelectedOrderForCancel({
//       _id: orderIdToCancel,
//       paymentMethod: "Online" // This should come from API
//     });
    
//     setShowCancelPopup(true);
//   };

//   const handleCancelSuccess = (data) => {
//     setRefundMethods(data.refundMethodsAvailable || []);
//     setShowCancelPopup(false);
//     setShowSuccessPopup(true);
    
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "✅ Order cancelled successfully! Refund will be processed within 3-5 business days." }
//     ]);
//   };

//   /* ----------  SHIPMENT ID HANDLER  ---------- */
//   const handleShipmentSubmit = async () => {
//     if (!shipmentId.trim()) {
//       toast.error("Please enter a valid Shipment ID");
//       return;
//     }

//     setMessages((prev) => [...prev, { from: "user", text: shipmentId }]);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "🔍 Tracking your order..." }
//     ]);
    
//     setLoading(true);
    
//     try {
//       const response = await axios.get(`${SHIPMENT_API}/${shipmentId}`, {
//         withCredentials: true
//       });

//       if (response.data?.success) {
//         setTrackingData(response.data);
//         displayTrackingInfo(response.data);
//         setTrackingStage("result");
//       } else {
//         throw new Error("Failed to fetch shipment details");
//       }
//     } catch (error) {
//       console.error("Tracking error:", error);
      
//       let errorMessage = "❌ Unable to track order. ";
      
//       if (error.response?.status === 401) {
//         errorMessage += "You need to login first. ";
//         setIsLoggedIn(false);
//         setTrackingStage("login-email");
//       } else if (error.response?.status === 404) {
//         errorMessage += "Shipment not found. Please check the Shipment ID.";
//       } else {
//         errorMessage += error.response?.data?.message || error.message || "Please try again.";
//       }
      
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: errorMessage }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------  DISPLAY TRACKING INFO  ---------- */
//   const displayTrackingInfo = (data) => {
//     const shipment = data;
    
//     let trackingMessage = "📦 **Order Tracking Details**\n\n";
//     trackingMessage += `**Shipment ID:** ${shipment.shipmentId}\n`;
    
//     if (shipment.orderInfo?.orderId) {
//       trackingMessage += `**Order ID:** ${shipment.orderInfo.orderId}\n`;
//     }
    
//     trackingMessage += `**Status:** ${getStatusWithIcon(shipment.shipmentStatus)}\n`;
    
//     if (shipment.expectedDelivery) {
//       trackingMessage += `**Expected Delivery:** ${formatDate(shipment.expectedDelivery)}\n`;
//     }
    
//     if (shipment.courier?.awb) {
//       trackingMessage += `**AWB Number:** ${shipment.courier.awb}\n`;
//     }
    
//     if (shipment.courier?.trackingUrl) {
//       trackingMessage += `**Tracking Link:** ${shipment.courier.trackingUrl}\n`;
//     }
    
//     // Add product information
//     if (shipment.products?.length > 0) {
//       trackingMessage += `\n**Products (${shipment.products.length}):**\n`;
//       shipment.products.forEach((product, index) => {
//         trackingMessage += `${index + 1}. ${product.name} - ${product.variant || "Standard"}\n`;
//       });
//     }
    
//     trackingMessage += `\n👉 **View full details:** [Click here to open Order Details page]`;
    
//     setMessages((prev) => [
//       ...prev,
//       { 
//         from: "bot", 
//         text: trackingMessage,
//         data: { 
//           tracking: true,
//           shipmentId: shipment.shipmentId,
//           trackingUrl: shipment.courier?.trackingUrl
//         }
//       }
//     ]);
//   };

//   /* ----------  VALIDATION FUNCTIONS  ---------- */
//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const getStatusWithIcon = (status) => {
//     const statusLower = status?.toLowerCase() || "";
//     switch (statusLower) {
//       case "confirmed": return "✅ Confirmed";
//       case "shipped": return "🚚 Shipped";
//       case "delivered": return "📦 Delivered";
//       case "cancelled": return "❌ Cancelled";
//       case "pending": return "⏳ Pending";
//       default: return status || "Unknown";
//     }
//   };

//   /* ----------  PRODUCT CATEGORY HANDLER  ---------- */
//   const pickCategory = async (cat) => {
//     setMessages((prev) => [...prev, { from: "user", text: cat }]);
//     setLoading(true);

//     const prods = await fetchProducts();
//     const filtered = prods.filter((p) => 
//       p.category?.name === cat || 
//       p.categories?.some(c => c.name === cat) ||
//       p.name?.toLowerCase().includes(cat.toLowerCase())
//     );

//     setLoading(false);
//     if (!filtered.length) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `No products in "${cat}" right now.` },
//       ]);
//       return;
//     }

//     setProducts(filtered);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: `Found ${filtered.length} products in ${cat}:`, data: { slider: true } },
//     ]);
//   };

//   /* ----------  PRODUCT VARIANT HANDLERS  ---------- */
//   useEffect(() => {
//     if (products.length === 0) return;

//     const defaultVariants = {};
//     const defaultImages = {};

//     products.forEach((product) => {
//       const variants = product.variants || [];
//       if (variants.length === 0) return;

//       const blackVariant = variants.find((v) => isBlackHex(v?.hex));
//       const selected = blackVariant || variants[0];

//       defaultVariants[product._id] = {
//         shadeName: selected?.shadeName || selected?.size || "Default",
//         hex: selected?.hex,
//         image: selected?.image || selected?.images?.[0] || null,
//         discountedPrice: selected?.discountedPrice ?? selected?.price ?? 0,
//         originalPrice: selected?.originalPrice ?? selected?.price ?? 0,
//         stock: selected?.stock ?? 0,
//         variantSku: getSku(selected),
//       };

//       defaultImages[product._id] = selected?.image || selected?.images?.[0] || product?.images?.[0] || null;
//     });

//     setSelectedVariants(defaultVariants);
//     setSelectedImages(defaultImages);
//   }, [products]);

//   const handleVariantChange = (productId, variant) => {
//     if (variant.stock !== undefined && variant.stock <= 0) {
//       toast.warning("This variant is out of stock");
//       return;
//     }

//     setSelectedVariants((prev) => ({
//       ...prev,
//       [productId]: {
//         shadeName: variant.shadeName || variant.size || "Default",
//         hex: variant.hex,
//         image: variant.image || variant.images?.[0] || null,
//         discountedPrice: variant.discountedPrice ?? variant.price ?? 0,
//         originalPrice: variant.originalPrice ?? variant.price ?? 0,
//         stock: variant.stock ?? 0,
//         variantSku: getSku(variant),
//       },
//     }));

//     if (variant.image || variant.images?.[0]) {
//       setSelectedImages((prev) => ({
//         ...prev,
//         [productId]: variant.image || variant.images[0],
//       }));
//     }
//   };

//   const addToCartHandler = async (product) => {
//     try {
//       let isLoggedIn = false;
//       try {
//         await axios.get(PROFILE_API, { withCredentials: true });
//         isLoggedIn = true;
//       } catch {
//         isLoggedIn = false;
//       }

//       const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
//       const selectedVariant = selectedVariants[product._id];
//       let variantToAdd = null;

//       if (hasVariants) {
//         const availableVariants = product.variants.filter((v) => v.stock > 0);
//         if (availableVariants.length === 0) {
//           toast.warning("All variants are out of stock.");
//           return;
//         }

//         if (selectedVariant && selectedVariant.variantSku) {
//           const matchedVariant = product.variants.find((v) => getSku(v) === selectedVariant.variantSku);
//           if (matchedVariant && matchedVariant.stock > 0) {
//             variantToAdd = matchedVariant;
//           } else {
//             const matchedByName = product.variants.find((v) => 
//               (v.shadeName || "").toLowerCase() === (selectedVariant.shadeName || "").toLowerCase()
//             );
//             if (matchedByName && matchedByName.stock > 0) variantToAdd = matchedByName;
//           }
//           if (!variantToAdd) {
//             toast.warning("Selected variant is out of stock or unavailable.");
//             return;
//           }
//         } else {
//           variantToAdd = availableVariants[0];
//         }
//       } else {
//         if (product.stock <= 0) {
//           toast.warning("Product is out of stock.");
//           return;
//         }
//         variantToAdd = {
//           sku: `sku-${product._id}-default`,
//           shadeName: "Default",
//           hex: "#ccc",
//           image: product.images?.[0] || "/placeholder.png",
//           originalPrice: product.mrp || product.price,
//           discountedPrice: product.price,
//           stock: product.stock ?? 1,
//         };
//       }

//       const cache = JSON.parse(localStorage.getItem(VARIANT_CACHE_KEY) || "{}");
//       cache[product._id] = variantToAdd;
//       localStorage.setItem(VARIANT_CACHE_KEY, JSON.stringify(cache));

//       const variantSkuToSend = getSku(variantToAdd) || variantToAdd.sku;
//       const cartPayload = {
//         productId: product._id,
//         variants: [{ variantSku: variantSkuToSend, quantity: 1 }],
//       };

//       if (isLoggedIn) {
//         await addToCart(product, variantToAdd);
//         toast.success("Product added to cart!");
//         onAddToCart?.();
//       } else {
//         const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         const existingIndex = guestCart.findIndex(
//           (item) => item.productId === product._id && item.variantSku === variantSkuToSend
//         );
//         if (existingIndex !== -1) {
//           guestCart[existingIndex].quantity += 1;
//         } else {
//           guestCart.push({ 
//             productId: product._id, 
//             variantSku: variantSkuToSend, 
//             product: product, 
//             variant: variantToAdd, 
//             quantity: 1 
//           });
//         }
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         toast.success("Added to cart as guest!");
//       }
//     } catch (err) {
//       console.error("Add to Cart error:", err?.response?.data || err?.message);
//       toast.error("Failed to add product.");
//     }
//   };

//   /* ----------  RENDER PRODUCT CARD  ---------- */
//   const renderProductCard = (product) => {
//     const variants = product.variants || [];
//     const selectedVariant = selectedVariants[product._id] || variants[0] || {};
    
//     const colorVariants = variants.filter((v) => v.hex);
//     const otherVariants = variants.filter((v) => !v.hex);
    
//     const isExpanded = showAllVariants[product._id] || false;
//     const visibleColorVariants = isExpanded ? colorVariants : colorVariants.slice(0, 3);
//     const visibleOtherVariants = isExpanded ? otherVariants : otherVariants.slice(0, 3);

//     const price = Number(selectedVariant?.discountedPrice ?? product.price ?? 0);
//     const mrp = Number(selectedVariant?.originalPrice ?? product.mrp ?? price);
//     const hasDiscount = mrp > price;
//     const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return (
//       <div className="chatbot-product-card">
//         <img
//           src={selectedImages[product._id] || selectedVariant?.image || product.images?.[0]}
//           alt={product.name}
//           className="chatbot-product-image"
//         />
//         <div className="chatbot-product-info">
//           <h6 className="chatbot-product-title">{product.name}</h6>

//           {colorVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleColorVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <div
//                     key={variantSku || `${product._id}-cv-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-color-swatch ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                     style={{ backgroundColor: variant.hex || '#ccc' }}
//                     title={outOfStock ? `${variant.shadeName} (Out of Stock)` : variant.shadeName}
//                   >
//                     {outOfStock && <span className="out-of-stock-cross">✕</span>}
//                   </div>
//                 );
//               })}
//               {colorVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${colorVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {otherVariants.length > 0 && (
//             <div className="chatbot-variants-row">
//               {visibleOtherVariants.map((variant, idx) => {
//                 const outOfStock = variant.stock <= 0;
//                 const variantSku = getSku(variant);
//                 const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
//                 return (
//                   <button
//                     key={variantSku || `${product._id}-ov-${idx}`}
//                     onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
//                     className={`chatbot-size-btn ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
//                   >
//                     {variant.size || variant.shadeName || "Option"}
//                   </button>
//                 );
//               })}
//               {otherVariants.length > 3 && (
//                 <button
//                   className="chatbot-show-more-btn"
//                   onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
//                 >
//                   {isExpanded ? "−" : `+${otherVariants.length - 3}`}
//                 </button>
//               )}
//             </div>
//           )}

//           {selectedVariant && (
//             <div className="chatbot-selected-variant">
//               Selected: {selectedVariant.shadeName || selectedVariant.size || "Default"}
//             </div>
//           )}

//           <div className="chatbot-price-section">
//             <span className="chatbot-price">₹{price}</span>
//             {hasDiscount && (
//               <>
//                 <span className="chatbot-mrp">₹{mrp}</span>
//                 <span className="chatbot-discount">({discountPercent}% OFF)</span>
//               </>
//             )}
//           </div>
//           <button className="chatbot-add-btn" onClick={() => addToCartHandler(product)}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     );
//   };

//   /* ----------  RENDER PRODUCT SLIDER  ---------- */
//   const renderSlider = () => (
//     <div className="chat-slider">
//       <Swiper
//         slidesPerView={1.2}
//         spaceBetween={12}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Pagination, Navigation]}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 1 },
//           1024: { slidesPerView: 1 },
//         }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>{renderProductCard(product)}</SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );

//   /* ----------  RENDER INVOICE INPUTS  ---------- */
//   const renderInvoiceInputs = () => {
//     switch (invoiceStage) {
//       case "login-email":
//         return (
//           <div className="input-area">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleEmailSubmit} 
//               className="send-btn"
//               disabled={loading || !email}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       case "login-password":
//         return (
//           <div className="input-area">
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleLogin} 
//               className="send-btn"
//               disabled={loading || !password}
//             >
//               {loading ? "..." : "Login"}
//             </button>
//           </div>
//         );

//       case "shipment":
//         return (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Enter Shipment ID"
//               value={invoiceShipmentId}
//               onChange={(e) => setInvoiceShipmentId(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleInvoiceShipmentSubmit} 
//               className="send-btn"
//               disabled={loading || !invoiceShipmentId}
//             >
//               {loading ? "..." : "Get Invoice"}
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   /* ----------  RENDER CANCELLATION INPUTS  ---------- */
//   const renderCancellationInputs = () => {
//     switch (cancellationStage) {
//       case "login-email":
//         return (
//           <div className="input-area">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleEmailSubmit} 
//               className="send-btn"
//               disabled={loading || !email}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       case "login-password":
//         return (
//           <div className="input-area">
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleLogin} 
//               className="send-btn"
//               disabled={loading || !password}
//             >
//               {loading ? "..." : "Login"}
//             </button>
//           </div>
//         );

//       case "order-id":
//         return (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Enter Order ID"
//               value={orderIdToCancel}
//               onChange={(e) => setOrderIdToCancel(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleOrderIdSubmit} 
//               className="send-btn"
//               disabled={loading || !orderIdToCancel}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   /* ----------  RENDER TRACKING INPUTS  ---------- */
//   const renderTrackingInputs = () => {
//     switch (trackingStage) {
//       case "login-email":
//         return (
//           <div className="input-area">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleEmailSubmit} 
//               className="send-btn"
//               disabled={loading || !email}
//             >
//               {loading ? "..." : "Continue"}
//             </button>
//           </div>
//         );

//       case "login-password":
//         return (
//           <div className="input-area">
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleLogin} 
//               className="send-btn"
//               disabled={loading || !password}
//             >
//               {loading ? "..." : "Login"}
//             </button>
//           </div>
//         );

//       case "shipment":
//         return (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Enter Shipment ID"
//               value={shipmentId}
//               onChange={(e) => setShipmentId(e.target.value)}
//               className="order-input"
//               autoFocus
//             />
//             <button 
//               onClick={handleShipmentSubmit} 
//               className="send-btn"
//               disabled={loading || !shipmentId}
//             >
//               {loading ? "..." : "Track"}
//             </button>
//           </div>
//         );

//       case "result":
//         return (
//           <div className="tracking-result-actions">
//             <button 
//               className="btn btn-primary btn-sm me-2"
//               onClick={() => {
//                 window.open(`/order-details/${shipmentId}`, "_blank");
//               }}
//             >
//               View Full Details
//             </button>
//             <button 
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => {
//                 setStage("main");
//                 resetTrackingFlow();
//               }}
//             >
//               Back to Main
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   /* ----------  MAIN RENDER  ---------- */
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
//       {!open && (
//         <button className="chat-trigger" onClick={handleOpen}>
//           💬
//         </button>
//       )}

//       {open && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <div>
//               <p>Joyory Assistant</p>
//               <small>Online</small>
//             </div>
//             <button className="close-btn" onClick={handleClose}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-body" ref={messagesRef}>
//             {/* Messages */}
//             {messages.map((m, i) => (
//               <div key={i} className={`msg ${m.from}`}>
//                 <div className="bubble">
//                   <div className="message-text" style={{ whiteSpace: 'pre-line' }}>
//                     {m.text}
//                     {m.data?.trackingUrl && (
//                       <div style={{ marginTop: '10px' }}>
//                         <a 
//                           href={m.data.trackingUrl} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-sm btn-outline-primary"
//                         >
//                           Track on Courier Site
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                   {m.data?.slider && renderSlider()}
//                 </div>
//               </div>
//             ))}

//             {/* Loading Indicator */}
//             {loading && (
//               <div className="loader">
//                 <div className="spinner"></div>
//                 {trackingStage === "shipment" ? "Tracking order..." : 
//                  invoiceStage === "shipment" ? "Fetching invoice data..." :
//                  cancellationStage === "order-id" ? "Processing..." : "Loading..."}
//               </div>
//             )}

//             {/* Tracking Inputs */}
//             {stage === "orders" && trackingStage !== "check-auth" && renderTrackingInputs()}

//             {/* Invoice Inputs */}
//             {stage === "invoice" && renderInvoiceInputs()}

//             {/* Cancellation Inputs */}
//             {stage === "cancellation" && renderCancellationInputs()}

//             {/* Options */}
//             <div className="options">
//               {stage === "main" &&
//                 MAIN_OPTIONS.map((opt) => (
//                   <button 
//                     key={opt.key} 
//                     className="opt-btn" 
//                     onClick={() => pickMain(opt.key, opt.label)}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "orders" && trackingStage === "check-auth" &&
//                 ORDER_OPTIONS.map((opt) => (
//                   <button 
//                     key={opt.key} 
//                     className="opt-btn" 
//                     onClick={() => pickOrderOption(opt)}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}

//               {stage === "categories" && (
//                 <>
//                   {SUB_CATEGORIES.map((cat) => (
//                     <button 
//                       className="opt-btn" 
//                       key={cat} 
//                       onClick={() => pickCategory(cat)}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                   <button className="opt-btn back" onClick={() => setStage("main")}>
//                     Back
//                   </button>
//                 </>
//               )}

//               {(stage === "invoice" || stage === "cancellation" || stage === "orders") && (
//                 <button className="opt-btn back" onClick={() => {
//                   setStage("main");
//                   resetTrackingFlow();
//                   resetCancellationFlow();
//                   resetInvoiceFlow();
//                 }}>
//                   Back to Main
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Invoice Download Popup */}
//       <InvoiceDownloadPopup
//         show={showInvoicePopup}
//         handleClose={() => {
//           setShowInvoicePopup(false);
//           setStage("main");
//           resetInvoiceFlow();
//         }}
//         shipmentData={invoiceData}
//         onDownload={() => {
//           // Invoice will be downloaded via the InvoiceGenerator component
//           toast.success("Invoice generated successfully!");
//         }}
//       />

//       {/* Cancel Order Popup */}
//       <CancelOrderPopup
//         show={showCancelPopup}
//         handleClose={() => {
//           setShowCancelPopup(false);
//           setStage("main");
//           resetCancellationFlow();
//         }}
//         orderId={orderIdToCancel}
//         paymentMethod={selectedOrderForCancel?.paymentMethod}
//         onCancelSuccess={handleCancelSuccess}
//       />

//       {/* Cancel Success Popup */}
//       <CancelSuccessPopup
//         show={showSuccessPopup}
//         handleClose={() => {
//           setShowSuccessPopup(false);
//           setStage("main");
//           resetCancellationFlow();
//         }}
//         refundMethods={refundMethods}
//         onConfirm={() => {
//           setShowSuccessPopup(false);
//           setStage("main");
//           resetCancellationFlow();
//         }}
//       />
//     </>
//   );
// };

// export default Chatbot;






















import React, { useState, useEffect, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Css/Chatbot.css";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import InvoiceGenerator from "./InvoiceGenerator"; // Import InvoiceGenerator
import { GoogleGenerativeAI } from "@google/generative-ai"; // Add Gemini AI import

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyC009-2xSxdx3MbpLCQ62P9q5XLQKQK5Zs");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const ENDPOINT = "https://beauty.joyory.com/api/user/products/all";
const SHIPMENT_API = "https://beauty.joyory.com/api/user/cart/shipment";
const LOGIN_API = "https://beauty.joyory.com/api/user/login";
const PROFILE_API = "https://beauty.joyory.com/api/user/profile";
const CANCEL_ORDER_API = "https://beauty.joyory.com/api/payment/cancel";

const VARIANT_CACHE_KEY = "chatbotVariantCache";

/* ----------  UTILS  ---------- */
const getSku = (v) => v?.sku || v?.variantSku || null;
const isBlackHex = (hex) => {
  if (!hex) return false;
  const cleaned = String(hex).toLowerCase().replace(/\s/g, "").replace("#", "");
  return cleaned === "000000" || cleaned === "000" || cleaned === "black";
};

/* ----------  FORMAT DATE UTILITY  ---------- */
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getFullYear()}`;
};

/* ----------  CONSTANTS  ---------- */
const MAIN_OPTIONS = [
  { key: "products", label: "🛍️ Products" },
  { key: "orders", label: "📦 Orders" },
  { key: "support", label: "💬 Support" },
  { key: "ask-ai", label: "🤖 Ask AI Assistant" }, // Added Gemini AI option
];

const ORDER_OPTIONS = [
  { key: "track", label: "📦 Track My Order" },
  { key: "cancel", label: "❌ Cancel Order" },
  { key: "invoice", label: "🧾 Download Invoice" }, // Changed to Download Invoice
  { key: "return", label: "🔄 Return / Refund" },
  { key: "support", label: "💬 Contact Support" },
];

const SUB_CATEGORIES = [
  "Makeup", "Skin", "HairCare", "Face", "Eyeliner", "LipMask", "LipBalm", "Eyes"
];

const CANCELLATION_REASONS = [
  "Applicable discount/offer was not applied",
  "Changed my mind. Don't need the product",
  "Bought it from somewhere else",
  "Wrong shade/size/colour ordered",
  "Forgot to apply coupon/reward points",
  "Wrong address/phone",
  "Other",
];

/* -------------------- Invoice Download Popup Component -------------------- */
const InvoiceDownloadPopup = ({
  show,
  handleClose,
  shipmentData,
  onDownload
}) => {
  const [loading, setLoading] = useState(false);

  if (!shipmentData) return null;

  // Prepare data for InvoiceGenerator
  const getInvoiceData = () => {
    if (!shipmentData) return null;

    const order = {
      _id: shipmentData.orderInfo?.orderId,
      products: shipmentData.products,
      totalDiscount: shipmentData.priceDetails?.mrpTotal - 
                    shipmentData.priceDetails?.sellingPriceTotal + 
                    (shipmentData.priceDetails?.additionalDiscountTotal || 0),
      shippingAddress: shipmentData.shippingAddress,
    };

    const items = shipmentData.products?.map((p) => ({
      productId: {
        name: p.name,
        variant: p.variant,
        images: [p.image],
      },
      quantity: p.qty,
      price: p.sellingPrice,
    })) || [];

    const shippingAddress = shipmentData.shippingAddress || {};
    
    const paymentMethod = shipmentData.paymentMethod || 
                         (shipmentData.orderInfo?.paymentType === "cod" 
                          ? "Cash on Delivery" 
                          : "Online Payment");

    return {
      order,
      items,
      shippingAddress,
      paymentMethod
    };
  };

  const invoiceData = getInvoiceData();

  const handleGenerateInvoice = () => {
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Download Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {invoiceData ? (
          <div>
            <div className="mb-4">
              <h6>Order Details:</h6>
              <div className="card p-3">
                <p><strong>Shipment ID:</strong> {shipmentData.shipmentId}</p>
                <p><strong>Order ID:</strong> {shipmentData.orderInfo?.orderId}</p>
                <p><strong>Order Date:</strong> {formatDate(shipmentData.orderInfo?.orderDate)}</p>
                <p><strong>Status:</strong> {shipmentData.shipmentStatus}</p>
                <p><strong>Total Amount:</strong> ₹{shipmentData.priceDetails?.totalPaid || 0}</p>
              </div>
            </div>

            {/* Invoice Generator Component */}
            <div className="text-center">
              <InvoiceGenerator
                order={invoiceData.order}
                items={invoiceData.items}
                shippingAddress={invoiceData.shippingAddress}
                paymentMethod={invoiceData.paymentMethod}
                onDownloadComplete={handleClose}
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>No order data available for invoice generation.</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/* -------------------- Cancel Success Popup Component -------------------- */
const CancelSuccessPopup = ({ show, handleClose, onConfirm, refundMethods }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Body className="text-center p-4">
      <h5 className="fw-bold mb-3 text-success">Order Cancelled Successfully!</h5>
      <p className="text-muted small mb-3">
        Refund (if applicable) will be processed within 3–5 business days.
      </p>

      {refundMethods?.length > 0 && (
        <div className="mb-3">
          <h6 className="fw-semibold">Refund Method:</h6>
          <ul className="list-unstyled mb-0">
            {refundMethods.map((method, i) => (
              <li key={i} className="text-muted">
                • {method.label} ({method.method})
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        onClick={() => {
          handleClose();
          onConfirm && onConfirm();
        }}
        className="w-100"
        style={{
          backgroundColor: "#4A90E2",
          border: "none",
          borderRadius: "8px",
          fontWeight: "500",
        }}
      >
        Okay
      </Button>
    </Modal.Body>
  </Modal>
);

/* -------------------- Cancel Order Popup Component -------------------- */
const CancelOrderPopup = ({
  show,
  handleClose,
  orderId,
  paymentMethod,
  onCancelSuccess,
}) => {
  const [reason, setReason] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      setMessage({ type: "danger", text: "Please select a cancellation reason." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(CANCEL_ORDER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          orderId,
          reason: reason === "Other" ? otherDetails : reason,
          method: paymentMethod?.toLowerCase() || "wallet",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({
          type: "success",
          text: data.message || "Order cancelled successfully!",
        });
        setTimeout(() => {
          handleClose();
          onCancelSuccess && onCancelSuccess(data);
        }, 800);
      } else {
        setMessage({
          type: "danger",
          text: data?.message || "Failed to cancel order. Please try again.",
        });
      }
    } catch {
      setMessage({
        type: "danger",
        text: "Network error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Reason for Cancellation*</Form.Label>
            <Form.Select
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason</option>
              {CANCELLATION_REASONS.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {reason === "Other" && (
            <Form.Group className="mb-3">
              <Form.Label>Other Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={250}
                placeholder="Please specify your reason..."
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
              <div className="text-end small text-muted mt-1">
                {otherDetails.length}/250
              </div>
            </Form.Group>
          )}

          <Button
            type="submit"
            className="w-100"
            disabled={loading}
            style={{
              backgroundColor: "#1e88e5",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "500",
            }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

/* -------------------- Main Chatbot Component -------------------- */
const Chatbot = ({ onAddToCart }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [stage, setStage] = useState("main");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedImages, setSelectedImages] = useState({});
  const [showAllVariants, setShowAllVariants] = useState({});

  /* ----------  TRACKING FLOW STATES  ---------- */
  const [trackingStage, setTrackingStage] = useState("check-auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shipmentId, setShipmentId] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  /* ----------  INVOICE FLOW STATES  ---------- */
  const [invoiceStage, setInvoiceStage] = useState("check-auth");
  const [invoiceShipmentId, setInvoiceShipmentId] = useState("");
  const [invoiceData, setInvoiceData] = useState(null);
  const [showInvoicePopup, setShowInvoicePopup] = useState(false);

  /* ----------  CANCELLATION FLOW STATES  ---------- */
  const [cancellationStage, setCancellationStage] = useState("check-auth");
  const [orderIdToCancel, setOrderIdToCancel] = useState("");
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
  const [refundMethods, setRefundMethods] = useState([]);

  /* ----------  GEMINI AI STATES  ---------- */
  const [geminiStage, setGeminiStage] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");
  const [aiThinking, setAiThinking] = useState(false);

  const messagesRef = useRef();
  const { addToCart } = useContext(CartContext);

  const scroll = () => messagesRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  useEffect(() => scroll(), [messages]);

  useEffect(() => {
    if (open) checkAuthentication();
  }, [open]);

  const checkAuthentication = async () => {
    try {
      await axios.get(PROFILE_API, { withCredentials: true });
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };

  /* ----------  INITIALIZE CHAT  ---------- */
  const handleOpen = () => {
    setOpen(true);
    if (!messages.length) greet();
  };

  const handleClose = () => {
    setOpen(false);
    resetTrackingFlow();
    resetCancellationFlow();
    resetInvoiceFlow();
    resetGeminiFlow();
  };

  const greet = () => {
    setMessages([{ from: "bot", text: "Hi! 👋 What can I help you with today?" }]);
  };

  /* ----------  RESET FLOWS  ---------- */
  const resetTrackingFlow = () => {
    setTrackingStage("check-auth");
    setEmail("");
    setPassword("");
    setShipmentId("");
    setTrackingData(null);
    setAuthChecked(false);
  };

  const resetCancellationFlow = () => {
    setCancellationStage("check-auth");
    setOrderIdToCancel("");
    setSelectedOrderForCancel(null);
    setShowCancelPopup(false);
    setShowSuccessPopup(false);
    setRefundMethods([]);
  };

  const resetInvoiceFlow = () => {
    setInvoiceStage("check-auth");
    setInvoiceShipmentId("");
    setInvoiceData(null);
    setShowInvoicePopup(false);
  };

  const resetGeminiFlow = () => {
    setGeminiStage(null);
    setUserQuestion("");
    setAiThinking(false);
  };

  /* ----------  FETCH PRODUCTS  ---------- */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(ENDPOINT);
      return res.data.products || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  /* ----------  FETCH SHIPMENT DATA FOR INVOICE  ---------- */
  const fetchShipmentForInvoice = async (shipmentId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${SHIPMENT_API}/${shipmentId}`, {
        withCredentials: true
      });

      if (response.data?.success) {
        setInvoiceData(response.data);
        return { success: true, data: response.data };
      } else {
        throw new Error("Failed to fetch shipment details");
      }
    } catch (error) {
      console.error("Error fetching shipment for invoice:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || "Failed to fetch order details" 
      };
    } finally {
      setLoading(false);
    }
  };

  /* ----------  GEMINI AI HANDLERS  ---------- */
  const handleAskAI = () => {
    setMessages((prev) => [
      ...prev, 
      { 
        from: "bot", 
        text: "🤖 I'm your AI assistant! Ask me anything about products, beauty tips, skincare, makeup recommendations, or any questions you have. I'm here to help!\n\nType your question below:" 
      }
    ]);
    setGeminiStage("waiting-question");
    setStage("gemini-ai");
  };

  const handleGeminiQuestion = async () => {
    if (!userQuestion.trim()) {
      toast.error("Please type your question first");
      return;
    }

    // Add user's question to chat
    setMessages((prev) => [...prev, { from: "user", text: userQuestion }]);
    setAiThinking(true);
    
    try {
      // Send to Gemini
      const result = await model.generateContent(userQuestion);
      const response = await result.response;
      const text = response.text();
      
      // Add Gemini's response to chat
      setMessages((prev) => [
        ...prev, 
        { 
          from: "bot", 
          text: `${text}\n\n💡 **Tip:** You can ask me more questions or go back to main menu.` 
        }
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          from: "bot", 
          text: "Sorry, I'm having trouble connecting to the AI service right now. Please try again later or contact our support team.\n\nError: " + (error.message || "Unknown error") 
        }
      ]);
    } finally {
      setAiThinking(false);
      setUserQuestion("");
      setGeminiStage("response-received");
    }
  };

  /* ----------  MAIN MENU HANDLERS  ---------- */
  const pickMain = (key, label) => {
    setMessages((prev) => [...prev, { from: "user", text: label }]);
    
    if (key === "products") {
      setMessages((prev) => [...prev, { from: "bot", text: "Choose a category:" }]);
      setStage("categories");
    } else if (key === "orders") {
      setMessages((prev) => [...prev, { from: "bot", text: "Select what you need help with:" }]);
      setStage("orders");
    } else if (key === "support") {
      setMessages((prev) => [...prev, { from: "bot", text: "📧 Email us at: support@joyory.in\n📞 Call us at: 1800-XXX-XXXX\n⏰ Support Hours: 9 AM - 6 PM (Mon-Sat)" }]);
    } else if (key === "ask-ai") {
      handleAskAI();
    }
  };

  /* ----------  ORDER OPTIONS HANDLER  ---------- */
  const pickOrderOption = (option) => {
    setMessages((prev) => [...prev, { from: "user", text: option.label }]);
    
    if (option.key === "track") {
      startOrderTracking();
    } else if (option.key === "cancel") {
      startOrderCancellation();
    } else if (option.key === "invoice") {
      startInvoiceDownload();
    } else {
      let response = "";
      switch (option.key) {
        case "return":
          response = "For returns/refunds:\n1. Products can be returned within 7 days of delivery\n2. Items must be unused and in original packaging\n3. Visit 'My Orders' to initiate return\n\nRefunds are processed within 5-7 business days.";
          break;
        case "support":
          response = "Our support team will contact you within 24 hours.\n\nYou can also:\n📧 Email: support@joyory.in\n📞 Call: 1800-XXX-XXXX\n💬 WhatsApp: +91-XXXXXXXXXX";
          break;
      }
      
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
      setStage("main");
    }
  };

  /* ----------  INVOICE DOWNLOAD FLOW  ---------- */
  const startInvoiceDownload = () => {
    resetInvoiceFlow();
    
    if (!isLoggedIn) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "🔐 Please enter your email address to login and download invoice:" }
      ]);
      setInvoiceStage("login-email");
      setStage("invoice");
    } else {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Please enter your Shipment ID to download invoice:" }
      ]);
      setInvoiceStage("shipment");
      setStage("invoice");
    }
  };

  /* ----------  ORDER CANCELLATION FLOW  ---------- */
  const startOrderCancellation = () => {
    resetCancellationFlow();
    
    if (!isLoggedIn) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "🔐 Please enter your email address to login and cancel order:" }
      ]);
      setCancellationStage("login-email");
      setStage("cancellation");
    } else {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Please enter your Order ID:" }
      ]);
      setCancellationStage("order-id");
      setStage("cancellation");
    }
  };

  /* ----------  ORDER TRACKING FLOW  ---------- */
  const startOrderTracking = () => {
    resetTrackingFlow();
    
    if (!authChecked) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "🔐 Checking your login status..." }
      ]);
      checkAuthentication();
    }
    
    if (isLoggedIn) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "✅ You're logged in! Please enter your Shipment ID:" }
      ]);
      setTrackingStage("shipment");
    } else {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Please enter your email address to continue:" }
      ]);
      setTrackingStage("login-email");
    }
  };

  /* ----------  AUTHENTICATION HANDLERS  ---------- */
  const handleEmailSubmit = async () => {
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setMessages((prev) => [...prev, { from: "user", text: email }]);
    
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "Please enter your password:" }
    ]);
    
    if (stage === "cancellation") {
      setCancellationStage("login-password");
    } else if (stage === "invoice") {
      setInvoiceStage("login-password");
    } else {
      setTrackingStage("login-password");
    }
  };

  const handleLogin = async () => {
    if (!password) { 
      toast.error("Please enter your password"); 
      return; 
    }

    try {
      setLoading(true);
      await axios.post(LOGIN_API, { email, password }, { withCredentials: true });
      setIsLoggedIn(true);
      
      if (stage === "cancellation") {
        setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Order ID:" }]);
        setCancellationStage("order-id");
      } else if (stage === "invoice") {
        setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Shipment ID:" }]);
        setInvoiceStage("shipment");
      } else {
        setMessages(prev => [...prev, { from: "bot", text: "✅ Login successful! Now please enter your Shipment ID:" }]);
        setTrackingStage("shipment");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ----------  INVOICE DOWNLOAD HANDLERS  ---------- */
  const handleInvoiceShipmentSubmit = async () => {
    if (!invoiceShipmentId.trim()) {
      toast.error("Please enter a valid Shipment ID");
      return;
    }

    setMessages((prev) => [...prev, { from: "user", text: invoiceShipmentId }]);
    
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "🔍 Fetching order details for invoice..." }
    ]);
    
    setLoading(true);
    
    const result = await fetchShipmentForInvoice(invoiceShipmentId);
    
    if (result.success) {
      setInvoiceData(result.data);
      setShowInvoicePopup(true);
      
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `✅ Found shipment ${invoiceShipmentId}. Generating invoice...` }
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `❌ ${result.error}` }
      ]);
    }
    
    setLoading(false);
  };

  /* ----------  ORDER CANCELLATION HANDLERS  ---------- */
  const handleOrderIdSubmit = () => {
    if (!orderIdToCancel.trim()) {
      toast.error("Please enter a valid Order ID");
      return;
    }

    setMessages((prev) => [...prev, { from: "user", text: orderIdToCancel }]);
    
    // Here you would typically fetch order details to verify
    // For now, we'll just proceed with the cancellation
    setSelectedOrderForCancel({
      _id: orderIdToCancel,
      paymentMethod: "Online" // This should come from API
    });
    
    setShowCancelPopup(true);
  };

  const handleCancelSuccess = (data) => {
    setRefundMethods(data.refundMethodsAvailable || []);
    setShowCancelPopup(false);
    setShowSuccessPopup(true);
    
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "✅ Order cancelled successfully! Refund will be processed within 3-5 business days." }
    ]);
  };

  /* ----------  SHIPMENT ID HANDLER  ---------- */
  const handleShipmentSubmit = async () => {
    if (!shipmentId.trim()) {
      toast.error("Please enter a valid Shipment ID");
      return;
    }

    setMessages((prev) => [...prev, { from: "user", text: shipmentId }]);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "🔍 Tracking your order..." }
    ]);
    
    setLoading(true);
    
    try {
      const response = await axios.get(`${SHIPMENT_API}/${shipmentId}`, {
        withCredentials: true
      });

      if (response.data?.success) {
        setTrackingData(response.data);
        displayTrackingInfo(response.data);
        setTrackingStage("result");
      } else {
        throw new Error("Failed to fetch shipment details");
      }
    } catch (error) {
      console.error("Tracking error:", error);
      
      let errorMessage = "❌ Unable to track order. ";
      
      if (error.response?.status === 401) {
        errorMessage += "You need to login first. ";
        setIsLoggedIn(false);
        setTrackingStage("login-email");
      } else if (error.response?.status === 404) {
        errorMessage += "Shipment not found. Please check the Shipment ID.";
      } else {
        errorMessage += error.response?.data?.message || error.message || "Please try again.";
      }
      
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: errorMessage }
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ----------  DISPLAY TRACKING INFO  ---------- */
  const displayTrackingInfo = (data) => {
    const shipment = data;
    
    let trackingMessage = "📦 **Order Tracking Details**\n\n";
    trackingMessage += `**Shipment ID:** ${shipment.shipmentId}\n`;
    
    if (shipment.orderInfo?.orderId) {
      trackingMessage += `**Order ID:** ${shipment.orderInfo.orderId}\n`;
    }
    
    trackingMessage += `**Status:** ${getStatusWithIcon(shipment.shipmentStatus)}\n`;
    
    if (shipment.expectedDelivery) {
      trackingMessage += `**Expected Delivery:** ${formatDate(shipment.expectedDelivery)}\n`;
    }
    
    if (shipment.courier?.awb) {
      trackingMessage += `**AWB Number:** ${shipment.courier.awb}\n`;
    }
    
    if (shipment.courier?.trackingUrl) {
      trackingMessage += `**Tracking Link:** ${shipment.courier.trackingUrl}\n`;
    }
    
    // Add product information
    if (shipment.products?.length > 0) {
      trackingMessage += `\n**Products (${shipment.products.length}):**\n`;
      shipment.products.forEach((product, index) => {
        trackingMessage += `${index + 1}. ${product.name} - ${product.variant || "Standard"}\n`;
      });
    }
    
    trackingMessage += `\n👉 **View full details:** [Click here to open Order Details page]`;
    
    setMessages((prev) => [
      ...prev, 
      { 
        from: "bot", 
        text: trackingMessage,
        data: { 
          tracking: true,
          shipmentId: shipment.shipmentId,
          trackingUrl: shipment.courier?.trackingUrl
        }
      }
    ]);
  };

  /* ----------  VALIDATION FUNCTIONS  ---------- */
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const getStatusWithIcon = (status) => {
    const statusLower = status?.toLowerCase() || "";
    switch (statusLower) {
      case "confirmed": return "✅ Confirmed";
      case "shipped": return "🚚 Shipped";
      case "delivered": return "📦 Delivered";
      case "cancelled": return "❌ Cancelled";
      case "pending": return "⏳ Pending";
      default: return status || "Unknown";
    }
  };

  /* ----------  PRODUCT CATEGORY HANDLER  ---------- */
  const pickCategory = async (cat) => {
    setMessages((prev) => [...prev, { from: "user", text: cat }]);
    setLoading(true);

    const prods = await fetchProducts();
    const filtered = prods.filter((p) => 
      p.category?.name === cat || 
      p.categories?.some(c => c.name === cat) ||
      p.name?.toLowerCase().includes(cat.toLowerCase())
    );

    setLoading(false);
    if (!filtered.length) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `No products in "${cat}" right now.` },
      ]);
      return;
    }

    setProducts(filtered);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: `Found ${filtered.length} products in ${cat}:`, data: { slider: true } },
    ]);
  };

  /* ----------  PRODUCT VARIANT HANDLERS  ---------- */
  useEffect(() => {
    if (products.length === 0) return;

    const defaultVariants = {};
    const defaultImages = {};

    products.forEach((product) => {
      const variants = product.variants || [];
      if (variants.length === 0) return;

      const blackVariant = variants.find((v) => isBlackHex(v?.hex));
      const selected = blackVariant || variants[0];

      defaultVariants[product._id] = {
        shadeName: selected?.shadeName || selected?.size || "Default",
        hex: selected?.hex,
        image: selected?.image || selected?.images?.[0] || null,
        discountedPrice: selected?.discountedPrice ?? selected?.price ?? 0,
        originalPrice: selected?.originalPrice ?? selected?.price ?? 0,
        stock: selected?.stock ?? 0,
        variantSku: getSku(selected),
      };

      defaultImages[product._id] = selected?.image || selected?.images?.[0] || product?.images?.[0] || null;
    });

    setSelectedVariants(defaultVariants);
    setSelectedImages(defaultImages);
  }, [products]);

  const handleVariantChange = (productId, variant) => {
    if (variant.stock !== undefined && variant.stock <= 0) {
      toast.warning("This variant is out of stock");
      return;
    }

    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: {
        shadeName: variant.shadeName || variant.size || "Default",
        hex: variant.hex,
        image: variant.image || variant.images?.[0] || null,
        discountedPrice: variant.discountedPrice ?? variant.price ?? 0,
        originalPrice: variant.originalPrice ?? variant.price ?? 0,
        stock: variant.stock ?? 0,
        variantSku: getSku(variant),
      },
    }));

    if (variant.image || variant.images?.[0]) {
      setSelectedImages((prev) => ({
        ...prev,
        [productId]: variant.image || variant.images[0],
      }));
    }
  };

  const addToCartHandler = async (product) => {
    try {
      let isLoggedIn = false;
      try {
        await axios.get(PROFILE_API, { withCredentials: true });
        isLoggedIn = true;
      } catch {
        isLoggedIn = false;
      }

      const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
      const selectedVariant = selectedVariants[product._id];
      let variantToAdd = null;

      if (hasVariants) {
        const availableVariants = product.variants.filter((v) => v.stock > 0);
        if (availableVariants.length === 0) {
          toast.warning("All variants are out of stock.");
          return;
        }

        if (selectedVariant && selectedVariant.variantSku) {
          const matchedVariant = product.variants.find((v) => getSku(v) === selectedVariant.variantSku);
          if (matchedVariant && matchedVariant.stock > 0) {
            variantToAdd = matchedVariant;
          } else {
            const matchedByName = product.variants.find((v) => 
              (v.shadeName || "").toLowerCase() === (selectedVariant.shadeName || "").toLowerCase()
            );
            if (matchedByName && matchedByName.stock > 0) variantToAdd = matchedByName;
          }
          if (!variantToAdd) {
            toast.warning("Selected variant is out of stock or unavailable.");
            return;
          }
        } else {
          variantToAdd = availableVariants[0];
        }
      } else {
        if (product.stock <= 0) {
          toast.warning("Product is out of stock.");
          return;
        }
        variantToAdd = {
          sku: `sku-${product._id}-default`,
          shadeName: "Default",
          hex: "#ccc",
          image: product.images?.[0] || "/placeholder.png",
          originalPrice: product.mrp || product.price,
          discountedPrice: product.price,
          stock: product.stock ?? 1,
        };
      }

      const cache = JSON.parse(localStorage.getItem(VARIANT_CACHE_KEY) || "{}");
      cache[product._id] = variantToAdd;
      localStorage.setItem(VARIANT_CACHE_KEY, JSON.stringify(cache));

      const variantSkuToSend = getSku(variantToAdd) || variantToAdd.sku;
      const cartPayload = {
        productId: product._id,
        variants: [{ variantSku: variantSkuToSend, quantity: 1 }],
      };

      if (isLoggedIn) {
        await addToCart(product, variantToAdd);
        toast.success("Product added to cart!");
        onAddToCart?.();
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const existingIndex = guestCart.findIndex(
          (item) => item.productId === product._id && item.variantSku === variantSkuToSend
        );
        if (existingIndex !== -1) {
          guestCart[existingIndex].quantity += 1;
        } else {
          guestCart.push({ 
            productId: product._id, 
            variantSku: variantSkuToSend, 
            product: product, 
            variant: variantToAdd, 
            quantity: 1 
          });
        }
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast.success("Added to cart as guest!");
      }
    } catch (err) {
      console.error("Add to Cart error:", err?.response?.data || err?.message);
      toast.error("Failed to add product.");
    }
  };

  /* ----------  RENDER PRODUCT CARD  ---------- */
  const renderProductCard = (product) => {
    const variants = product.variants || [];
    const selectedVariant = selectedVariants[product._id] || variants[0] || {};
    
    const colorVariants = variants.filter((v) => v.hex);
    const otherVariants = variants.filter((v) => !v.hex);
    
    const isExpanded = showAllVariants[product._id] || false;
    const visibleColorVariants = isExpanded ? colorVariants : colorVariants.slice(0, 3);
    const visibleOtherVariants = isExpanded ? otherVariants : otherVariants.slice(0, 3);

    const price = Number(selectedVariant?.discountedPrice ?? product.price ?? 0);
    const mrp = Number(selectedVariant?.originalPrice ?? product.mrp ?? price);
    const hasDiscount = mrp > price;
    const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

    return (
      <div className="chatbot-product-card">
        <img
          src={selectedImages[product._id] || selectedVariant?.image || product.images?.[0]}
          alt={product.name}
          className="chatbot-product-image"
        />
        <div className="chatbot-product-info">
          <h6 className="chatbot-product-title">{product.name}</h6>

          {colorVariants.length > 0 && (
            <div className="chatbot-variants-row">
              {visibleColorVariants.map((variant, idx) => {
                const outOfStock = variant.stock <= 0;
                const variantSku = getSku(variant);
                const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
                return (
                  <div
                    key={variantSku || `${product._id}-cv-${idx}`}
                    onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
                    className={`chatbot-color-swatch ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
                    style={{ backgroundColor: variant.hex || '#ccc' }}
                    title={outOfStock ? `${variant.shadeName} (Out of Stock)` : variant.shadeName}
                  >
                    {outOfStock && <span className="out-of-stock-cross">✕</span>}
                  </div>
                );
              })}
              {colorVariants.length > 3 && (
                <button
                  className="chatbot-show-more-btn"
                  onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
                >
                  {isExpanded ? "−" : `+${colorVariants.length - 3}`}
                </button>
              )}
            </div>
          )}

          {otherVariants.length > 0 && (
            <div className="chatbot-variants-row">
              {visibleOtherVariants.map((variant, idx) => {
                const outOfStock = variant.stock <= 0;
                const variantSku = getSku(variant);
                const isSelected = selectedVariants[product._id]?.variantSku === variantSku;
                return (
                  <button
                    key={variantSku || `${product._id}-ov-${idx}`}
                    onClick={() => !outOfStock && handleVariantChange(product._id, variant)}
                    className={`chatbot-size-btn ${isSelected ? 'selected' : ''} ${outOfStock ? 'out-of-stock' : ''}`}
                  >
                    {variant.size || variant.shadeName || "Option"}
                  </button>
                );
              })}
              {otherVariants.length > 3 && (
                <button
                  className="chatbot-show-more-btn"
                  onClick={() => setShowAllVariants(prev => ({ ...prev, [product._id]: !isExpanded }))}
                >
                  {isExpanded ? "−" : `+${otherVariants.length - 3}`}
                </button>
              )}
            </div>
          )}

          {selectedVariant && (
            <div className="chatbot-selected-variant">
              Selected: {selectedVariant.shadeName || selectedVariant.size || "Default"}
            </div>
          )}

          <div className="chatbot-price-section">
            <span className="chatbot-price">₹{price}</span>
            {hasDiscount && (
              <>
                <span className="chatbot-mrp">₹{mrp}</span>
                <span className="chatbot-discount">({discountPercent}% OFF)</span>
              </>
            )}
          </div>
          <button className="chatbot-add-btn" onClick={() => addToCartHandler(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  /* ----------  RENDER PRODUCT SLIDER  ---------- */
  const renderSlider = () => (
    <div className="chat-slider">
      <Swiper
        slidesPerView={1.2}
        spaceBetween={12}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>{renderProductCard(product)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  /* ----------  RENDER GEMINI AI INPUTS  ---------- */
  const renderGeminiInputs = () => {
    if (geminiStage === "waiting-question") {
      return (
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your question here..."
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            className="order-input"
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && handleGeminiQuestion()}
          />
          <button 
            onClick={handleGeminiQuestion} 
            className="send-btn"
            disabled={aiThinking || !userQuestion.trim()}
          >
            {aiThinking ? "Thinking..." : "Ask AI"}
          </button>
        </div>
      );
    }
    
    if (geminiStage === "response-received") {
      return (
        <div className="input-area">
          <input
            type="text"
            placeholder="Ask another question or type 'back' to return..."
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            className="order-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (userQuestion.toLowerCase() === 'back') {
                  setStage("main");
                  setGeminiStage(null);
                  setUserQuestion("");
                } else {
                  handleGeminiQuestion();
                }
              }
            }}
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button 
              onClick={handleGeminiQuestion} 
              className="send-btn"
              disabled={aiThinking || !userQuestion.trim()}
              style={{ flex: 1 }}
            >
              {aiThinking ? "Thinking..." : "Ask Again"}
            </button>
            <button 
              onClick={() => {
                setStage("main");
                setGeminiStage(null);
                setUserQuestion("");
              }}
              className="opt-btn back"
              style={{ flex: 0.5 }}
            >
              Back
            </button>
          </div>
        </div>
      );
    }
    
    return null;
  };

  /* ----------  RENDER INVOICE INPUTS  ---------- */
  const renderInvoiceInputs = () => {
    switch (invoiceStage) {
      case "login-email":
        return (
          <div className="input-area">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleEmailSubmit} 
              className="send-btn"
              disabled={loading || !email}
            >
              {loading ? "..." : "Continue"}
            </button>
          </div>
        );

      case "login-password":
        return (
          <div className="input-area">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleLogin} 
              className="send-btn"
              disabled={loading || !password}
            >
              {loading ? "..." : "Login"}
            </button>
          </div>
        );

      case "shipment":
        return (
          <div className="input-area">
            <input
              type="text"
              placeholder="Enter Shipment ID"
              value={invoiceShipmentId}
              onChange={(e) => setInvoiceShipmentId(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleInvoiceShipmentSubmit} 
              className="send-btn"
              disabled={loading || !invoiceShipmentId}
            >
              {loading ? "..." : "Get Invoice"}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  /* ----------  RENDER CANCELLATION INPUTS  ---------- */
  const renderCancellationInputs = () => {
    switch (cancellationStage) {
      case "login-email":
        return (
          <div className="input-area">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleEmailSubmit} 
              className="send-btn"
              disabled={loading || !email}
            >
              {loading ? "..." : "Continue"}
            </button>
          </div>
        );

      case "login-password":
        return (
          <div className="input-area">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleLogin} 
              className="send-btn"
              disabled={loading || !password}
            >
              {loading ? "..." : "Login"}
            </button>
          </div>
        );

      case "order-id":
        return (
          <div className="input-area">
            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderIdToCancel}
              onChange={(e) => setOrderIdToCancel(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleOrderIdSubmit} 
              className="send-btn"
              disabled={loading || !orderIdToCancel}
            >
              {loading ? "..." : "Continue"}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  /* ----------  RENDER TRACKING INPUTS  ---------- */
  const renderTrackingInputs = () => {
    switch (trackingStage) {
      case "login-email":
        return (
          <div className="input-area">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleEmailSubmit} 
              className="send-btn"
              disabled={loading || !email}
            >
              {loading ? "..." : "Continue"}
            </button>
          </div>
        );

      case "login-password":
        return (
          <div className="input-area">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleLogin} 
              className="send-btn"
              disabled={loading || !password}
            >
              {loading ? "..." : "Login"}
            </button>
          </div>
        );

      case "shipment":
        return (
          <div className="input-area">
            <input
              type="text"
              placeholder="Enter Shipment ID"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
              className="order-input"
              autoFocus
            />
            <button 
              onClick={handleShipmentSubmit} 
              className="send-btn"
              disabled={loading || !shipmentId}
            >
              {loading ? "..." : "Track"}
            </button>
          </div>
        );

      case "result":
        return (
          <div className="tracking-result-actions">
            <button 
              className="btn btn-primary btn-sm me-2"
              onClick={() => {
                window.open(`/order-details/${shipmentId}`, "_blank");
              }}
            >
              View Full Details
            </button>
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                setStage("main");
                resetTrackingFlow();
              }}
            >
              Back to Main
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  /* ----------  MAIN RENDER  ---------- */
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {!open && (
        <button className="chat-trigger" onClick={handleOpen}>
          💬
        </button>
      )}

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div>
              <p>Joyory Assistant</p>
              <small>Online</small>
            </div>
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>
          </div>

          <div className="chat-body" ref={messagesRef}>
            {/* Messages */}
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                <div className="bubble">
                  <div className="message-text" style={{ whiteSpace: 'pre-line' }}>
                    {m.text}
                    {m.data?.trackingUrl && (
                      <div style={{ marginTop: '10px' }}>
                        <a 
                          href={m.data.trackingUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          Track on Courier Site
                        </a>
                      </div>
                    )}
                  </div>
                  {m.data?.slider && renderSlider()}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="loader">
                <div className="spinner"></div>
                {trackingStage === "shipment" ? "Tracking order..." : 
                 invoiceStage === "shipment" ? "Fetching invoice data..." :
                 cancellationStage === "order-id" ? "Processing..." : 
                 aiThinking ? "AI is thinking..." : 
                 "Loading..."}
              </div>
            )}

            {/* Gemini AI Inputs */}
            {stage === "gemini-ai" && renderGeminiInputs()}

            {/* Tracking Inputs */}
            {stage === "orders" && trackingStage !== "check-auth" && renderTrackingInputs()}

            {/* Invoice Inputs */}
            {stage === "invoice" && renderInvoiceInputs()}

            {/* Cancellation Inputs */}
            {stage === "cancellation" && renderCancellationInputs()}

            {/* Options */}
            <div className="options">
              {stage === "main" &&
                MAIN_OPTIONS.map((opt) => (
                  <button 
                    key={opt.key} 
                    className="opt-btn" 
                    onClick={() => pickMain(opt.key, opt.label)}
                  >
                    {opt.label}
                  </button>
                ))}

              {stage === "gemini-ai" && geminiStage === null && (
                <button className="opt-btn back" onClick={() => setStage("main")}>
                  Back to Main
                </button>
              )}

              {stage === "orders" && trackingStage === "check-auth" &&
                ORDER_OPTIONS.map((opt) => (
                  <button 
                    key={opt.key} 
                    className="opt-btn" 
                    onClick={() => pickOrderOption(opt)}
                  >
                    {opt.label}
                  </button>
                ))}

              {stage === "categories" && (
                <>
                  {SUB_CATEGORIES.map((cat) => (
                    <button 
                      className="opt-btn" 
                      key={cat} 
                      onClick={() => pickCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                  <button className="opt-btn back" onClick={() => setStage("main")}>
                    Back
                  </button>
                </>
              )}

              {(stage === "invoice" || stage === "cancellation" || (stage === "orders" && trackingStage !== "check-auth")) && (
                <button className="opt-btn back" onClick={() => {
                  setStage("main");
                  resetTrackingFlow();
                  resetCancellationFlow();
                  resetInvoiceFlow();
                }}>
                  Back to Main
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Invoice Download Popup */}
      <InvoiceDownloadPopup
        show={showInvoicePopup}
        handleClose={() => {
          setShowInvoicePopup(false);
          setStage("main");
          resetInvoiceFlow();
        }}
        shipmentData={invoiceData}
        onDownload={() => {
          // Invoice will be downloaded via the InvoiceGenerator component
          toast.success("Invoice generated successfully!");
        }}
      />

      {/* Cancel Order Popup */}
      <CancelOrderPopup
        show={showCancelPopup}
        handleClose={() => {
          setShowCancelPopup(false);
          setStage("main");
          resetCancellationFlow();
        }}
        orderId={orderIdToCancel}
        paymentMethod={selectedOrderForCancel?.paymentMethod}
        onCancelSuccess={handleCancelSuccess}
      />

      {/* Cancel Success Popup */}
      <CancelSuccessPopup
        show={showSuccessPopup}
        handleClose={() => {
          setShowSuccessPopup(false);
          setStage("main");
          resetCancellationFlow();
        }}
        refundMethods={refundMethods}
        onConfirm={() => {
          setShowSuccessPopup(false);
          setStage("main");
          resetCancellationFlow();
        }}
      />
    </>
  );
};

export default Chatbot;
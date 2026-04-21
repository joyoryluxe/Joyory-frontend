// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const BrandFilter = ({ filters, setFilters, onClose, currentPage = "" }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();


//   useEffect(() => {
//   const fetchFilterData = async () => {
//     console.log("🟡 Fetching filter data..."); // Debug start log

//     try {
//       const res = await axios.get(
//         "https://beauty.joyory.com/api/user/products/filters"
//       );

//       console.log("🟢 Filter API response:", res); // full axios response
//       console.log("✅ Filter Data:", res.data); // clean data only
//       console.log("📂 Filters inside data:", res.data?.filters); // just filters

//       setFilterData(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching filter data:", err);
//     } finally {
//       setLoading(false);
//       console.log("🔵 Filter data fetch complete.");
//     }
//   };

//   fetchFilterData();
// }, []);


//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     priceRanges = [],
//   } = filterData?.filters || {};

//   // Handle filter change
// const handleFilterChange = async (key, value) => {
//   setFilters({ ...filters, [key]: value });

//   if (key === "category") {
//     console.log("🟠 Category selected:", value);

//     try {
//       // const url = `https://beauty.joyory.com/api/user/products?category=${value}`;
//       const url = `https://beauty.joyory.com/api/user/products?categoryId=${value}`;
//       console.log("🌐 Fetching:", url);

//       const res = await axios.get(url);

//       console.log("🟢 API Response:", res.data);
//       console.log("📦 Product count:", res.data?.length || res.data?.products?.length || 0);
//     } catch (err) {
//       console.error("❌ Error fetching products:", err);
//     }
//   }
// };


//   const handleClearFilters = () => {
//     setFilters({
//       brand: "",
//       category: "",
//       skinType: "",
//       formulation: "",
//       priceRange: null,
//       minRating: "",
//       discountSort: "",
//     });
//   };

//   const hideBrandFilter = currentPage === "brand";
//   const hideCategoryFilter = location.pathname.includes("/category");
//   const hideSkinTypeFilter = location.pathname.includes("/skintype");

//   return (
//     <div className="p-3 border rounded bg-light">
//       <h5 className="fw-bold text-primary mb-3">Filters</h5>

//       {/* Brand */}
//       {!hideBrandFilter && (
//         <div className="mb-3">
//           <label className="form-label fw-bold">Brand</label>
//           <select
//             className="form-select"
//             value={filters.brand || ""}
//             onChange={(e) => handleFilterChange("brand", e.target.value)}
//           >
//             <option value="">All</option>
//             {brands.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Category */}
//       {!hideCategoryFilter && (
//         <div className="mb-3">
//           <label className="form-label fw-bold">Category</label>
//           <select
//             className="form-select"
//             value={filters.category || ""}
//             onChange={(e) => handleFilterChange("category", e.target.value)}
//           >
//             <option value="">All</option>
//             {categories.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Skin Type */}
//       {!hideSkinTypeFilter && (
//         <div className="mb-3">
//           <label className="form-label fw-bold">Skin Type</label>
//           <select
//             className="form-select"
//             value={filters.skinType || ""}
//             onChange={(e) => handleFilterChange("skinType", e.target.value)}
//           >
//             <option value="">All</option>
//             {skinTypes.map((st) => (
//               <option key={st._id} value={st._id}>
//                 {st.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Formulation */}
//       <div className="mb-3">
//         <label className="form-label fw-bold">Formulation</label>
//         <select
//           className="form-select"
//           value={filters.formulation || ""}
//           onChange={(e) => handleFilterChange("formulation", e.target.value)}
//         >
//           <option value="">All</option>
//           {formulations.map((f) => (
//             <option key={f._id} value={f._id}>
//               {f.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Price Range */}
//       <div className="mb-3">
//         <label className="form-label fw-bold">Price Range</label>
//         <select
//           className="form-select"
//           value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//           onChange={(e) => {
//             const value = e.target.value ? JSON.parse(e.target.value) : null;
//             handleFilterChange("priceRange", value);
//           }}
//         >
//           <option value="">All</option>
//           {priceRanges.map((pr, idx) => (
//             <option
//               key={idx}
//               value={JSON.stringify({ min: pr.min, max: pr.max })}
//             >
//               {pr.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Minimum Rating */}
//       <div className="mb-3">
//         <label className="form-label fw-bold">Minimum Rating</label>
//         <select
//           className="form-select"
//           value={filters.minRating || ""}
//           onChange={(e) => handleFilterChange("minRating", e.target.value)}
//         >
//           <option value="">All</option>
//           {[5, 4, 3, 2, 1].map((r) => (
//             <option key={r} value={r}>
//               {r}★ & up
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Discount Sort */}
//       <div className="mb-3">
//         <label className="form-label fw-bold">Sort by Discount</label>
//         <select
//           className="form-select"
//           value={filters.discountSort || ""}
//           onChange={(e) => handleFilterChange("discountSort", e.target.value)}
//         >
//           <option value="">Default</option>
//           <option value="high">Highest First</option>
//           <option value="low">Lowest First</option>
//         </select>
//       </div>

//       <div className="d-flex gap-2">
//         <button
//           className="btn btn-danger btn-sm w-50"
//           onClick={handleClearFilters}
//         >
//           Clear All
//         </button>
//         {onClose && (
//           <button className="btn btn-secondary btn-sm w-50" onClick={onClose}>
//             Close
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BrandFilter;















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const BrandFilter = ({ filters, setFilters, onClose, currentPage = "" }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();


//   useEffect(() => {
//     const fetchFilterData = async () => {
//       console.log("🟡 Fetching filter data..."); // Debug start log

//       try {
//         const res = await axios.get(
//           "https://beauty.joyory.com/api/user/products/filters"
//         );

//         console.log("🟢 Filter API response:", res); // full axios response
//         console.log("✅ Filter Data:", res.data); // clean data only
//         console.log("📂 Filters inside data:", res.data?.filters); // just filters

//         setFilterData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching filter data:", err);
//       } finally {
//         setLoading(false);
//         console.log("🔵 Filter data fetch complete.");
//       }
//     };

//     fetchFilterData();
//   }, []);


//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     priceRanges = [],
//   } = filterData?.filters || {};

//   // Handle filter change
//   const handleFilterChange = async (key, value) => {
//     setFilters({ ...filters, [key]: value });

//     if (key === "category") {
//       console.log("🟠 Category selected:", value);

//       try {
//         // const url = `https://beauty.joyory.com/api/user/products?category=${value}`;
//         const url = `https://beauty.joyory.com/api/user/products?categoryId=${value}`;
//         console.log("🌐 Fetching:", url);

//         const res = await axios.get(url);

//         console.log("🟢 API Response:", res.data);
//         console.log("📦 Product count:", res.data?.length || res.data?.products?.length || 0);
//       } catch (err) {
//         console.error("❌ Error fetching products:", err);
//       }
//     }
//   };


//   const handleClearFilters = () => {
//     setFilters({
//       brand: "",
//       category: "",
//       skinType: "",
//       formulation: "",
//       priceRange: null,
//       minRating: "",
//       discountSort: "",
//     });
//   };

//   const hideBrandFilter = currentPage === "brand";
//   const hideCategoryFilter = location.pathname.includes("/category");
//   const hideSkinTypeFilter = location.pathname.includes("/skintype");

//   return (
//     <div className="p-3 rounded bg-light">
//       <h5 className="fw-bold text-primary mb-3">Filters</h5>



//       <div className="row">
//         {/* Brand */}
//         <div className="col-6 col-lg-12">
//           {!hideBrandFilter && (
//             <div className="mb-3">
//               <label className="form-label fw-bold">Brand</label>
//               <select
//                 className="form-select"
//                 value={filters.brand || ""}
//                 onChange={(e) => handleFilterChange("brand", e.target.value)}
//               >
//                 <option value="">All</option>
//                 {brands.map((b) => (
//                   <option key={b._id} value={b._id}>
//                     {b.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>



//         <div className="col-6 col-lg-12">
//           {/* Category */}
//           {!hideCategoryFilter && (
//             <div className="mb-3">
//               <label className="form-label fw-bold">Category</label>
//               <select
//                 className="form-select"
//                 value={filters.category || ""}
//                 onChange={(e) => handleFilterChange("category", e.target.value)}
//               >
//                 <option value="">All</option>
//                 {categories.map((c) => (
//                   <option key={c._id} value={c._id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>



//         <div className="col-6 col-lg-12">
//           {/* Skin Type */}
//           {!hideSkinTypeFilter && (
//             <div className="mb-3">
//               <label className="form-label fw-bold">Skin Type</label>
//               <select
//                 className="form-select"
//                 value={filters.skinType || ""}
//                 onChange={(e) => handleFilterChange("skinType", e.target.value)}
//               >
//                 <option value="">All</option>
//                 {skinTypes.map((st) => (
//                   <option key={st._id} value={st._id}>
//                     {st.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>



//         <div className="col-6 col-lg-12">
//           {/* Formulation */}
//           <div className="mb-3">
//             <label className="form-label fw-bold">Formulation</label>
//             <select
//               className="form-select"
//               value={filters.formulation || ""}
//               onChange={(e) => handleFilterChange("formulation", e.target.value)}
//             >
//               <option value="">All</option>
//               {formulations.map((f) => (
//                 <option key={f._id} value={f._id}>
//                   {f.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>


//         <div className="col-6 col-lg-12">
//           {/* Price Range */}
//           <div className="mb-3">
//             <label className="form-label fw-bold">Price Range</label>
//             <select
//               className="form-select"
//               value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//               onChange={(e) => {
//                 const value = e.target.value ? JSON.parse(e.target.value) : null;
//                 handleFilterChange("priceRange", value);
//               }}
//             >
//               <option value="">All</option>
//               {priceRanges.map((pr, idx) => (
//                 <option
//                   key={idx}
//                   value={JSON.stringify({ min: pr.min, max: pr.max })}
//                 >
//                   {pr.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>



//         <div className="col-6 col-lg-12">

//           {/* Minimum Rating */}
//           <div className="mb-3">
//             <label className="form-label fw-bold">Minimum Rating</label>
//             <select
//               className="form-select"
//               value={filters.minRating || ""}
//               onChange={(e) => handleFilterChange("minRating", e.target.value)}
//             >
//               <option value="">All</option>
//               {[5, 4, 3, 2, 1].map((r) => (
//                 <option key={r} value={r}>
//                   {r}★ & up
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>


//         <div className="col-6 col-lg-12">
//           {/* Discount Sort */}
//           <div className="mb-3">
//             <label className="form-label fw-bold">Sort by Discount</label>
//             <select
//               className="form-select"
//               value={filters.discountSort || ""}
//               onChange={(e) => handleFilterChange("discountSort", e.target.value)}
//             >
//               <option value="">Default</option>
//               <option value="high">Highest First</option>
//               <option value="low">Lowest First</option>
//             </select>
//           </div>
//         </div>



//       </div>





//       <div className="d-flex gap-2">
//         <button
//           className="btn btn-danger btn-sm w-50"
//           onClick={handleClearFilters}
//         >
//           Clear All
//         </button>
//         {onClose && (
//           <button className="btn btn-secondary btn-sm w-50" onClick={onClose}>
//             Close
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BrandFilter;






















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const BrandFilter = ({ filters, setFilters, onClose, currentPage = "" }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchFilterData = async () => {
//       try {
//         const res = await axios.get(
//           "https://beauty.joyory.com/api/user/products/filters"
//         );
//         setFilterData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching filter data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFilterData();
//   }, []);

//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     priceRanges = [],
//   } = filterData?.filters || {};

//   const handleFilterChange = (key, value) => {
//     setFilters({ ...filters, [key]: value });
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       brand: "",
//       category: "",
//       skinType: "",
//       formulation: "",
//       priceRange: null,
//       minRating: "",
//       discountSort: "",
//     });
//   };

//   const hideBrandFilter = currentPage === "brand";
//   const hideCategoryFilter = location.pathname.includes("/category");
//   const hideSkinTypeFilter = location.pathname.includes("/skintype");

//   const isCartPage = location.pathname === "/cartpage";
//   const columnClass = isCartPage ? "d-none" : "col-0 col-lg-0";

//   return (
//     // <div className="p-3 rounded bg-light">
//     //   <h5 className="fw-bold text-primary mb-3">Filters</h5>

//     //   <div className="row">
//     //     {/* Brand */}
//     //     <div className={columnClass}>
//     //       {!hideBrandFilter && (
//     //         <div className="mb-3">
//     //           <label className="form-label fw-bold">Brand</label>
//     //           <select
//     //             className="form-select"
//     //             value={filters.brand || ""}
//     //             onChange={(e) => handleFilterChange("brand", e.target.value)}
//     //           >
//     //             <option value="">All</option>
//     //             {brands.map((b) => (
//     //               <option key={b._id} value={b._id}>
//     //                 {b.name}
//     //               </option>
//     //             ))}
//     //           </select>
//     //         </div>
//     //       )}
//     //     </div>

//     //     {/* Category */}
//     //     <div className={columnClass}>
//     //       {!hideCategoryFilter && (
//     //         <div className="mb-3">
//     //           <label className="form-label fw-bold">Category</label>
//     //           <select
//     //             className="form-select"
//     //             value={filters.category || ""}
//     //             onChange={(e) => handleFilterChange("category", e.target.value)}
//     //           >
//     //             <option value="">All</option>
//     //             {categories.map((c) => (
//     //               <option key={c._id} value={c._id}>
//     //                 {c.name}
//     //               </option>
//     //             ))}
//     //           </select>
//     //         </div>
//     //       )}
//     //     </div>

//     //     {/* Skin Type */}
//     //     <div className={columnClass}>
//     //       {!hideSkinTypeFilter && (
//     //         <div className="mb-3">
//     //           <label className="form-label fw-bold">Skin Type</label>
//     //           <select
//     //             className="form-select"
//     //             value={filters.skinType || ""}
//     //             onChange={(e) => handleFilterChange("skinType", e.target.value)}
//     //           >
//     //             <option value="">All</option>
//     //             {skinTypes.map((st) => (
//     //               <option key={st._id} value={st._id}>
//     //                 {st.name}
//     //               </option>
//     //             ))}
//     //           </select>
//     //         </div>
//     //       )}
//     //     </div>

//     //     {/* Formulation */}
//     //     <div className={columnClass}>
//     //       <div className="mb-3">
//     //         <label className="form-label fw-bold">Formulation</label>
//     //         <select
//     //           className="form-select"
//     //           value={filters.formulation || ""}
//     //           onChange={(e) => handleFilterChange("formulation", e.target.value)}
//     //         >
//     //           <option value="">All</option>
//     //           {formulations.map((f) => (
//     //             <option key={f._id} value={f._id}>
//     //               {f.name}
//     //             </option>
//     //           ))}
//     //         </select>
//     //       </div>
//     //     </div>

//     //     {/* Price Range */}
//     //     <div className={columnClass}>
//     //       <div className="mb-3">
//     //         <label className="form-label fw-bold">Price Range</label>
//     //         <select
//     //           className="form-select"
//     //           value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//     //           onChange={(e) => {
//     //             const value = e.target.value ? JSON.parse(e.target.value) : null;
//     //             handleFilterChange("priceRange", value);
//     //           }}
//     //         >
//     //           <option value="">All</option>
//     //           {priceRanges.map((pr, idx) => (
//     //             <option
//     //               key={idx}
//     //               value={JSON.stringify({ min: pr.min, max: pr.max })}
//     //             >
//     //               {pr.label}
//     //             </option>
//     //           ))}
//     //         </select>
//     //       </div>
//     //     </div>

//     //     {/* Minimum Rating */}
//     //     <div className={columnClass}>
//     //       <div className="mb-3">
//     //         <label className="form-label fw-bold">Minimum Rating</label>
//     //         <select
//     //           className="form-select"
//     //           value={filters.minRating || ""}
//     //           onChange={(e) => handleFilterChange("minRating", e.target.value)}
//     //         >
//     //           <option value="">All</option>
//     //           {[5, 4, 3, 2, 1].map((r) => (
//     //             <option key={r} value={r}>
//     //               {r}★ & up
//     //             </option>
//     //           ))}
//     //         </select>
//     //       </div>
//     //     </div>

//     //     {/* Discount Sort */}
//     //     <div className={columnClass}>
//     //       <div className="mb-3">
//     //         <label className="form-label fw-bold">Sort by Discount</label>
//     //         <select
//     //           className="form-select"
//     //           value={filters.discountSort || ""}
//     //           onChange={(e) => handleFilterChange("discountSort", e.target.value)}
//     //         >
//     //           <option value="">Default</option>
//     //           <option value="high">Highest First</option>
//     //           <option value="low">Lowest First</option>
//     //         </select>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   <div className="d-flex gap-2">
//     //     <button
//     //       className="btn btn-danger btn-sm w-50"
//     //       onClick={handleClearFilters}
//     //     >
//     //       Clear All
//     //     </button>
//     //     {onClose && (
//     //       <button className="btn btn-secondary btn-sm w-50" onClick={onClose}>
//     //         Close
//     //       </button>
//     //     )}
//     //   </div>
//     // </div>

//     <div className="filter-wrapper border" style={{position:'sticky' , top:'10px'}}>
//   {/* Header */}
//   <div className="d-flex justify-content-between align-items-center p-3">
//     <h6 className="fw-bold mb-0">Filters</h6>
//     <button
//       className="btn btn-link text-decoration-none text-muted p-0"
//       onClick={handleClearFilters}
//     >
//       Reset
//     </button>
//   </div>

//   {/* Accordion */}
//   <div className="accordion mb-0 accordion-flush border-none" id="filterAccordion">

//     {/* Category */}
//     {!hideCategoryFilter && (
//       <div className="accordion-item">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button collapsed"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#filterCategory"
//           >
//             Category
//           </button>
//         </h2>
//         <div id="filterCategory" className="accordion-collapse collapse">
//           <div className="accordion-body">
//             <select
//               className="form-select"
//               value={filters.category || ""}
//               onChange={(e) =>
//                 handleFilterChange("category", e.target.value)
//               }
//             >
//               <option value="">All</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Brand */}
//     {!hideBrandFilter && (
//       <div className="accordion-item">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button collapsed"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#filterBrand"
//           >
//             Brand
//           </button>
//         </h2>
//         <div id="filterBrand" className="accordion-collapse collapse">
//           <div className="accordion-body">
//             <select
//               className="form-select"
//               value={filters.brand || ""}
//               onChange={(e) =>
//                 handleFilterChange("brand", e.target.value)
//               }
//             >
//               <option value="">All</option>
//               {brands.map((b) => (
//                 <option key={b._id} value={b._id}>
//                   {b.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Skin Type */}
//     {!hideSkinTypeFilter && (
//       <div className="accordion-item">
//         <h2 className="accordion-header">
//           <button
//             className="accordion-button collapsed"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#filterSkinType"
//           >
//             Skin Type
//           </button>
//         </h2>
//         <div id="filterSkinType" className="accordion-collapse collapse">
//           <div className="accordion-body">
//             <select
//               className="form-select"
//               value={filters.skinType || ""}
//               onChange={(e) =>
//                 handleFilterChange("skinType", e.target.value)
//               }
//             >
//               <option value="">All</option>
//               {skinTypes.map((st) => (
//                 <option key={st._id} value={st._id}>
//                   {st.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Formulation */}
//     <div className="accordion-item">
//       <h2 className="accordion-header">
//         <button
//           className="accordion-button collapsed"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#filterFormulation"
//         >
//           Formulation
//         </button>
//       </h2>
//       <div id="filterFormulation" className="accordion-collapse collapse">
//         <div className="accordion-body">
//           <select
//             className="form-select"
//             value={filters.formulation || ""}
//             onChange={(e) =>
//               handleFilterChange("formulation", e.target.value)
//             }
//           >
//             <option value="">All</option>
//             {formulations.map((f) => (
//               <option key={f._id} value={f._id}>
//                 {f.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>

//     {/* Price Range */}
//     <div className="accordion-item">
//       <h2 className="accordion-header">
//         <button
//           className="accordion-button collapsed"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#filterPrice"
//         >
//           Price Range
//         </button>
//       </h2>
//       <div id="filterPrice" className="accordion-collapse collapse">
//         <div className="accordion-body">
//           <select
//             className="form-select"
//             value={
//               filters.priceRange
//                 ? JSON.stringify(filters.priceRange)
//                 : ""
//             }
//             onChange={(e) => {
//               const value = e.target.value
//                 ? JSON.parse(e.target.value)
//                 : null;
//               handleFilterChange("priceRange", value);
//             }}
//           >
//             <option value="">All</option>
//             {priceRanges.map((pr, idx) => (
//               <option
//                 key={idx}
//                 value={JSON.stringify({ min: pr.min, max: pr.max })}
//               >
//                 {pr.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>

//     {/* Minimum Rating */}
//     <div className="accordion-item">
//       <h2 className="accordion-header">
//         <button
//           className="accordion-button collapsed"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#filterRating"
//         >
//           Minimum Rating
//         </button>
//       </h2>
//       <div id="filterRating" className="accordion-collapse collapse">
//         <div className="accordion-body">
//           <select
//             className="form-select"
//             value={filters.minRating || ""}
//             onChange={(e) =>
//               handleFilterChange("minRating", e.target.value)
//             }
//           >
//             <option value="">All</option>
//             {[5, 4, 3, 2, 1].map((r) => (
//               <option key={r} value={r}>
//                 {r}★ & up
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>

//     {/* Discount */}
//     <div className="accordion-item">
//       <h2 className="accordion-header">
//         <button
//           className="accordion-button collapsed"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#filterDiscount"
//         >
//           Discount
//         </button>
//       </h2>
//       <div id="filterDiscount" className="accordion-collapse collapse">
//         <div className="accordion-body">
//           <select
//             className="form-select"
//             value={filters.discountSort || ""}
//             onChange={(e) =>
//               handleFilterChange("discountSort", e.target.value)
//             }
//           >
//             <option value="">Default</option>
//             <option value="high">Highest First</option>
//             <option value="low">Lowest First</option>
//           </select>
//         </div>
//       </div>
//     </div>

//   </div>
// </div>

//   );
// };

// export default BrandFilter;



































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const BrandFilter = ({ filters, setFilters, onClose, currentPage = "" }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchFilterData = async () => {
//       try {
//         const res = await axios.get(
//           "https://beauty.joyory.com/api/user/products/filters"
//         );
//         setFilterData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching filter data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFilterData();
//   }, []);

//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     priceRanges = [],
//   } = filterData?.filters || {};

//   const handleFilterChange = (key, value) => {
//     setFilters({ ...filters, [key]: value });
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       brand: "",
//       category: "",
//       skinType: "",
//       formulation: "",
//       priceRange: null,
//       minRating: "",
//       discountSort: "",
//     });
//   };

//   const hideBrandFilter = currentPage === "brand";
//   const hideCategoryFilter = location.pathname.includes("/category");
//   const hideSkinTypeFilter = location.pathname.includes("/skintype");

//   const isCartPage = location.pathname === "/cartpage";
//   const columnClass = isCartPage ? "d-none" : "col-0 col-lg-0";

//   return (

//     <div className="filter-wrapper border" style={{ position: 'sticky', top: '140px' }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3">
//         <h6 className="fw-bold mb-0 page-title-main-name">Filters</h6>
//         <button
//           className="bg-transparent border-0 text-decoration-none text-muted p-0 page-title-main-name"
//           onClick={handleClearFilters}
//         >
//           Reset
//         </button>
//       </div>

//       {/* Accordion */}
//       <div className="accordion mb-0 accordion-flush border-none" id="filterAccordion">

//         {/* Category */}
//         {!hideCategoryFilter && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed page-title-main-name"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterCategory"
//               >
//                 Category
//               </button>
//             </h2>
//             <div id="filterCategory" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select page-title-main-name"
//                   value={filters.category || ""}
//                   onChange={(e) =>
//                     handleFilterChange("category", e.target.value)
//                   }
//                 >
//                   <option className="page-title-main-name" value="">All</option>
//                   {categories.map((c) => (
//                     <option key={c._id} value={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Brand */}
//         {!hideBrandFilter && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed page-title-main-name"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterBrand"
//               >
//                 Brand
//               </button>
//             </h2>
//             <div id="filterBrand" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select page-title-main-name"
//                   value={filters.brand || ""}
//                   onChange={(e) =>
//                     handleFilterChange("brand", e.target.value)
//                   }
//                 >
//                   <option value="">All</option>
//                   {brands.map((b) => (
//                     <option key={b._id} value={b._id}>
//                       {b.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Type */}
//         {!hideSkinTypeFilter && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed page-title-main-name"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterSkinType"
//               >
//                 Skin Type
//               </button>
//             </h2>
//             <div id="filterSkinType" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select page-title-main-name"
//                   value={filters.skinType || ""}
//                   onChange={(e) =>
//                     handleFilterChange("skinType", e.target.value)
//                   }
//                 >
//                   <option value="">All</option>
//                   {skinTypes.map((st) => (
//                     <option key={st._id} value={st._id}>
//                       {st.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulation */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterFormulation"
//             >
//               Formulation
//             </button>
//           </h2>
//           <div id="filterFormulation" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.formulation || ""}
//                 onChange={(e) =>
//                   handleFilterChange("formulation", e.target.value)
//                 }
//               >
//                 <option value="">All</option>
//                 {formulations.map((f) => (
//                   <option key={f._id} value={f._id}>
//                     {f.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Price Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterPrice"
//             >
//               Price Range
//             </button>
//           </h2>
//           <div id="filterPrice" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={
//                   filters.priceRange
//                     ? JSON.stringify(filters.priceRange)
//                     : ""
//                 }
//                 onChange={(e) => {
//                   const value = e.target.value
//                     ? JSON.parse(e.target.value)
//                     : null;
//                   handleFilterChange("priceRange", value);
//                 }}
//               >
//                 <option value="">All</option>
//                 {priceRanges.map((pr, idx) => (
//                   <option
//                     key={idx}
//                     value={JSON.stringify({ min: pr.min, max: pr.max })}
//                   >
//                     {pr.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Minimum Rating */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterRating"
//             >
//               Minimum Rating
//             </button>
//           </h2>
//           <div id="filterRating" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.minRating || ""}
//                 onChange={(e) =>
//                   handleFilterChange("minRating", e.target.value)
//                 }
//               >
//                 <option value="">All</option>
//                 {[5, 4, 3, 2, 1].map((r) => (
//                   <option key={r} value={r}>
//                     {r}★ & up
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Discount */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterDiscount"
//             >
//               Discount
//             </button>
//           </h2>
//           <div id="filterDiscount" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.discountSort || ""}
//                 onChange={(e) =>
//                   handleFilterChange("discountSort", e.target.value)
//                 }
//               >
//                 <option value="">Default</option>
//                 <option value="high">Highest First</option>
//                 <option value="low">Lowest First</option>
//               </select>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>

//   );
// };

// export default BrandFilter;















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const BrandFilter = ({ filters, setFilters, onClose, currentPage = "" }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchFilterData = async () => {
//       try {
//         const res = await axios.get(
//           "https://beauty.joyory.com/api/user/products/filters"
//         );
//         setFilterData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching filter data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFilterData();
//   }, []);

//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   // const {
//   //   brands = [],
//   //   categories = [],
//   //   skinTypes = [],
//   //   formulations = [],
//   //   priceRanges = [],
//   // } = filterData?.filters || {};




//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     finishes = [],
//     ingredients = [],
//     priceRanges = [],
//     discountRanges = [],
//     sortOptions = [],
//   } = filterData?.filters || {};

//   const handleFilterChange = (key, value) => {
//     setFilters({ ...filters, [key]: value });
//   };

//   // const handleClearFilters = () => {
//   //   setFilters({
//   //     brand: "",
//   //     category: "",
//   //     skinType: "",
//   //     formulation: "",
//   //     priceRange: null,
//   //     minRating: "",
//   //     discountSort: "",
//   //   });
//   // };



//   const handleClearFilters = () => {
//     setFilters({
//       brand: "",
//       category: "",
//       skinType: "",
//       formulation: "",
//       finish: "",
//       ingredient: "",
//       priceRange: null,
//       discountRange: null,
//       minRating: "",
//       sort: "recent",
//     });
//   };




//   const hideBrandFilter = currentPage === "brand";
//   const hideCategoryFilter = location.pathname.includes("/category");
//   const hideSkinTypeFilter = location.pathname.includes("/skintype");

//   const isCartPage = location.pathname === "/cartpage";
//   const columnClass = isCartPage ? "d-none" : "col-0 col-lg-0";

//   return (

//     <div className="filter-wrapper border" style={{ position: 'sticky', top: '140px' }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3">
//         <h6 className="fw-bold mb-0 page-title-main-name">Filters</h6>
//         <button
//           className="bg-transparent border-0 text-decoration-none text-muted p-0 page-title-main-name"
//           onClick={handleClearFilters}
//         >
//           Reset
//         </button>
//       </div>

//       {/* Accordion */}
//       <div className="accordion mb-0 accordion-flush border-none" id="filterAccordion">

//         {/* Category */}
//         {!hideCategoryFilter && (
//           // <div className="accordion-item">
//           //   <h2 className="accordion-header">
//           //     <button
//           //       className="accordion-button collapsed page-title-main-name"
//           //       type="button"
//           //       data-bs-toggle="collapse"
//           //       data-bs-target="#filterCategory"
//           //     >
//           //       Category
//           //     </button>
//           //   </h2>
//           //   <div id="filterCategory" className="accordion-collapse collapse">
//           //     <div className="accordion-body">
//           //       <select
//           //         className="form-select page-title-main-name"
//           //         value={filters.category || ""}
//           //         onChange={(e) =>
//           //           handleFilterChange("category", e.target.value)
//           //         }
//           //       >
//           //         <option className="page-title-main-name" value="">All</option>
//           //         {categories.map((c) => (
//           //           <option key={c._id} value={c._id}>
//           //             {c.name}
//           //           </option>
//           //         ))}
//           //       </select>
//           //     </div>
//           //   </div>
//           // </div>




//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterFinish"
//               >
//                 Finish
//               </button>
//             </h2>

//             <div id="filterFinish" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select"
//                   value={filters.finish || ""}
//                   onChange={(e) => handleFilterChange("finish", e.target.value)}
//                 >
//                   <option value="">All</option>

//                   {finishes.map((f) => (
//                     <option key={f.slug} value={f.slug}>
//                       {f.name}
//                     </option>
//                   ))}

//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Brand */}
//         {!hideBrandFilter && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed page-title-main-name"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterBrand"
//               >
//                 Brand
//               </button>
//             </h2>
//             <div id="filterBrand" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select page-title-main-name"
//                   value={filters.brand || ""}
//                   onChange={(e) =>
//                     handleFilterChange("brand", e.target.value)
//                   }
//                 >
//                   <option value="">All</option>
//                   {brands.map((b) => (
//                     <option key={b._id} value={b._id}>
//                       {b.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Type */}
//         {!hideSkinTypeFilter && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed page-title-main-name"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterSkinType"
//               >
//                 Skin Type
//               </button>
//             </h2>
//             <div id="filterSkinType" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select page-title-main-name"
//                   value={filters.skinType || ""}
//                   onChange={(e) =>
//                     handleFilterChange("skinType", e.target.value)
//                   }
//                 >
//                   <option value="">All</option>
//                   {skinTypes.map((st) => (
//                     <option key={st._id} value={st._id}>
//                       {st.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulation */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterFormulation"
//             >
//               Formulation
//             </button>
//           </h2>
//           <div id="filterFormulation" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.formulation || ""}
//                 onChange={(e) =>
//                   handleFilterChange("formulation", e.target.value)
//                 }
//               >
//                 <option value="">All</option>
//                 {formulations.map((f) => (
//                   <option key={f._id} value={f._id}>
//                     {f.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>



//         {/* Finish */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterFinish"
//             >
//               Finish
//             </button>
//           </h2>

//           <div id="filterFinish" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.finish || ""}
//                 onChange={(e) => handleFilterChange("finish", e.target.value)}
//               >
//                 <option value="">All</option>

//                 {finishes.map((f) => (
//                   <option key={f.slug} value={f.slug}>
//                     {f.name}
//                   </option>
//                 ))}

//               </select>
//             </div>
//           </div>
//         </div>


//         {/* Ingredients */}
//         <div className="accordion-item">

//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterIngredient"
//             >
//               Ingredients
//             </button>
//           </h2>

//           <div id="filterIngredient" className="accordion-collapse collapse">

//             <div className="accordion-body">

//               <select
//                 className="form-select"
//                 value={filters.ingredient || ""}
//                 onChange={(e) => handleFilterChange("ingredient", e.target.value)}
//               >

//                 <option value="">All</option>

//                 {ingredients.map((i) => (
//                   <option key={i.slug} value={i.slug}>
//                     {i.name}
//                   </option>
//                 ))}

//               </select>

//             </div>
//           </div>
//         </div>




//         {/* Discount Range */}
//         <div className="accordion-item">

//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterDiscountRange"
//             >
//               Discount
//             </button>
//           </h2>

//           <div id="filterDiscountRange" className="accordion-collapse collapse">

//             <div className="accordion-body">

//               <select
//                 className="form-select"
//                 value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
//                 onChange={(e) => {
//                   const val = e.target.value ? JSON.parse(e.target.value) : null;
//                   handleFilterChange("discountRange", val);
//                 }}
//               >

//                 <option value="">All</option>

//                 {discountRanges.map((d, idx) => (
//                   <option key={idx} value={JSON.stringify({ min: d.min })}>
//                     {d.label}
//                   </option>
//                 ))}

//               </select>

//             </div>
//           </div>
//         </div>











//         {/* Price Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterPrice"
//             >
//               Price Range
//             </button>
//           </h2>
//           <div id="filterPrice" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={
//                   filters.priceRange
//                     ? JSON.stringify(filters.priceRange)
//                     : ""
//                 }
//                 onChange={(e) => {
//                   const value = e.target.value
//                     ? JSON.parse(e.target.value)
//                     : null;
//                   handleFilterChange("priceRange", value);
//                 }}
//               >
//                 <option value="">All</option>
//                 {priceRanges.map((pr, idx) => (
//                   <option
//                     key={idx}
//                     value={JSON.stringify({ min: pr.min, max: pr.max })}
//                   >
//                     {pr.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Minimum Rating */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterRating"
//             >
//               Minimum Rating
//             </button>
//           </h2>
//           <div id="filterRating" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.minRating || ""}
//                 onChange={(e) =>
//                   handleFilterChange("minRating", e.target.value)
//                 }
//               >
//                 <option value="">All</option>
//                 {[5, 4, 3, 2, 1].map((r) => (
//                   <option key={r} value={r}>
//                     {r}★ & up
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Discount */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterDiscount"
//             >
//               Discount
//             </button>
//           </h2>
//           <div id="filterDiscount" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.discountSort || ""}
//                 onChange={(e) =>
//                   handleFilterChange("discountSort", e.target.value)
//                 }
//               >
//                 <option value="">Default</option>
//                 <option value="high">Highest First</option>
//                 <option value="low">Lowest First</option>
//               </select>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>

//   );
// };

// export default BrandFilter;










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";

// const BrandFilter = ({ filters, setFilters, onClose, currentPage = "" }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchFilterData = async () => {
//       try {
//         const res = await axios.get(
//           "https://beauty.joyory.com/api/user/products/filters"
//         );
//         setFilterData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching filter data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFilterData();
//   }, []);

//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     finishes = [],
//     ingredients = [],
//     priceRanges = [],
//     discountRanges = [],
//     sortOptions = [],
//   } = filterData?.filters || {};

//   const handleFilterChange = (key, value) => {
//     setFilters({ ...filters, [key]: value });
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       brand: "",
//       category: "",
//       skinType: "",
//       formulation: "",
//       finish: "",
//       ingredient: "",
//       priceRange: null,
//       discountRange: null,
//       minRating: "",
//       sort: "recent",
//       discountSort: "",
//     });
//   };

//   // Helper to remove individual filter
//   const removeFilter = (key) => {
//     const defaultValues = {
//       brand: "",
//       category: "",
//       skinType: "",
//       formulation: "",
//       finish: "",
//       ingredient: "",
//       priceRange: null,
//       discountRange: null,
//       minRating: "",
//       sort: "recent",
//       discountSort: "",
//     };
//     setFilters({ ...filters, [key]: defaultValues[key] });
//   };

//   // Helper to get display name for filter value
//   const getFilterDisplayName = (key, value) => {
//     if (!value || value === "") return null;
    
//     switch (key) {
//       case "brand":
//         const brand = brands.find(b => b._id === value);
//         return brand ? brand.name : value;
//       case "category":
//         const category = categories.find(c => c._id === value);
//         return category ? category.name : value;
//       case "skinType":
//         const skinType = skinTypes.find(st => st._id === value);
//         return skinType ? skinType.name : value;
//       case "formulation":
//         const formulation = formulations.find(f => f._id === value);
//         return formulation ? formulation.name : value;
//       case "finish":
//         const finish = finishes.find(f => f.slug === value);
//         return finish ? finish.name : value;
//       case "ingredient":
//         const ingredient = ingredients.find(i => i.slug === value);
//         return ingredient ? ingredient.name : value;
//       case "priceRange":
//         try {
//           const range = typeof value === 'string' ? JSON.parse(value) : value;
//           const priceRange = priceRanges.find(pr => pr.min === range?.min && pr.max === range?.max);
//           return priceRange ? priceRange.label : `₹${range?.min || 0} - ₹${range?.max || 'above'}`;
//         } catch {
//           return "Price Range";
//         }
//       case "discountRange":
//         try {
//           const range = typeof value === 'string' ? JSON.parse(value) : value;
//           const discountRange = discountRanges.find(dr => dr.min === range?.min);
//           return discountRange ? discountRange.label : `${range?.min}%+ Off`;
//         } catch {
//           return "Discount";
//         }
//       case "minRating":
//         return `${value}★ & up`;
//       case "discountSort":
//         return value === "high" ? "Highest Discount" : value === "low" ? "Lowest Discount" : null;
//       case "sort":
//         const sortOpt = sortOptions.find(s => s.value === value);
//         return sortOpt ? sortOpt.label : value;
//       default:
//         return value;
//     }
//   };

//   // Get all active filters
//   const getActiveFilters = () => {
//     const active = [];
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value && value !== "" && value !== "recent" && value !== null) {
//         const displayName = getFilterDisplayName(key, value);
//         if (displayName) {
//           active.push({ key, label: key, displayName });
//         }
//       }
//     });
//     return active;
//   };

//   const activeFilters = getActiveFilters();

//   const hideBrandFilter = currentPage === "brand";
//   const hideCategoryFilter = location.pathname.includes("/category");
//   const hideSkinTypeFilter = location.pathname.includes("/skintype");

//   const isCartPage = location.pathname === "/cartpage";
//   const columnClass = isCartPage ? "d-none" : "col-0 col-lg-0";

//   return (
//     <div className="filter-wrapper border" style={{ position: 'sticky', top: '140px' }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3">
//         <h6 className="fw-bold mb-0 page-title-main-name">Filters</h6>
//         <button
//           className="bg-transparent border-0 text-decoration-none text-muted p-0 page-title-main-name"
//           onClick={handleClearFilters}
//         >
//           Reset
//         </button>
//       </div>

//       {/* Selected Filters Section */}
//       {activeFilters.length > 0 && (
//         <div className="selected-filters-section px-3 pb-3 border-bottom">
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <small className="text-muted fw-semibold">Selected Filters</small>
//             <button
//               className="btn btn-link btn-sm p-0 text-danger"
//               onClick={handleClearFilters}
//               style={{ fontSize: '12px', textDecoration: 'none' }}
//             >
//               Clear All
//             </button>
//           </div>
//           <div className="selected-filters-container" style={{ 
//             display: 'flex', 
//             flexWrap: 'wrap', 
//             gap: '8px',
//             maxHeight: '150px',
//             overflowY: 'auto'
//           }}>
//             {activeFilters.map((filter) => (
//               <span
//                 key={filter.key}
//                 className="selected-filter-tag"
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: '6px',
//                   padding: '6px 12px',
//                   backgroundColor: '#000',
//                   color: '#fff',
//                   borderRadius: '20px',
//                   fontSize: '12px',
//                   fontWeight: '500',
//                   cursor: 'pointer',
//                   transition: 'all 0.2s ease'
//                 }}
//                 onClick={() => removeFilter(filter.key)}
//                 title={`Remove ${filter.label}`}
//               >
//                 {filter.displayName}
//                 <FaTimes size={10} style={{ marginLeft: '2px' }} />
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Accordion */}
//       <div className="accordion mb-0 accordion-flush border-none" id="filterAccordion">

//         {/* Category */}
//         {!hideCategoryFilter && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterFinish"
//               >
//                 Finish
//               </button>
//             </h2>

//             <div id="filterFinish" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select"
//                   value={filters.finish || ""}
//                   onChange={(e) => handleFilterChange("finish", e.target.value)}
//                 >
//                   <option value="">All</option>

//                   {finishes.map((f) => (
//                     <option key={f.slug} value={f.slug}>
//                       {f.name}
//                     </option>
//                   ))}

//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Brand */}
//         {!hideBrandFilter && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed page-title-main-name"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterBrand"
//               >
//                 Brand
//               </button>
//             </h2>
//             <div id="filterBrand" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select page-title-main-name"
//                   value={filters.brand || ""}
//                   onChange={(e) =>
//                     handleFilterChange("brand", e.target.value)
//                   }
//                 >
//                   <option value="">All</option>
//                   {brands.map((b) => (
//                     <option key={b._id} value={b._id}>
//                       {b.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Type */}
//         {!hideSkinTypeFilter && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed page-title-main-name"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#filterSkinType"
//               >
//                 Skin Type
//               </button>
//             </h2>
//             <div id="filterSkinType" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select page-title-main-name"
//                   value={filters.skinType || ""}
//                   onChange={(e) =>
//                     handleFilterChange("skinType", e.target.value)
//                   }
//                 >
//                   <option value="">All</option>
//                   {skinTypes.map((st) => (
//                     <option key={st._id} value={st._id}>
//                       {st.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulation */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterFormulation"
//             >
//               Formulation
//             </button>
//           </h2>
//           <div id="filterFormulation" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.formulation || ""}
//                 onChange={(e) =>
//                   handleFilterChange("formulation", e.target.value)
//                 }
//               >
//                 <option value="">All</option>
//                 {formulations.map((f) => (
//                   <option key={f._id} value={f._id}>
//                     {f.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Finish */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterFinish"
//             >
//               Finish
//             </button>
//           </h2>

//           <div id="filterFinish" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.finish || ""}
//                 onChange={(e) => handleFilterChange("finish", e.target.value)}
//               >
//                 <option value="">All</option>

//                 {finishes.map((f) => (
//                   <option key={f.slug} value={f.slug}>
//                     {f.name}
//                   </option>
//                 ))}

//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Ingredients */}
//         <div className="accordion-item">

//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterIngredient"
//             >
//               Ingredients
//             </button>
//           </h2>

//           <div id="filterIngredient" className="accordion-collapse collapse">

//             <div className="accordion-body">

//               <select
//                 className="form-select"
//                 value={filters.ingredient || ""}
//                 onChange={(e) => handleFilterChange("ingredient", e.target.value)}
//               >

//                 <option value="">All</option>

//                 {ingredients.map((i) => (
//                   <option key={i.slug} value={i.slug}>
//                     {i.name}
//                   </option>
//                 ))}

//               </select>

//             </div>
//           </div>
//         </div>

//         {/* Discount Range */}
//         <div className="accordion-item">

//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterDiscountRange"
//             >
//               Discount
//             </button>
//           </h2>

//           <div id="filterDiscountRange" className="accordion-collapse collapse">

//             <div className="accordion-body">

//               <select
//                 className="form-select"
//                 value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
//                 onChange={(e) => {
//                   const val = e.target.value ? JSON.parse(e.target.value) : null;
//                   handleFilterChange("discountRange", val);
//                 }}
//               >

//                 <option value="">All</option>

//                 {discountRanges.map((d, idx) => (
//                   <option key={idx} value={JSON.stringify({ min: d.min })}>
//                     {d.label}
//                   </option>
//                 ))}

//               </select>

//             </div>
//           </div>
//         </div>

//         {/* Price Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterPrice"
//             >
//               Price Range
//             </button>
//           </h2>
//           <div id="filterPrice" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={
//                   filters.priceRange
//                     ? JSON.stringify(filters.priceRange)
//                     : ""
//                 }
//                 onChange={(e) => {
//                   const value = e.target.value
//                     ? JSON.parse(e.target.value)
//                     : null;
//                   handleFilterChange("priceRange", value);
//                 }}
//               >
//                 <option value="">All</option>
//                 {priceRanges.map((pr, idx) => (
//                   <option
//                     key={idx}
//                     value={JSON.stringify({ min: pr.min, max: pr.max })}
//                   >
//                     {pr.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Minimum Rating */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterRating"
//             >
//               Minimum Rating
//             </button>
//           </h2>
//           <div id="filterRating" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.minRating || ""}
//                 onChange={(e) =>
//                   handleFilterChange("minRating", e.target.value)
//                 }
//               >
//                 <option value="">All</option>
//                 {[5, 4, 3, 2, 1].map((r) => (
//                   <option key={r} value={r}>
//                     {r}★ & up
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Discount */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed page-title-main-name"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterDiscount"
//             >
//               Discount
//             </button>
//           </h2>
//           <div id="filterDiscount" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select page-title-main-name"
//                 value={filters.discountSort || ""}
//                 onChange={(e) =>
//                   handleFilterChange("discountSort", e.target.value)
//                 }
//               >
//                 <option value="">Default</option>
//                 <option value="high">Highest First</option>
//                 <option value="low">Lowest First</option>
//               </select>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default BrandFilter;

















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";

// const BrandFilter = ({ filters, setFilters, onClose, currentPage = "" }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchFilterData = async () => {
//       try {
//         const res = await axios.get("https://beauty.joyory.com/api/user/products/filters");
//         setFilterData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching filter data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFilterData();
//   }, []);

//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     finishes = [],
//     ingredients = [],
//     priceRanges = [],
//     discountRanges = [],
//   } = filterData?.filters || {};

//   // ────────────────────────────────────────────────
//   //  Helpers
//   // ────────────────────────────────────────────────

//   const toggleInArray = (arr = [], value) =>
//     arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

//   const handleMultiChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: toggleInArray(prev[key] || [], value),
//     }));
//   };

//   const handleSingleChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const clearAll = () => {
//     setFilters({
//       brandIds: [],
//       categoryIds: [],
//       skinTypes: [],
//       formulations: [],
//       finishes: [],
//       ingredients: [],
//       priceRange: null,
//       discountRange: null,
//       minRating: "",
//       sort: "recent",
//       discountSort: "",
//     });
//   };

//   const removeSingleValue = (key, val) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: (prev[key] || []).filter((v) => v !== val),
//     }));
//   };

//   const getDisplayName = (key, val) => {
//     if (!val) return "";

//     switch (key) {
//       case "brandIds":
//         return brands.find((b) => b._id === val)?.name || val;
//       case "skinTypes":
//         return skinTypes.find((s) => s._id === val)?.name || val;
//       case "formulations":
//         return formulations.find((f) => f._id === val)?.name || val;
//       case "finishes":
//         return finishes.find((f) => f.slug === val)?.name || val;
//       case "ingredients":
//         return ingredients.find((i) => i.slug === val)?.name || val;
//       case "priceRange":
//         try {
//           const r = val;
//           const match = priceRanges.find((p) => p.min === r.min && p.max === r.max);
//           return match?.label || `₹${r.min} - ₹${r.max || "above"}`;
//         } catch {
//           return "Price";
//         }
//       case "discountRange":
//         try {
//           const r = val;
//           const match = discountRanges.find((d) => d.min === r.min);
//           return match?.label || `${r.min}%+ Off`;
//         } catch {
//           return "Discount";
//         }
//       case "minRating":
//         return `${val}★ & up`;
//       case "sort":
//         return val === "recent" ? "" : val;
//       case "discountSort":
//         return val ? (val === "high" ? "Highest Discount" : "Lowest Discount") : "";
//       default:
//         return val;
//     }
//   };

//   const getActiveChips = () => {
//     const chips = [];

//     // Multi filters
//     (["brandIds", "skinTypes", "formulations", "finishes", "ingredients"]).forEach((k) => {
//       (filters[k] || []).forEach((v) => {
//         const label = getDisplayName(k, v);
//         if (label) chips.push({ group: k, value: v, label });
//       });
//     });

//     // Single filters
//     if (filters.priceRange) {
//       chips.push({ group: "priceRange", label: getDisplayName("priceRange", filters.priceRange) });
//     }
//     if (filters.discountRange) {
//       chips.push({ group: "discountRange", label: getDisplayName("discountRange", filters.discountRange) });
//     }
//     if (filters.minRating) {
//       chips.push({ group: "minRating", label: getDisplayName("minRating", filters.minRating) });
//     }
//     if (filters.sort && filters.sort !== "recent") {
//       chips.push({ group: "sort", label: getDisplayName("sort", filters.sort) });
//     }
//     if (filters.discountSort) {
//       chips.push({ group: "discountSort", label: getDisplayName("discountSort", filters.discountSort) });
//     }

//     return chips.filter((c) => c.label);
//   };

//   const activeChips = getActiveChips();

//   const hideBrand = currentPage === "brand";
//   const hideCategory = location.pathname.includes("/category");
//   const hideSkinType = location.pathname.includes("/skintype");

//   // ────────────────────────────────────────────────
//   //  Render
//   // ────────────────────────────────────────────────

//   return (
//     <div className="filter-wrapper border" style={{ position: "sticky", top: "140px" }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3">
//         <h6 className="fw-bold mb-0">Filters</h6>
//         <button className="btn btn-link text-muted p-0" onClick={clearAll}>
//           Reset
//         </button>
//       </div>

//       {/* Selected filters */}
//       {activeChips.length > 0 && (
//         <div className="px-3 pb-3 border-bottom">
//           <div className="d-flex justify-content-between mb-2">
//             <small className="text-muted fw-semibold">Selected</small>
//             <button className="btn btn-link btn-sm text-danger p-0" onClick={clearAll}>
//               Clear All
//             </button>
//           </div>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxHeight: "140px", overflowY: "auto" , marginTop:"20px" , marginLeft:"20px" , marginRight:"20px"}}>
//             {activeChips.map((chip) => (
//               <span
//                 key={`${chip.group}-${chip.value || "s"}`}
//                 className="badge bg-dark text-white rounded-pill px-3 py-2 d-flex align-items-center gap-2"
//                 style={{ fontSize: "13px", cursor: "pointer" }}
//                 onClick={() =>
//                   chip.value
//                     ? removeSingleValue(chip.group, chip.value)
//                     : setFilters((prev) => ({ ...prev, [chip.group]: null }))
//                 }
//               >
//                 {chip.label}
//                 <FaTimes size={12} />
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="accordion accordion-flush" id="filterAccordion">
//         {/* Brands */}
//         {!hideBrand && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brands">
//                 Brand
//               </button>
//             </h2>
//             <div id="brands" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {brands.map((b) => (
//                   <div key={b._id} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`brand-${b._id}`}
//                       checked={(filters.brandIds || []).includes(b._id)}
//                       onChange={() => handleMultiChange("brandIds", b._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`brand-${b._id}`}>
//                       {b.name}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Types */}
//         {!hideSkinType && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skintypes">
//                 Skin Type
//               </button>
//             </h2>
//             <div id="skintypes" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {skinTypes.map((st) => (
//                   <div key={st._id} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`st-${st._id}`}
//                       checked={(filters.skinTypes || []).includes(st._id)}
//                       onChange={() => handleMultiChange("skinTypes", st._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`st-${st._id}`}>
//                       {st.name}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulations */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#formulations">
//               Formulation
//             </button>
//           </h2>
//           <div id="formulations" className="accordion-collapse collapse">
//             <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//               {formulations.map((f) => (
//                 <div key={f._id} className="form-check mb-1">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id={`form-${f._id}`}
//                     checked={(filters.formulations || []).includes(f._id)}
//                     onChange={() => handleMultiChange("formulations", f._id)}
//                   />
//                   <label className="form-check-label" htmlFor={`form-${f._id}`}>
//                     {f.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Finishes */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#finishes">
//               Finish
//             </button>
//           </h2>
//           <div id="finishes" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               {finishes.map((f) => (
//                 <div key={f.slug} className="form-check mb-1">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id={`fin-${f.slug}`}
//                     checked={(filters.finishes || []).includes(f.slug)}
//                     onChange={() => handleMultiChange("finishes", f.slug)}
//                   />
//                   <label className="form-check-label" htmlFor={`fin-${f.slug}`}>
//                     {f.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Ingredients */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ingredients">
//               Key Ingredient
//             </button>
//           </h2>
//           <div id="ingredients" className="accordion-collapse collapse">
//             <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//               {ingredients.map((i) => (
//                 <div key={i.slug} className="form-check mb-1">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id={`ing-${i.slug}`}
//                     checked={(filters.ingredients || []).includes(i.slug)}
//                     onChange={() => handleMultiChange("ingredients", i.slug)}
//                   />
//                   <label className="form-check-label" htmlFor={`ing-${i.slug}`}>
//                     {i.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Price Range (single select kept) */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#price">
//               Price Range
//             </button>
//           </h2>
//           <div id="price" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//                 onChange={(e) => {
//                   handleSingleChange("priceRange", e.target.value ? JSON.parse(e.target.value) : null);
//                 }}
//               >
//                 <option value="">All prices</option>
//                 {priceRanges.map((p, i) => (
//                   <option key={i} value={JSON.stringify({ min: p.min, max: p.max })}>
//                     {p.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Discount Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#discount">
//               Discount
//             </button>
//           </h2>
//           <div id="discount" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
//                 onChange={(e) => {
//                   handleSingleChange("discountRange", e.target.value ? JSON.parse(e.target.value) : null);
//                 }}
//               >
//                 <option value="">Any discount</option>
//                 {discountRanges.map((d, i) => (
//                   <option key={i} value={JSON.stringify({ min: d.min })}>
//                     {d.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Min Rating */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rating">
//               Minimum Rating
//             </button>
//           </h2>
//           <div id="rating" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.minRating || ""}
//                 onChange={(e) => handleSingleChange("minRating", e.target.value)}
//               >
//                 <option value="">Any rating</option>
//                 {[4, 3, 2].map((r) => (
//                   <option key={r} value={r}>
//                     {r}+ Stars
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrandFilter;





















// // BrandFilter code
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";

// const BrandFilter = ({ filters, setFilters, onClose, currentPage = "" }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchFilterData = async () => {
//       try {
//         const res = await axios.get("https://beauty.joyory.com/api/user/products/filters");
//         setFilterData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching filter data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFilterData();
//   }, []);

//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     finishes = [],
//     ingredients = [],
//     priceRanges = [],
//     discountRanges = [],
//   } = filterData?.filters || {};

//   // ────────────────────────────────────────────────
//   //  Helpers
//   // ────────────────────────────────────────────────

//   const toggleInArray = (arr = [], value) =>
//     arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

//   const handleMultiChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: toggleInArray(prev[key] || [], value),
//     }));
//   };

//   const handleSingleChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const clearAll = () => {
//     setFilters({
//       brandIds: [],
//       categoryIds: [],
//       skinTypes: [],
//       formulations: [],
//       finishes: [],
//       ingredients: [],
//       priceRange: null,
//       discountRange: null,
//       minRating: "",
//       sort: "recent",
//     });
//   };

//   const removeSingleValue = (key, val) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: (prev[key] || []).filter((v) => v !== val),
//     }));
//   };

//   const getDisplayName = (key, val) => {
//     if (!val) return "";

//     switch (key) {
//       case "brandIds":
//         return brands.find((b) => b._id === val || b.slug === val)?.name || val;
//       case "skinTypes":
//         return skinTypes.find((s) => s.name === val)?.name || val;
//       case "formulations":
//         return formulations.find((f) => f._id === val)?.name || val;
//       case "finishes":
//         return finishes.find((f) => f.slug === val)?.name || val;
//       case "ingredients":
//         return ingredients.find((i) => i.slug === val)?.name || val;
//       case "priceRange":
//         try {
//           const r = val;
//           const match = priceRanges.find((p) => p.min === r.min && p.max === r.max);
//           return match?.label || `₹${r.min} - ₹${r.max || "above"}`;
//         } catch {
//           return "Price";
//         }
//       case "discountRange":
//         try {
//           const r = val;
//           const match = discountRanges.find((d) => d.min === r.min);
//           return match?.label || `${r.min}%+ Off`;
//         } catch {
//           return "Discount";
//         }
//       case "minRating":
//         return `${val}★ & up`;
//       case "sort":
//         return val === "recent" ? "" : val;
//       default:
//         return val;
//     }
//   };

//   const getActiveChips = () => {
//     const chips = [];

//     (["brandIds", "skinTypes", "formulations", "finishes", "ingredients"]).forEach((k) => {
//       (filters[k] || []).forEach((v) => {
//         const label = getDisplayName(k, v);
//         if (label) chips.push({ group: k, value: v, label });
//       });
//     });

//     if (filters.priceRange) {
//       chips.push({ group: "priceRange", label: getDisplayName("priceRange", filters.priceRange) });
//     }
//     if (filters.discountRange) {
//       chips.push({ group: "discountRange", label: getDisplayName("discountRange", filters.discountRange) });
//     }
//     if (filters.minRating) {
//       chips.push({ group: "minRating", label: getDisplayName("minRating", filters.minRating) });
//     }
//     if (filters.sort && filters.sort !== "recent") {
//       chips.push({ group: "sort", label: getDisplayName("sort", filters.sort) });
//     }

//     return chips.filter((c) => c.label);
//   };

//   const activeChips = getActiveChips();

//   const hideBrand = currentPage === "brand";
//   const hideCategory = location.pathname.includes("/category");
//   const hideSkinType = location.pathname.includes("/skintype");

//   // ────────────────────────────────────────────────
//   //  Render
//   // ────────────────────────────────────────────────

//   return (
//     <div className="filter-wrapper border" style={{ position: "sticky", top: "140px" }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3">
//         <h6 className="fw-bold mb-0">Filters</h6>
//         <button className="btn btn-link text-muted p-0" onClick={clearAll}>
//           Reset
//         </button>
//       </div>

//       {/* Selected filters */}
//       {activeChips.length > 0 && (
//         <div className="px-3 pb-3 border-bottom">
//           <div className="d-flex justify-content-between mb-2">
//             <small className="text-muted fw-semibold">Selected</small>
//             <button className="btn btn-link btn-sm text-danger p-0" onClick={clearAll}>
//               Clear All
//             </button>
//           </div>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxHeight: "140px", overflowY: "auto", marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}>
//             {activeChips.map((chip) => (
//               <span
//                 key={`${chip.group}-${chip.value || "s"}`}
//                 className="badge bg-dark text-white rounded-pill px-3 py-2 d-flex align-items-center gap-2"
//                 style={{ fontSize: "13px", cursor: "pointer" }}
//                 onClick={() =>
//                   chip.value
//                     ? removeSingleValue(chip.group, chip.value)
//                     : setFilters((prev) => ({ ...prev, [chip.group]: null }))
//                 }
//               >
//                 {chip.label}
//                 <FaTimes size={12} />
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="accordion accordion-flush" id="filterAccordion">
//         {/* Brands */}
//         {!hideBrand && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brands">
//                 Brand
//               </button>
//             </h2>
//             <div id="brands" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {brands.map((b) => (
//                   <div key={b._id} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`brand-${b._id}`}
//                       checked={(filters.brandIds || []).includes(b._id)}
//                       onChange={() => handleMultiChange("brandIds", b._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`brand-${b._id}`}>
//                       {b.name} {b.count !== undefined && <span className="text-muted">({b.count})</span>}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Types */}
//         {!hideSkinType && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skintypes">
//                 Skin Type
//               </button>
//             </h2>
//             <div id="skintypes" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {skinTypes.map((st) => (
//                   <div key={st._id} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`st-${st._id}`}
//                       checked={(filters.skinTypes || []).includes(st.name)}
//                       onChange={() => handleMultiChange("skinTypes", st.name)}
//                     />
//                     <label className="form-check-label" htmlFor={`st-${st._id}`}>
//                       {st.name} {st.count !== undefined && <span className="text-muted">({st.count})</span>}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulations */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#formulations">
//               Formulation
//             </button>
//           </h2>
//           <div id="formulations" className="accordion-collapse collapse">
//             <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//               {formulations.map((f) => (
//                 <div key={f._id} className="form-check mb-1">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id={`form-${f._id}`}
//                     checked={(filters.formulations || []).includes(f._id)}
//                     onChange={() => handleMultiChange("formulations", f._id)}
//                   />
//                   <label className="form-check-label" htmlFor={`form-${f._id}`}>
//                     {f.name} {f.count !== undefined && <span className="text-muted">({f.count})</span>}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Finishes */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#finishes">
//               Finish
//             </button>
//           </h2>
//           <div id="finishes" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               {finishes.map((f) => (
//                 <div key={f.slug} className="form-check mb-1">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id={`fin-${f.slug}`}
//                     checked={(filters.finishes || []).includes(f.slug)}
//                     onChange={() => handleMultiChange("finishes", f.slug)}
//                   />
//                   <label className="form-check-label" htmlFor={`fin-${f.slug}`}>
//                     {f.name} {f.count !== undefined && <span className="text-muted">({f.count})</span>}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Ingredients */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ingredients">
//               Key Ingredient
//             </button>
//           </h2>
//           <div id="ingredients" className="accordion-collapse collapse">
//             <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//               {ingredients.map((i) => (
//                 <div key={i.slug} className="form-check mb-1">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id={`ing-${i.slug}`}
//                     checked={(filters.ingredients || []).includes(i.slug)}
//                     onChange={() => handleMultiChange("ingredients", i.slug)}
//                   />
//                   <label className="form-check-label" htmlFor={`ing-${i.slug}`}>
//                     {i.name} {i.count !== undefined && <span className="text-muted">({i.count})</span>}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Price Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#price">
//               Price Range
//             </button>
//           </h2>
//           <div id="price" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//                 onChange={(e) => {
//                   handleSingleChange("priceRange", e.target.value ? JSON.parse(e.target.value) : null);
//                 }}
//               >
//                 <option value="">All prices</option>
//                 {priceRanges.map((p, i) => (
//                   <option key={i} value={JSON.stringify({ min: p.min, max: p.max })}>
//                     {p.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Discount Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#discount">
//               Discount
//             </button>
//           </h2>
//           <div id="discount" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
//                 onChange={(e) => {
//                   handleSingleChange("discountRange", e.target.value ? JSON.parse(e.target.value) : null);
//                 }}
//               >
//                 <option value="">Any discount</option>
//                 {discountRanges.map((d, i) => (
//                   <option key={i} value={JSON.stringify({ min: d.min })}>
//                     {d.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Min Rating */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rating">
//               Minimum Rating
//             </button>
//           </h2>
//           <div id="rating" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.minRating || ""}
//                 onChange={(e) => handleSingleChange("minRating", e.target.value)}
//               >
//                 <option value="">Any rating</option>
//                 {[4, 3, 2].map((r) => (
//                   <option key={r} value={r}>
//                     {r}+ Stars
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrandFilter;




















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";

// const BrandFilter = ({ filters, setFilters, onClose }) => {
//   const [filterData, setFilterData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchFilterData = async () => {
//       try {
//         const res = await axios.get("https://beauty.joyory.com/api/user/products/filters");
//         setFilterData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching filter data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFilterData();
//   }, []);

//   if (loading) return <p>Loading filters...</p>;
//   if (!filterData) return <p>Unable to load filters.</p>;

//   const {
//     brands = [],
//     categories = [],
//     skinTypes = [],
//     formulations = [],
//     finishes = [],
//     ingredients = [],
//     priceRanges = [],
//     discountRanges = [],
//   } = filterData?.filters || {};

//   // ────────────────────────────────────────────────
//   //  Helpers
//   // ────────────────────────────────────────────────

//   const toggleInArray = (arr = [], value) =>
//     arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

//   const handleMultiChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: toggleInArray(prev[key] || [], value),
//     }));
//   };

//   const handleSingleChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const clearAll = () => {
//     setFilters({
//       brandIds: [],
//       categoryIds: [],
//       skinTypes: [],
//       formulations: [],
//       finishes: [],
//       ingredients: [],
//       priceRange: null,
//       discountRange: null,
//       minRating: "",
//       sort: "recent",
//     });
//   };

//   const removeSingleValue = (key, val) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: (prev[key] || []).filter((v) => v !== val),
//     }));
//   };

//   const getDisplayName = (key, val) => {
//     if (!val) return "";

//     switch (key) {
//       case "brandIds":
//         return brands.find((b) => b._id === val || b.slug === val)?.name || val;
//       case "categoryIds":
//         return categories.find((c) => c._id === val || c.slug === val)?.name || val;
//       case "skinTypes":
//         return skinTypes.find((s) => s.name === val)?.name || val;
//       case "formulations":
//         return formulations.find((f) => f._id === val)?.name || val;
//       case "finishes":
//         return finishes.find((f) => f.slug === val)?.name || val;
//       case "ingredients":
//         return ingredients.find((i) => i.slug === val)?.name || val;
//       case "priceRange":
//         try {
//           const r = val;
//           const match = priceRanges.find((p) => p.min === r.min && p.max === r.max);
//           return match?.label || `₹${r.min} - ₹${r.max || "above"}`;
//         } catch {
//           return "Price";
//         }
//       case "discountRange":
//         try {
//           const r = val;
//           const match = discountRanges.find((d) => d.min === r.min);
//           return match?.label || `${r.min}%+ Off`;
//         } catch {
//           return "Discount";
//         }
//       case "minRating":
//         return `${val}★ & up`;
//       case "sort":
//         return val === "recent" ? "" : val;
//       default:
//         return val;
//     }
//   };

//   const getActiveChips = () => {
//     const chips = [];

//     ["brandIds", "categoryIds", "skinTypes", "formulations", "finishes", "ingredients"].forEach((k) => {
//       (filters[k] || []).forEach((v) => {
//         const label = getDisplayName(k, v);
//         if (label) chips.push({ group: k, value: v, label });
//       });
//     });

//     if (filters.priceRange) {
//       chips.push({ group: "priceRange", label: getDisplayName("priceRange", filters.priceRange) });
//     }
//     if (filters.discountRange) {
//       chips.push({ group: "discountRange", label: getDisplayName("discountRange", filters.discountRange) });
//     }
//     if (filters.minRating) {
//       chips.push({ group: "minRating", label: getDisplayName("minRating", filters.minRating) });
//     }
//     if (filters.sort && filters.sort !== "recent") {
//       chips.push({ group: "sort", label: getDisplayName("sort", filters.sort) });
//     }

//     return chips.filter((c) => c.label);
//   };

//   const activeChips = getActiveChips();

//   // Helper to safely render label with count
//   const renderLabel = (name, count) => (
//     <>
//       {name}
//       {count !== undefined && count !== null && <span className="text-muted small ms-1">({count})</span>}
//     </>
//   );

//   // ────────────────────────────────────────────────
//   //  Render – All sections always visible
//   // ────────────────────────────────────────────────

//   return (
//     <div className="filter-wrapper border" style={{ position: "sticky", top: "140px" }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3">
//         <h6 className="fw-bold mb-0">Filters</h6>
//         <button className="btn btn-link text-muted p-0" onClick={clearAll}>
//           Reset
//         </button>
//       </div>

//       {/* Selected filters chips */}
//       {activeChips.length > 0 && (
//         <div className="px-3 pb-3 border-bottom">
//           <div className="d-flex justify-content-between mb-2">
//             <small className="text-muted fw-semibold">Selected</small>
//             <button className="btn btn-link btn-sm text-danger p-0" onClick={clearAll}>
//               Clear All
//             </button>
//           </div>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxHeight: "140px", overflowY: "auto", margin: "20px" }}>
//             {activeChips.map((chip) => (
//               <span
//                 key={`${chip.group}-${chip.value || "s"}`}
//                 className="badge bg-dark text-white rounded-pill px-3 py-2 d-flex align-items-center gap-2"
//                 style={{ fontSize: "13px", cursor: "pointer" }}
//                 onClick={() =>
//                   chip.value
//                     ? removeSingleValue(chip.group, chip.value)
//                     : setFilters((prev) => ({ ...prev, [chip.group]: null }))
//                 }
//               >
//                 {chip.label}
//                 <FaTimes size={12} />
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="accordion accordion-flush" id="filterAccordion">
//         {/* Categories */}
//         {categories.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#categories">
//                 Category
//               </button>
//             </h2>
//             <div id="categories" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {categories.map((c) => (
//                   <div key={c._id} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`cat-${c._id}`}
//                       checked={(filters.categoryIds || []).includes(c._id)}
//                       onChange={() => handleMultiChange("categoryIds", c._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`cat-${c._id}`}>
//                       {renderLabel(c.name, c.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Brands */}
//         {brands.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brands">
//                 Brand
//               </button>
//             </h2>
//             <div id="brands" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {brands.map((b) => (
//                   <div key={b._id} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`brand-${b._id}`}
//                       checked={(filters.brandIds || []).includes(b._id)}
//                       onChange={() => handleMultiChange("brandIds", b._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`brand-${b._id}`}>
//                       {renderLabel(b.name, b.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Types */}
//         {skinTypes.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skintypes">
//                 Skin Type
//               </button>
//             </h2>
//             <div id="skintypes" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {skinTypes.map((st) => (
//                   <div key={st._id || st.name} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`st-${st._id || st.name}`}
//                       checked={(filters.skinTypes || []).includes(st.name)}
//                       onChange={() => handleMultiChange("skinTypes", st.name)}
//                     />
//                     <label className="form-check-label" htmlFor={`st-${st._id || st.name}`}>
//                       {renderLabel(st.name, st.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulations */}
//         {formulations.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#formulations">
//                 Formulation
//               </button>
//             </h2>
//             <div id="formulations" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {formulations.map((f) => (
//                   <div key={f._id} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`form-${f._id}`}
//                       checked={(filters.formulations || []).includes(f._id)}
//                       onChange={() => handleMultiChange("formulations", f._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`form-${f._id}`}>
//                       {renderLabel(f.name, f.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Finishes */}
//         {finishes.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#finishes">
//                 Finish
//               </button>
//             </h2>
//             <div id="finishes" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 {finishes.map((f) => (
//                   <div key={f.slug} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`fin-${f.slug}`}
//                       checked={(filters.finishes || []).includes(f.slug)}
//                       onChange={() => handleMultiChange("finishes", f.slug)}
//                     />
//                     <label className="form-check-label" htmlFor={`fin-${f.slug}`}>
//                       {renderLabel(f.name, f.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Ingredients */}
//         {ingredients.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ingredients">
//                 Key Ingredient
//               </button>
//             </h2>
//             <div id="ingredients" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {ingredients.map((i) => (
//                   <div key={i.slug} className="form-check mb-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`ing-${i.slug}`}
//                       checked={(filters.ingredients || []).includes(i.slug)}
//                       onChange={() => handleMultiChange("ingredients", i.slug)}
//                     />
//                     <label className="form-check-label" htmlFor={`ing-${i.slug}`}>
//                       {renderLabel(i.name, i.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Price Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#price">
//               Price Range
//             </button>
//           </h2>
//           <div id="price" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//                 onChange={(e) => {
//                   handleSingleChange("priceRange", e.target.value ? JSON.parse(e.target.value) : null);
//                 }}
//               >
//                 <option value="">All prices</option>
//                 {priceRanges.map((p, i) => (
//                   <option key={i} value={JSON.stringify({ min: p.min, max: p.max })}>
//                     {p.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Discount Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#discount">
//               Discount
//             </button>
//           </h2>
//           <div id="discount" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
//                 onChange={(e) => {
//                   handleSingleChange("discountRange", e.target.value ? JSON.parse(e.target.value) : null);
//                 }}
//               >
//                 <option value="">Any discount</option>
//                 {discountRanges.map((d, i) => (
//                   <option key={i} value={JSON.stringify({ min: d.min })}>
//                     {d.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Minimum Rating */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rating">
//               Minimum Rating
//             </button>
//           </h2>
//           <div id="rating" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.minRating || ""}
//                 onChange={(e) => handleSingleChange("minRating", e.target.value)}
//               >
//                 <option value="">Any rating</option>
//                 {[4, 3, 2].map((r) => (
//                   <option key={r} value={r}>
//                     {r}+ Stars
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrandFilter;











// import React from "react";
// import { FaTimes } from "react-icons/fa";

// /**
//  * BrandFilter
//  *
//  * Props:
//  *   filters             – current filter state
//  *   setFilters          – update filter state
//  *   onClose             – close mobile offcanvas (optional)
//  *   filterData          – data.filters from the product API response
//  *                         { brands, categories, skinTypes, formulations,
//  *                           finishes, ingredients, priceRanges, discountRanges }
//  *   trendingCategories  – data.trendingCategories from ProductPage.
//  *                         • No filter active  → root/parent categories
//  *                         • Category selected → direct children (sub-categories)
//  *                         • Leaf category     → [] (nothing to show)
//  *                         Shown as clickable pills inside the Category section.
//  *   activeCategorySlug  – currently selected category pill slug
//  *   activeCategoryName  – display name of the selected category (shown as chip)
//  *   onClearCategory     – called when the category chip × is clicked
//  *   onCategoryPillClick – called with { slug, name } when a sub-category pill is clicked
//  */
// const BrandFilter = ({
//   filters,
//   setFilters,
//   onClose,
//   filterData          = null,
//   trendingCategories  = [],
//   activeCategorySlug  = null,
//   activeCategoryName  = "",
//   onClearCategory,
//   onCategoryPillClick,
// }) => {

//   if (!filterData) return (
//     <div className="filter-wrapper border p-3" style={{ position: "sticky", top: "140px" }}>
//       <div className="d-flex align-items-center gap-2">
//         <div className="spinner-border spinner-border-sm text-secondary" role="status" />
//         <small className="text-muted">Loading filters...</small>
//       </div>
//     </div>
//   );

//   const {
//     brands         = [],
//     categories     = [],
//     skinTypes      = [],
//     formulations   = [],
//     finishes       = [],
//     ingredients    = [],
//     priceRanges    = [],
//     discountRanges = [],
//   } = filterData;

//   /* ─── helpers ─────────────────────────────────────────────────────────── */
//   const toggleInArray = (arr = [], value) =>
//     arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

//   const handleMultiChange = (key, value) =>
//     setFilters((prev) => ({ ...prev, [key]: toggleInArray(prev[key] || [], value) }));

//   const handleSingleChange = (key, value) =>
//     setFilters((prev) => ({ ...prev, [key]: value }));

//   const clearAll = () => {
//     setFilters({
//       brandIds: [], categoryIds: [], skinTypes: [], formulations: [],
//       finishes: [], ingredients: [], priceRange: null, discountRange: null,
//       minRating: "", sort: "recent",
//     });
//     if (onClearCategory) onClearCategory();
//   };

//   const removeSingleValue = (key, val) =>
//     setFilters((prev) => ({ ...prev, [key]: (prev[key] || []).filter((v) => v !== val) }));

//   const getDisplayName = (key, val) => {
//     if (!val) return "";
//     switch (key) {
//       case "brandIds":
//         return brands.find((b) => b._id === val || b.slug === val)?.name || val;
//       case "categoryIds":
//         return categories.find((c) => c._id === val || c.slug === val)?.name || val;
//       case "skinTypes":
//         return skinTypes.find((s) => s.name === val)?.name || val;
//       case "formulations":
//         return formulations.find((f) => f._id === val)?.name || val;
//       case "finishes":
//         return finishes.find((f) => f.slug === val)?.name || val;
//       case "ingredients":
//         return ingredients.find((i) => i.slug === val)?.name || val;
//       case "priceRange":
//         try {
//           const match = priceRanges.find((p) => p.min === val.min && p.max === val.max);
//           return match?.label || `₹${val.min} - ₹${val.max || "above"}`;
//         } catch { return "Price"; }
//       case "discountRange":
//         try {
//           const match = discountRanges.find((d) => d.min === val.min);
//           return match?.label || `${val.min}%+ Off`;
//         } catch { return "Discount"; }
//       case "minRating": return `${val}★ & up`;
//       case "sort":      return val === "recent" ? "" : val;
//       default:          return val;
//     }
//   };

//   /* ─── chips ───────────────────────────────────────────────────────────── */
//   const getActiveChips = () => {
//     const chips = [];

//     // Category pill chip (dark) always first
//     if (activeCategorySlug && activeCategoryName) {
//       chips.push({
//         group: "categoryPill",
//         value: activeCategorySlug,
//         label: activeCategoryName,
//         isPill: true,
//       });
//     }

//     ["brandIds", "categoryIds", "skinTypes", "formulations", "finishes", "ingredients"].forEach((k) => {
//       (filters[k] || []).forEach((v) => {
//         const label = getDisplayName(k, v);
//         if (label) chips.push({ group: k, value: v, label });
//       });
//     });

//     if (filters.priceRange)
//       chips.push({ group: "priceRange",    label: getDisplayName("priceRange",    filters.priceRange) });
//     if (filters.discountRange)
//       chips.push({ group: "discountRange", label: getDisplayName("discountRange", filters.discountRange) });
//     if (filters.minRating)
//       chips.push({ group: "minRating",     label: getDisplayName("minRating",     filters.minRating) });
//     if (filters.sort && filters.sort !== "recent")
//       chips.push({ group: "sort",          label: getDisplayName("sort",          filters.sort) });

//     return chips.filter((c) => c.label);
//   };

//   const activeChips = getActiveChips();

//   const renderLabel = (name, count) => (
//     <>
//       {name}
//       {count !== undefined && count !== null && (
//         <span className="text-muted small ms-1">({count})</span>
//       )}
//     </>
//   );

//   const hasActiveFilter =
//     activeCategorySlug ||
//     filters.brandIds?.length > 0 ||
//     filters.categoryIds?.length > 0;

//   /*
//    * Determine what to show in the Category accordion section.
//    *
//    * Backend trendingCategories behaviour (from your backend code):
//    *   • No filter active  → root/parent categories  (show as browseable pills)
//    *   • Category selected → direct children          (show as sub-category pills)
//    *   • Leaf category     → []                       (nothing to show)
//    *
//    * We show trendingCategories as clickable pills inside the Category section.
//    * If a category is active, we also show the "categories" list from filterData
//    * (which the backend already scopes) as checkboxes below the pills.
//    */
//   const subCategoryPills  = trendingCategories; // direct children when a cat is selected
//   const categoryCheckboxes = categories;         // already scoped by backend filterData

//   /* ─── render ──────────────────────────────────────────────────────────── */
//   return (
//     <div className="filter-wrapper border" style={{ position: "sticky", top: "140px" }}>

//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
//         <h6 className="fw-bold mb-0">Filters</h6>
//         {activeChips.length > 0 && (
//           <button className="btn btn-link text-muted p-0 small" onClick={clearAll}>
//             Reset
//           </button>
//         )}
//       </div>

//       {/* Selected chips */}
//       {activeChips.length > 0 && (
//         <div className="px-3 pb-3 pt-2 border-bottom">
//           <div className="d-flex justify-content-between mb-2">
//             <small className="text-muted fw-semibold">Selected</small>
//             <button className="btn btn-link btn-sm text-danger p-0" onClick={clearAll}>
//               Clear All
//             </button>
//           </div>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxHeight: "140px", overflowY: "auto" }}>
//             {activeChips.map((chip) => (
//               <span
//                 key={`${chip.group}-${chip.value || "s"}`}
//                 className={`badge rounded-pill px-3 py-2 d-flex align-items-center gap-1 ${
//                   chip.isPill ? "bg-dark text-white" : "bg-secondary text-white"
//                 }`}
//                 style={{ fontSize: "12px", cursor: "pointer", fontWeight: chip.isPill ? 600 : 400, maxWidth: "100%" }}
//                 title={chip.isPill ? "Remove category filter" : `Remove ${chip.label}`}
//                 onClick={() => {
//                   if (chip.isPill) {
//                     if (onClearCategory) onClearCategory();
//                   } else if (chip.group === "priceRange" || chip.group === "discountRange") {
//                     setFilters((prev) => ({ ...prev, [chip.group]: null }));
//                   } else {
//                     removeSingleValue(chip.group, chip.value);
//                   }
//                 }}
//               >
//                 {chip.isPill && (
//                   <span style={{ fontSize: 10, opacity: 0.75 }}>Category:&nbsp;</span>
//                 )}
//                 <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
//                   {chip.label}
//                 </span>
//                 <FaTimes size={10} style={{ flexShrink: 0 }} />
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Context note */}
//       {hasActiveFilter && (
//         <div className="px-3 py-2 border-bottom"
//           style={{ background: "#f7f7f7", fontSize: 12, color: "#555", lineHeight: 1.5 }}>
//           Showing filters available for the selected {activeCategorySlug ? "category" : "brand"}
//         </div>
//       )}

//       <div className="accordion accordion-flush" id="filterAccordion">

//         {/* ══════════════════════════════════════════════════════════════════
//             CATEGORY SECTION
//             ─────────────────
//             Shows sub-category pills (trendingCategories) + category checkboxes.

//             State 1 — No category selected:
//               trendingCategories = root categories → shown as pills to browse
//               categoryCheckboxes = all categories  → shown as checkboxes

//             State 2 — Category selected (e.g. "Makeup"):
//               trendingCategories = direct children (e.g. "Lipstick", "Foundation")
//                                    → shown as clickable sub-category pills
//               categoryCheckboxes = already scoped by backend → shown as checkboxes

//             State 3 — Leaf category selected (no children):
//               trendingCategories = [] → pills section hidden
//               categoryCheckboxes = scoped → checkboxes still shown
//         ══════════════════════════════════════════════════════════════════ */}
//         {(subCategoryPills.length > 0 || categoryCheckboxes.length > 0) && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button"   /* open by default — category is primary */
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#categories"
//                 aria-expanded="true"
//               >
//                 Category
//                 {activeCategorySlug && activeCategoryName && (
//                   <span
//                     className="ms-2 text-muted"
//                     style={{ fontSize: 11, fontWeight: 400 }}
//                   >
//                     › {activeCategoryName}
//                   </span>
//                 )}
//               </button>
//             </h2>
//             <div id="categories" className="accordion-collapse collapse show">
//               <div className="accordion-body p-0">

//                 {/* ── Sub-category pills ──────────────────────────────────────
//                     When a category is selected, backend returns its direct
//                     children in trendingCategories. Shown as a scrollable
//                     pill row so the user can drill into a sub-category.
//                     Active pill is highlighted dark.
//                 ─────────────────────────────────────────────────────────── */}
//                 {subCategoryPills.length > 0 && (
//                   <div className="px-3 py-2 border-bottom">
//                     <small className="text-muted d-block mb-2"
//                       style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px" }}>
//                       {activeCategorySlug ? "Sub-categories" : "Browse categories"}
//                     </small>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                       {subCategoryPills.map((cat) => {
//                         const isActive = activeCategorySlug === cat.slug;
//                         return (
//                           <button
//                             key={cat.slug}
//                             type="button"
//                             onClick={() => onCategoryPillClick && onCategoryPillClick(cat)}
//                             className={`btn btn-sm rounded-pill px-3 py-1 page-title-main-name ${
//                               isActive ? "btn-dark" : "btn-outline-secondary"
//                             }`}
//                             style={{
//                               fontSize: 12,
//                               fontWeight: isActive ? 600 : 400,
//                               transition: "all 0.15s ease",
//                               transform: isActive ? "scale(1.04)" : "scale(1)",
//                             }}
//                             title={`Filter by ${cat.name}`}
//                           >
//                             {cat.name}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* ── Category checkboxes ─────────────────────────────────────
//                     Standard checkbox list from filterData.categories.
//                     Backend already scopes these to the current query context.
//                 ─────────────────────────────────────────────────────────── */}
//                 {categoryCheckboxes.length > 0 && (
//                   <div style={{ maxHeight: "200px", overflowY: "auto", padding: "8px 16px" }}>
//                     {categoryCheckboxes.map((c) => (
//                       <div key={c._id} className="form-check mb-1">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           id={`cat-${c._id}`}
//                           checked={(filters.categoryIds || []).includes(c._id)}
//                           onChange={() => handleMultiChange("categoryIds", c._id)}
//                         />
//                         <label className="form-check-label page-title-main-name" htmlFor={`cat-${c._id}`}>
//                           {renderLabel(c.name, c.count)}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//               </div>
//             </div>
//           </div>
//         )}

//         {/* Brands */}
//         {brands.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button"
//                 data-bs-toggle="collapse" data-bs-target="#brands">
//                 Brand
//               </button>
//             </h2>
//             <div id="brands" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {brands.map((b) => (
//                   <div key={b._id} className="form-check mb-1">
//                     <input className="form-check-input" type="checkbox" id={`brand-${b._id}`}
//                       checked={(filters.brandIds || []).includes(b._id)}
//                       onChange={() => handleMultiChange("brandIds", b._id)} />
//                     <label className="form-check-label page-title-main-name" htmlFor={`brand-${b._id}`}>
//                       {renderLabel(b.name, b.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Types — backend-scoped */}
//         {skinTypes.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button"
//                 data-bs-toggle="collapse" data-bs-target="#skintypes">
//                 Skin Type
//                 {hasActiveFilter && (
//                   <span className="ms-2 badge bg-secondary" style={{ fontSize: 10, fontWeight: 400 }}>
//                     {skinTypes.length}
//                   </span>
//                 )}
//               </button>
//             </h2>
//             <div id="skintypes" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {skinTypes.map((st) => (
//                   <div key={st._id || st.name} className="form-check mb-1">
//                     <input className="form-check-input" type="checkbox" id={`st-${st._id || st.name}`}
//                       checked={(filters.skinTypes || []).includes(st.name)}
//                       onChange={() => handleMultiChange("skinTypes", st.name)} />
//                     <label className="form-check-label page-title-main-name" htmlFor={`st-${st._id || st.name}`}>
//                       {renderLabel(st.name, st.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulations — backend-scoped */}
//         {formulations.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button"
//                 data-bs-toggle="collapse" data-bs-target="#formulations">
//                 Formulation
//                 {hasActiveFilter && (
//                   <span className="ms-2 badge bg-secondary" style={{ fontSize: 10, fontWeight: 400 }}>
//                     {formulations.length}
//                   </span>
//                 )}
//               </button>
//             </h2>
//             <div id="formulations" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {formulations.map((f) => (
//                   <div key={f._id} className="form-check mb-1">
//                     <input className="form-check-input" type="checkbox" id={`form-${f._id}`}
//                       checked={(filters.formulations || []).includes(f._id)}
//                       onChange={() => handleMultiChange("formulations", f._id)} />
//                     <label className="form-check-label page-title-main-name" htmlFor={`form-${f._id}`}>
//                       {renderLabel(f.name, f.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Finishes — backend-scoped */}
//         {finishes.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button"
//                 data-bs-toggle="collapse" data-bs-target="#finishes">
//                 Finish
//                 {hasActiveFilter && (
//                   <span className="ms-2 badge bg-secondary" style={{ fontSize: 10, fontWeight: 400 }}>
//                     {finishes.length}
//                   </span>
//                 )}
//               </button>
//             </h2>
//             <div id="finishes" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 {finishes.map((f) => (
//                   <div key={f.slug} className="form-check mb-1">
//                     <input className="form-check-input" type="checkbox" id={`fin-${f.slug}`}
//                       checked={(filters.finishes || []).includes(f.slug)}
//                       onChange={() => handleMultiChange("finishes", f.slug)} />
//                     <label className="form-check-label page-title-main-name" htmlFor={`fin-${f.slug}`}>
//                       {renderLabel(f.name, f.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Key Ingredients — backend-scoped */}
//         {ingredients.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button"
//                 data-bs-toggle="collapse" data-bs-target="#ingredients">
//                 Key Ingredient
//                 {hasActiveFilter && (
//                   <span className="ms-2 badge bg-secondary" style={{ fontSize: 10, fontWeight: 400 }}>
//                     {ingredients.length}
//                   </span>
//                 )}
//               </button>
//             </h2>
//             <div id="ingredients" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "240px", overflowY: "auto" }}>
//                 {ingredients.map((i) => (
//                   <div key={i.slug} className="form-check mb-1">
//                     <input className="form-check-input" type="checkbox" id={`ing-${i.slug}`}
//                       checked={(filters.ingredients || []).includes(i.slug)}
//                       onChange={() => handleMultiChange("ingredients", i.slug)} />
//                     <label className="form-check-label page-title-main-name" htmlFor={`ing-${i.slug}`}>
//                       {renderLabel(i.name, i.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Price Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button"
//               data-bs-toggle="collapse" data-bs-target="#price">
//               Price Range
//             </button>
//           </h2>
//           <div id="price" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select className="form-select"
//                 value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//                 onChange={(e) =>
//                   handleSingleChange("priceRange", e.target.value ? JSON.parse(e.target.value) : null)
//                 }>
//                 <option value="">All prices</option>
//                 {priceRanges.map((p, i) => (
//                   <option key={i} value={JSON.stringify({ min: p.min, max: p.max })}>{p.label}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Discount */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button"
//               data-bs-toggle="collapse" data-bs-target="#discount">
//               Discount
//             </button>
//           </h2>
//           <div id="discount" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select className="form-select"
//                 value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
//                 onChange={(e) =>
//                   handleSingleChange("discountRange", e.target.value ? JSON.parse(e.target.value) : null)
//                 }>
//                 <option value="">Any discount</option>
//                 {discountRanges.map((d, i) => (
//                   <option key={i} value={JSON.stringify({ min: d.min })}>{d.label}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Minimum Rating */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button"
//               data-bs-toggle="collapse" data-bs-target="#rating">
//               Minimum Rating
//             </button>
//           </h2>
//           <div id="rating" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select className="form-select"
//                 value={filters.minRating || ""}
//                 onChange={(e) => handleSingleChange("minRating", e.target.value)}>
//                 <option value="">Any rating</option>
//                 {[4, 3, 2].map((r) => (
//                   <option key={r} value={r}>{r}+ Stars</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default BrandFilter;













//=========================================================================Done-Code(Start)================================================================================








// // BrandFilter.jsx — Updated: Hide main category checkboxes when a sub-category level is active
// import React from "react";
// import { FaTimes } from "react-icons/fa";

// const BrandFilter = ({
//   filters,
//   setFilters,
//   onClose,
//   filterData = null,
//   trendingCategories = [],    // used as drill-down navigation pills
//   activeCategorySlug = null,
//   activeCategoryName = "",
//   onClearCategory,
//   onCategoryPillClick,
// }) => {
//   if (!filterData) {
//     return (
//       <div className="filter-wrapper border p-3" style={{ position: "sticky", top: "140px" }}>
//         <div className="d-flex align-items-center gap-2">
//           <div className="spinner-border spinner-border-sm text-secondary" role="status" />
//           <small className="text-muted">Loading filters...</small>
//         </div>
//       </div>
//     );
//   }

//   const {
//     brands = [],
//     categories = [],           // ← this will be main or sub depending on backend scoping
//     skinTypes = [],
//     formulations = [],
//     finishes = [],
//     ingredients = [],
//     priceRanges = [],
//     discountRanges = [],
//   } = filterData;

//   /* ─── Helpers ───────────────────────────────────────────────────────────── */
//   const toggleInArray = (arr = [], value) =>
//     arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

//   const handleMultiChange = (key, value) =>
//     setFilters((prev) => ({ ...prev, [key]: toggleInArray(prev[key] || [], value) }));

//   const handleSingleChange = (key, value) =>
//     setFilters((prev) => ({ ...prev, [key]: value }));

//   const clearAll = () => {
//     setFilters({
//       brandIds: [], categoryIds: [], skinTypes: [], formulations: [],
//       finishes: [], ingredients: [], priceRange: null, discountRange: null,
//       minRating: "", sort: "recent",
//     });
//     if (onClearCategory) onClearCategory();
//   };

//   const removeSingleValue = (key, val) =>
//     setFilters((prev) => ({ ...prev, [key]: (prev[key] || []).filter((v) => v !== val) }));

//   const getDisplayName = (key, val) => {
//     if (!val) return "";
//     switch (key) {
//       case "brandIds":
//         return brands.find((b) => b._id === val || b.slug === val)?.name || val;
//       case "categoryIds":
//         return categories.find((c) => c._id === val || c.slug === val)?.name || val;
//       case "skinTypes":
//         return skinTypes.find((s) => s.name === val)?.name || val;
//       case "formulations":
//         return formulations.find((f) => f._id === val)?.name || val;
//       case "finishes":
//         return finishes.find((f) => f.slug === val)?.name || val;
//       case "ingredients":
//         return ingredients.find((i) => i.slug === val)?.name || val;
//       case "priceRange":
//         try {
//           const match = priceRanges.find((p) => p.min === val.min && p.max === val.max);
//           return match?.label || `₹${val.min} — ₹${val.max || "above"}`;
//         } catch { return "Price"; }
//       case "discountRange":
//         try {
//           const match = discountRanges.find((d) => d.min === val.min);
//           return match?.label || `${val.min}%+ Off`;
//         } catch { return "Discount"; }
//       case "minRating": return `${val}★ & up`;
//       case "sort":
//         return val === "recent" ? "" : val.replace(/([A-Z])/g, " $1").trim();
//       default: return val;
//     }
//   };

//   /* ─── Active Chips ──────────────────────────────────────────────────────── */
//   const getActiveChips = () => {
//     const chips = [];
//     if (activeCategorySlug && activeCategoryName) {
//       chips.push({
//         group: "categoryPill",
//         value: activeCategorySlug,
//         label: activeCategoryName,
//         isPill: true,
//       });
//     }

//     ["brandIds", "categoryIds", "skinTypes", "formulations", "finishes", "ingredients"].forEach((k) => {
//       (filters[k] || []).forEach((v) => {
//         const label = getDisplayName(k, v);
//         if (label) chips.push({ group: k, value: v, label });
//       });
//     });

//     if (filters.priceRange) chips.push({ group: "priceRange", label: getDisplayName("priceRange", filters.priceRange) });
//     if (filters.discountRange) chips.push({ group: "discountRange", label: getDisplayName("discountRange", filters.discountRange) });
//     if (filters.minRating) chips.push({ group: "minRating", label: getDisplayName("minRating", filters.minRating) });
//     if (filters.sort && filters.sort !== "recent") chips.push({ group: "sort", label: getDisplayName("sort", filters.sort) });

//     return chips.filter((c) => c.label);
//   };

//   const activeChips = getActiveChips();

//   const renderLabel = (name, count) => (
//     <>
//       {name}
//       {count !== undefined && count !== null && <span className="text-muted small ms-1">({count})</span>}
//     </>
//   );

//   const hasActiveFilter = activeChips.length > 0;

//   /* ─── Category logic: hide main checkboxes when we are in sub-category view ── */
//   const isInSubCategoryView = !!activeCategorySlug; // true = user has drilled down
//   const showCategoryPills = trendingCategories.length > 0;
//   const showCategoryCheckboxes = categories.length > 0 && !isInSubCategoryView;

//   /* ─── Render ────────────────────────────────────────────────────────────── */
//   return (
//     <div className="filter-wrapper border" style={{ position: "sticky", top: "140px" }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
//         <h6 className="fw-bold mb-0">Filters</h6>
//         {hasActiveFilter && (
//           <button className="btn btn-link text-muted p-0 small" onClick={clearAll}>
//             Reset
//           </button>
//         )}
//       </div>

//       {/* Selected chips */}
//       {hasActiveFilter && (
//         <div className="px-3 pb-3 pt-2 border-bottom">
//           <div className="d-flex justify-content-between mb-2">
//             <small className="text-muted fw-semibold">Selected</small>
//             <button className="btn btn-link btn-sm text-danger p-0" onClick={clearAll}>
//               Clear All
//             </button>
//           </div>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxHeight: "140px", overflowY: "auto" }}>
//             {activeChips.map((chip) => (
//               <span
//                 key={`${chip.group}-${chip.value || "s"}`}
//                 className={`badge rounded-pill px-3 py-2 d-flex align-items-center gap-1 ${
//                   chip.isPill ? "bg-dark text-white" : "bg-secondary text-white"
//                 }`}
//                 style={{ fontSize: "12px", cursor: "pointer", fontWeight: chip.isPill ? 600 : 400, maxWidth: "100%" }}
//                 title={chip.isPill ? "Remove category filter" : `Remove ${chip.label}`}
//                 onClick={() => {
//                   if (chip.isPill) {
//                     if (onClearCategory) onClearCategory();
//                   } else if (chip.group === "priceRange" || chip.group === "discountRange") {
//                     setFilters((prev) => ({ ...prev, [chip.group]: null }));
//                   } else {
//                     removeSingleValue(chip.group, chip.value);
//                   }
//                 }}
//               >
//                 {chip.isPill && <span style={{ fontSize: 10, opacity: 0.75 }}>Category: </span>}
//                 <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
//                   {chip.label}
//                 </span>
//                 <FaTimes size={10} style={{ flexShrink: 0 }} />
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="accordion accordion-flush" id="filterAccordion">
//         {/* ── CATEGORY SECTION ──────────────────────────────────────────────── */}
//         {showCategoryPills && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#categories"
//                 aria-expanded="true"
//               >
//                 Category
//                 {activeCategoryName && (
//                   <span className="ms-2 text-muted" style={{ fontSize: 12 }}>
//                     › {activeCategoryName}
//                   </span>
//                 )}
//               </button>
//             </h2>

//             <div id="categories" className="accordion-collapse collapse show">
//               <div className="accordion-body p-0">
//                 {/* Pills - always shown when available (root or sub) */}
//                 {showCategoryPills && (
//                   <div className="px-3 py-3 border-bottom">
//                     <small
//                       className="text-uppercase text-muted d-block mb-2"
//                       style={{ fontSize: 11, letterSpacing: "0.4px" }}
//                     >
//                       {isInSubCategoryView ? "Sub-categories" : "Popular Categories"}
//                     </small>

//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                       {trendingCategories.map((cat) => {
//                         const isActive = activeCategorySlug === cat.slug;
//                         return (
//                           <button
//                             key={cat.slug}
//                             type="button"
//                             onClick={() => onCategoryPillClick && onCategoryPillClick(cat)}
//                             className={`btn btn-sm rounded-pill px-3 py-1 ${
//                               isActive ? "btn-dark text-white" : "btn-outline-secondary"
//                             }`}
//                             style={{
//                               fontSize: 13,
//                               fontWeight: isActive ? 600 : 400,
//                               transition: "all 0.15s",
//                             }}
//                           >
//                             {cat.name}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Checkboxes - only show when NOT in sub-category view */}
//                 {showCategoryCheckboxes && (
//                   <div style={{ maxHeight: "260px", overflowY: "auto", padding: "12px 16px" }}>
//                     {categories.map((c) => (
//                       <div key={c._id || c.slug} className="form-check mb-2">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           id={`cat-${c._id || c.slug}`}
//                           checked={(filters.categoryIds || []).includes(c._id)}
//                           onChange={() => handleMultiChange("categoryIds", c._id)}
//                         />
//                         <label className="form-check-label" htmlFor={`cat-${c._id || c.slug}`}>
//                           {renderLabel(c.name, c.count)}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {showCategoryPills && !showCategoryCheckboxes && categories.length === 0 && (
//                   <div className="p-4 text-center text-muted small">
//                     No further sub-categories available
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── BRAND ─────────────────────────────────────────────────────────── */}
//         {brands.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brands">
//                 Brand
//               </button>
//             </h2>
//             <div id="brands" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {brands.map((b) => (
//                   <div key={b._id} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`brand-${b._id}`}
//                       checked={(filters.brandIds || []).includes(b._id)}
//                       onChange={() => handleMultiChange("brandIds", b._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`brand-${b._id}`}>
//                       {renderLabel(b.name, b.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Type */}
//         {skinTypes.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skintypes">
//                 Skin Type
//               </button>
//             </h2>
//             <div id="skintypes" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {skinTypes.map((st) => (
//                   <div key={st.name} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`st-${st.name}`}
//                       checked={(filters.skinTypes || []).includes(st.name)}
//                       onChange={() => handleMultiChange("skinTypes", st.name)}
//                     />
//                     <label className="form-check-label" htmlFor={`st-${st.name}`}>
//                       {renderLabel(st.name, st.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulation */}
//         {formulations.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#formulations">
//                 Formulation
//               </button>
//             </h2>
//             <div id="formulations" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {formulations.map((f) => (
//                   <div key={f._id} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`form-${f._id}`}
//                       checked={(filters.formulations || []).includes(f._id)}
//                       onChange={() => handleMultiChange("formulations", f._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`form-${f._id}`}>
//                       {renderLabel(f.name, f.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Finish */}
//         {finishes.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#finishes">
//                 Finish
//               </button>
//             </h2>
//             <div id="finishes" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {finishes.map((f) => (
//                   <div key={f.slug} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`fin-${f.slug}`}
//                       checked={(filters.finishes || []).includes(f.slug)}
//                       onChange={() => handleMultiChange("finishes", f.slug)}
//                     />
//                     <label className="form-check-label" htmlFor={`fin-${f.slug}`}>
//                       {renderLabel(f.name, f.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Key Ingredient */}
//         {ingredients.length > 0 && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ingredients">
//                 Key Ingredient
//               </button>
//             </h2>
//             <div id="ingredients" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {ingredients.map((i) => (
//                   <div key={i.slug} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`ing-${i.slug}`}
//                       checked={(filters.ingredients || []).includes(i.slug)}
//                       onChange={() => handleMultiChange("ingredients", i.slug)}
//                     />
//                     <label className="form-check-label" htmlFor={`ing-${i.slug}`}>
//                       {renderLabel(i.name, i.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Price Range */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#price">
//               Price Range
//             </button>
//           </h2>
//           <div id="price" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//                 onChange={(e) => handleSingleChange("priceRange", e.target.value ? JSON.parse(e.target.value) : null)}
//               >
//                 <option value="">All prices</option>
//                 {priceRanges.map((p, i) => (
//                   <option key={i} value={JSON.stringify({ min: p.min, max: p.max })}>
//                     {p.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Discount */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#discount">
//               Discount
//             </button>
//           </h2>
//           <div id="discount" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
//                 onChange={(e) => handleSingleChange("discountRange", e.target.value ? JSON.parse(e.target.value) : null)}
//               >
//                 <option value="">Any discount</option>
//                 {discountRanges.map((d, i) => (
//                   <option key={i} value={JSON.stringify({ min: d.min })}>
//                     {d.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Minimum Rating */}
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rating">
//               Minimum Rating
//             </button>
//           </h2>
//           <div id="rating" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               <select
//                 className="form-select"
//                 value={filters.minRating || ""}
//                 onChange={(e) => handleSingleChange("minRating", e.target.value)}
//               >
//                 <option value="">Any rating</option>
//                 {[4, 3, 2].map((r) => (
//                   <option key={r} value={r}>{r}+ Stars</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {onClose && (
//         <div className="p-3 border-top d-lg-none">
//           <button className="btn btn-dark w-100" onClick={onClose}>
//             Show Results
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BrandFilter;


























// // BrandFilter.jsx — Updated: Hide sections when their filters are actively applied
// import React from "react";
// import { FaTimes } from "react-icons/fa";

// const BrandFilter = ({
//   filters,
//   setFilters,
//   onClose,
//   filterData = null,
//   trendingCategories = [],    // used as drill-down navigation pills
//   activeCategorySlug = null,
//   activeCategoryName = "",
//   onClearCategory,
//   onCategoryPillClick,
// }) => {
//   if (!filterData) {
//     return (
//       <div className="filter-wrapper border p-3" style={{ position: "sticky", top: "140px" }}>
//         <div className="d-flex align-items-center gap-2">
//           <div className="spinner-border spinner-border-sm text-secondary" role="status" />
//           <small className="text-muted">Loading filters...</small>
//         </div>
//       </div>
//     );
//   }

//   const {
//     brands = [],
//     categories = [],           // ← this will be main or sub depending on backend scoping
//     skinTypes = [],
//     formulations = [],
//     finishes = [],
//     ingredients = [],
//     priceRanges = [],
//     discountRanges = [],
//   } = filterData;

//   /* ─── Helpers ───────────────────────────────────────────────────────────── */
//   const toggleInArray = (arr = [], value) =>
//     arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

//   const handleMultiChange = (key, value) =>
//     setFilters((prev) => ({ ...prev, [key]: toggleInArray(prev[key] || [], value) }));

//   const handleSingleChange = (key, value) =>
//     setFilters((prev) => ({ ...prev, [key]: value }));

//   const clearAll = () => {
//     setFilters({
//       brandIds: [], categoryIds: [], skinTypes: [], formulations: [],
//       finishes: [], ingredients: [], priceRange: null, discountRange: null,
//       minRating: "", sort: "recent",
//     });
//     if (onClearCategory) onClearCategory();
//   };

//   const removeSingleValue = (key, val) =>
//     setFilters((prev) => ({ ...prev, [key]: (prev[key] || []).filter((v) => v !== val) }));

//   const getDisplayName = (key, val) => {
//     if (!val) return "";
//     switch (key) {
//       case "brandIds":
//         return brands.find((b) => b._id === val || b.slug === val)?.name || val;
//       case "categoryIds":
//         return categories.find((c) => c._id === val || c.slug === val)?.name || val;
//       case "skinTypes":
//         return skinTypes.find((s) => s.name === val)?.name || val;
//       case "formulations":
//         return formulations.find((f) => f._id === val)?.name || val;
//       case "finishes":
//         return finishes.find((f) => f.slug === val)?.name || val;
//       case "ingredients":
//         return ingredients.find((i) => i.slug === val)?.name || val;
//       case "priceRange":
//         try {
//           const match = priceRanges.find((p) => p.min === val.min && p.max === val.max);
//           return match?.label || `₹${val.min} — ₹${val.max || "above"}`;
//         } catch { return "Price"; }
//       case "discountRange":
//         try {
//           const match = discountRanges.find((d) => d.min === val.min);
//           return match?.label || `${val.min}%+ Off`;
//         } catch { return "Discount"; }
//       case "minRating": return `${val}★ & up`;
//       case "sort":
//         return val === "recent" ? "" : val.replace(/([A-Z])/g, " $1").trim();
//       default: return val;
//     }
//   };

//   /* ─── Active Chips ──────────────────────────────────────────────────────── */
//   // const getActiveChips = () => {
//   //   const chips = [];
//   //   if (activeCategorySlug && activeCategoryName) {
//   //     chips.push({
//   //       group: "categoryPill",
//   //       value: activeCategorySlug,
//   //       label: activeCategoryName,
//   //       isPill: true,
//   //     });
//   //   }



//   const getActiveChips = () => {
//   const chips = [];
//   if (activeCategorySlug) {
//     // Try to get the category name from trendingCategories if not provided
//     const categoryName = activeCategoryName || 
//       trendingCategories.find(c => c.slug === activeCategorySlug)?.name || 
//       activeCategorySlug;
//     chips.push({
//       group: "categoryPill",
//       value: activeCategorySlug,
//       label: categoryName,
//       isPill: true,
//     });
//   };

//     ["brandIds", "categoryIds", "skinTypes", "formulations", "finishes", "ingredients"].forEach((k) => {
//       (filters[k] || []).forEach((v) => {
//         const label = getDisplayName(k, v);
//         if (label) chips.push({ group: k, value: v, label });
//       });
//     });

//     if (filters.priceRange) chips.push({ group: "priceRange", label: getDisplayName("priceRange", filters.priceRange) });
//     if (filters.discountRange) chips.push({ group: "discountRange", label: getDisplayName("discountRange", filters.discountRange) });
//     if (filters.minRating) chips.push({ group: "minRating", label: getDisplayName("minRating", filters.minRating) });
//     if (filters.sort && filters.sort !== "recent") chips.push({ group: "sort", label: getDisplayName("sort", filters.sort) });

//     return chips.filter((c) => c.label);
//   };

//   const activeChips = getActiveChips();

//   const renderLabel = (name, count) => (
//     <>
//       {name}
//       {count !== undefined && count !== null && <span className="text-muted small ms-1">({count})</span>}
//     </>
//   );

//   const hasActiveFilter = activeChips.length > 0;

//   /* ─── Category logic: hide main checkboxes when we are in sub-category view ── */
//   const isInSubCategoryView = !!activeCategorySlug; // true = user has drilled down
//   const showCategoryPills = trendingCategories.length > 0;
//   const showCategoryCheckboxes = categories.length > 0 && !isInSubCategoryView;

//   /* ─── Logic: Hide sections when their filters are active ──────────────────── */
//   const hasActiveBrands = (filters.brandIds || []).length > 0;
//   const hasActiveCategories = (filters.categoryIds || []).length > 0;
//   const hasActiveSkinTypes = (filters.skinTypes || []).length > 0;
//   const hasActiveFormulations = (filters.formulations || []).length > 0;
//   const hasActiveFinishes = (filters.finishes || []).length > 0;
//   const hasActiveIngredients = (filters.ingredients || []).length > 0;
//   const hasActivePriceRange = !!filters.priceRange;
//   const hasActiveDiscountRange = !!filters.discountRange;
//   const hasActiveRating = !!filters.minRating;

//   /* ─── Render ────────────────────────────────────────────────────────────── */
//   return (
//     <div className="filter-wrapper border" style={{ position: "sticky", top: "140px" }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
//         <h6 className="fw-bold mb-0">Filters</h6>
//         {hasActiveFilter && (
//           <button className="btn btn-link text-muted p-0 small" onClick={clearAll}>
//             Reset
//           </button>
//         )}
//       </div>

//       {/* Selected chips */}
//       {hasActiveFilter && (
//         <div className="px-3 pb-3 pt-2 border-bottom">
//           <div className="d-flex justify-content-between mb-2">
//             <small className="text-muted fw-semibold">Selected</small>
//             <button className="btn btn-link btn-sm text-danger p-0" onClick={clearAll}>
//               Clear All
//             </button>
//           </div>
//           <div className="mb-5 overflow-y-scroll" style={{ display: "block", flexWrap: "wrap", gap: "6px", maxHeight: "140px"}}>
//             {activeChips.map((chip) => (
//               <span
//                 key={`${chip.group}-${chip.value || "s"}`}
//                 className={`badge rounded-pill px-3 py-2 d-flex align-items-center gap-1 mt-0 ms-0 ${
//                   chip.isPill ? "bg-dark text-white" : "bg-secondary text-white"
//                 }`}
//                 style={{ fontSize: "12px", cursor: "pointer", fontWeight: chip.isPill ? 600 : 400, maxWidth: "100%" }}
//                 title={chip.isPill ? "Remove category filter" : `Remove ${chip.label}`}
//                 onClick={() => {
//                   if (chip.isPill) {
//                     if (onClearCategory) onClearCategory();
//                   } else if (chip.group === "priceRange" || chip.group === "discountRange") {
//                     setFilters((prev) => ({ ...prev, [chip.group]: null }));
//                   } else {
//                     removeSingleValue(chip.group, chip.value);
//                   }
//                 }}
//               >
//                 {chip.isPill && <span style={{ fontSize: 10, opacity: 0.75 }}>Category: </span>}
//                 <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
//                   {chip.label}
//                 </span>
//                 <FaTimes size={10} style={{ flexShrink: 0 }} />
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="accordion accordion-flush" id="filterAccordion">
//         {/* ── CATEGORY SECTION ──────────────────────────────────────────────── */}
//         {showCategoryPills && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#categories"
//                 aria-expanded="true"
//               >
//                 Category
//                 {activeCategoryName && (
//                   <span className="ms-2 text-muted" style={{ fontSize: 12 }}>
//                     › {activeCategoryName}
//                   </span>
//                 )}
//               </button>
//             </h2>

//             <div id="categories" className="accordion-collapse collapse show">
//               <div className="accordion-body p-0">
//                 {/* Pills - always shown when available (root or sub) */}
//                 {/* {showCategoryPills && (
//                   <div className="px-3 py-3 border-bottom">
//                     <small
//                       className="text-uppercase text-muted d-block mb-2"
//                       style={{ fontSize: 11, letterSpacing: "0.4px" }}
//                     >
//                       {isInSubCategoryView ? "Sub-categories" : ""}
//                     </small>

//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                       {trendingCategories.map((cat) => {
//                         const isActive = activeCategorySlug === cat.slug;
//                         return (
//                           <button
//                             key={cat.slug}
//                             type="button"
//                             onClick={() => onCategoryPillClick && onCategoryPillClick(cat)}
//                             className={`btn btn-sm rounded-pill px-3 py-1 ${
//                               isActive ? "btn-dark text-white" : "btn-outline-secondary"
//                             }`}
//                             style={{
//                               fontSize: 13,
//                               fontWeight: isActive ? 600 : 400,
//                               transition: "all 0.15s",
//                             }}
//                           >
//                             {cat.name}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )} */}

//                 {/* Checkboxes - only show when NOT in sub-category view */}
//                 {showCategoryCheckboxes && !hasActiveCategories && (
//                   <div style={{ maxHeight: "260px", overflowY: "auto", padding: "12px 16px" }}>
//                     {categories.map((c) => (
//                       <div key={c._id || c.slug} className="form-check mb-2">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           id={`cat-${c._id || c.slug}`}
//                           checked={(filters.categoryIds || []).includes(c._id)}
//                           onChange={() => handleMultiChange("categoryIds", c._id)}
//                         />
//                         <label className="form-check-label" htmlFor={`cat-${c._id || c.slug}`}>
//                           {renderLabel(c.name, c.count)}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {showCategoryPills && !showCategoryCheckboxes && categories.length === 0 && (
//                   <div className="p-4 text-center text-muted small">
//                     No further sub-categories available
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── BRAND ─────────────────────────────────────────────────────────── */}
//         {brands.length > 0 && !hasActiveBrands && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brands">
//                 Brand
//               </button>
//             </h2>
//             <div id="brands" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {brands.map((b) => (
//                   <div key={b._id} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`brand-${b._id}`}
//                       checked={(filters.brandIds || []).includes(b._id)}
//                       onChange={() => handleMultiChange("brandIds", b._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`brand-${b._id}`}>
//                       {renderLabel(b.name, b.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skin Type */}
//         {skinTypes.length > 0 && !hasActiveSkinTypes && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skintypes">
//                 Skin Type
//               </button>
//             </h2>
//             <div id="skintypes" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {skinTypes.map((st) => (
//                   <div key={st.name} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`st-${st.name}`}
//                       checked={(filters.skinTypes || []).includes(st.name)}
//                       onChange={() => handleMultiChange("skinTypes", st.name)}
//                     />
//                     <label className="form-check-label" htmlFor={`st-${st.name}`}>
//                       {renderLabel(st.name, st.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Formulation */}
//         {formulations.length > 0 && !hasActiveFormulations && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#formulations">
//                 Formulation
//               </button>
//             </h2>
//             <div id="formulations" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {formulations.map((f) => (
//                   <div key={f._id} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`form-${f._id}`}
//                       checked={(filters.formulations || []).includes(f._id)}
//                       onChange={() => handleMultiChange("formulations", f._id)}
//                     />
//                     <label className="form-check-label" htmlFor={`form-${f._id}`}>
//                       {renderLabel(f.name, f.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Finish */}
//         {finishes.length > 0 && !hasActiveFinishes && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#finishes">
//                 Finish
//               </button>
//             </h2>
//             <div id="finishes" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {finishes.map((f) => (
//                   <div key={f.slug} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`fin-${f.slug}`}
//                       checked={(filters.finishes || []).includes(f.slug)}
//                       onChange={() => handleMultiChange("finishes", f.slug)}
//                     />
//                     <label className="form-check-label" htmlFor={`fin-${f.slug}`}>
//                       {renderLabel(f.name, f.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Key Ingredient */}
//         {ingredients.length > 0 && !hasActiveIngredients && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ingredients">
//                 Key Ingredient
//               </button>
//             </h2>
//             <div id="ingredients" className="accordion-collapse collapse">
//               <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
//                 {ingredients.map((i) => (
//                   <div key={i.slug} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`ing-${i.slug}`}
//                       checked={(filters.ingredients || []).includes(i.slug)}
//                       onChange={() => handleMultiChange("ingredients", i.slug)}
//                     />
//                     <label className="form-check-label" htmlFor={`ing-${i.slug}`}>
//                       {renderLabel(i.name, i.count)}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Price Range */}
//         {!hasActivePriceRange && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#price">
//                 Price Range
//               </button>
//             </h2>
//             <div id="price" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select"
//                   value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
//                   onChange={(e) => handleSingleChange("priceRange", e.target.value ? JSON.parse(e.target.value) : null)}
//                 >
//                   <option value="">All prices</option>
//                   {priceRanges.map((p, i) => (
//                     <option key={i} value={JSON.stringify({ min: p.min, max: p.max })}>
//                       {p.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Discount */}
//         {!hasActiveDiscountRange && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#discount">
//                 Discount
//               </button>
//             </h2>
//             <div id="discount" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select"
//                   value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
//                   onChange={(e) => handleSingleChange("discountRange", e.target.value ? JSON.parse(e.target.value) : null)}
//                 >
//                   <option value="">Any discount</option>
//                   {discountRanges.map((d, i) => (
//                     <option key={i} value={JSON.stringify({ min: d.min })}>
//                       {d.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Minimum Rating */}
//         {!hasActiveRating && (
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rating">
//                 Minimum Rating
//               </button>
//             </h2>
//             <div id="rating" className="accordion-collapse collapse">
//               <div className="accordion-body">
//                 <select
//                   className="form-select"
//                   value={filters.minRating || ""}
//                   onChange={(e) => handleSingleChange("minRating", e.target.value)}
//                 >
//                   <option value="">Any rating</option>
//                   {[4, 3, 2].map((r) => (
//                     <option key={r} value={r}>{r}+ Stars</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {onClose && (
//         <div className="p-3 border-top d-lg-none">
//           <button className="btn btn-dark w-100" onClick={onClose}>
//             Show Results
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BrandFilter;














// BrandFilter.jsx — Updated: Show skin type as selected chip when navigated from Skintypes
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const BrandFilter = ({
  filters,
  setFilters,
  onClose,
  filterData = null,
  trendingCategories = [],
  activeCategorySlug = null,
  activeCategoryName = "",
  onClearCategory,
  onCategoryPillClick,
  // New props for skin type support
  activeSkinTypeSlug = null,
  activeSkinTypeName = "",
  onClearSkinType,
}) => {
  const location = useLocation();

  // Get skin type from location state if not passed as prop
  const locationSkinTypeSlug = location.state?.activeSkinTypeSlug;
  const locationSkinTypeName = location.state?.activeSkinTypeName;
  
  // Use props if provided, otherwise fall back to location state
  const effectiveSkinTypeSlug = activeSkinTypeSlug || locationSkinTypeSlug;
  const effectiveSkinTypeName = activeSkinTypeName || locationSkinTypeName;

  if (!filterData) {
    return (
      <div className="filter-wrapper border p-3" style={{ position: "sticky", top: "140px" }}>
        <div className="d-flex align-items-center gap-2">
          <div className="spinner-border spinner-border-sm text-secondary" role="status" />
          <small className="text-muted">Loading filters...</small>
        </div>
      </div>
    );
  }

  const {
    brands = [],
    categories = [],
    skinTypes = [],
    formulations = [],
    finishes = [],
    ingredients = [],
    priceRanges = [],
    discountRanges = [],
  } = filterData;

  /* ─── Helpers ───────────────────────────────────────────────────────────── */
  const toggleInArray = (arr = [], value) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleMultiChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: toggleInArray(prev[key] || [], value) }));

  const handleSingleChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const clearAll = () => {
    setFilters({
      brandIds: [], categoryIds: [], skinTypes: [], formulations: [],
      finishes: [], ingredients: [], priceRange: null, discountRange: null,
      minRating: "", sort: "recent",
    });
    if (onClearCategory) onClearCategory();
    if (onClearSkinType) onClearSkinType();
  };

  const removeSingleValue = (key, val) =>
    setFilters((prev) => ({ ...prev, [key]: (prev[key] || []).filter((v) => v !== val) }));

  const getDisplayName = (key, val) => {
    if (!val) return "";
    switch (key) {
      case "brandIds":
        return brands.find((b) => b._id === val || b.slug === val)?.name || val;
      case "categoryIds":
        return categories.find((c) => c._id === val || c.slug === val)?.name || val;
      case "skinTypes":
        return skinTypes.find((s) => s.name === val || s.slug === val)?.name || val;
      case "formulations":
        return formulations.find((f) => f._id === val)?.name || val;
      case "finishes":
        return finishes.find((f) => f.slug === val)?.name || val;
      case "ingredients":
        return ingredients.find((i) => i.slug === val)?.name || val;
      case "priceRange":
        try {
          const match = priceRanges.find((p) => p.min === val.min && p.max === val.max);
          return match?.label || `₹${val.min} — ₹${val.max || "above"}`;
        } catch { return "Price"; }
      case "discountRange":
        try {
          const match = discountRanges.find((d) => d.min === val.min);
          return match?.label || `${val.min}%+ Off`;
        } catch { return "Discount"; }
      case "minRating": return `${val}★ & up`;
      case "sort":
        return val === "recent" ? "" : val.replace(/([A-Z])/g, " $1").trim();
      default: return val;
    }
  };

  /* ─── Active Chips ──────────────────────────────────────────────────────── */
  const getActiveChips = () => {
    const chips = [];
    
    // Category pill
    if (activeCategorySlug) {
      const categoryName = activeCategoryName || 
        trendingCategories.find(c => c.slug === activeCategorySlug)?.name || 
        activeCategorySlug;
      chips.push({
        group: "categoryPill",
        value: activeCategorySlug,
        label: categoryName,
        isPill: true,
      });
    }

    // Skin Type pill (from Skintypes navigation)
    if (effectiveSkinTypeSlug) {
      const skinTypeName = effectiveSkinTypeName ||
        skinTypes.find(s => s.slug === effectiveSkinTypeSlug)?.name ||
        effectiveSkinTypeSlug;
      chips.push({
        group: "skinTypePill",
        value: effectiveSkinTypeSlug,
        label: skinTypeName,
        isPill: true,
        isSkinType: true,
      });
    }

    ["brandIds", "categoryIds", "skinTypes", "formulations", "finishes", "ingredients"].forEach((k) => {
      (filters[k] || []).forEach((v) => {
        const label = getDisplayName(k, v);
        if (label) chips.push({ group: k, value: v, label });
      });
    });

    if (filters.priceRange) chips.push({ group: "priceRange", label: getDisplayName("priceRange", filters.priceRange) });
    if (filters.discountRange) chips.push({ group: "discountRange", label: getDisplayName("discountRange", filters.discountRange) });
    if (filters.minRating) chips.push({ group: "minRating", label: getDisplayName("minRating", filters.minRating) });
    if (filters.sort && filters.sort !== "recent") chips.push({ group: "sort", label: getDisplayName("sort", filters.sort) });

    return chips.filter((c) => c.label);
  };

  const activeChips = getActiveChips();

  const renderLabel = (name, count) => (
    <>
      {name}
      {count !== undefined && count !== null && <span className="text-muted small ms-1">({count})</span>}
    </>
  );

  const hasActiveFilter = activeChips.length > 0;

  /* ─── Category logic: hide main checkboxes when we are in sub-category view ── */
  const isInSubCategoryView = !!activeCategorySlug;
  const showCategoryPills = trendingCategories.length > 0;
  const showCategoryCheckboxes = categories.length > 0 && !isInSubCategoryView;

  /* ─── Logic: Hide sections when their filters are active ──────────────────── */
  const hasActiveBrands = (filters.brandIds || []).length > 0;
  const hasActiveCategories = (filters.categoryIds || []).length > 0;
  const hasActiveSkinTypes = (filters.skinTypes || []).length > 0 || !!effectiveSkinTypeSlug;
  const hasActiveFormulations = (filters.formulations || []).length > 0;
  const hasActiveFinishes = (filters.finishes || []).length > 0;
  const hasActiveIngredients = (filters.ingredients || []).length > 0;
  const hasActivePriceRange = !!filters.priceRange;
  const hasActiveDiscountRange = !!filters.discountRange;
  const hasActiveRating = !!filters.minRating;

  /* ─── Render ────────────────────────────────────────────────────────────── */
  return (
    <div className="filter-wrapper border" style={{ position: "sticky", top: "140px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h6 className="fw-bold mb-0">Filters</h6>
        {hasActiveFilter && (
          <button className="btn btn-link text-muted p-0 small" onClick={clearAll}>
            Reset
          </button>
        )}
      </div>

      {/* Selected chips */}
      {hasActiveFilter && (
        <div className="px-3 pb-3 pt-2 border-bottom">
          <div className="d-flex justify-content-between mb-2">
            <small className="text-muted fw-semibold">Selected</small>
            <button className="btn btn-link btn-sm text-danger p-0" onClick={clearAll}>
              Clear All
            </button>
          </div>
          <div className="mb-5 overflow-y-scroll" style={{ display: "block", flexWrap: "wrap", gap: "6px", maxHeight: "140px"}}>
            {activeChips.map((chip) => (
              <span
                key={`${chip.group}-${chip.value || "s"}`}
                className={`badge rounded-pill px-3 py-2 d-flex align-items-center gap-1 mt-0 ms-0 ${
                  chip.isPill ? "bg-dark text-white" : "bg-secondary text-white"
                }`}
                style={{ fontSize: "12px", cursor: "pointer", fontWeight: chip.isPill ? 600 : 400, maxWidth: "100%" }}
                title={chip.isPill ? (chip.isSkinType ? "Remove skin type filter" : "Remove category filter") : `Remove ${chip.label}`}
                onClick={() => {
                  if (chip.isPill && chip.isSkinType) {
                    if (onClearSkinType) onClearSkinType();
                  } else if (chip.isPill) {
                    if (onClearCategory) onClearCategory();
                  } else if (chip.group === "priceRange" || chip.group === "discountRange") {
                    setFilters((prev) => ({ ...prev, [chip.group]: null }));
                  } else {
                    removeSingleValue(chip.group, chip.value);
                  }
                }}
              >
                {chip.isPill && <span style={{ fontSize: 10, opacity: 0.75 }}>{chip.isSkinType ? "Skin Type: " : "Category: "}</span>}
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
                  {chip.label}
                </span>
                <FaTimes size={10} style={{ flexShrink: 0 }} />
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="accordion accordion-flush" id="filterAccordion">
        {/* ── CATEGORY SECTION ──────────────────────────────────────────────── */}
        {showCategoryPills && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#categories"
                aria-expanded="true"
              >
                Category
                {activeCategoryName && (
                  <span className="ms-2 text-muted" style={{ fontSize: 12 }}>
                    › {activeCategoryName}
                  </span>
                )}
              </button>
            </h2>

            <div id="categories" className="accordion-collapse collapse show">
              <div className="accordion-body p-0">
                {showCategoryCheckboxes && !hasActiveCategories && (
                  <div style={{ maxHeight: "260px", overflowY: "auto", padding: "12px 16px" }}>
                    {categories.map((c) => (
                      <div key={c._id || c.slug} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`cat-${c._id || c.slug}`}
                          checked={(filters.categoryIds || []).includes(c._id)}
                          onChange={() => handleMultiChange("categoryIds", c._id)}
                        />
                        <label className="form-check-label" htmlFor={`cat-${c._id || c.slug}`}>
                          {renderLabel(c.name, c.count)}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {showCategoryPills && !showCategoryCheckboxes && categories.length === 0 && (
                  <div className="p-4 text-center text-muted small">
                    No further sub-categories available
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── BRAND ─────────────────────────────────────────────────────────── */}
        {brands.length > 0 && !hasActiveBrands && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brands">
                Brand
              </button>
            </h2>
            <div id="brands" className="accordion-collapse collapse">
              <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
                {brands.map((b) => (
                  <div key={b._id} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`brand-${b._id}`}
                      checked={(filters.brandIds || []).includes(b._id)}
                      onChange={() => handleMultiChange("brandIds", b._id)}
                    />
                    <label className="form-check-label" htmlFor={`brand-${b._id}`}>
                      {renderLabel(b.name, b.count)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skin Type */}
        {skinTypes.length > 0 && !hasActiveSkinTypes && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skintypes">
                Skin Type
                {effectiveSkinTypeName && (
                  <span className="ms-2 text-muted" style={{ fontSize: 12 }}>
                    › {effectiveSkinTypeName}
                  </span>
                )}
              </button>
            </h2>
            <div id="skintypes" className="accordion-collapse collapse">
              <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
                {skinTypes.map((st) => (
                  <div key={st.name || st.slug} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`st-${st.name || st.slug}`}
                      checked={(filters.skinTypes || []).includes(st.name) || effectiveSkinTypeSlug === st.slug}
                      onChange={() => handleMultiChange("skinTypes", st.name)}
                    />
                    <label className="form-check-label" htmlFor={`st-${st.name || st.slug}`}>
                      {renderLabel(st.name, st.count)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Formulation */}
        {formulations.length > 0 && !hasActiveFormulations && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#formulations">
                Formulation
              </button>
            </h2>
            <div id="formulations" className="accordion-collapse collapse">
              <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
                {formulations.map((f) => (
                  <div key={f._id} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`form-${f._id}`}
                      checked={(filters.formulations || []).includes(f._id)}
                      onChange={() => handleMultiChange("formulations", f._id)}
                    />
                    <label className="form-check-label" htmlFor={`form-${f._id}`}>
                      {renderLabel(f.name, f.count)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Finish */}
        {finishes.length > 0 && !hasActiveFinishes && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#finishes">
                Finish
              </button>
            </h2>
            <div id="finishes" className="accordion-collapse collapse">
              <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
                {finishes.map((f) => (
                  <div key={f.slug} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`fin-${f.slug}`}
                      checked={(filters.finishes || []).includes(f.slug)}
                      onChange={() => handleMultiChange("finishes", f.slug)}
                    />
                    <label className="form-check-label" htmlFor={`fin-${f.slug}`}>
                      {renderLabel(f.name, f.count)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Key Ingredient */}
        {ingredients.length > 0 && !hasActiveIngredients && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ingredients">
                Key Ingredient
              </button>
            </h2>
            <div id="ingredients" className="accordion-collapse collapse">
              <div className="accordion-body" style={{ maxHeight: "260px", overflowY: "auto" }}>
                {ingredients.map((i) => (
                  <div key={i.slug} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`ing-${i.slug}`}
                      checked={(filters.ingredients || []).includes(i.slug)}
                      onChange={() => handleMultiChange("ingredients", i.slug)}
                    />
                    <label className="form-check-label" htmlFor={`ing-${i.slug}`}>
                      {renderLabel(i.name, i.count)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Price Range */}
        {!hasActivePriceRange && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#price">
                Price Range
              </button>
            </h2>
            <div id="price" className="accordion-collapse collapse">
              <div className="accordion-body">
                <select
                  className="form-select"
                  value={filters.priceRange ? JSON.stringify(filters.priceRange) : ""}
                  onChange={(e) => handleSingleChange("priceRange", e.target.value ? JSON.parse(e.target.value) : null)}
                >
                  <option value="">All prices</option>
                  {priceRanges.map((p, i) => (
                    <option key={i} value={JSON.stringify({ min: p.min, max: p.max })}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Discount */}
        {!hasActiveDiscountRange && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#discount">
                Discount
              </button>
            </h2>
            <div id="discount" className="accordion-collapse collapse">
              <div className="accordion-body">
                <select
                  className="form-select"
                  value={filters.discountRange ? JSON.stringify(filters.discountRange) : ""}
                  onChange={(e) => handleSingleChange("discountRange", e.target.value ? JSON.parse(e.target.value) : null)}
                >
                  <option value="">Any discount</option>
                  {discountRanges.map((d, i) => (
                    <option key={i} value={JSON.stringify({ min: d.min })}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Minimum Rating */}
        {!hasActiveRating && (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rating">
                Minimum Rating
              </button>
            </h2>
            <div id="rating" className="accordion-collapse collapse">
              <div className="accordion-body">
                <select
                  className="form-select"
                  value={filters.minRating || ""}
                  onChange={(e) => handleSingleChange("minRating", e.target.value)}
                >
                  <option value="">Any rating</option>
                  {[4, 3, 2].map((r) => (
                    <option key={r} value={r}>{r}+ Stars</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {onClose && (
        <div className="p-3 border-top d-lg-none">
          <button className="btn btn-dark w-100" onClick={onClose}>
            Show Results
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandFilter;







//=========================================================================Done-Code(End)================================================================================













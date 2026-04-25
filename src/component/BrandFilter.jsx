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

  /* ─── Category logic: hierarchical rendering ──────────────────────────── */
  // Calculate depth for indentation
  const getCategoryDepth = (cat, allCats) => {
    let depth = 0;
    let current = cat;
    while (current && current.parent) {
      const parent = allCats.find(c => c._id === current.parent);
      if (parent) {
        depth++;
        current = parent;
      } else {
        break;
      }
    }
    return depth;
  };

  const showCategoryPills = trendingCategories.length > 0;
  const showCategoryCheckboxes = categories.length > 0;

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
          <div className="mb-5 overflow-y-scroll" style={{ display: "block", flexWrap: "wrap", gap: "6px", maxHeight: "140px" }}>
            {activeChips.map((chip) => (
              <span
                key={`${chip.group}-${chip.value || "s"}`}
                className={`badge rounded-pill px-3 py-2 d-flex align-items-center gap-1 mt-0 ms-0 ${chip.isPill ? "bg-dark text-white" : "bg-secondary text-white"
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
        {(showCategoryPills || showCategoryCheckboxes) && (
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
                {showCategoryCheckboxes && (
                  <div style={{ maxHeight: "350px", overflowY: "auto", padding: "12px 16px" }}>
                    {categories.map((c) => {
                      const depth = getCategoryDepth(c, categories);
                      return (
                        <div 
                          key={c._id || c.slug} 
                          className="form-check mb-2"
                          style={{ marginLeft: `${depth * 15}px` }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`cat-${c._id || c.slug}`}
                            checked={(filters.categoryIds || []).includes(c._id)}
                            onChange={() => {
                              // If it's a drill-down context, we might want to navigate instead
                              if (onCategoryPillClick) {
                                onCategoryPillClick(c);
                              } else {
                                handleMultiChange("categoryIds", c._id);
                              }
                            }}
                          />
                          <label 
                            className="form-check-label" 
                            htmlFor={`cat-${c._id || c.slug}`}
                            style={{ cursor: "pointer", fontWeight: depth === 0 ? "600" : "400" }}
                            onClick={(e) => {
                              if (onCategoryPillClick) {
                                e.preventDefault();
                                onCategoryPillClick(c);
                              }
                            }}
                          >
                            {renderLabel(c.name, c.count)}
                          </label>
                        </div>
                      );
                    })}
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

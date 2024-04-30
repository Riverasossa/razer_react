// En FilterPanel.jsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./filter-panel.scss";

const FilterPanel = ({
  handleSearch,
  handleCategoryFilter,
  handlePriceFilter,
  handleClearFilters,
  setPageNumber,
  categories,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategoriesInternal, setSelectedCategoriesInternal] = useState<
    string[]
  >([]);
  const [selectedPriceRangesInternal, setSelectedPriceRangesInternal] =
    useState<number[]>([]);

  const clearFilters = () => {
    handleClearFilters();
    setSearchValue("");
    setSelectedCategoriesInternal([]);
    setSelectedPriceRangesInternal([]);
    setPageNumber(0);
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-panel__title">FILTER BY</h3>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="formSearch">
          <Form.Label className="filter-panel__label">SEARCH:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Name..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </Form.Group>
        <div className="checkbox-filter-container">
          <Form.Group controlId="formCategoryFilter">
            <Form.Label className="filter-panel__label">CATEGORY:</Form.Label>
            <div className="filter-panel__options">
              {categories &&
                categories.map((category, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={category}
                    value={category}
                    checked={selectedCategoriesInternal.includes(category)}
                    onChange={(e) => {
                      handleCategoryFilter(e.target.value);
                      setSelectedCategoriesInternal(
                        selectedCategoriesInternal.includes(e.target.value)
                          ? selectedCategoriesInternal.filter(
                              (c) => c !== e.target.value
                            )
                          : [...selectedCategoriesInternal, e.target.value]
                      );
                    }}
                  />
                ))}
            </div>
          </Form.Group>
          <Form.Group controlId="formPriceFilter">
            <Form.Label className="filter-panel__label">PRICE:</Form.Label>
            <div className="filter-panel__options">
              {["$0 - $25", "$25 - $50", "$50 - $100", "$100 or Above"].map(
                (priceRange, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={priceRange}
                    value={index} // Usa el índice del rango de precios como valor
                    checked={selectedPriceRangesInternal.includes(index)}
                    onChange={(e) => {
                      handlePriceFilter(parseInt(e.target.value));
                      setSelectedPriceRangesInternal(
                        selectedPriceRangesInternal.includes(
                          parseInt(e.target.value)
                        )
                          ? selectedPriceRangesInternal.filter(
                              (p) => p !== parseInt(e.target.value)
                            )
                          : [
                              ...selectedPriceRangesInternal,
                              parseInt(e.target.value),
                            ]
                      );
                    }}
                  />
                )
              )}
            </div>
          </Form.Group>
        </div>
        <Button
          id="clear-btn"
          variant="primary"
          type="button"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </Form>
    </div>
  );
};

export default FilterPanel;

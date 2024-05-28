import React, { useState, useEffect, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import "./filter-panel.scss";

interface FilterPanelProps {
  handleSearch: (term: string) => void;
  handleCategoryFilter: (category: string) => void;
  handlePriceFilter: (minPrice: number, maxPrice: number) => void;
  handleClearFilters: () => void;
  setPageNumber: (pageNumber: number) => void;
  categories: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  handleSearch,
  handleCategoryFilter,
  handlePriceFilter,
  handleClearFilters,
  setPageNumber,
  categories,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const clearFilters = () => {
    handleClearFilters();
    setSearchValue("");
    setMinPrice("");
    setMaxPrice("");
    setPageNumber(0);
  };

  const handleFilterPrice = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      handlePriceFilter(min, max);
    } else {
      console.error("Invalid price range");
    }
  };

  useEffect(() => {
    handleFilterPrice();
  }, [minPrice, maxPrice]);

  return (
    <div className="filter-panel">
      <h3 className="filter-panel__title">FILTER BY</h3>
      <Form onSubmit={(e: FormEvent) => e.preventDefault()}>
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
                    onChange={() => handleCategoryFilter(category)}
                  />
                ))}
            </div>
          </Form.Group>
          <Form.Group controlId="formPriceFilter">
            <Form.Label className="filter-panel__label">PRICE:</Form.Label>
            <div className="filter-panel__options">
              <Form.Control
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="filter-panel__price-separator">-</span>
              <Form.Control
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
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

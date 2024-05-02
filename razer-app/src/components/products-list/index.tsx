import React, { useState, useEffect } from "react";
import { ProductService } from "../../services/product-service";
import { Product } from "../../models/product";
import ReactPaginate from "react-paginate";
import ProductCard from "../card-list";
import FilterPanel from "../filter-panel";
import "./list.scss";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await ProductService.getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);
        const matchesPriceRange =
          selectedPriceRanges.length === 0 ||
          selectedPriceRanges.some((rangeIndex) =>
            checkPriceRange(product.price, rangeIndex)
          );
        return matchesSearch && matchesCategory && matchesPriceRange;
      });
      setFilteredProducts(filtered);
      setNoProductsFound(filtered.length === 0);
    };

    filterProducts();
  }, [products, searchTerm, selectedCategories, selectedPriceRanges]);

  const pageCount = Math.ceil(filteredProducts.length / 10);
  const pagesVisited = pageNumber * 10;
  const displayProducts = filteredProducts
    .slice(pagesVisited, pagesVisited + 10)
    .map((product, index) => <ProductCard key={index} product={product} />);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPageNumber(0);
  };

  const handleCategoryFilter = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    setPageNumber(0);
  };

  const handlePriceFilter = (priceRangeIndex: number) => {
    const updatedPriceRanges = selectedPriceRanges.includes(priceRangeIndex)
      ? selectedPriceRanges.filter((p) => p !== priceRangeIndex)
      : [...selectedPriceRanges, priceRangeIndex];
    setSelectedPriceRanges(updatedPriceRanges);
    setPageNumber(0);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setPageNumber(0);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const checkPriceRange = (price: string, rangeIndex: number) => {
    const numericPrice = parseFloat(price.replace("$", "").replace(",", ""));
    const priceRanges = [
      { min: 0, max: 25 },
      { min: 25, max: 50 },
      { min: 50, max: 100 },
      { min: 100, max: Infinity },
    ];
    const priceRange = priceRanges[rangeIndex];
    return numericPrice >= priceRange.min && numericPrice < priceRange.max;
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">GAMING PRODUCTS</h1>
        <p className="page-header__description">
          Razer mice, keyboards, headsets, laptops & more
        </p>
      </div>
      <div className="product-list-container">
        <div className="product-list-container__filters-container">
          <FilterPanel
            handleSearch={handleSearch}
            handleCategoryFilter={handleCategoryFilter}
            handlePriceFilter={handlePriceFilter}
            handleClearFilters={handleClearFilters}
            setPageNumber={setPageNumber}
            categories={[
              ...new Set(products.map((product) => product.category)),
            ]}
          />
        </div>
        <div className="product-list-container__card-container">
          {noProductsFound ? <p>No products found.</p> : displayProducts}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        forcePage={pageNumber}
      />
    </>
  );
};

export default ProductListPage;

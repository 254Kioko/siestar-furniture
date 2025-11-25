import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PriceFilter, priceRanges } from "@/components/PriceFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import productsData from "@/data/products.json";

const categories = ["All", "Sofas", "Couches", "Beds", "Dining Sets", "Office Chairs", "Night Stands", "Tables", "Wardrobes"];

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handlePriceRangeToggle = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData.filter((product) => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      
      // Price filter
      let matchesPrice = true;
      if (selectedPriceRanges.length > 0) {
        matchesPrice = selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          if (!range) return false;
          return product.price >= range.min && product.price <= range.max;
        });
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "new") {
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4">
            Our Furniture Collection
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our curated selection of premium furniture pieces for every room in your home.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar and Filter Toggle */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search furniture by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {selectedPriceRanges.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                  {selectedPriceRanges.length}
                </span>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-6 animate-fade-in border-border">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Price Filter */}
                <PriceFilter
                  selectedRanges={selectedPriceRanges}
                  onRangeToggle={handlePriceRangeToggle}
                />
                
                {/* Active Filters Summary */}
                <div className="space-y-4">
                  <h3 className="font-inter font-semibold text-foreground">Active Filters</h3>
                  <div className="space-y-2">
                    {selectedPriceRanges.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedPriceRanges.map((rangeId) => {
                          const range = priceRanges.find((r) => r.id === rangeId);
                          return (
                            <Button
                              key={rangeId}
                              variant="secondary"
                              size="sm"
                              onClick={() => handlePriceRangeToggle(rangeId)}
                              className="font-inter"
                            >
                              {range?.label} ×
                            </Button>
                          );
                        })}
                      </div>
                    )}
                    {(selectedPriceRanges.length > 0 || selectedCategory !== "All") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPriceRanges([]);
                          setSelectedCategory("All");
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Clear all filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="font-inter"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="new">New Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground font-inter">
            Showing {filteredAndSortedProducts.length} of {productsData.length} products
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-inter text-lg text-muted-foreground">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;

import { Link } from "react-router-dom";
import { Sofa } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-playfair font-bold text-xl text-foreground hover:text-primary transition-colors">
          <Sofa className="h-6 w-6 text-primary" />
          <span>Siestar Furnitures</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/shop" className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <Button asChild variant="default" size="sm" className="hidden md:flex">
            <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer">
              Contact Us
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

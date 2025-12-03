import { useState } from "react";
import { Link } from "react-router-dom";
import { Sofa, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/config/whatsapp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-playfair font-bold text-xl text-foreground hover:text-primary transition-colors">
          <Sofa className="h-6 w-6 text-primary" />
          <span>Siestar Furnitures</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/shop" className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <Button asChild variant="default" size="sm">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              Contact Us
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={closeMenu}
              className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              onClick={closeMenu}
              className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Shop
            </Link>
            <Button asChild variant="default" size="sm" className="w-full">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

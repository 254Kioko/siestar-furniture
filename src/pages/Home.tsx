import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sofa, Award, Truck } from "lucide-react";
import heroImage from "@/assets/hero-furniture.jpg";
import { getWhatsAppLink } from "@/config/whatsapp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-hero-start to-hero-end">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <Badge className="bg-primary/10 text-primary border-primary/20 font-inter">
                  Premium Furniture in Nairobi
                </Badge>
              </div>
              
              <h1 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                Transform Your Space with
                <span className="text-primary"> Elegant Furniture</span>
              </h1>
              
              <p className="font-inter text-lg text-muted-foreground leading-relaxed max-w-xl">
                Discover premium quality furniture that combines modern design with exceptional craftsmanship. From living rooms to bedrooms, we bring comfort and style to your home.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="group">
                  <Link to="/shop" className="flex items-center gap-2">
                    Browse Collection
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline">
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    Contact on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Luxury furniture showcase"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sofa className="h-8 w-8" />}
              title="Premium Quality"
              description="Handpicked furniture made from the finest materials for lasting durability and comfort."
            />
            <FeatureCard 
              icon={<Award className="h-8 w-8" />}
              title="Modern Designs"
              description="Contemporary styles that blend seamlessly with any interior aesthetic."
            />
            <FeatureCard 
              icon={<Truck className="h-8 w-8" />}
              title="Delivery Available"
              description="Fast and reliable delivery service across Nairobi and surrounding areas."
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4">
              Featured Collections
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our handpicked selection of premium furniture pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild size="lg" variant="outline">
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4">
              Why Choose Siestar Furnitures?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard 
              number="01"
              title="Quality Craftsmanship"
              description="Every piece is carefully selected for durability and style."
            />
            <BenefitCard 
              number="02"
              title="Affordable Prices"
              description="Premium furniture at competitive prices for every budget."
            />
            <BenefitCard 
              number="03"
              title="Fast Delivery"
              description="Quick and reliable delivery across Nairobi and beyond."
            />
            <BenefitCard 
              number="04"
              title="Expert Support"
              description="Our team is ready to help you find the perfect furniture."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="font-inter text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get in touch with us today and let's bring your interior design vision to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/shop">Browse Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-inter border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                Contact Us Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="text-center p-6 rounded-xl hover:bg-secondary transition-colors duration-300">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-playfair font-semibold text-xl text-foreground mb-2">
        {title}
      </h3>
      <p className="font-inter text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${className}`}>
      {children}
    </span>
  );
};

interface BenefitCardProps {
  number: string;
  title: string;
  description: string;
}

const BenefitCard = ({ number, title, description }: BenefitCardProps) => {
  return (
    <div className="text-center p-6 rounded-xl bg-background hover:shadow-lg transition-all duration-300">
      <div className="font-playfair text-5xl font-bold text-primary/20 mb-3">
        {number}
      </div>
      <h3 className="font-playfair font-semibold text-xl text-foreground mb-2">
        {title}
      </h3>
      <p className="font-inter text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default Home;

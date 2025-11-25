import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sofa, Award, Truck } from "lucide-react";
import heroImage from "@/assets/hero-furniture.jpg";
import { getWhatsAppLink } from "@/config/whatsapp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-6">
            Ready to Upgrade Your Space?
          </h2>
          <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our full collection of premium furniture and find the perfect pieces for your home.
          </p>
          <Button asChild size="lg" className="group">
            <Link to="/shop" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
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

export default Home;

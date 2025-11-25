import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getWhatsAppLink } from "@/config/whatsapp";
import { MessageCircle } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
}

const ProductCard = ({ name, category, price, image, isNew }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {isNew && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            New
          </Badge>
        )}
      </div>
      
      <div className="p-5 space-y-3">
        <div>
          <p className="text-xs font-inter text-muted-foreground uppercase tracking-wide">
            {category}
          </p>
          <h3 className="font-playfair font-semibold text-lg text-foreground mt-1">
            {name}
          </h3>
        </div>
        
        <p className="font-inter font-bold text-xl text-primary">
          KSh {price.toLocaleString()}
        </p>
        
        <Button 
          asChild 
          className="w-full"
          size="lg"
        >
          <a 
            href={getWhatsAppLink(name)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Contact to Order
          </a>
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;

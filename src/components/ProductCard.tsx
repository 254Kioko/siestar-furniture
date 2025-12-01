import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ id, name, price, image, category }) => {
  // WhatsApp Number
  const phone = "254742048000"; // change to your number

  // Message sent to WhatsApp with product image
  const imageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
  const message = `Hello, I would like to order this product:
  
🛋 *${name}*
💵 Price: KES ${price.toLocaleString()}
📂 Category: ${category}

🖼 Product Image:
${imageUrl}

I'm interested in purchasing this item. Please let me know about availability and delivery options.

Thank you!`;

  // WhatsApp URL using configured number
  const whatsappLink = `https://wa.me/254728260288?text=${encodeURIComponent(message)}`;

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-4 space-y-3">

        {/* Product image */}
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h3 className="font-semibold text-lg">{name}</h3>

        {/* Price */}
        <p className="text-primary text-xl font-bold">
          KES {price.toLocaleString()}
        </p>

        {/* WhatsApp Order Button */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={() => window.open(whatsappLink, "_blank")}
        >
          Order on WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

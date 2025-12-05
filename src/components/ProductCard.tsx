import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ id, name, price, image, category }) => {
  // WhatsApp Number
  const phone = "254742048000"; // change to your number

  // Message sent to WhatsApp with product image
  const imageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
  const priceText = price ? `KES ${price.toLocaleString()}` : "Contact for price";
  const message = `Hello, I would like to order this product:
   
🛋 *${name}*
💵 Price: ${priceText}
📂 Category: ${category}

🖼 Product Image:
${imageUrl}

I'm interested in purchasing this item. Please let me know about availability and delivery options.

Thank you!`;

  // WhatsApp URL - use app protocol on mobile, web on desktop
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const whatsappLink = isMobile 
    ? `whatsapp://send?phone=254728260288&text=${encodeURIComponent(message)}`
    : `https://wa.me/254728260288?text=${encodeURIComponent(message)}`;

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
          {price ? `KES ${price.toLocaleString()}` : "Contact for price"}
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

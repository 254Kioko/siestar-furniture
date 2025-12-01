// WhatsApp configuration
export const WHATSAPP_NUMBER = "254728260288"; // Replace with actual Siestar Furnitures WhatsApp number
export const BUSINESS_NAME = "Siestar Furnitures";
export const BUSINESS_LOCATION = "Nairobi, Kenya";
export const FACEBOOK_PAGE = "https://www.facebook.com/siestherfurniture/";

export const getWhatsAppLink = (productName?: string) => {
  const message = productName 
    ? `Hello! I'm interested in the ${productName} from ${BUSINESS_NAME}.`
    : `Hello! I'd like to inquire about your furniture collection.`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

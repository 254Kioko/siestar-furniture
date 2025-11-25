import { Facebook, Phone, MapPin } from "lucide-react";
import { BUSINESS_NAME, BUSINESS_LOCATION, FACEBOOK_PAGE, getWhatsAppLink } from "@/config/whatsapp";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair font-bold text-xl mb-4 text-foreground">{BUSINESS_NAME}</h3>
            <p className="text-muted-foreground font-inter text-sm leading-relaxed">
              Your trusted partner for premium furniture in Kenya. Quality craftsmanship, modern designs, and exceptional service.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-inter text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>WhatsApp: +254 712 345 678</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground font-inter text-sm">
                <MapPin className="h-4 w-4" />
                <span>{BUSINESS_LOCATION}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-4">Follow Us</h4>
            <a 
              href={FACEBOOK_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-inter text-sm"
            >
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground font-inter text-sm">
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

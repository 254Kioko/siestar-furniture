import { useState } from "react";
import { Upload, X, MessageCircle, Palette, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { WHATSAPP_NUMBER, BUSINESS_NAME } from "@/config/whatsapp";

interface FormData {
  name: string;
  phone: string;
  description: string;
}

const CustomOrder = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalImages = images.length + newFiles.length;

    if (totalImages > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = newFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image.`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setImages((prev) => [...prev, ...validFiles]);

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Description required",
        description: "Please describe the furniture you want.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleWhatsAppSubmit = () => {
    if (!validateForm()) return;

    const imageNote =
      images.length > 0
        ? `\n\n📷 I have ${images.length} reference image(s) to share with you.`
        : "";

    const message = `🛋️ *Custom Furniture Order Request*

*Name:* ${formData.name.trim()}
*Phone:* ${formData.phone.trim()}

*Furniture Description:*
${formData.description.trim()}${imageNote}

---
Sent from ${BUSINESS_NAME} website`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setShowSuccess(true);
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md mx-auto animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-4">
              Opening WhatsApp...
            </h2>
            <p className="text-muted-foreground mb-6">
              Your custom order details are ready! Please send the message and attach your reference images directly in WhatsApp.
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={handleWhatsAppSubmit} className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Open WhatsApp Again
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSuccess(false)}
                className="w-full"
              >
                Go Back to Form
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-secondary to-background overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-40 h-40 border-2 border-foreground rounded-full" />
            <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-foreground rounded-full" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">Custom Crafted for You</span>
              </div>
              
              <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Bring Your Dream Furniture to Life
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Can't find exactly what you're looking for? We'll craft it for you! 
                Share your vision, and our skilled artisans will create bespoke 
                furniture tailored to your space and style.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
                  Tell Us What You Need
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Fill out the form below and we'll get back to you via WhatsApp
                </p>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g., +254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>

                  {/* Description Field */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground font-medium">
                      Describe Your Furniture *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about the furniture you want... Include details like size, material preferences, colors, and any special features."
                      value={formData.description}
                      onChange={handleInputChange}
                      className="min-h-[140px] resize-none"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label className="text-foreground font-medium">
                      Reference Images (Optional)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Upload up to 5 images for reference. You'll attach these directly in WhatsApp.
                    </p>
                    
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="images"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                          <Upload className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Click to upload images
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG up to 10MB each
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                        {imagePreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                          >
                            <img
                              src={preview}
                              alt={`Reference ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {images.length > 0 && (
                      <p className="text-sm text-muted-foreground text-center">
                        {images.length} of 5 images selected
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleWhatsAppSubmit}
                    size="lg"
                    className="w-full h-14 text-lg font-semibold mt-4"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send Your Idea on WhatsApp
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your images won't be sent from the website. You'll attach them 
                    directly in WhatsApp for the best quality.
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🪑</span>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Custom Designs</h3>
                  <p className="text-sm text-muted-foreground">
                    Made exactly to your specifications
                  </p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Quality Craftsmanship</h3>
                  <p className="text-sm text-muted-foreground">
                    Built by skilled local artisans
                  </p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Direct Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with us throughout the process
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default CustomOrder;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Upload, Download, Copy, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew: boolean;
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);

  const parseCSV = (text: string): Product[] => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const nameIdx = headers.findIndex((h) => h.includes("name") || h.includes("product"));
    const categoryIdx = headers.findIndex((h) => h.includes("category") || h.includes("type"));
    const priceIdx = headers.findIndex((h) => h.includes("price"));
    const imageIdx = headers.findIndex((h) => h.includes("image") || h.includes("url") || h.includes("photo"));
    const newIdx = headers.findIndex((h) => h.includes("new") || h.includes("arrival"));

    return lines.slice(1).map((line, index) => {
      // Handle CSV with quoted fields
      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const priceStr = values[priceIdx] || "0";
      const price = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
      
      const isNewStr = (values[newIdx] || "").toLowerCase();
      const isNew = isNewStr === "yes" || isNewStr === "true" || isNewStr === "1";

      return {
        id: index + 1,
        name: values[nameIdx] || `Product ${index + 1}`,
        category: values[categoryIdx] || "Uncategorized",
        price,
        image: values[imageIdx] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        isNew,
      };
    }).filter((p) => p.name && p.name !== `Product ${p.id}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setProducts(parsed);
      toast({
        title: "CSV Imported",
        description: `Successfully parsed ${parsed.length} products`,
      });
    };
    reader.readAsText(file);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = event.clipboardData.getData("text");
    const parsed = parseCSV(text);
    if (parsed.length > 0) {
      setProducts(parsed);
      toast({
        title: "Data Imported",
        description: `Successfully parsed ${parsed.length} products`,
      });
    }
  };

  const getJSON = () => JSON.stringify(products, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getJSON());
    setCopied(true);
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard. Paste it into src/data/products.json",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const blob = new Blob([getJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTemplate = () => {
    const template = `Product Name,Category,Price,Image,Is New
Modern Linen Sofa,Sofas,45000,/products/sofa-1.jpg,Yes
L-Shape Sectional,Couches,68000,/products/couch-1.jpg,No
King Size Bed,Beds,55000,/products/bed-1.jpg,No`;
    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">Bulk import products from CSV</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import Products
              </CardTitle>
              <CardDescription>
                Upload a CSV file or paste spreadsheet data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="csv-file">Upload CSV File</Label>
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or paste data</span>
                </div>
              </div>

              <div>
                <Label htmlFor="paste-area">Paste from Spreadsheet</Label>
                <textarea
                  id="paste-area"
                  className="mt-1 w-full h-32 p-3 border rounded-md bg-background text-foreground resize-none"
                  placeholder="Paste CSV data here..."
                  onPaste={handlePaste}
                />
              </div>

              <Button variant="outline" onClick={downloadTemplate} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download CSV Template
              </Button>
            </CardContent>
          </Card>

          {/* Expected Format */}
          <Card>
            <CardHeader>
              <CardTitle>Expected CSV Format</CardTitle>
              <CardDescription>Use short local paths for images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                <p className="font-semibold text-foreground">Required columns:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• <span className="text-foreground">Product Name</span> - Name of the product</li>
                  <li>• <span className="text-foreground">Category</span> - Sofas, Beds, Tables, etc.</li>
                  <li>• <span className="text-foreground">Price</span> - Number only (e.g., 45000)</li>
                  <li>• <span className="text-foreground">Image</span> - Short path like <code className="bg-background px-1 rounded">/products/sofa-1.jpg</code></li>
                  <li>• <span className="text-foreground">Is New</span> - Yes/No for new arrivals</li>
                </ul>
              </div>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-md text-sm">
                <p className="font-semibold text-foreground mb-2">📁 How to add images:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Save images from Facebook to your computer</li>
                  <li>Rename them simply: <code className="bg-background px-1 rounded">sofa-1.jpg</code>, <code className="bg-background px-1 rounded">bed-2.jpg</code></li>
                  <li>Share them with me and I'll add them to the site</li>
                  <li>Use paths like <code className="bg-background px-1 rounded">/products/sofa-1.jpg</code> in your CSV</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Table */}
        {products.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Preview ({products.length} products)</CardTitle>
                <CardDescription>Review before exporting</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={copyToClipboard}>
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied!" : "Copy JSON"}
                </Button>
                <Button onClick={downloadJSON}>
                  <Download className="mr-2 h-4 w-4" />
                  Download JSON
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>New</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>KES {product.price.toLocaleString()}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          <a 
                            href={product.image} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View Image
                          </a>
                        </TableCell>
                        <TableCell>{product.isNew ? "Yes" : "No"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;

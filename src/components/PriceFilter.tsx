import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

const priceRanges: PriceRange[] = [
  { id: "0-20000", label: "Under KSh 20,000", min: 0, max: 20000 },
  { id: "20000-40000", label: "KSh 20,000 - 40,000", min: 20000, max: 40000 },
  { id: "40000-60000", label: "KSh 40,000 - 60,000", min: 40000, max: 60000 },
  { id: "60000-80000", label: "KSh 60,000 - 80,000", min: 60000, max: 80000 },
  { id: "80000+", label: "Over KSh 80,000", min: 80000, max: Infinity },
];

interface PriceFilterProps {
  selectedRanges: string[];
  onRangeToggle: (rangeId: string) => void;
}

const PriceFilter = ({ selectedRanges, onRangeToggle }: PriceFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-inter font-semibold text-foreground">Price Range</h3>
      <div className="space-y-3">
        {priceRanges.map((range) => (
          <div key={range.id} className="flex items-center space-x-2">
            <Checkbox
              id={range.id}
              checked={selectedRanges.includes(range.id)}
              onCheckedChange={() => onRangeToggle(range.id)}
            />
            <Label
              htmlFor={range.id}
              className="text-sm font-inter text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              {range.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PriceFilter, priceRanges };
export type { PriceRange };

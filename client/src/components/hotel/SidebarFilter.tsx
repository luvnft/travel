import { Button } from "@/components/ui/button";
import { Star, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function SidebarFilter() {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button className="rounded-full" size="icon" variant="ghost">
          <ChevronUp className="w-5 h-5 transition-transform duration-300 group-[.collapsed]:rotate-180" />
          <span className="sr-only">Toggle filters</span>
        </Button>
      </div>
      <div className="p-4 space-y-6 group-[.collapsed]:hidden">
        <div>
          <h4 className="text-sm font-semibold mb-2">Price Range</h4>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>$50</span>
            <span>$500</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Rating</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox defaultChecked id="rating-5" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
              </div>
              <span className="text-sm">5 stars</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="rating-4" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-sm">4 stars</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="rating-3" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-sm">3 stars</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="rating-2" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-sm">2 stars</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="rating-1" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <Star className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-sm">1 star</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Amenities</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox defaultChecked id="amenity-wifi" />
              <span className="text-sm">Wifi</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="amenity-pool" />
              <span className="text-sm">Pool</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="amenity-gym" />
              <span className="text-sm">Gym</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="amenity-parking" />
              <span className="text-sm">Parking</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="amenity-spa" />
              <span className="text-sm">Spa</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="amenity-restaurant" />
              <span className="text-sm">Restaurant</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Location</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="location-city" />
              <span className="text-sm">City</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="location-beach" />
              <span className="text-sm">Beach</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="location-mountain" />
              <span className="text-sm">Mountain</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="location-rural" />
              <span className="text-sm">Rural</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Hotel Type</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="type-hotel" />
              <span className="text-sm">Hotel</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="type-resort" />
              <span className="text-sm">Resort</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="type-boutique" />
              <span className="text-sm">Boutique</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="type-motel" />
              <span className="text-sm">Motel</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="sm" variant="outline">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}


import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

interface ListingCardProps {
    title: string;
    pricePerNight: number;
    description: string;
    imageUrl: string;
  }
  
  export default function ListingCard({ title, pricePerNight, description, imageUrl }: ListingCardProps) {
    return (
      <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800 my-2">
        <img
          alt="Hotel Image"
          className="aspect-video rounded-lg object-cover"
          height={120}
          src={imageUrl}
          width={160}
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">${pricePerNight} / night</p>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
            >
              <Trash className="h-5 w-5" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    )
  }
  

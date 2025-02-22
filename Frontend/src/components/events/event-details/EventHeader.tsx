import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";
interface EventHeaderProps {
  onBack: () => void;
  imageUrl: string;
  title: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({
  onBack,
  imageUrl,
  title,
}) => (
  <>
    <Button
      variant="ghost"
      className="group mb-8 flex items-center text-slate-500"
      onClick={onBack}
    >
      <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
      Back to Events
    </Button>
    <div className="aspect-video">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  </>
);

export default EventHeader;

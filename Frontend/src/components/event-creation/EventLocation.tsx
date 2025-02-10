import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface EventLocationProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const EventLocation: React.FC<EventLocationProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="location">Venue location</Label>
        <div className="flex gap-2">
          <Input
            id="location"
            placeholder="Search for a venue or address"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
          />
          <Button variant="outline" size="icon">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </div>

    
    </div>
  );
};

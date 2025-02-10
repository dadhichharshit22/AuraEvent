import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


interface EventFormData {
  date: string;
}

interface EventDateTimeProps {
  formData: EventFormData;
  updateFormData: (field: string, value: any) => void;
}

export const EventDateTime: React.FC<EventDateTimeProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <Label htmlFor="date">Event date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData("date", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

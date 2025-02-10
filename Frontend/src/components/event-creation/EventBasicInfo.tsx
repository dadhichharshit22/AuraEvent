import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventBasicInfoProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const EventBasicInfo: React.FC<EventBasicInfoProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Event title</Label>
        <Input
          id="title"
          placeholder="Be clear and descriptive"
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Tell people what your event is about"
          className="min-h-[150px]"
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Event type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => updateFormData("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            placeholder="Number of attendees"
            value={formData.capacity}
            onChange={(e) => updateFormData("capacity", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="e.g., Music, Art, Technology (comma-separated)"
            value={formData.category}
            onChange={(e) => updateFormData("category", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Price of Registered Event"
            value={formData.price}
            onChange={(e) => updateFormData("price", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

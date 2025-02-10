import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface EventImageProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const EventImage: React.FC<EventImageProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Event image</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          {formData.image ? (
            <div className="space-y-4">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Event preview"
                className="mx-auto max-h-[300px] rounded-lg object-cover"
              />
              <Button
                variant="outline"
                onClick={() => updateFormData("image", "")}
              >
                Remove image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Drag and drop an image here, or click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 2160x1080px
                </p>
              </div>
              <Input
                type="text"
                placeholder="Or enter image URL"
                value={formData.image}
                onChange={(e) => updateFormData("image", e.target.value)}
                className="max-w-sm mx-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

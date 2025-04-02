import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface EventImageProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const EventImage: React.FC<EventImageProps> = ({
  formData,
  updateFormData,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      updateFormData("image", URL.createObjectURL(file)); // Store image preview URL
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Event image</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
          <label htmlFor="file-upload" className="space-y-4 block">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-500" />
            </div>
            <p className="text-sm text-gray-600">
              Drag and drop an image here, or click to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Recommended size: 2160x1080px
            </p>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Show file preview */}
        {selectedFile && (
          <p className="text-sm text-green-600 mt-2">Selected: {selectedFile.name}</p>
        )}

        <Input
          type="text"
          placeholder="Or enter image URL"
          value={formData.image}
          onChange={(e) => updateFormData("image", e.target.value)}
          className="max-w-sm mx-auto mt-2"
        />
      </div>
    </div>
  );
};

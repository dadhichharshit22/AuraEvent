import React, { useState, ChangeEvent, FormEvent } from "react";
import { Search, MapPin, Tag, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface SearchParams {
  location: string;
  tags: string;
  month: string;
}

interface EventSearchProps {
  onSearch: (params: SearchParams) => void;
}

const initialSearchParams: SearchParams = {
  location: "",
  tags: "",
  month: "",
};

const EventSearch: React.FC<EventSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleInputChange = (field: keyof SearchParams, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value.trim(),
    }));
  };

  const handleReset = () => {
    setSearchParams(initialSearchParams);
    onSearch(initialSearchParams);
  };

  // Enhanced input styles for more polish
  const inputClassName =
    "flex h-9 w-full text-black rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

  const iconClassName =
    "h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2";

  return (
    <form
      onSubmit={handleSearch}
      className="min-w-48 bg-white rounded-md shadow-sm p-2"
    >
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
        <div className="">
          <input
            type="text"
            placeholder="Search by location..."
            className={inputClassName}
            value={searchParams.location}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("location", e.target.value)
            }
            aria-label="Location search"
          />
          <MapPin className={iconClassName} />
        </div>

        {/* Tags Input */}
        <div className="">
          <input
            type="text"
            placeholder="Search by tags..."
            className={inputClassName}
            value={searchParams.tags}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("tags", e.target.value)
            }
            aria-label="Tags search"
          />
          <Tag className={iconClassName} />
        </div>

        {/* Buttons */}
        <Button type="button" onClick={handleReset}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default EventSearch;

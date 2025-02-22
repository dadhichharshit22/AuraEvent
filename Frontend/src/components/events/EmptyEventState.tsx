import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
interface EmptyEventStateProps {
  onBack: () => void;
}

export const EmptyEventState: React.FC<EmptyEventStateProps> = ({ onBack }) => (
  <Card className="text-center p-8">
    <CardHeader>
      <div className="mx-auto bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
        <Calendar className="w-8 h-8 text-gray-400" />
      </div>
      <CardTitle className="mt-4">No registered events found</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">
        You haven't registered for any events yet.
      </p>
    </CardContent>
    <CardFooter className="justify-center">
      <Button onClick={onBack}>Go Back</Button>
    </CardFooter>
  </Card>
);

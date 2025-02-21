import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Clock, Users, Car } from "lucide-react";

interface EventDetailsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  formData,
  updateFormData,
}) => {
  const addFAQ = () => {
    const newFaqs = [...(formData.faqs || []), { question: "", answer: "" }];
    updateFormData("faqs", newFaqs);
  };

  const updateFAQ = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newFaqs = [...(formData.faqs || [])];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    updateFormData("faqs", newFaqs);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Highlights</h3>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Add age info"
              value={formData.highlights?.ageInfo || ""}
              onChange={(e) =>
                updateFormData("highlights", {
                  ...formData.highlights,
                  ageInfo: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Add door time"
              value={formData.highlights?.doorTime || ""}
              onChange={(e) =>
                updateFormData("highlights", {
                  ...formData.highlights,
                  doorTime: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Add parking info"
              value={formData.highlights?.parkingInfo || ""}
              onChange={(e) =>
                updateFormData("highlights", {
                  ...formData.highlights,
                  parkingInfo: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">FAQ</h3>
          <Button variant="outline" size="sm" onClick={addFAQ}>
            <Plus className="h-4 w-4 mr-2" />
            Add question
          </Button>
        </div>
        <div className="space-y-4">
          {formData.faqs?.map((faq: any, index: number) => (
            <div key={index} className="space-y-2">
              <Input
                placeholder="Question"
                value={faq.question}
                onChange={(e) => updateFAQ(index, "question", e.target.value)}
              />
              <Textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => updateFAQ(index, "answer", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

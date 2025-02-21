import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from 'react';

interface EventModalProps {
  type: "success" | "unregister";
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export function EventModal({
  type,
  isOpen,
  onClose,
  onConfirm,
}: EventModalProps) {
  const content = {
    success: {
      icon: <Check className="w-8 h-8 text-green-500" />,
      iconBg: "bg-green-100",
      title: "Registration Successful!",
      description: "You're all set! We've saved your spot for the event.",
      action: "Got it, thanks!",
    },
    unregister: {
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      iconBg: "bg-red-100",
      title: "Confirm Unregistration",
      description: "Are you sure you want to unregister from this event?",
      action: "Yes, Unregister",
    },
  };

  const modalContent = content[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center p-6">
          <div className={`p-3 rounded-full mb-6 ${modalContent.iconBg}`}>
            {modalContent.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            {modalContent.title}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {modalContent.description}
          </p>
          {type === "unregister" ? (
            <div className="flex gap-4 w-full">
              <Button
                variant="destructive"
                onClick={onConfirm}
                className="flex-1"
              >
                {modalContent.action}
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={onClose} className="w-full">
              {modalContent.action}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

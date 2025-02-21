import React from "react";
import type { TimeLeft } from "../../../types/Event";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  timeLeft: TimeLeft;
}

export function CountdownTimer({ timeLeft }: CountdownTimerProps) {
  const timeBlocks = [
    { label: "days", value: timeLeft.days },
    { label: "hours", value: timeLeft.hours },
    { label: "minutes", value: timeLeft.minutes },
    { label: "seconds", value: timeLeft.seconds },
  ];

  return (
    <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-white mr-2" />
            <span className="font-medium text-white text-lg">
              Event starts in:
            </span>
          </div>
          <div className="flex space-x-4">
            {timeBlocks.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-2 backdrop-blur-sm">
                  <span className="block text-3xl font-bold text-white">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs text-purple-100 mt-1 block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

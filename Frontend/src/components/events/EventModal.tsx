import React from "react";

type EventModalProps = {
  type: "success" | "unregister";
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

export const EventModal: React.FC<EventModalProps> = ({
  type,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">
          {type === "success" ? "Success!" : "Are you sure?"}
        </h2>
        <p className="mt-2">
          {type === "success"
            ? "You have successfully registered!"
            : "Do you want to unregister?"}
        </p>
        <div className="flex justify-end gap-4 mt-4">
          {type === "unregister" && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Yes, Unregister
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

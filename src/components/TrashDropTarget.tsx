/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDrop } from "react-dnd";
import { MdDeleteOutline } from "react-icons/md";

interface TrashProps {
  onDelete: (id: number) => void;
}

export default function Trash({ onDelete }: TrashProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "POST_CARD",
    drop: (item: { id: number }) => {
      onDelete(item.id);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className={`fixed bottom-10 right-10 p-4 rounded-full transition-all duration-300 ${
        isOver ? "bg-red-500 scale-110" : "bg-gray-200"
      } z-50`}
    >
      <MdDeleteOutline
        className={`text-3xl ${isOver ? "text-white" : "text-gray-700"}`}
      />
    </div>
  );
}

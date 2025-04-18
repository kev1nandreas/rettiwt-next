"use client";

import ButtonPost from "@/components/ButtonPost";
import SuggestionCard from "@/components/Card/SuggestionCard";

export default function RightSidebar() {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-[25%] p-3 lg:flex flex-col gap-5 top-0 hidden">
      <ButtonPost />

      <div className="flex flex-col gap-2 bg-white rounded-lg p-3">
        <h4 className="font-bold w-full border-b-[1px] pb-2 px-3 border-slate-300">Friend Suggestion</h4>
        <div>
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
        </div>
      </div>
    </div>
  );
}

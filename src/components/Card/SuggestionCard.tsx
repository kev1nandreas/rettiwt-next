import Image from "next/image";

export default function SuggestionCard() {
  return (
    <div className="flex w-full rounded-lg align-center px-2 py-1">
      <Image
        src={"/female-ava.png"}
        alt={"avatar"}
        draggable={false}
        width={100}
        height={100}
        className="w-[2.5rem] h-[2.5rem] rounded-full m-2 pointer-events-none select-none"
      />
      <div className="flex justify-center flex-col">
        <p className="font-semibold">Kevin Andreas</p>
        <p className="text-sm opacity-50">@kev1nandreas</p>
      </div>
    </div>
  );
}

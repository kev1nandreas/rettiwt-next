'use client';

import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center h-[3.5rem] border-b-[1px] border-slate-300 bg-white">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => window.location.replace("/")}
      >
        <Image
          src={"/Logo.png"}
          alt={"logo"}
          width={100}
          height={100}
          className="w-[2rem] h-[2rem] rounded-full m-2 pointer-events-none select-none"
        />
        <h3 className="text-lg font-bold mt-1">Rettiwt</h3>
      </div>
    </header>
  );
}

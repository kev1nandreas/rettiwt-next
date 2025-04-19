import { usePathname } from "next/navigation";

interface MenuSidebarProps {
  menu: string;
  icon?: React.ComponentType<{ className?: string }>;
  location: string;
}

export default function MenuSidebar({
  menu,
  icon: Icon,
  location,
}: MenuSidebarProps) {
  const pathname = usePathname();
  const isActive = pathname === location;

  return (
    <div
      className={`flex gap-3 p-3 md:px-5 hover:text-blue-400 cursor-pointer select-none duration-300 transition-all ease-in-out rounded-lg md:hover:bg-slate-100 items-center justify-center md:justify-start ${
        isActive ? "bg-slate-100 text-blue-400" : ""
      }`}
      onClick={() => window.location.replace(location)}
    >
      {Icon && <Icon className="text-[1.5rem]" />}
      <p className="font-medium md:block hidden">{menu}</p>
    </div>
  );
}

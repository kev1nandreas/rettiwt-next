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
  return (
    <div
      className="flex gap-3 p-3 md:px-5 hover:text-blue-400 cursor-pointer select-none duration-200 transition-all ease-in-out"
      onClick={() => window.location.replace(location)}
    >
      {Icon && <Icon className="text-[1.5rem]" />}
      <p className="font-medium md:block hidden">{menu}</p>
    </div>
  );
}

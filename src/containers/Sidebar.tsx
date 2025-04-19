"use client";

import React from "react";
import { useFetchProfileInfo } from "@/app/(main)/api/useProfile";
import MenuSidebar from "@/components/MenuSidebar";
import { ENV } from "@/configs/environment";
import { useSetPicture, useSetUsername } from "@/lib/utils";
import { typecastProfileResponse } from "@/types/response";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart, FaUserFriends } from "react-icons/fa";
import { MdOutlineRssFeed, MdEvent, MdOutlineSettings } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { removeCookies } from "@/modules/cookies";

export default function Sidebar() {
  const { data } = useFetchProfileInfo();
  const profile = typecastProfileResponse(data?.data);
  const setUsername = useSetUsername();
  const setPicture = useSetPicture();
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setPicture(profile.image_url || "");
    }
  }, [profile, setUsername, setPicture, data]);

  const handleLogout = () => {
    removeCookies(ENV.TOKEN_KEY);
    router.push("/login");
  };

  const menuItems = [
    { menu: "Feed", icon: MdOutlineRssFeed, redirect: "/" },
    { menu: "Friends", icon: FaUserFriends, redirect: "/i/friends" },
    { menu: "Events", icon: MdEvent, redirect: "/i/events" },
    { menu: "Liked", icon: FaRegHeart, redirect: "/i/liked" },
    { menu: "Settings", icon: MdOutlineSettings, redirect: "/i/settings" },
    { menu: "Profile", icon: CgProfile, redirect: `/${profile?.username}` },
  ];

  return (
    <div className="flex flex-col items-center justify-between w-[20%] gap-2 bg-white p-3 h-[calc(100vh-3.5rem)]">
      <div className="w-full flex flex-col gap-2">
        {/* Profile */}
        <div
          className="flex w-full md:bg-gray-50 rounded-lg align-center md:border-[1px] border-slate-300 px-2 cursor-pointer"
          onClick={() => {
            router.push(`/${profile?.username}`);
          }}
        >
          {profile?.image_url ? (
            <Image
              src={ENV.URI.BASE_IMAGE_URL + profile?.image_url}
              alt={profile?.image_url || ""}
              width={100}
              height={100}
              draggable={false}
              className="w-[2.5rem] h-[2.5rem] rounded-full md:m-2 pointer-events-none select-none"
            />
          ) : (
            <Image
              src={"/female-ava.png"}
              alt={"avatar"}
              width={100}
              height={100}
              draggable={false}
              className="w-[2.5rem] h-[2.5rem] rounded-full md:m-2 pointer-events-none select-none"
            />
          )}
          <div className="md:flex justify-center flex-col hidden">
            <p className="font-semibold text-sm">
              {profile?.name && profile.name.length > 20
                ? `${profile.name.slice(0, 20)}...`
                : profile?.name}
            </p>
            <p className="text-xs opacity-50">{"@" + profile?.username}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col w-full gap-1 pt-2">
          {menuItems.map((item, index) => (
            <MenuSidebar
              key={index}
              menu={item.menu}
              icon={item.icon}
              location={item.redirect}
            />
          ))}
        </div>
      </div>

      {/* Log Out */}
      <div
        className="flex gap-3 w-full p-3 md:px-5 border-2 font-semibold text-red-500 border-red-500 hover:text-blue-400 md:hover:text-white cursor-pointer select-none duration-300 transition-all ease-in-out rounded-lg md:hover:bg-red-500 items-center justify-center md:justify-start"
        onClick={() => {handleLogout()}}
      >
        {<IoIosLogOut className="text-[1.5rem]" />}
        <p className="font-medium md:block hidden">Log Out</p>
      </div>
    </div>
  );
}

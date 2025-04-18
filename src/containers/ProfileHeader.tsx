"use client";

import { useFetchProfileByUsername } from "@/app/(main)/api/useProfile";
import { typecastProfileResponse } from "@/types/response";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ENV } from "@/configs/environment";
import { MdOutlineSettings } from "react-icons/md";
import { useGetUsername } from "@/lib/utils";
import { useState } from "react";
import FormUpdateProfile from "@/components/Form/FormUpdateProfile";

export default function ProfileHeader() {
  const { username } = useParams();
  const savedUsername = useGetUsername();
  const { data } = useFetchProfileByUsername(username as string);
  const profile = typecastProfileResponse(data?.data);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <div className="relative p-[3rem] px-[4rem] flex gap-10 w-full h-fit max-h-fit flex-1 border-[1px] border-slate-300 rounded-xl items-center bg-gradient-to-b from-slate-50 to-slate-200">
      <div className="flex items-center justify-center w-32 h-32 rounded-full">
        {profile?.image_url ? (
          <Image
            src={
              profile?.image_url
                ? ENV.URI.BASE_IMAGE_URL + profile.image_url
                : "/default-profile.png"
            }
            alt={profile?.image_url || ""}
            width={200}
            height={200}
            draggable={false}
            className="rounded-full object-cover w-full h-full pointer-events-none select-none"
          />
        ) : (
          <Image
            src="/female-ava.png"
            alt="Default Profile"
            width={200}
            height={200}
            draggable={false}
            className="rounded-full object-cover w-full h-full pointer-events-none select-none"
          />
        )}
      </div>
      <div className="flex flex-col justify-center h-fit gap-2">
        <p className="text-lg opacity-50 font-medium">{profile?.username}</p>
        <h1 className="text-2xl font-semibold">{profile?.name}</h1>
        <p className="text-lg">
          {profile?.bio && profile.bio.length > 70
            ? profile?.bio.slice(0, 70) + "..."
            : profile?.bio}
        </p>
      </div>

      {savedUsername === username && (
        <button
          className="absolute right-4 top-4 flex gap-2 items-center border-[1px] p-2 px-4 rounded-full hover:bg-blue-400 hover:border-transparent hover:text-white duration-200 transition-all ease-in-out cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setIsSettingOpen(true);
          }}
        >
          <MdOutlineSettings />
          <p className="text-sm font-semibold ">Edit Profile</p>
        </button>
      )}

      {isSettingOpen && (
        <FormUpdateProfile
          handleClose={() => setIsSettingOpen(false)}
          name={profile?.name || ""}
          bio={profile?.bio || ""}
        />
      )}
    </div>
  );
}

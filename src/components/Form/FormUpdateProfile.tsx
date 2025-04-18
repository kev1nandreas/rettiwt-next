/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateProfileProps } from "@/types/FormProps";
import { useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../Input";
import { IoMdSend } from "react-icons/io";
import { useFetchProfileInfo, useUpdateProfile } from "@/app/(main)/api/useProfile";

export default function FormUpdateProfile({
  handleClose,
  name,
  bio,
}: {
  handleClose: () => void;
  name: string;
  bio: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const { refetch } = useFetchProfileInfo();
  const methods = useForm<UpdateProfileProps>({
    defaultValues: {
      name: name,
      bio: bio,
      image: undefined,
    },
  });
  const { register } = methods;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  const mutation = useUpdateProfile({
    onSuccess: () => {
      toast.success("Profile updated successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<UpdateProfileProps> = async (data: any) => {
    handleClose();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    await mutation.mutateAsync(formData);
  };

  return (
    <div className="bg-black/30 fixed inset-0 flex justify-center items-center z-50">
      <div
        className="bg-white w-full max-w-[40rem] p-4 shadow-lg rounded-2xl"
        ref={divRef}
      >
        <h3 className="border-b-[1px] border-slate-300 pb-2 text-lg font-bold">
          Update Your Profile
        </h3>
        <div className="w-full h-fit">
          <FormProvider {...methods}>
            <form action="" onSubmit={methods.handleSubmit(handleSubmit)}>
              <Input
                id={"name"}
                label={"Name"}
                validation={{
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                }}
                className="mt-3"
              />
              <div className="flex flex-col mt-3">
                <label htmlFor="image">Profile Picture</label>
                <input
                  type="file"
                  id="image"
                  className="p-2 bg-transparent outline-none my-2 border-[1px] border-slate-300 rounded-md"
                  {...register("image")}
                />
              </div>

              <div className="flex flex-col mt-3">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  className="resize-none w-full h-[6rem] p-2 bg-transparent outline-none my-2 border-[1px] border-slate-300 rounded-md"
                  placeholder="Tell us about yourself"
                  {...register("bio")}
                />
              </div>

              <div className="flex justify-end my-3">
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 mt-2 bg-blue-800 text-white p-2 px-4 rounded-full hover:bg-blue-700 duration-200 transition-all ease-in-out cursor-pointer"
                >
                  <IoMdSend /> Update
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

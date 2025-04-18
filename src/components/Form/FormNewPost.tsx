/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchTweet, useNewTweet } from "@/app/(main)/api/useTweet";
import { TweetProps } from "@/types/FormProps";
import { useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";

export default function FormNewPost({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const { refetch } = useFetchTweet();

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

  const methods = useForm<TweetProps>();
  const { register } = methods;

  const mutation = useNewTweet({
    onSuccess: () => {
      toast.success("Tweet created successfully!");
      refetch()
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<TweetProps> = async (data: any) => {
    handleClose();
    await mutation.mutateAsync(data);
  };

  return (
    <div className="bg-black/30 fixed inset-0 flex justify-center items-center z-50">
      <div
        className="bg-white w-full max-w-[40rem] p-4 shadow-lg rounded-2xl"
        ref={divRef}
      >
        <h3 className="border-b-[1px] border-slate-300 pb-2 text-lg font-bold">
          Post Something Here
        </h3>
        <div className="w-full h-fit">
          <FormProvider {...methods}>
            <form action="" onSubmit={methods.handleSubmit(handleSubmit)}>
              <textarea
                className="resize-none w-full h-[10rem] p-2 bg-transparent outline-none my-2"
                id="text"
                placeholder="What do you think?"
                {...register("text", {
                  required: "This field is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length is 10 characters",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Maximum length is 1000 characters",
                  },
                })}
              ></textarea>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  borderTop: "1px solid #ccc",
                  padding: "10px 0",
                }}
              >
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 mt-2 bg-blue-800 text-white p-2 px-4 rounded-full hover:bg-blue-700 duration-200 transition-all ease-in-out cursor-pointer"
                >
                  <IoMdSend /> Send
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

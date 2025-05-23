"use client";

import Input from "@/components/Input";
import { LoginProps } from "@/types/FormProps";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLogin } from "../api/useLogin";
import { useRouter } from "next/navigation";
import { parseFormData } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const methods = useForm<LoginProps>();
  const router = useRouter();

  const mutation = useLogin({
    onSuccess: () => {
      toast.success("Login Success");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const formData = parseFormData(data);
    await mutation.mutateAsync(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[60%] h-screen md:block hidden">
        <Image
          src={"/loginbg.png"}
          alt={"Login BG"}
          width={1920}
          height={1080}
          className="inset-0 object-cover w-full h-full"
          priority
        ></Image>
      </div>
      <div className="w-full md:w-[40%] h-screen flex flex-col items-center justify-center">
        <div className="w-[70%]">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="my-2 text-lg mb-10">
            Sign in to your account to continue
          </p>

          <FormProvider {...methods}>
            <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
              <Input
                className="mt-3"
                id={"username"}
                label={"Username"}
                validation={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                }}
              />
              <Input
                className="mt-3"
                id={"password"}
                label={"Password"}
                type={"password"}
                validation={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                }}
              />

              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer select-none"
              >
                Sign In
              </button>
            </form>

            <div>
              <p className="mt-6 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 cursor-pointer"
                >
                  Register
                </Link>
              </p>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

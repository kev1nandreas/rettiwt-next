"use client";

import Input from "@/components/Input";
import { LoginProps } from "@/types/FormProps";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { parseFormData } from "@/lib/utils";
import { useRegister } from "../api/useRegister";
import Link from "next/link";

export default function Register() {
  const methods = useForm<LoginProps>();
  const router = useRouter();

  const mutation = useRegister({
    onSuccess: () => {
      toast.success("Tweet created successfully!");
      router.push("/login");
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
          <h1 className="text-4xl font-bold">Be The Part Of Us!</h1>
          <p className="my-2 text-lg mb-10">
            Complete your information below to register.
          </p>

          <FormProvider {...methods}>
            <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
              <Input
                className="mt-3"
                id={"name"}
                label={"Full Name"}
                validation={{
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Full name must be at least 3 characters long",
                  },
                }}
              />
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
              <Input
                className="mt-3"
                id={"confirmPassword"}
                label={"Confirm Password"}
                type={"password"}
                validation={{
                  required: "Confirm password is required",
                  validate: (value) => {
                    if (value !== methods.getValues("password")) {
                      return "Passwords do not match";
                    }
                  },
                }}
              />

              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer select-none"
              >
                Register
              </button>
            </form>

            <div>
              <p className="mt-6 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 cursor-pointer">
                  Login
                </Link>
              </p>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

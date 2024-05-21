import Button from "@/components/Button";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { login } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Login() {
  return (
    <div className="flex flex-col  my-[25%] md:my-0 md:mx-[20%]">
      <Header title="Login" divStyle="hidden md:inline" />
      <form
        action={async (formData) => {
          'use server';
          await login(formData);
          redirect("/");
        }}
        className="bg-[#D9D9D9] flex flex-col justify-evenly items-center rounded w-full min-w-[400px] min-h-[350px] shadow-md h-[55vh]"
      >
        {" "}
        <Header title="Login" divStyle="md:hidden" style="text-center" />
        <div className="w-[90%] md:w-[70%]">
          <div className="flex flex-col relative">
            <label htmlFor="email" className="mb-1 font-medium">
              Email
            </label>
            <Image
              src="/user.svg"
              alt="Login"
              width={25}
              height={25}
              className="absolute my-9 ml-3"
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Type your email"
              className="pl-9 border-2 border-b-4 border-black rounded-sm shadow-sm py-1"
              required
            />
          </div>
        </div>
        <div className="flex flex-col w-[90%] md:w-[70%]">
          <div className="flex flex-col relative">
            <label htmlFor="email" className="mb-1 font-medium">
              Email
            </label>
            <Image
              src="/password.svg"
              alt="Password"
              width={25}
              height={25}
              className="absolute my-9 ml-3"
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Type your password"
              className="pl-9 border-2 border-b-4 border-black rounded-sm shadow-sm py-1"
              required
            />
          </div>
          <Link
            href="/Login/request_password_reset"
            className="underline text-xs self-end"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" text="Login" style="w-48" />
      </form>
    </div>
  );
}

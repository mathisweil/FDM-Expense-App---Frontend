import {ChangeEvent, FormEvent } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Link from "next/link";
import {login} from "@/actions/auth";

const Login = () => {

  return (
    <div className="flex flex-col  my-[25%] md:my-0 md:mx-[20%]">
      <Header title="Login" divStyle="hidden md:inline" />
      <form
        action={login}
        className="bg-[#D9D9D9] flex flex-col justify-evenly items-center rounded w-full min-w-[400px] min-h-[350px] shadow-md h-[55vh]"
      >
        {" "}
        <Header title="Login" divStyle="md:hidden" style="text-center" />
        <div className="w-[90%] md:w-[70%]">
          <InputField
            label="Email"
            icon={"user"}
            type="email"
            name="email"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[90%] md:w-[70%]">
          <InputField
            label="Password"
            icon={"password"}
            type="password"
            name="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
};

export default Login;

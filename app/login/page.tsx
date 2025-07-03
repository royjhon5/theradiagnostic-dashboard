"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import darklight from "../../public/logo/logo.png";
import useSignIn from "./auth/useSignIn";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/password-input";
import { Backdrop } from "@/components/backdrop";

export default function SignInPage() {
  const { onSubmit, form, loading } = useSignIn();
  return (
    <>
      {loading && (
        <Backdrop
          open={loading}
          onClose={() => loading}
          variant="blur"
          className="z-50"
        >
          <div className="flex flex-row h-full justify-center items-center animate-pulse gap-2">
            <Loader2 className="animate-spin" />
            Logging in
            <span className="ml-2 flex space-x-1">
              <span className="dot dot1" />
              <span className="dot dot2" />
              <span className="dot dot3" />
            </span>
          </div>
        </Backdrop>
      )}

      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 bg-background p-8 flex flex-col justify-center flex-1">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8 flex justify-center md:hidden">
              <Image
                alt="rjdev logo"
                height={120}
                width={120}
                src={darklight}
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">Sign in</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 max-w-3xl mx-auto py-10"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" type="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="hidden md:flex relative flex-1 bg-gradient-to-b from-blue-500 to-blue-900 p-8 flex-col justify-center items-start">
          <div className="max-w-md mx-auto md:mx-0 md:ml-16 lg:ml-24 z-10">
            <div className="absolute inset-0 flex flex-col gap-10 items-center justify-center text-white backdrop-blur-xs bg-[rgba(3,172,240,0.2)] font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
              <Image
                alt="rjdev logo"
                height={100}
                width={100}
                src={darklight}
                priority
              />
              <p className="dark:text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20">
                TheraDiagnostics
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden">
            <svg
              className="absolute bottom-0 w-full h-full text-blue-800 opacity-20"
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 300 Q 400 150 800 300 Q 1200 450 1600 300 L 1600 0 L 0 0 L 0 300"
                fill="currentColor"
              />
            </svg>
            <svg
              className="absolute bottom-0 w-full h-full text-blue-700 opacity-20"
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 300 Q 600 0 1200 300 L 1200 0 L 0 0 L 0 300"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

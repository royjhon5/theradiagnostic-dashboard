"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import useCreateDiscount from "../hooks/useCreateDiscount";
export default function AddLabTest() {
  const { form, onSubmit } = useCreateDiscount();
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold">
          <h2 className="text-2xl">Add New Discount</h2>
          <DynamicBreadcrumb />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3">
          <div className="col-span-2">
            <div className="w-full justify-end flex items-center mt-5"></div>
            <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                {/* Avatar */}
                <div className="flex flex-row gap-2 items-center">
                  <Avatar className="w-15 h-15">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0">
                    <p style={{ fontSize: 10 }}>Performed by:</p>
                    <p className="text-md font-bold">{Username}</p>
                    <p className="text-sm">ID: {userId}</p>
                  </div>
                </div>
                {/* right side */}
                <div className="flex flex-col justify-end md:text-right">
                  <p className="text-md font-bold">{formattedDate}</p>
                  <p style={{ fontSize: 10 }}>Date of Addition</p>
                </div>
              </div>
            </div>
            {/* input fields */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-background p-4 rounded-lg shadow-sm mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="discountDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Description</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discountAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Amount</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-end gap-2 items-center mt-2">
                  <Button
                    type="submit"
                    className="bg-[#11C7BC] cursor-pointer"
                    size="lg"
                  >
                    <Save /> Save Discount
                  </Button>
                  <Link href={"/settings/discount"}>
                    <Button
                      variant="destructive"
                      className="cursor-pointer"
                      size="lg"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

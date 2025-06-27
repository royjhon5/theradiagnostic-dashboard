"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import useUpdateEmployer from "../hooks/useEditEmployer";
import { useEffect } from "react";

export default function EditEmployer() {
  const searchParams = useSearchParams();
  const { form, onSubmit } = useUpdateEmployer();
  const currentDate = new Date();
  const router = useRouter();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        console.log("parsedData", parsedData);
        form.reset({
          id: parsedData.id ?? 0,
          nameOfEmplyeer: parsedData.nameOfEmplyeer ?? "",
          contactPerson: parsedData.contactPerson ?? "",
          phoneNumber: parsedData.phoneNumber ?? "",
          emailAddress: parsedData.emailAddress ?? "",
          establishmentAddress: parsedData.establishmentAddress ?? "",
          industry: parsedData.industry ?? "",
        });
      } catch (err) {
        console.error("Invalid data param:", err);
      }
    }
  }, [searchParams, form]);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold">
          <h2 className="text-2xl">Edit Employer</h2>
          <DynamicBreadcrumb />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <div className="col-span-2">
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="bg-background p-4 rounded-lg shadow-sm mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="nameOfEmplyeer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of Employer</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="establishmentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Establishment Address</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end mt-4 gap-2">
                    <Button type="submit" size="lg" className="cursor-pointer">
                      <Save /> Update
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() =>
                        router.push("/settings/employers-settings")
                      }
                    >
                      <X /> Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

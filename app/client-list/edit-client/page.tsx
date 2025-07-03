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
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { SelectField } from "@/components/dynamic-select";
import useEditClient from "../hooks/useEditClient";
import {
  CivilStatus,
  clientType,
  gender,
} from "@/app/client-registration/data";
export default function UpdateClient() {
  const isMounted = useRef(false);
  const searchParams = useSearchParams();
  const { form, onSubmit } = useEditClient();
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));

        const dob = parsedData.dateOfBirth
          ? format(new Date(parsedData.dateOfBirth), "yyyy-MM-dd")
          : "";

        // Ensure gender matches exactly one of your SelectField values
        const genderOptions = ["Male", "Female", "Prefer Not To Say"];
        const normalizedGender = genderOptions.includes(parsedData.gender)
          ? parsedData.gender
          : "";
        form.reset({
          id: parsedData.id ?? 0,
          firstName: parsedData.firstName ?? "",
          middleName: parsedData.middleName ?? "",
          lastName: parsedData.lastName ?? "",
          dateOfBirth: dob,
          age: parsedData.age ?? "",
          gender: normalizedGender,
          address: parsedData.address ?? "",
          contactNumber: parsedData.contactNumber ?? "",
          civilStatus: parsedData.civilStatus ?? "",
          isPriority: parsedData.isPriority ?? "",
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
          <h2 className="text-2xl">Update Client</h2>
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-background p-4 rounded-lg shadow-sm mt-5"
              >
                <div className="py-4">
                  <h2 className="text-blue-500 font-bold">
                    Personal Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* first name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FIRST NAME</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* middlename */}
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MIDDLE NAME</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* last name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LAST NAME</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* DOB */}
                  <FormField
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input type="date" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Age */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} disabled={true} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <SelectField
                            value={field.value}
                            onChange={field.onChange}
                            options={gender}
                            placeholder="Select Gender"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* current address */}
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="isPriority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>is Priority?</FormLabel>
                        <FormControl>
                          <SelectField
                            value={field.value}
                            onChange={field.onChange}
                            options={clientType}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Civil Status */}
                  <FormField
                    control={form.control}
                    name="civilStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Civil Status</FormLabel>
                        <FormControl>
                          <SelectField
                            value={field.value}
                            onChange={field.onChange}
                            options={CivilStatus}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row gap-2 mt-6">
                  <Button type="submit" size="lg" className="w-40">
                    Update
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className="bg-orange-500 w-40"
                    onClick={() => {
                      form.reset();
                      window.history.back();
                    }}
                  >
                    Back
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

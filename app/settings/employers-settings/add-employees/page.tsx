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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import useCreateEmployees from "../hooks/useCreateEmployees";
import { SelectField } from "@/components/dynamic-select";

export default function AddEmployer() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const parsedData = JSON.parse(decodeURIComponent(dataParam || ""));
  const { form, onSubmit } = useCreateEmployees();
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
  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer Not To Say", value: "Prefer Not To Say" },
  ];
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold">
          <h2 className="text-2xl">Add Employees</h2>
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
                <form
                  onSubmit={form.handleSubmit((values) =>
                    onSubmit({ ...values, employersId: parsedData.id })
                  )}
                >
                  <div className="bg-background p-4 rounded-lg shadow-sm mt-5">
                    <div className="mb-7 flex gap-2 flex-row md:flex-col">
                      <h2 className="font-bold text-sm text-blue-500">
                        Employers Details
                      </h2>
                      <div className="flex flex-col gap-0">
                        <p style={{ fontSize: 10 }}>Employers Name:</p>
                        <p className="text-md font-bold">
                          {parsedData.nameOfEmplyeer}
                        </p>
                        <p className="text-sm">Employers ID: {parsedData.id}</p>
                      </div>
                      <Separator />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="middleName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Middle Name</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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

                      <FormField
                        control={form.control}
                        name="currentAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Address</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="barangay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Barangay</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-2">
                    <Button type="submit" size="lg" className="cursor-pointer">
                      <Save /> Save
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

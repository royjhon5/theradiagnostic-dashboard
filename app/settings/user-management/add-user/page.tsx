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
import { ArrowLeft, Check, Save, X } from "lucide-react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { useEffect, useState } from "react";
import { SignatureMaker } from "@docuseal/signature-maker-react";
import { SelectField } from "@/components/dynamic-select";
import useCreateUser from "../hooks/useCreateUser";
import useUserRoles from "../hooks/useUserRoles";
import { PasswordInput } from "@/components/password-input";
export default function AddLabTest() {
  const { form, onSubmit } = useCreateUser();
  const { selectOptions } = useUserRoles();
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  const watchedPassword = form.watch("passwordHash");
  const [validations, setValidations] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValidations({
        minLength: watchedPassword.length >= 8,
        hasUppercase: /[A-Z]/.test(watchedPassword),
        hasLowercase: /[a-z]/.test(watchedPassword),
        hasNumber: /[0-9]/.test(watchedPassword),
        hasSpecial: /[^A-Za-z0-9]/.test(watchedPassword),
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [watchedPassword]);
  const strength = Object.values(validations).filter(Boolean).length;

  const getStrengthDetails = () => {
    if (strength <= 2) return { text: "Weak", color: "text-red-500" };
    if (strength <= 4) return { text: "Medium", color: "text-yellow-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const { text: strengthText, color: strengthColor } = getStrengthDetails();
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold">
          <h2 className="text-2xl">Add New Laboratory Package</h2>
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
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="col-span-1 md:col-span-5">
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
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <FormField
                        control={form.control}
                        name="middleInitial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Middle Initial</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 md:col-span-5">
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
                    </div>
                    <div className="col-span-1 md:col-span-4">
                      <FormField
                        control={form.control}
                        name="professionalTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Title</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 md:col-span-4">
                      <FormField
                        control={form.control}
                        name="licenseNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>License Number</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 md:col-span-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 md:col-span-4">
                      <FormField
                        control={form.control}
                        name="roleId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roles</FormLabel>
                            <FormControl>
                              <SelectField
                                value={field.value}
                                onChange={field.onChange}
                                options={selectOptions}
                                placeholder="Select Role"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 md:col-span-4">
                      <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1 md:col-span-4">
                      <FormField
                        control={form.control}
                        name="passwordHash"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <PasswordInput {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {watchedPassword.length > 0 && (
                        <>
                          <div className="space-y-2 mt-2">
                            <div className="text-sm font-medium flex justify-between">
                              <span>Password Strength:</span>
                              <span className={strengthColor}>
                                {strengthText}
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  strength <= 2
                                    ? "bg-red-500"
                                    : strength <= 4
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${(strength / 5) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-2 border rounded-md p-3 mt-2">
                            <p className="text-sm font-medium mb-2">
                              Your password must have:
                            </p>
                            <ul className="space-y-1">
                              {[
                                {
                                  key: "minLength",
                                  label: "At least 8 characters",
                                },
                                {
                                  key: "hasUppercase",
                                  label: "At least one uppercase letter (A-Z)",
                                },
                                {
                                  key: "hasLowercase",
                                  label: "At least one lowercase letter (a-z)",
                                },
                                {
                                  key: "hasNumber",
                                  label: "At least one number (0-9)",
                                },
                                {
                                  key: "hasSpecial",
                                  label:
                                    "At least one special character (!@#$...)",
                                },
                              ].map((item) => (
                                <li
                                  key={item.key}
                                  className="flex items-center text-sm"
                                >
                                  {validations[
                                    item.key as keyof typeof validations
                                  ] ? (
                                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                  ) : (
                                    <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                                  )}
                                  <span>{item.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 mt-4 gap-2">
                  <div className="bg-background p-4 rounded-lg shadow-sm">
                    <FormField
                      control={form.control}
                      name="signature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <SignatureMaker
                            withSubmit={false}
                            onChange={(signatureData: { base64: string }) => {
                              field.onChange(signatureData.base64);
                            }}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                  <Link href={"/settings"}>
                    <Button className="cursor-pointer" size="lg">
                      <ArrowLeft /> Go Back
                    </Button>
                  </Link>
                  <Button className="bg-[#11C7BC] cursor-pointer" size="lg">
                    <Save /> Add User
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

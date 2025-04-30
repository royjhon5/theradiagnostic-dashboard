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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/blocks/editor-00/editor";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
const formSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().min(1),
  contact_number: z.string().min(1),
  role: z.string().min(1),
  password: z.string().min(1),
  confirm_password: z.string().min(1),
});

const permissionsData = [
  { id: "clientManagement", label: "Can Perform Client Management" },
  { id: "laboratoryRequests", label: "Can Perform Laboratory Requests" },
  { id: "clientAppointments", label: "Can Perform Client Appointments" },
  { id: "clientAppointments", label: "Can Perform Client Appointments" },
  { id: "viewReports", label: "Can View Reports" },
  { id: "viewReports", label: "Can View Reports" },
  { id: "addLaboratoryPackage", label: "Can Add Laboratory Package" },
  { id: "addLaboratoryPackage", label: "Can Add Laboratory Package" },
];

export default function UserData() {
  const [permissions, setPermissions] = useState(
    permissionsData.reduce(
      (acc, permission) => {
        acc[permission.id] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const handlePermissionChange = (permissionId: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3">
      <div className="col-span-2">
        <div className="w-full justify-end flex items-center">
          <h1 className="text-xs font-bold italic mb-1">
            Package ID : 0001-256-6{" "}
          </h1>
        </div>
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
                <p className="text-md font-bold">Nate Diaz</p>
                <p className="text-sm">Staff ID: 006-2548-63</p>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col justify-end md:text-right">
              <p className="text-md font-bold">May 15, 2025 - Friday</p>
              <p style={{ fontSize: 10 }}>Date of Addition</p>
            </div>
          </div>
        </div>
        {/* input fields */}
        <div className="bg-background p-4 rounded-lg shadow-sm mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
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
                  name="last_name"
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <div className="grid grid-cols-1 mt-4 gap-2">
          <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4">
              <h2 className="font-bold">Access Permission</h2>
              <h3 className="text-sm" style={{ fontSize: 10 }}>
                Access permission refers to the rights and privileges granted to
                users within a system, determining what data and functionalities
                they can view, edit, or manage. In healthcare systems, access
                permissions are crucial for maintaining data security and
                ensuring that sensitive patient information is only accessible
                to authorized personnel based on their roles, such as
                administrators, providers, or billing staff.
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {permissionsData.map((permission, index) => (
                <div
                  key={`${permission.id}-${index}`}
                  className="flex items-center space-x-3"
                >
                  <Checkbox
                    id={`${permission.id}-${index}`}
                    checked={permissions[permission.id]}
                    onCheckedChange={() =>
                      handlePermissionChange(permission.id)
                    }
                    className="h-5 w-5 rounded-sm border-gray-300 bg-gray-200"
                  />
                  <Label
                    htmlFor={`${permission.id}-${index}`}
                    className="text-base font-medium"
                  >
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background rounded-lg shadow-sm mt-4">
            <div className="p-4">
              <h2 className="font-bold">Addtional Notes for User</h2>
            </div>
            <Editor />
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
      </div>
    </div>
  );
}

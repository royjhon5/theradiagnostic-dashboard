"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { SelectField } from "@/components/dynamic-select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const formSchema = z.object({
  firstname: z.string().min(1),
  middlename: z.string().min(1),
  lastname: z.string().min(1),
  dob: z.coerce.date(),
  age: z.string().min(1),
  gender: z.string().min(1),
  address: z.string().min(1),
  province: z.string().min(1),
  barangay: z.string().min(1),
  senior: z.string().min(1),
  validid: z.string().min(1),
  valididno: z.string().min(1),
  activeno: z.string().min(1),
  activeemail: z.string().min(1),
  medhistory: z.string().min(1),
  currentmed: z.string().min(1),
  knownallergies: z.string().min(1),
  insuranceinfo: z.string().min(1),
});
export default function ClientRegistration() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: new Date(),
    },
  });
  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer Not To Say", value: "Prefer Not To Say" },
  ];

  const seniorcitizen = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const validID = [
    { label: "Drivers License", value: "Drivers License" },
    { label: "Phil Health", value: "Phil Health" },
    { label: "National ID", value: "National ID" },
    { label: "Philsys", value: "Philsys" },
    { label: "Passport", value: "Passport" },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="">
          <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
            <h2 className="text-2xl">Client Registration</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2">
            <div className="bg-background shadow-md p-4 rounded-lg border ">
              <div className="py-4">
                <h2 className="text-blue-500 font-bold">
                  Personal Information
                </h2>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* first name */}
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>FIRST NAME</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g (PABLO)"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* middlename */}
                    <FormField
                      control={form.control}
                      name="middlename"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MIDDLE NAME</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g (ESCOBAR)"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* last name */}
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LAST NAME</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g (ISRAEL)"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* DOB */}
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
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
                            <Input placeholder="Enter Age" type="" {...field} />
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
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Address"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Province */}
                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Province</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Province"
                              type="textt"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* barangay */}
                    <FormField
                      control={form.control}
                      name="barangay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Barangay</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Barangay"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* senior citizen */}
                    <FormField
                      control={form.control}
                      name="senior"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senior Citizen</FormLabel>
                          <FormControl>
                            <SelectField
                              value={field.value}
                              onChange={field.onChange}
                              options={seniorcitizen}
                              placeholder="Select"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* valid id */}
                    <FormField
                      control={form.control}
                      name="validid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valid ID</FormLabel>
                          <FormControl>
                            <SelectField
                              value={field.value}
                              onChange={field.onChange}
                              options={validID}
                              placeholder="Select ID"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Valid ID No */}
                    <FormField
                      control={form.control}
                      name="valididno"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valid ID No.</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g (251-4234-0000)"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Active Phone number */}
                    <FormField
                      control={form.control}
                      name="activeno"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Active Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g (09920999999)"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Active Email */}
                    <FormField
                      control={form.control}
                      name="activeemail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Active Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g JohnDoe@email.co"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="py-4">
                    <h2 className="text-blue-500 font-bold">
                      Medical Information
                    </h2>
                  </div>
                  {/* Medical History */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="medhistory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical History</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input N/A if None"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Current Medication */}
                    <FormField
                      control={form.control}
                      name="currentmed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Medication</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input N/A if None"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* KnownAllergies */}
                    <FormField
                      control={form.control}
                      name="knownallergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Known Allergies</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input N/A if None"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 py-4">
                    <FormField
                      control={form.control}
                      name="insuranceinfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Info</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Input N/A if None"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-row gap-2 mt-6">
                      <Button size="lg" className="w-40">
                        Save
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-orange-500 w-40"
                      >
                        Clear
                      </Button>
                    </div>
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

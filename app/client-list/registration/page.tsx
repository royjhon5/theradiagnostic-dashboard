"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { SelectField } from "@/components/dynamic-select";
import { Button } from "@/components/ui/button";
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
import useCreateClient from "../client/useCreateClient";

export default function ClientRegistration() {
  const { form, onSubmit } = useCreateClient();
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

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="">
          <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
            <h2 className="text-2xl">Client Registration</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-4">
            <div className="col-span-3">
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
                              <Input type="text" {...field} />
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
                      {/* Province */}
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
                      {/* barangay */}
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
                      {/* senior citizen */}
                      <FormField
                        control={form.control}
                        name="seniorCitizen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senior Citizen</FormLabel>
                            <FormControl>
                              <SelectField
                                value={field.value}
                                onChange={field.onChange}
                                options={seniorcitizen}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* valid id */}
                      <FormField
                        control={form.control}
                        name="validId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valid ID</FormLabel>
                            <FormControl>
                              <SelectField
                                value={field.value}
                                onChange={field.onChange}
                                options={validID}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Valid ID No */}
                      <FormField
                        control={form.control}
                        name="validIdNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valid ID No.</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Active Phone number */}
                      <FormField
                        control={form.control}
                        name="activePhoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Active Phone Number</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Active Email */}
                      <FormField
                        control={form.control}
                        name="activeEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Active Email</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
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
                        name="medicalHistory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical History</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Current Medication */}
                      <FormField
                        control={form.control}
                        name="currentMedication"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Medication</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* KnownAllergies */}
                      <FormField
                        control={form.control}
                        name="knownAllergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Known Allergies</FormLabel>
                            <FormControl>
                              <Input placeholder="" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 py-4">
                      <FormField
                        control={form.control}
                        name="insuranceInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Info</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder=""
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
    </div>
  );
}

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
import { Stepper } from "@/components/ui/stepper";
import { useEffect, useState } from "react";
import {
  appointmentType,
  CivilStatus,
  clientType,
  gender,
  steps,
} from "./data";
import useEmployer from "@/app/settings/employers-settings/hooks/useEmployer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetEmployersById from "@/app/settings/employers-settings/hooks/useGetEmployersById";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCircle, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import useGetReferralCode from "../appointment/hooks/useGetReferralCode";
import useCreateClient from "../client-list/hooks/useCreateClient";

export default function ClientRegistration() {
  const { form, onSubmit } = useCreateClient();
  const [selectedType, setSelectedType] = useState("");
  const [selectedEmployerId, setSelectedEmployerId] = useState<number | 0>(0);
  const [currentStep, setCurrentStep] = useState(0);
  const { employerdata } = useEmployer();
  const { employer } = useGetEmployersById(selectedEmployerId);
  const [refferalCode, setReferralCode] = useState<string>("");
  const DisableInputOnSelect =
    selectedType === "Annual Check Up" ? true : false;
  const { isPending, refetchData, referralData } =
    useGetReferralCode(refferalCode);
  const CheckReferralCode = () => {
    refetchData();
  };

  const { watch, setValue } = form;
  const dateOfBirth = watch("dateOfBirth");

  useEffect(() => {
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setValue("age", age.toString());
    }
  }, [dateOfBirth, setValue]);

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
              <div className="bg-background shadow-sm p-4 rounded-lg border flex justify-center items-center mb-2">
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                />
              </div>
              <div className="bg-background shadow-md p-4 rounded-lg border ">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* appointent Type */}
                      <FormField
                        control={form.control}
                        name="appointmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Appointment Type</FormLabel>
                            <FormControl>
                              <SelectField
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value);
                                  setSelectedType(value);
                                }}
                                options={appointmentType}
                                placeholder="Select Appointment Type"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* ends here  */}
                      {selectedType === "Annual Check Up" && (
                        <FormField
                          control={form.control}
                          name="employersId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employer</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setSelectedEmployerId(Number(value));
                                }}
                                defaultValue={
                                  field.value ? String(field.value) : ""
                                }
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Employer" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {employerdata.map((item) => (
                                    <SelectItem
                                      key={item.id}
                                      value={String(item.id)}
                                    >
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      {selectedEmployerId !== 0 && (
                        <FormItem>
                          <FormLabel>Select Employee</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !form.getValues("employersId") &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  {form.getValues("employersId")
                                    ? employer.find(
                                        (item) =>
                                          String(item.employeeId) ===
                                          form.getValues("employersId")
                                      )?.firstName
                                    : "Select Employee"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[480px] md:w-[380px] p-0">
                              <Command>
                                <CommandInput placeholder="Search employee..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No employee found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {employer.map((item) => (
                                      <CommandItem
                                        value={String(item.employeeId)}
                                        key={item.employeeId}
                                        onSelect={() => {
                                          form.setValue(
                                            "firstName",
                                            item.firstName
                                          );
                                          form.setValue(
                                            "middleName",
                                            item.middleName
                                          );
                                          form.setValue(
                                            "lastName",
                                            item.lastName
                                          );
                                          form.setValue(
                                            "dateOfBirth",
                                            item.dateOfBirth
                                          );
                                          form.setValue("age", item.age);
                                          form.setValue("gender", item.gender);
                                          form.setValue(
                                            "address",
                                            item.currentAddress
                                          );
                                          // form.setValue(
                                          //   "province",
                                          //   item.province
                                          // );
                                          // form.setValue(
                                          //   "barangay",
                                          //   item.barangay
                                          // );
                                        }}
                                      >
                                        <CheckCircle
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            String(item.employersId) ===
                                              form.getValues("employersId")
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {item.firstName} {item.middleName}{" "}
                                        {item.lastName}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    </div>
                    {(selectedType === "Walk-In" ||
                      selectedType === "Annual Check Up") && (
                      <>
                        <div className="mt-5">
                          <div className="flex flex-col w-full max-w-sm space-y-2">
                            <div className="flex items-center space-x-2">
                              <Input
                                type="text"
                                placeholder="Referral Code"
                                value={refferalCode}
                                onChange={(e) => {
                                  setReferralCode(e.target.value);
                                }}
                                disabled={isPending}
                              />
                              <Button
                                type="button"
                                onClick={CheckReferralCode}
                                disabled={
                                  isPending ||
                                  referralData === "Valid Referral Code" ||
                                  referralData === "Invalid Referral Code"
                                }
                              >
                                {isPending ? "Checking..." : "Check Validity"}
                              </Button>
                            </div>

                            {referralData === "Invalid Referral Code" && (
                              <p
                                className="text-red-500 font-semibold"
                                style={{ fontSize: "12px" }}
                              >
                                Invalid referral code.
                              </p>
                            )}
                            {referralData === "Valid Referral Code" && (
                              <p
                                className="text-green-500 font-semibold"
                                style={{ fontSize: "12px" }}
                              >
                                Valid referral code!
                              </p>
                            )}
                          </div>
                        </div>
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
                                  <Input
                                    type="text"
                                    {...field}
                                    disabled={DisableInputOnSelect}
                                  />
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
                                  <Input
                                    type="text"
                                    {...field}
                                    disabled={DisableInputOnSelect}
                                  />
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
                                  <Input
                                    type="text"
                                    {...field}
                                    disabled={DisableInputOnSelect}
                                  />
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
                                <Input
                                  type="date"
                                  {...field}
                                  disabled={DisableInputOnSelect}
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
                                  <Input
                                    type="text"
                                    {...field}
                                    disabled={true}
                                  />
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
                                    <Input
                                      type="text"
                                      {...field}
                                      disabled={DisableInputOnSelect}
                                    />
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
                          <FormField
                            control={form.control}
                            name="appointmentDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Appointment Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}
                    {(selectedType === "Walk-In" ||
                      selectedType === "Annual Check Up") && (
                      <div className="flex flex-row gap-2 mt-6">
                        <Button type="submit" size="lg" className="w-40">
                          Save
                        </Button>
                        <Button
                          type="button"
                          size="lg"
                          className="bg-orange-500 w-40"
                        >
                          Clear
                        </Button>
                      </div>
                    )}
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

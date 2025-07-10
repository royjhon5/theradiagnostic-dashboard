"use client";

import { SelectField } from "@/components/dynamic-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stepper } from "@/components/ui/stepper";
import { useEffect, useState } from "react";
import {
  appointmentType,
  CivilStatus,
  clientType,
  gender,
  isflag,
  steps,
} from "../data";
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
import useGetReferralCode from "@/app/appointment/hooks/useGetReferralCode";
import { SearchButton } from "../data-table-components/search-button";
import { useMainContext } from "@/app/client-list/context/context-provider";
import { Label } from "@/components/ui/label";
import { CreateClientDto } from "@/types/DTO/Client.dto";
import { format } from "date-fns";
import useCreateClient from "@/app/client-list/hooks/useCreateClient";
import useEditClient from "@/app/client-list/hooks/useEditClient";

export default function Registration() {
  const { currentRow } = useMainContext();
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
  const isEditMode = !!currentRow;
  const { onSubmit: handleCreateSubmit } = useCreateClient();
  const { onSubmit: handleEditSubmit } = useEditClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      handleEditSubmit(formData);
    } else {
      handleCreateSubmit(formData);
    }
  };

  const initialFormData = {
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    address: "",
    emailAddress: "",
    isPriority: "",
    civilStatus: "",
    contactNumber: "",
    appointmentDate: "",
    isFag: "",
    appointmentType: "",
  };

  const [formData, setFormData] = useState<CreateClientDto>(initialFormData);
  const [employersId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (currentRow) {
      const dob = currentRow.dateOfBirth
        ? format(new Date(currentRow.dateOfBirth), "yyyy-MM-dd")
        : "";
      setFormData((prev) => ({
        ...prev,
        id: currentRow.id || 0,
        firstName: currentRow.firstName || "",
        middleName: currentRow.middleName || "",
        lastName: currentRow.lastName || "",
        dateOfBirth: dob || "",
        age: currentRow.age || "",
        gender: currentRow.gender || "",
        address: currentRow.address || "",
        emailAddress: currentRow.emailAddress || "",
        isPriority: currentRow.isPriority || "",
        civilStatus: currentRow.civilStatus || "",
        contactNumber: currentRow.contactNumber || "",
        isFag: currentRow.isFag || "",
      }));
    }
  }, [currentRow]);
  return (
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* appointent Type */}

              <div className="grid w-full max-w-sm items-center gap-1">
                <Label>Appointment Type</Label>
                <SelectField
                  onChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      appointmentType: value,
                    }));
                    setSelectedType(value);
                  }}
                  value={formData.appointmentType}
                  options={appointmentType}
                  placeholder="Select Appointment Type"
                />
              </div>

              {/* ends here  */}
              {selectedType === "Annual Check Up" && (
                <div className="grid w-full max-w-sm items-center gap-1">
                  <Label>Employer</Label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedEmployerId(Number(value));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Employer" />
                    </SelectTrigger>
                    <SelectContent>
                      {employerdata.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {selectedEmployerId !== 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Select Employee
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !employersId && "text-muted-foreground"
                        )}
                      >
                        {employersId
                          ? (employer.find(
                              (item) =>
                                String(item.employeeId) === String(employersId)
                            )?.firstName ?? "Unknown")
                          : "Select Employee"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[480px] md:w-[380px] p-0">
                      <Command>
                        <CommandInput placeholder="Search employee..." />
                        <CommandList>
                          <CommandEmpty>No employee found.</CommandEmpty>
                          <CommandGroup>
                            {employer.map((item) => (
                              <CommandItem
                                value={String(item.employeeId)}
                                key={item.employeeId}
                                onSelect={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    employersId: String(item.employeeId),
                                    firstName: item.firstName,
                                    middleName: item.middleName,
                                    lastName: item.lastName,
                                    dateOfBirth: item.dateOfBirth,
                                    age: item.age,
                                    gender: item.gender,
                                    address: item.currentAddress,
                                    // Optional: province, barangay
                                  }));
                                }}
                              >
                                <CheckCircle
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    String(item.employeeId) === employersId
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
                </div>
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

                <div className="mt-5">
                  <SearchButton />
                </div>
                <div className="py-4">
                  <h2 className="text-blue-500 font-bold">
                    Personal Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* first name */}
                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>FIRST NAME</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={DisableInputOnSelect} // More specific disabled condition
                    />
                  </div>
                  {/* middlename */}
                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>MIDDLE NAME</Label>
                    <Input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      disabled={DisableInputOnSelect}
                    />
                  </div>
                  {/* last name */}

                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>LAST NAME</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={DisableInputOnSelect}
                    />
                  </div>
                  {/* DOB */}
                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={(e) => {
                        const dob = e.target.value;
                        const birthDate = new Date(dob);
                        const today = new Date();
                        let age = today.getFullYear() - birthDate.getFullYear();
                        const m = today.getMonth() - birthDate.getMonth();
                        if (
                          m < 0 ||
                          (m === 0 && today.getDate() < birthDate.getDate())
                        ) {
                          age--;
                        }
                        setFormData((prev) => ({
                          ...prev,
                          dateOfBirth: dob,
                          age: age.toString(),
                        }));
                      }}
                      disabled={DisableInputOnSelect}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Age</Label>
                    <Input
                      type="text"
                      name="age"
                      value={formData.age}
                      disabled
                    />
                  </div>
                  {/* gender */}
                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Gender</Label>
                    <SelectField
                      value={formData.gender}
                      placeholder="Select a Gender"
                      options={gender}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, gender: value }))
                      }
                    />
                  </div>
                  {/* current address */}
                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={DisableInputOnSelect}
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Email Address</Label>
                    <Input
                      type="text"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      disabled={DisableInputOnSelect}
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>is Priority?</Label>
                    <SelectField
                      value={formData.isPriority}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, isPriority: value }))
                      }
                      options={clientType}
                    />
                  </div>

                  {/* Civil Status */}
                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Civil Status</Label>
                    <SelectField
                      value={formData.civilStatus}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, civilStatus: value }))
                      }
                      options={CivilStatus}
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Contact Number</Label>
                    <Input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Appointment Date</Label>
                    <Input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1">
                    <Label>Flag</Label>
                    <SelectField
                      value={formData.isFag}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, isFag: value }))
                      }
                      options={isflag}
                      placeholder="Select Data"
                    />
                  </div>
                </div>
              </>
            )}
            {(selectedType === "Walk-In" ||
              selectedType === "Annual Check Up") && (
              <div className="flex flex-row gap-2 mt-6">
                <Button type="submit" className="cursor-pointer">
                  {isEditMode ? "Process Client" : "Create Client"}
                </Button>
                <Button type="button" size="lg" className="bg-orange-500 w-40">
                  Clear
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

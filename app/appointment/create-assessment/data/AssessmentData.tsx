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
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Editor } from "@/components/blocks/editor-00/editor";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
const formSchema = z.object({
  package_name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  systolic: z
    .string()
    .min(1, "Systolic value is required")
    .refine((val) => /^\d+$/.test(val), "Must be a number")
    .refine(
      (val) => Number.parseInt(val) > 0 && Number.parseInt(val) < 300,
      "Must be between 1-299"
    ),
  diastolic: z
    .string()
    .min(1, "Diastolic value is required")
    .refine((val) => /^\d+$/.test(val), "Must be a number")
    .refine(
      (val) => Number.parseInt(val) > 0 && Number.parseInt(val) < 200,
      "Must be between 1-199"
    ),
});

export default function AssessmentData() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { systolic: "", diastolic: "" },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("data");

  let currentRow: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      currentRow = JSON.parse(decoded);
      console.log("test", currentRow);
    } catch (error) {
      console.error("Error parsing row data:", error);
    }
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  const medhist1 = [
    { id: "Chronic Conditions", label: "Chronic Conditions" },
    { id: "Allergies", label: "Allergies" },
    {
      id: "Past Surgeries/Procedures",
      label: "Past Surgeries/Procedures",
    },
    { id: "Family Medical History", label: "Family Medical History" },
  ];

  const medhist2 = [
    { id: "Smoker", label: "Smoker" },
    { id: "Alcohol Consumption", label: "Alcohol Consumption" },
    {
      id: "Substance Use",
      label: "Substance Use",
    },
    { id: "Physical Activity", label: "Physical Activity" },
  ];

  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3 mt-4">
      <div className="col-span-2">
        <div className="w-full justify-end flex items-center">
          <h1 className="text-xs font-bold italic mb-1">
            {/* Package ID : 0001-256-6{" "} */}
          </h1>
        </div>
        <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            {/* Avatar */}
            <div className="flex flex-row gap-2 items-center">
              <Avatar className="w-15 h-15">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CNs</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <p style={{ fontSize: 10 }}>Client name</p>
                <p className="text-md font-bold">{currentRow.client_name}</p>
                <p className="text-sm">Client ID: {currentRow.priority_no}</p>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col md:text-right">
              <p style={{ fontSize: 10 }}>Assess By: Nate Diaz</p>
              <p className="text-md font-bold">{formattedDate}</p>
              <p style={{ fontSize: 10 }}>Date of Assessment</p>
            </div>
          </div>
        </div>
        {/* input fields */}
        <div className="bg-background rounded-lg shadow-sm mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
                Vital Signs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <FormField
                  control={form.control}
                  name="package_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature • ( °C )</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heart Rate • ( bpm )</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col">
                  <FormLabel className="text-sm text-gray-700 mb-1 font-normal">
                    Blood Pressure <span className="text-gray-500">•</span>{" "}
                    <span className="text-gray-500">( mmHg )</span>
                  </FormLabel>
                  <div className="flex items-center">
                    <FormField
                      control={form.control}
                      name="systolic"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                              placeholder=""
                              aria-label="Systolic blood pressure"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="mx-2 text-gray-500">/</span>
                    <FormField
                      control={form.control}
                      name="diastolic"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                              placeholder=""
                              aria-label="Diastolic blood pressure"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heart Rate • ( bpm )</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height • ( cm )</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <div className="bg-background rounded-lg mt-4 shadow-md">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Cheif of Complain
          </h2>
          <Editor />
        </div>
        <div className="bg-background rounded-lg mt-4 shadow-md">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            History Present Illness ( HPI )
          </h2>
          <Editor />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-background rounded-lg mt-4 shadow-md">
            <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
              Medical History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {medhist1.map((medhist, index) => (
                <div
                  key={`${medhist.id}-${index}`}
                  className="flex items-center space-x-3"
                >
                  <Checkbox
                    id={`${medhist.id}-${index}`}
                    className="h-5 w-5 rounded-sm border-gray-300 bg-gray-200"
                  />
                  <Label
                    htmlFor={`${medhist.id}-${index}`}
                    className="text-base font-medium"
                  >
                    {medhist.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background rounded-lg mt-4 shadow-md">
            <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
              Medical History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {medhist2.map((medhists, index) => (
                <div
                  key={`${medhists.id}-${index}`}
                  className="flex items-center space-x-3"
                >
                  <Checkbox
                    id={`${medhists.id}-${index}`}
                    className="h-5 w-5 rounded-sm border-gray-300 bg-gray-200"
                  />
                  <Label
                    htmlFor={`${medhists.id}-${index}`}
                    className="text-base font-medium"
                  >
                    {medhists.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg mt-4 shadow-md">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Physical Exam Notes
          </h2>
          <Editor />
        </div>

        <div className="bg-background rounded-lg mt-4 shadow-md">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Assessment
          </h2>
          <Editor />
        </div>

        <div className="bg-background rounded-lg mt-4 shadow-md">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Recommendation / Perscription
          </h2>
          <Editor />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 gap-2">
          <Link href={"/appointment"}>
            <Button className="cursor-pointer" size="lg">
              <ArrowLeft /> Go Back
            </Button>
          </Link>
          <div className="flex flex-row gap-2">
            <Button
              className="bg-[#66C87B] cursor-pointer"
              size="lg"
              onClick={() => {
                const encoded = encodeURIComponent(JSON.stringify(currentRow));
                router.push(
                  `/appointment/laboratory-testing?labtest=${encoded}`
                );
              }}
            >
              <ArrowRight /> Proceed Lab Test
            </Button>
            <Button className="bg-[#11C7BC] cursor-pointer" size="lg">
              <Save /> Save Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

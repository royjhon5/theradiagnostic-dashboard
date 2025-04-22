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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { BadgeInfo } from "lucide-react";
const formSchema = z.object({
  package_name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  starting_date: z.coerce.date(),
  ending_date: z.coerce.date(),
});

interface TestItem {
  id: string;
  name: string;
  price: number;
  checked: boolean;
}

export default function TestPackageData() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      starting_date: new Date(),
      ending_date: new Date(),
    },
  });
  const [tests, setTests] = useState<TestItem[]>([
    {
      id: "cbc",
      name: "Complete Blood Count (CBC)",
      price: 200.0,
      checked: false,
    },
    { id: "lipid", name: "Lipid Panel", price: 450.0, checked: false },
    { id: "thyroid", name: "Thyroid Panel", price: 150.0, checked: false },
    { id: "xray", name: "X-ray", price: 80.0, checked: false },
    { id: "mri", name: "MRI", price: 80.0, checked: false },
    { id: "ct", name: "CT Scan", price: 80.0, checked: false },
  ]);
  const [total, setTotal] = useState(0);
  const [packagePrice, setPackagePrice] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  const handleCheckboxChange = (id: string) => {
    const updatedTests = tests.map((test) =>
      test.id === id ? { ...test, checked: !test.checked } : test
    );
    setTests(updatedTests);

    const totalSum = updatedTests
      .filter((test) => test.checked)
      .reduce((sum, test) => sum + test.price, 0);

    setTotal(totalSum);
    setDiscountedAmount(packagePrice - totalSum);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3">
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
        <div className="bg-background p-4 rounded-lg shadow-sm mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="package_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Name</FormLabel>
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                      <FormLabel>Price • (₱)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            field.onChange(e); // keep form state updated
                            setPackagePrice(value);
                            setDiscountedAmount(value - total); // also update discounted
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="starting_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Starting Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value
                              ? new Date(field.value).toISOString().slice(0, 10)
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ending_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ending Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value
                              ? new Date(field.value).toISOString().slice(0, 10)
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        {/* ends here */}
        <div className="bg-background mt-2 shadow-sm rounded-lg">
          <h2 className="font-bold text-lg bg-primary text-white rounded-t-lg pl-2">
            Select Individual Test to Add to Package
          </h2>
          <div className="grid grid-cols-1 p-4 md:p-5">
            <div className="space-y-2">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between py-1"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`test-${test.id}-1`}
                      checked={test.checked}
                      onCheckedChange={() => handleCheckboxChange(test.id)}
                      className="border border-primary cursor-pointer"
                    />
                    <label
                      htmlFor={`test-${test.id}-1`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {test.name}
                    </label>
                  </div>
                  <span className="text-sm font-medium">
                    ₱{test.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-right text-sm mt-5">
              Total price of Selected Test: ₱{total.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            {/* left side */}
            <div className="flex flex-row gap-2 items-center">
              <BadgeInfo />
              <div className="flex flex-col">
                <h2 style={{ fontSize: 10 }} className="italic font-bold">
                  The discounted amount is caculated by subtracting
                </h2>
                <h2 style={{ fontSize: 10 }} className="italic font-bold">
                  the total price of the selected lab tests from the
                </h2>
                <h2 style={{ fontSize: 10 }} className="italic font-bold">
                  package&apos;s set price.
                </h2>
              </div>
            </div>
            {/* right side */}
            <div>
              <div className="text-sm text-gray-600">Package Price</div>
              <div className="flex">
                <div className="text-2xl font-bold">
                  ₱ {discountedAmount.toFixed(2)} /
                </div>
                <div className="ml-1 text-sm text-gray-600">
                  <span className="font-medium">₱ {total.toFixed(2)}</span>
                  <div className="text-xs">Discounted Amount</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

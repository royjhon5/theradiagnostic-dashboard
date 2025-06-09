"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ArrowLeft, BadgeInfo, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import useGetLaboratoryTest from "../../laboratory-test/hooks/useGetLaboratoryTest";
import useCreateLaboratoryPackage from "../hooks/useCreateLaboratoryPackage";
import {
  CreatePackageDto,
  PackageItemDto,
} from "@/types/DTO/LaboratoryPackage.dto";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { SelectField } from "@/components/dynamic-select";

export default function TestPackageData() {
  const { form, onSubmit } = useCreateLaboratoryPackage();
  const { labtest } = useGetLaboratoryTest();
  const [total, setTotal] = useState(0);
  const [selectedType, setSelectedType] = useState<string>("");
  const [packagePrice, setPackagePrice] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [companyDiscount, setCompanyDiscount] = useState(0);
  const [companyPercentDiscount, setCompanyPercentDiscount] = useState(0);
  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }
  const packagetype = [
    { label: "For Regular", value: "Regular" },
    { label: "For Company", value: "Company" },
  ];

  const handleSubmit = (data: CreatePackageDto) => {
    onSubmit({
      ...data,
      totalPrice: discountedAmount,
      packageDiscountAmount: companyDiscount,
      individualDiscountAmount: companyPercentDiscount,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3">
      <div className="col-span-2">
        <div className="w-full justify-end flex items-center">
          <h1 className="text-xs font-bold italic mt-5"></h1>
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
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="bg-background p-4 rounded-lg shadow-sm mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="packageType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Type</FormLabel>
                      <FormControl>
                        <SelectField
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            setSelectedType(value);
                          }}
                          options={packagetype}
                          placeholder="Select Package Type"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {(selectedType === "Regular" || selectedType === "Company") && (
                  <>
                    <FormField
                      control={form.control}
                      name="packageName"
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
                      name="packageDescription"
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
                    <FormItem>
                      <FormLabel>Price • (₱)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setPackagePrice(value);
                            setDiscountedAmount(value - total);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormField
                      control={form.control}
                      name="startingDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starting Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .slice(0, 10)
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
                      name="endingDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ending Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .slice(0, 10)
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
                    {selectedType === "Company" && (
                      <>
                        <FormItem>
                          <FormLabel>Package Discount Amount</FormLabel>
                          <FormControl>
                            <Input
                              value={companyDiscount}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              onChange={(e) => {
                                setCompanyDiscount(Number(e.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>

                        <FormItem>
                          <FormLabel>Employee Discount(%)</FormLabel>
                          <FormControl>
                            <Input
                              value={companyPercentDiscount}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              onChange={(e) => {
                                setCompanyPercentDiscount(
                                  Number(e.target.value)
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* ends here */}
            <div className="bg-background mt-4 shadow-sm rounded-lg">
              <h2 className="font-bold text-lg bg-primary text-white rounded-t-lg pl-2">
                Select Individual Test to Add to Package
              </h2>
              <div className="grid grid-cols-1 p-4 md:p-5">
                <div className="space-y-2">
                  {labtest?.map((test) => (
                    <FormField
                      key={test.id}
                      control={form.control}
                      name="packages"
                      render={({ field }) => {
                        const isChecked = field.value?.some(
                          (selectedItem: PackageItemDto) =>
                            selectedItem.itemName === test.testName
                        );

                        const currentItem: PackageItemDto = {
                          itemName: test.testName,
                          itemPrice: Number(test.price),
                        };

                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  const updated = checked
                                    ? [...(field.value || []), currentItem]
                                    : field.value?.filter(
                                        (i: PackageItemDto) =>
                                          i.itemName !== currentItem.itemName
                                      ) || [];
                                  field.onChange(updated);
                                  let updatedSelected;
                                  if (checked) {
                                    updatedSelected = [
                                      ...selectedTests,
                                      test.id,
                                    ];
                                  } else {
                                    updatedSelected = selectedTests.filter(
                                      (id) => id !== test.id
                                    );
                                  }
                                  setSelectedTests(updatedSelected);

                                  const totalSelected = labtest
                                    .filter((test) =>
                                      updatedSelected.includes(test.id)
                                    )
                                    .reduce(
                                      (sum, test) =>
                                        sum + parseFloat(test.price),
                                      0
                                    );

                                  setTotal(totalSelected);
                                  setDiscountedAmount(
                                    packagePrice - totalSelected
                                  );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>{test.testName}</FormLabel>
                              <FormDescription>₱{test.price}</FormDescription>
                            </div>
                          </FormItem>
                        );
                      }}
                    />
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
            <Separator />
            <div className="flex flex-col md:flex-row justify-between items-center mt-5">
              <Link href={"/settings"}>
                <Button type="button" className="cursor-pointer" size="lg">
                  <ArrowLeft />
                  Go Back
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-[#11C7BC] cursor-pointer"
                size="lg"
              >
                <Save /> Save Package
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

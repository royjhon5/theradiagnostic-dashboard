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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useEditPackage from "../hooks/useEditPackage";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { PackageItemDto } from "@/types/DTO/LaboratoryPackage.dto";
import useGetLaboratoryTest from "../../laboratory-test/hooks/useGetLaboratoryTest";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function AddLabTest() {
  const searchParams = useSearchParams();
  const { form, onSubmit } = useEditPackage();
  const { labtest } = useGetLaboratoryTest();
  const [packagePrice, setPackagePrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }

  const filteredTests = labtest?.filter((test) =>
    test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        form.reset({
          id: parsedData.id ?? 0,
          packageName: parsedData.packageName ?? "",
          packages: parsedData.packages ?? [],
          totalPrice: parsedData.totalPrice ?? "",
        });
        setPackagePrice(Number(parsedData.totalPrice ?? 0)); // ← ADD THIS
      } catch (err) {
        console.error("Invalid data param:", err);
      }
    }
  }, [searchParams, form]);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold">
          <h2 className="text-2xl">Update Laboratory Test</h2>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      name="totalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price • (₱)</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {/* ends here */}
                <div className="bg-background mt-4 shadow-sm rounded-lg">
                  <h2 className="font-bold text-lg bg-primary text-white rounded-t-lg pl-2">
                    Select Individual Test to Add to Package
                  </h2>
                  <div className="p-3">
                    <Input
                      type="text"
                      placeholder="Search test name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-[50%]"
                    />
                  </div>
                  <div className="grid grid-cols-1 p-4 md:p-5">
                    <ScrollArea className="h-90">
                      <div className="space-y-2 ">
                        {filteredTests?.map((test) => (
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
                                          ? [
                                              ...(field.value || []),
                                              currentItem,
                                            ]
                                          : field.value?.filter(
                                              (i: PackageItemDto) =>
                                                i.itemName !==
                                                currentItem.itemName
                                            ) || [];
                                        field.onChange(updated);
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>{test.testName}</FormLabel>
                                    <FormDescription>
                                      ₱{test.price}
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                    {/* left side */}
                    <div className="flex flex-row gap-2 items-center"></div>
                    {/* right side */}
                    <div>
                      <div className="text-sm text-gray-600">Package Price</div>
                      <div className="flex">
                        <div className="text-2xl font-bold">
                          ₱ {packagePrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col md:flex-row justify-between items-center mt-5">
                  <Link
                    href={"/settings/test-package"}
                    className="w-full md:w-auto"
                  >
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
                    <Save /> Update Package
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

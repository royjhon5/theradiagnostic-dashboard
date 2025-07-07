"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import {
  Listbox,
  ListboxItem,
  ListboxItemIndicator,
} from "@/components/ui/listbox";
import { Stepper } from "@/components/ui/stepper";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { steps } from "../data";
import useGetLaboratoryPackage from "@/app/settings/test-package/hooks/useGetLaboratoryPackage";
import useGetLaboratoryTest from "@/app/settings/laboratory-test/hooks/useGetLaboratoryTest";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { BaseResponseType } from "@/types/BaseResponse";
import { addToCart } from "@/app/api/services/cart.api";
import { AxiosError } from "axios";
import useGetCart from "../hooks/useGetCart";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import useRemoveCart from "../hooks/useRemoveCart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const Services = () => {
  const { labtest } = useGetLaboratoryTest();
  const { laboratoryPackage } = useGetLaboratoryPackage();
  const { removeCart } = useRemoveCart();
  const { setLoading } = useAppLoaderContext();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const raw = searchParams.get("clientId");
  let currentId: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      currentId = JSON.parse(decoded);
    } catch (error) {
      console.error("Error parsing row data:", error);
    }
  }

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: async (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("successfully added");
        queryClient.invalidateQueries({ queryKey: ["getcart", currentId] });
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const { cartdata, totalAmount } = useGetCart(currentId);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [filterType, setFilterType] = useState<
    "all" | "labTest" | "laboratoryPackage"
  >("all");

  const combinedServices = useMemo(
    () => [
      ...labtest.map((test) => ({
        type: "labTest",
        id: test.id,
        name: test.testName,
        description: test.testCategory,
        price: test.price,
      })),
      ...laboratoryPackage.map((pkg) => ({
        type: "laboratoryPackage",
        id: pkg.id,
        name: pkg.packageName,
        description: pkg.packages.map((p) => p.itemName).join(", "),
        price: pkg.totalPrice,
      })),
    ],
    [labtest, laboratoryPackage]
  );

  const filteredServices = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase();
    return combinedServices.filter((item) => {
      const matchesType = filterType === "all" || item.type === filterType;
      const matchesSearch =
        item.name.toLowerCase().includes(lowerSearch) ||
        item.description.toLowerCase().includes(lowerSearch);
      return matchesType && matchesSearch;
    });
  }, [combinedServices, filterType, searchQuery]);

  const ProceedToPayment = () => {
    setLoading(true);
    try {
      router.push(`/client-registration/payment?clientId=${currentId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold">
          <h2 className="text-2xl">Service Package</h2>
          <DynamicBreadcrumb />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="col-span-2">
            <div className="w-full flex items-center justify-between mb-4 bg-background shadow-sm p-4 rounded-lg border">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              />
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => setFilterType("all")}
                className="px-3 py-1 rounded-lg cursor-pointer"
              >
                All
              </Button>
              <Button
                onClick={() => setFilterType("labTest")}
                className="px-3 py-1 rounded-lg cursor-pointer"
              >
                Lab Tests
              </Button>
              <Button
                onClick={() => setFilterType("laboratoryPackage")}
                className="px-3 py-1 rounded-lg cursor-pointer"
              >
                Packages
              </Button>
            </div>

            {/* FILTERED SERVICES */}
            <div className="bg-background rounded-lg p-2 shadow-md">
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-5 w-[50%]"
              />
              <ScrollArea className="w-full h-72">
                <Listbox className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredServices.map((item) => (
                    <ListboxItem
                      key={`${item.type}-${item.id}`}
                      value={item.name}
                      className="cursor-pointer"
                      onClick={() => {
                        if (!currentId) {
                          toast.error("Client ID not found.");
                          return;
                        }

                        const payload = {
                          clientId: currentId,
                          packageId:
                            item.type === "laboratoryPackage" ? item.id : 0,
                          labTestId: item.type === "labTest" ? item.id : 0,
                          totalAmount: Number(item.price),
                        };

                        setLoading(true);
                        mutate(payload);
                      }}
                    >
                      <div className="w-full flex flex-row justify-between items-start">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {item.description}
                          </div>
                        </div>
                        ₱ {item.price}
                      </div>
                      <ListboxItemIndicator />
                    </ListboxItem>
                  ))}
                </Listbox>
              </ScrollArea>
            </div>
          </div>
          {cartdata.length > 0 && (
            <div>
              <div className="w-full bg-background p-5 shadow-md rounded-lg">
                <h2 className="text-3xl text-center">Selected Services</h2>
                <Separator className="mt-2 mb-5" />
                {cartdata.map((item) => (
                  <div
                    key={
                      item.labTestId !== 0
                        ? `labtest-${item.labTestId}`
                        : `package-${item.packageId}`
                    }
                    className="flex justify-between mb-2"
                  >
                    <p>
                      {item.labTestId !== 0 ? item.testName : item.packageName}
                    </p>
                    <div className="flex flex-row gap-4">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="size-6 cursor-pointer"
                        onClick={() => removeCart(item.id)}
                      >
                        <Trash2 />
                      </Button>
                      <p>
                        ₱
                        {item.labTestId !== 0
                          ? item.price.toFixed(2)
                          : item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end text-2xl font-bold mt-5">
                  Total: ₱{totalAmount.toFixed(2)}
                </div>
                <div>
                  <Button
                    className="w-full mt-10"
                    size="xl"
                    onClick={ProceedToPayment}
                  >
                    Proceed to payment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;

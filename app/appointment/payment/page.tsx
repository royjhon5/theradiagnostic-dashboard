"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { Stepper } from "@/components/ui/stepper";
import { useState } from "react";
import { steps } from "../client-registration/data";
import { Button } from "@/components/ui/button";
import { SaveAll } from "lucide-react";
import useGetPackageById from "@/app/settings/test-package/hooks/useGetLaboratoryPackageById";
import { useRouter, useSearchParams } from "next/navigation";
import useGetClientById from "@/app/client-list/client/useGetClientById";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "@/app/api/services/transaction.api";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { AxiosError } from "axios";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AppSocket } from "@/lib/socketClient";

export default function PaymentSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const socket = AppSocket();
  const { setLoading } = useAppLoaderContext();
  const packageId = searchParams.get("packageId");
  const clientId = searchParams.get("clientId");
  const [currentStep, setCurrentStep] = useState(3);
  const { PackageData } = useGetPackageById(Number(packageId));
  const { clientData } = useGetClientById(Number(clientId));
  const [paymentTypes, setPaymentTypes] = useState<string>("");
  const [paymentReference, setPaymentReference] = useState<string>("");
  const { mutate } = useMutation({
    mutationFn: createTransaction,
    onSuccess: async (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Payment Successfully Processed.");
        sessionStorage.setItem("paymentCompleted", "true");
        router.push(
          `/appointment/success?clientId=${clientId}&packageId=${packageId}`
        );
        socket.emit("submitClient");
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = ({
    clientId,
    packageId,
    paymentType,
    paymentReference,
  }: {
    clientId: number | string;
    packageId: number | string;
    paymentType: string;
    paymentReference: string;
  }) => {
    if (!clientId || !packageId) {
      toast.error("Missing client or package ID.");
      return;
    }

    setLoading(true);

    mutate({
      clientId: Number(clientId),
      packageId: Number(packageId),
      amountPaid: PackageData[0]?.totalPrice.toString() || "0",
      paymentType: paymentType,
      paymentReference: paymentReference.trim() || "N/A",
    });
  };

  // useEffect(() => {
  //   const isPaymentCompleted = sessionStorage.getItem("paymentCompleted");
  //   if (isPaymentCompleted === "true") {
  //     router.replace("/appointment");
  //   } else {
  //     sessionStorage.removeItem("paymentCompleted");
  //   }
  // }, [router]);

  return (
    <div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold">
            <h2 className="text-2xl">Payment Section</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3 mt-4">
            <div className="col-span-2">
              <div className="w-full justify-between flex items-center mb-4 bg-background shadow-sm p-4 rounded-lg border">
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                />
              </div>
              <div className="flex justify-center items-center grid grid-cols-1 md:grid-cols-1 mt-5">
                <div className="w-full bg-background rounded-lg shadow-sm p-8">
                  <div className="flex justify-between mb-8">
                    <h1 className="text-2xl font-medium text-primary">
                      Payment Receipt
                    </h1>
                    <div className="text-right">
                      <p className="font-medium">Benidokto Ramor</p>
                      <p className="text-sm text-gray-500">Performed by:</p>
                    </div>
                  </div>
                  {clientData.map((item) => (
                    <div key={item.id} className="grid grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Client Name:</p>
                          <p>
                            {item.firstName} {item.middleName} {item.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address:</p>
                          <p>
                            {item.currentAddress}, {item.barangay}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">
                            Contact Number:
                          </p>
                          <p>{item.activePhoneNumber}</p>
                        </div>
                        <div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Select Payment Type</Label>
                            <Select
                              onValueChange={(value) => setPaymentTypes(value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Payment Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="cash">Cash</SelectItem>
                                  <SelectItem value="card">Card</SelectItem>
                                  <SelectItem value="gcash">G-Cash</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div>
                        {(paymentTypes === "card" ||
                          paymentTypes === "gcash") && (
                          <div className="space-y-2">
                            <Label htmlFor="refNo">
                              Enter Reference Number
                            </Label>
                            <Input
                              value={paymentReference}
                              onChange={(e) => {
                                setPaymentReference(e.target.value);
                              }}
                              id="refNo"
                              placeholder="Enter reference number..."
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="border rounded-md overflow-hidden mb-4">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="py-2 px-4 text-left">Service Avail</th>
                          <th className="py-2 px-4 text-right">Cost</th>
                          <th className="py-2 px-4 text-right">Total</th>
                        </tr>
                      </thead>
                      {PackageData.map((item) => (
                        <tbody key={item.id} className="divide-y">
                          <tr className="h-16">
                            <td className="py-3 px-4">{item.packageName}</td>
                            <td className="py-3 px-4 text-right">
                              ₱ {item.totalPrice}
                            </td>
                            <td className="py-3 px-4 text-right">
                              ₱ {item.totalPrice}
                            </td>
                          </tr>
                          <tr className="h-16"></tr>
                          <tr className="h-16"></tr>
                          <tr>
                            <td
                              className="py-3 px-4 font-medium"
                              colSpan={1}
                            ></td>
                            <td className="py-3 px-4 text-right font-medium">
                              Subtotal
                            </td>
                            <td className="py-3 px-4 text-right font-medium">
                              ₱ {item.totalPrice}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                  <div className="flex justify-end mb-4">
                    <Button
                      size="xl"
                      className="cursor-pointer"
                      onClick={() =>
                        onSubmit({
                          clientId: Number(clientId),
                          packageId: Number(packageId),
                          paymentType: paymentTypes,
                          paymentReference: paymentReference,
                        })
                      }
                    >
                      <SaveAll />
                      Submit Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

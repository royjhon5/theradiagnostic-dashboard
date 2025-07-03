"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { Stepper } from "@/components/ui/stepper";
import { useRef, useState } from "react";
import { steps } from "../data";
import { Button } from "@/components/ui/button";
import { SaveAll } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
import useGetCart from "../hooks/useGetCart";
import { Socket } from "socket.io-client";
import useGetClientById from "@/app/client-list/hooks/useGetClientById";

export default function PaymentSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setLoading } = useAppLoaderContext();
  const clientId = searchParams.get("clientId");
  const [currentStep, setCurrentStep] = useState(3);
  const { clientData } = useGetClientById(Number(clientId));
  const [paymentTypes, setPaymentTypes] = useState<string>("");
  const [paymentReference, setPaymentReference] = useState<string>("");
  const [AmountPaid, setAmounPaid] = useState("");
  const { cartdata, totalAmount } = useGetCart(Number(clientId));
  const socketRef = useRef<Socket | null>(null);
  const { mutate } = useMutation({
    mutationFn: createTransaction,
    onSuccess: async (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Payment Successfully Processed.");
        router.push(`/client-registration/success?clientId=${clientId}`);
        socketRef.current?.emit("submitClient");
        socketRef.current?.emit("SendToClientReceiving");
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
    paymentType,
    paymentReference,
  }: {
    clientId: number | string;
    paymentType: string;
    paymentReference: string;
  }) => {
    if (!clientId) {
      toast.error("Missing client or package ID.");
      return;
    }
    setLoading(true);
    mutate({
      clientId: Number(clientId),
      amountPaid: AmountPaid,
      paymentType: paymentType,
      paymentReference: paymentReference.trim() || "N/A",
      totalAmount: totalAmount,
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold">
            <h2 className="text-2xl">Payment Section</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 flex flex-col gap-3 mt-4">
            <div className="col-span-3">
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
                  </div>
                  {clientData.map((item) => (
                    <div key={item.id} className="grid grid-cols-2 gap-8 mb-4">
                      <div>
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
                      <div>
                        <div className="space-y-2">
                          <Label>Enter amount</Label>
                          <Input
                            value={AmountPaid}
                            onChange={(e) => {
                              setAmounPaid(e.target.value);
                            }}
                            placeholder="Enter amount"
                          />
                        </div>
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
                      {cartdata.map((item) => (
                        <tbody
                          key={
                            item.labTestId !== 0
                              ? `labtest-${item.labTestId}`
                              : `package-${item.packageId}`
                          }
                          className="divide-y"
                        >
                          <tr className="h-16">
                            <td className="py-3 px-4">
                              {item.labTestId !== 0
                                ? item.testName
                                : item.packageName}
                            </td>
                            <td className="py-3 px-4 text-right">
                              ₱{" "}
                              {item.labTestId !== 0
                                ? item.price.toFixed(2)
                                : item.totalPrice.toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              ₱{" "}
                              {item.labTestId !== 0
                                ? item.price.toFixed(2)
                                : item.totalPrice.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                      <tbody>
                        <tr>
                          <td
                            className="py-3 px-4 font-medium"
                            colSpan={1}
                          ></td>
                          <td className="py-3 px-4 text-right font-medium">
                            Subtotal
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            ₱ {totalAmount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mb-4">
                    <Button
                      size="xl"
                      className="cursor-pointer"
                      onClick={() =>
                        onSubmit({
                          clientId: Number(clientId),
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

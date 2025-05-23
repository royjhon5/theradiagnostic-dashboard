"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { Stepper } from "@/components/ui/stepper";
import { useState } from "react";
import { steps } from "../client-registration/data";
import { Button } from "@/components/ui/button";
import { SaveAll } from "lucide-react";

export default function PaymentSection() {
  const [currentStep, setCurrentStep] = useState(3);
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

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Client Name:</p>
                        <p>Frank Mendoza</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address:</p>
                        <p>Cogon Market</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Contact Number:</p>
                        <p>+63987-654-6541</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Address:</p>
                        <p>F@geemel.com</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date:</p>
                      <p>December 24, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Receipt No.</p>
                      <p>TDRN - 003-123-4444</p>
                    </div>
                  </div>

                  <div className="border rounded-md overflow-hidden mb-4">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="py-2 px-4 text-left">Service Avail</th>
                          <th className="py-2 px-4 text-right">Cost</th>
                          <th className="py-2 px-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-3 px-4">
                            Comprehensive Metabolic Panel
                          </td>
                          <td className="py-3 px-4 text-right">PHP 1,500</td>
                          <td className="py-3 px-4 text-right">PHP 1,500</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            Comprehensive Metabolic Panel
                          </td>
                          <td className="py-3 px-4 text-right">PHP 1,500</td>
                          <td className="py-3 px-4 text-right">PHP 1,500</td>
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
                            PHP 3,000.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mb-4">
                    <Button size="xl" className="cursor-pointer">
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

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export default function PatientDashboard() {
  return (
    <Card className="w-full shadow border">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium text-zinc-800">Patiens</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200">
            Today <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Chart and Total */}
        <div className="flex items-center gap-8 mb-8">
          {/* Circular Progress */}
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f1f1f1"
                strokeWidth="12"
              />
              {/* Progress Circle - 70% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#0DD3C5"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="75.36"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">70%</span>
            </div>
          </div>

          {/* Total Patients */}
          <div>
            <p className="text-zinc-600 mb-1">Total Patients</p>
            <h3 className="text-4xl font-bold">500</h3>
          </div>
        </div>

        {/* Stats Boxes */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-zinc-200 text-center">
            <p className="text-xl font-bold">250</p>
            <p className="text-zinc-500 text-sm">In-Patient</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 text-center">
            <p className="text-xl font-bold">150</p>
            <p className="text-zinc-500 text-sm">Out-Patient</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 text-center">
            <p className="text-xl font-bold">100</p>
            <p className="text-zinc-500 text-sm">Consultancy</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center p-2 pt-0">
        <a href="#" className="text-sm text-emerald-500 font-bold">
          See All
        </a>
      </CardFooter>
    </Card>
  );
}

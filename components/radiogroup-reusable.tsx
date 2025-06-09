"use client";

import type React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface RadioGroupFullyNumericProps {
  label?: string;
  value: number; // 1 for yes, 0 for no
  onValueChange: (value: number) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}

const RedioGroupReusable: React.FC<RadioGroupFullyNumericProps> = ({
  label,
  value,
  onValueChange,
  inputValue,
  onInputChange,
}) => {
  const handleRadioChange = (stringValue: string) => {
    const numValue = stringValue === "yes" ? 1 : 0;
    onValueChange(numValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value || "";
    onInputChange(numValue);
  };

  return (
    <RadioGroup
      name={label}
      className="flex gap-5 items-center mt-2"
      value={value === 1 ? "yes" : "no"}
      onValueChange={handleRadioChange}
    >
      <div className="w-50">{label}</div>
      <div className="w-20 flex justify-center">
        <RadioGroupItem value="yes" />
      </div>
      <div className="w-20 flex justify-center">
        <RadioGroupItem value="no" />
      </div>
      <div className="flex-1">
        <Input
          type="number"
          className="w-full"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </RadioGroup>
  );
};

export default RedioGroupReusable;

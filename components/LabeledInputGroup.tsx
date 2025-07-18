import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

type InputField = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
};

type LabeledInputGroupProps = {
  title: ReactNode;
  fields: InputField[];
};

export function LabeledInputGroup({ title, fields }: LabeledInputGroupProps) {
  return (
    <div className="w-full mt-4">
      <h2 className="text-sm text-right mt-2 w-[70%]">{title}</h2>
      {fields.map((field, index) => (
        <div key={index} className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            name={field.name}
          />
        </div>
      ))}
    </div>
  );
}

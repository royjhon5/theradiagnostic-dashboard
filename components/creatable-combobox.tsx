// components/ui/creatable-combobox.tsx
import * as React from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

type Option = {
  label: string;
  value: string;
};

type CreatableComboboxProps = {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export function CreatableCombobox({
  options,
  value,
  onChange,
  placeholder = "Select or type...",
}: CreatableComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  const selectedLabel = options.find((o) => o.value === value)?.label || value;

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    setInput(""); // reset input after selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "w-[80%] flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            !value && "text-muted-foreground"
          )}
          onClick={() => setOpen(!open)}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type or select"
            value={input}
            onValueChange={(val) => setInput(val)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                handleSelect(input.trim());
                e.preventDefault();
              }
            }}
          />
          <CommandEmpty>
            <div className="px-2 py-1 text-sm">
              Press <kbd>Enter</kbd> to create {input}
            </div>
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

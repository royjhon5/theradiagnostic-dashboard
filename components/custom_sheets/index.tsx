"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeSelector } from "../theme-selector";
import { Label } from "../ui/label";
import { FontSelector } from "../font-selector";

const CustomSheets: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          >
            <Settings />
          </motion.div>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-clip-padding w-full border-0">
        <div className="relative z-10 ">
          <SheetHeader>
            <SheetTitle>App Settings</SheetTitle>
            <SheetDescription>Make changes to your app here.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-1.5 p-4">
            <div className="w-full mb-5">
              <Label className="mb-2">Custom Presets</Label>
              <ThemeSelector />
            </div>
            <div className="w-full mb-5">
              <Label className="mb-2">Custom Fonts</Label>
              <FontSelector />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheets;

"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import CustomSheets from "./custom_sheets";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function SiteHeader() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lightSwitcher = () => {
    if (!mounted) return;
    const thememode = theme === "dark" ? "light" : "dark";
    setTheme(thememode);
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.3 } },
  };
  return (
    <header className="sticky top-0 z-30 flex h-(--header-height) backdrop-blur-lg bg-background shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <div className="ml-auto flex items-center gap-2">
          {mounted && (
            <Button
              onClick={lightSwitcher}
              size="sm"
              variant="outline"
              className="cursor-pointer"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
                </motion.span>
              </AnimatePresence>
            </Button>
          )}
          <CustomSheets />
        </div>
      </div>
    </header>
  );
}

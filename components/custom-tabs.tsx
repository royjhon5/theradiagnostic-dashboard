import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
};

interface CustomTabsProps {
  defaultValue: string;
  tabItems: TabItem[];
  className?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  defaultValue,
  tabItems,
  className,
}) => {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList>
        {tabItems.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabItems.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;

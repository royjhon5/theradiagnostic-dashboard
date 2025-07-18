import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type AccordionSection = {
  name: string | string[]; // <- updated
  value: string;
  title: string;
  content: React.ReactNode;
};

type ReusableAccordionProps = {
  sections: AccordionSection[];
  tests: { testName: string }[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
};

export function ReusableAccordion({
  sections,
  tests,
  type = "single",
  collapsible = true,
  defaultValue,
  className = "w-full",
}: ReusableAccordionProps) {
  const activeTestNames = tests.map((t) => t.testName);

  const filteredSections = sections.filter((section) => {
    const sectionNames = Array.isArray(section.name)
      ? section.name
      : [section.name];
    return sectionNames.some((name) => activeTestNames.includes(name));
  });

  if (filteredSections.length === 0) return null;

  const items = filteredSections.map(({ value, title, content }) => (
    <AccordionItem key={value} value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance p-2">
        {content}
      </AccordionContent>
    </AccordionItem>
  ));

  if (type === "multiple") {
    return (
      <Accordion
        type="multiple"
        defaultValue={defaultValue as string[] | undefined}
        className={className}
      >
        {items}
      </Accordion>
    );
  }

  return (
    <Accordion
      type={type}
      collapsible={collapsible}
      defaultValue={defaultValue as string | undefined}
      className={className}
    >
      {items}
    </Accordion>
  );
}

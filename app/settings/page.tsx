"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Database,
  FileText,
  Languages,
  LineChart,
  LinkIcon,
  Microscope,
  Shield,
  Signature,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Settings() {
  const router = useRouter();
  const [loadingCardId, setLoadingCardId] = useState<string | null>(null);
  const settingsCards = [
    {
      id: "laboratory-test",
      title: "Add Laboratory Test",
      icon: <Microscope size={36} />,
      route: "/settings/laboratory-test",
      content: [
        "Adding a laboratory test integrates new diagnostic procedures into the lab information system, cataloging essential details like name, category, pricing, and preparation instructions, which enhances diagnostic capabilities and improves patient care.",
      ],
    },
    {
      id: "pricing",
      title: "Pricing & Package Settings",
      icon: <LineChart size={36} />,
      route: "/settings/test-package",
      content: [
        "Pricing and Discounts: Configure standard pricing for services and manage discount structures.",
        "Tax Settings: Set up tax rules and calculations applicable to billing.",
      ],
    },
    {
      id: "user-management",
      title: "User Management",
      icon: <User size={36} />,
      route: "/settings/user-management",
      content: [
        "Add/Remove Users: Options to create new user accounts and remove existing ones.",
        "Role and Permission Settings: Assign or modify user roles and access levels to ensure appropriate permissions.",
        "Password Management: Tools for resetting passwords or enforcing password policies.",
      ],
    },
    {
      id: "employers",
      title: "Employers-Settings",
      icon: <FileText size={36} />,
      route: "/settings/employers-settings",
      content: [
        "Manager Employers Profiles.",
        "Associate Patients/Employees.",
        "Data Access and Permissions.",
        "Reporting and Analytics.",
      ],
    },
    {
      id: "discounts",
      title: "Discount Settings",
      icon: <FileText size={36} />,
      route: "/settings/discount",
      content: ["Discount Templates: Customize discount settings"],
    },
    {
      id: "signatory",
      title: "Signatory",
      icon: <Signature size={36} />,
      route: "/settings/signatory",
      content: [
        "Manage authorized signatories, add new entries, and view the complete list of existing signatories.",
      ],
    },
    {
      id: "security",
      title: "Security Settings",
      icon: <Shield size={36} />,
      route: "#",
      content: [
        "Access Controls: Manage security protocols for accessing the system, implementing multi-factor authentication if necessary.",
        "Audit Logs: Configure monitoring of user actions and changes to sensitive data to maintain data integrity and security.",
      ],
    },
    {
      id: "integration",
      title: "Integration Settings",
      icon: <LinkIcon size={36} />,
      route: "#",
      content: [
        "API Management: Set up and configure APIs for integration with other healthcare applications or third-party software.",
        "Data Import/Export Options: Manage data exchange settings to ensure smooth interoperability with other systems.",
      ],
      badge: "Available Soon",
      disabled: true,
    },
    {
      id: "backup",
      title: "Backup & Recovery",
      icon: <Database size={36} />,
      route: "#",
      content: [
        "Data Backup Frequency: Configure settings for automatic data backups to safeguard client and transaction information.",
        "Data Recovery Options: Guidelines and settings for restoring data in the event of loss or corruption.",
      ],
    },
    {
      id: "preferences",
      title: "General Preferences",
      icon: <Languages size={36} />,
      route: "#",
      content: [
        "Language and Regional Settings: Adjust language preferences and configure regional settings such as date formats and currency.",
        "Time Zone Settings: Set the appropriate time zone for all date/time scheduling functionalities.",
      ],
    },
  ];
  const handleCardClick = (
    route: string,
    disabled = false,
    cardId?: string
  ) => {
    if (!disabled && cardId) {
      setLoadingCardId(cardId);
      setTimeout(() => {
        router.push(route);
      }, 300);
    }
  };
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
          <h2 className="text-2xl">Settings</h2>
          <DynamicBreadcrumb />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settingsCards.map((card) => (
                <Card
                  key={card.id}
                  className={`border rounded-md relative transition-all duration-200 ${
                    !card.disabled
                      ? "hover:shadow-md hover:border-sky-200 cursor-pointer"
                      : "opacity-80 cursor-default"
                  }`}
                  onClick={() =>
                    handleCardClick(card.route, card.disabled, card.id)
                  }
                  tabIndex={card.disabled ? -1 : 0}
                  role="button"
                  aria-disabled={card.disabled}
                >
                  {card.badge && (
                    <Badge className="absolute top-2 right-2 bg-sky-500 text-white">
                      {card.badge}
                    </Badge>
                  )}

                  {loadingCardId === card.id && (
                    <div className="absolute inset-0 z-10 bg-white bg-opacity-60 flex items-center justify-center rounded-md">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-sky-500" />
                    </div>
                  )}
                  <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center text-sky-500 mb-2">
                      {card.icon}
                    </div>
                    <CardTitle className="text-center text-sky-500 mb-4">
                      {card.title}
                    </CardTitle>
                    <ul className="text-sm space-y-2 text-gray-600">
                      {card.content.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

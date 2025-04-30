import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleX,
} from "@tabler/icons-react";

export const statuses = [
  {
    value: "completed",
    label: "Completed",
    icon: IconCircle,
  },
  {
    value: "pending",
    label: "Pending",
    icon: IconCircle,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: IconCircleX,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: IconArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: IconArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: IconArrowUp,
  },
];

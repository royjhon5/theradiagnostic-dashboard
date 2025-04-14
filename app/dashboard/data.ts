import type { TimelineElement } from "@/types";

export const timelineData: TimelineElement[] = [
  {
    id: 1,
    title: "First event",
    date: "2022-01-01",
    description: "Lorem ipsum dolor ",
    status: "completed",
  },
  {
    id: 2,
    title: "Second event",
    date: "2022-02-01",
    description: "Aut eius excepturi ex",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Third event",
    date: "2022-03-01",
    description: "Sit culpa quas ex",
    status: "pending",
  },
];

export type TimelineData = TimelineElement;

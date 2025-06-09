import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import QueueUI from "./ui/QueueUi";

export default function QueueManagement() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
          <h2 className="text-2xl">Queue Management</h2>
          <DynamicBreadcrumb />
        </div>
        <div>
          <QueueUI />
        </div>
      </div>
    </div>
  );
}

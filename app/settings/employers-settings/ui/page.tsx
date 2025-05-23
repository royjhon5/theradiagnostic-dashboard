import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Cookies from "js-cookie";
import MainProvider from "../context/context-provider";
import useEmployer from "../hooks/useEmployer";
import { globalListSchema } from "../schema/schema";
import { columns } from "../components/column-header";
import { DataTable } from "../components/data-table";
import { DialogContainer } from "../components/dialog-container";

export default function EmplyersUI() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }
  const { employer } = useEmployer();
  const result = globalListSchema.parse(employer);
  return (
    <MainProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div className="col-span-2">
          <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 md:justify-between">
              {/* Avatar */}
              <div className="flex flex-row gap-2 items-center">
                <Avatar className="w-15 h-15">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                  <p style={{ fontSize: 10 }}>Performed by:</p>
                  <p className="text-md font-bold">{Username}</p>
                  <p className="text-sm">ID: {userId}</p>
                </div>
              </div>
              {/* right side */}
              <div className="flex flex-col justify-end md:text-right">
                <p className="text-md font-bold">{formattedDate}</p>
                <p style={{ fontSize: 10 }}>Date of Addition</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <DataTable data={result} columns={columns} />
          </div>
        </div>
      </div>
      <DialogContainer />
    </MainProvider>
  );
}

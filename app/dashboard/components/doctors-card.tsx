import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DoctorsListing() {
  return (
    <Card className="w-full border">
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <h2 className="text-lg font-medium">Doctors</h2>
        <a href="#" className="text-sm text-emerald-500 font-medium">
          See All
        </a>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="grid grid-cols-3 mb-2">
          <div className="text-sm text-zinc-500 ">Name</div>
          <div className="text-sm text-zinc-500 text-center">Specialist</div>
          <div className="text-sm text-zinc-500 text-center">Status</div>
        </div>

        <div className="space-y-3">
          {/* Doctor 1 */}
          <div className="grid grid-cols-3 items-center py-2 px-3 bg-zinc-100 rounded-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="Marcus Curtis" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-center">
                Marcus Curtis
              </span>
            </div>
            <div className="text-sm text-zinc-500 text-center">Oncology</div>
            <div className="text-sm font-medium text-red-500 text-center">
              Full
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="grid grid-cols-3 items-center py-2 px-3 bg-zinc-100 rounded-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="Gretchen Calzoni" />
                <AvatarFallback>GC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Gretchen Calzoni</span>
            </div>
            <div className="text-sm text-zinc-500 text-center">Dentist</div>
            <div className="text-sm font-medium text-green-500 text-center">
              Available
            </div>
          </div>

          {/* Doctor 3 */}
          <div className="grid grid-cols-3 items-center py-2 px-3 bg-zinc-100 rounded-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="Marcus Curtis" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Marcus Curtis</span>
            </div>
            <div className="text-sm text-zinc-500 text-center">Neurologist</div>
            <div className="text-sm font-medium text-red-500 text-center">
              Full
            </div>
          </div>

          {/* Doctor 4 */}
          <div className="grid grid-cols-3 items-center py-2 px-3 bg-zinc-100 rounded-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="Craig Rosser" />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Craig Rosser</span>
            </div>
            <div className="text-sm text-zinc-500 text-center">
              Cardiologist
            </div>
            <div className="text-sm font-medium text-green-500 text-center">
              Available
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

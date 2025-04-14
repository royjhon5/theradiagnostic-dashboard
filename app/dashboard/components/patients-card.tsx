import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PatientListing() {
  return (
    <Card className="w-full shadow border">
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <h2 className="text-lg font-medium">Client</h2>
        <a href="#" className="text-sm text-emerald-500 font-medium">
          See All
        </a>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="grid grid-cols-3 mb-2">
          <div className="text-sm text-zinc-500 ">Name</div>
          <div className="text-sm text-zinc-500 text-center">Appointment</div>
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
              <span className="text-sm font-medium text-center">Ann Bella</span>
            </div>
            <div className="text-sm text-zinc-500 text-center">OB Test</div>
            <div className="text-sm font-medium text-red-500 text-center">
              On-going
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="grid grid-cols-3 items-center py-2 px-3 bg-zinc-100 rounded-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="Gretchen Calzoni" />
                <AvatarFallback>GC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">John Doe</span>
            </div>
            <div className="text-sm text-zinc-500 text-center">UTI</div>
            <div className="text-sm font-medium text-green-500 text-center">
              Done
            </div>
          </div>

          {/* Doctor 3 */}
          <div className="grid grid-cols-3 items-center py-2 px-3 bg-zinc-100 rounded-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="Marcus Curtis" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Jane Doe</span>
            </div>
            <div className="text-sm text-zinc-500 text-center">Cancer</div>
            <div className="text-sm font-medium text-red-500 text-center">
              On-going
            </div>
          </div>

          {/* Doctor 4 */}
          <div className="grid grid-cols-3 items-center py-2 px-3 bg-zinc-100 rounded-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="Craig Rosser" />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Eren Yaeger</span>
            </div>
            <div className="text-sm text-zinc-500 text-center">
              Brain Cancer
            </div>
            <div className="text-sm font-medium text-green-500 text-center">
              Done
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

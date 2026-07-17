import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search leads, listings..." className="pl-9" />
      </div>
      <Avatar>
        <AvatarFallback className="bg-accent text-accent-foreground">
          OP
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
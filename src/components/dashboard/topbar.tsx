import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search leads, listings..." className="border-border/80 bg-muted/40 pl-9 focus-visible:bg-background" />
      </div>
      <Link href="/dashboard/settings" aria-label="Go to settings">
        <Avatar className="ring-2 ring-accent/20 transition-transform hover:scale-105">
          <AvatarFallback className="bg-accent font-heading text-accent-foreground">
            OP
          </AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}

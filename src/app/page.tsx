import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="p-6">
        <CardContent>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </main>
  );
}
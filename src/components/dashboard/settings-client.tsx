"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AtSign, Link2, Users, Video, Check, Pencil } from "lucide-react";
import { AVATAR_COLORS } from "@/lib/avatar-colors";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  brokerage: string | null;
  avatar_color: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  tiktok: string | null;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function SettingsClient({ user }: { user: UserProfile | null }) {
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [brokerage, setBrokerage] = useState(user?.brokerage ?? "");
  const [avatarColor, setAvatarColor] = useState(user?.avatar_color ?? "#C8A15A");
  const [instagram, setInstagram] = useState(user?.instagram ?? "");
  const [facebook, setFacebook] = useState(user?.facebook ?? "");
  const [linkedin, setLinkedin] = useState(user?.linkedin ?? "");
  const [tiktok, setTiktok] = useState(user?.tiktok ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  async function saveProfile() {
    setSaving(true);
    const response = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, brokerage, avatarColor, instagram, facebook, linkedin, tiktok }),
    });
    setSaving(false);
    if (response.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-card p-5 shadow-sm">
        <Popover>
          <PopoverTrigger className="group relative">
            <Avatar className="h-14 w-14 ring-2 ring-accent/20 transition-transform group-hover:scale-105">
              <AvatarFallback
                className="font-heading text-lg text-white"
                style={{ backgroundColor: avatarColor }}
              >
                {user ? initials(user.name) : "OP"}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-sm ring-1 ring-border transition-opacity group-hover:opacity-100">
              <Pencil className="h-2.5 w-2.5" />
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="start">
            <p className="mb-3 text-sm font-medium text-foreground">Choose a color</p>
            <div className="flex flex-wrap gap-2">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setAvatarColor(c.value)}
                  title={c.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c.value,
                    borderColor: avatarColor === c.value ? "var(--foreground)" : "transparent",
                  }}
                >
                  {avatarColor === c.value && <Check className="h-4 w-4 text-white" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your profile, notifications, and account</p>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <CardTitle className="font-heading text-base font-semibold text-foreground">
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email ?? ""} disabled className="opacity-60" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="brokerage">Brokerage</Label>
                  <Input id="brokerage" value={brokerage} onChange={(e) => setBrokerage(e.target.value)} />
                </div>
              </div>

              <Button onClick={saveProfile} disabled={saving}>
                {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-4">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <CardTitle className="font-heading text-base font-semibold text-foreground">
                Social Profiles
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Link your social handles to make your Operaum profile feel like a polished business card.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-5">
              <div className="space-y-1">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <AtSign className="h-4 w-4 text-muted-foreground" /> Instagram
                </Label>
                <Input id="instagram" placeholder="@yourhandle" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" /> Facebook
                </Label>
                <Input id="facebook" placeholder="facebook.com/yourpage" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-muted-foreground" /> LinkedIn
                </Label>
                <Input id="linkedin" placeholder="linkedin.com/in/yourname" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="tiktok" className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-muted-foreground" /> TikTok
                </Label>
                <Input id="tiktok" placeholder="@yourhandle" value={tiktok} onChange={(e) => setTiktok(e.target.value)} />
              </div>
              <Button onClick={saveProfile} disabled={saving}>
                {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <CardTitle className="font-heading text-base font-semibold text-foreground">
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email notifications</p>
                  <p className="text-sm text-muted-foreground">Get updates on new leads and messages</p>
                </div>
                <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">SMS notifications</p>
                  <p className="text-sm text-muted-foreground">Text alerts for urgent updates</p>
                </div>
                <Switch checked={smsNotifs} onCheckedChange={setSmsNotifs} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">AI suggestions</p>
                  <p className="text-sm text-muted-foreground">Let your AI assistant proactively suggest actions</p>
                </div>
                <Switch checked={aiSuggestions} onCheckedChange={setAiSuggestions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-4">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <CardTitle className="font-heading text-base font-semibold text-foreground">
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-5">
              <div className="space-y-1">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button>Update Password</Button>
              <Separator />
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <p className="text-sm font-medium text-destructive">Danger Zone</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
                <Button variant="destructive" className="mt-3">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

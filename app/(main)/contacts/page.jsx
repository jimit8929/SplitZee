"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, User } from "lucide-react";
import { CreateGroupModal } from "./_components/create-group-modal";

export default function ContactsPage() {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);

  useEffect(() => {
    const createGroupParam = searchParams.get("createGroup");
    if (createGroupParam === "true") {
      setIsCreateGroupModalOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("createGroup");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-2xl px-4">
          <BarLoader width="100%" color="#36d7b7"/>
        </div>
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold">Contacts</h1>
        <Button
          onClick={() => setIsCreateGroupModalOpen(true)}
          className="mt-4 sm:mt-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Individual Contacts */}
        <section>
          <h2 className="flex items-center text-2xl font-medium mb-4">
            <User className="mr-2 h-5 w-5" />
            People
          </h2>
          {users.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-sm">
                No contacts yet. Add an expense to see them here.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <Link key={user.id} href={`/person/${user.id}`}>
                  <Card className="transition-shadow hover:shadow-md cursor-pointer">
                    <CardContent className="flex items-center py-4">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Groups */}
        <section>
          <h2 className="flex items-center text-2xl font-medium mb-4">
            <Users className="mr-2 h-5 w-5" />
            Groups
          </h2>
          {groups.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-sm">
                No groups yet. Create one to start tracking shared expenses.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <Link key={group.id} href={`/groups/${group.id}`}>
                  <Card className="transition-shadow hover:shadow-md cursor-pointer">
                    <CardContent className="flex items-center py-4">
                      <div className="flex items-center mr-4">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {group.memberCount} members
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => {
          router.push(`/groups/${groupId}`);
        }}
      />
    </div>
  );
}

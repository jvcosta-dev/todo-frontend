import { LogOut, Trash2 } from "lucide-react";
import Page from "../components/Page";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { DeleteAccount } from "../components/profile/DeleteAccount";

export function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, deleteUser } = useAuth();
  return (
    <Page title="Profile" description="manage your account and logout">
      <section className="flex flex-col gap-6 md:justify-between h-full">
        <div className="flex flex-col gap-3">
          <img
            src={`/${user.imageUrl}`}
            alt={`${user.name} profile page`}
            className="object-cover h-12 w-12 rounded-full bg-primary"
          />
          <div>
            <span>Name: </span>
            <h1>{user.name}</h1>
          </div>
          <div>
            <span>Email: </span>
            <h2>{user.email}</h2>
          </div>
        </div>

        <div className="flex md:justify-end items-center gap-4">
          <Button type="button" danger click={() => setIsOpen(true)}>
            <Trash2 />
            Delete Account
          </Button>
          <Button type="button" danger click={logout}>
            <LogOut />
            Logout
          </Button>
        </div>
      </section>
      <DeleteAccount
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => {
          deleteUser();
          logout();
        }}
      />
    </Page>
  );
}

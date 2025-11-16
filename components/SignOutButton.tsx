"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { SignOutEmail } from "@/actions/AuthEmailAction";

interface SignOutButtonProps {
  name?: string;
  email?: string;
  accountVerified?: boolean;
  subscription?: string;
}

const SignOutButton = ({
  name,
  email,
  accountVerified,
  subscription = "Free",
}: SignOutButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User className="cursor-pointer" width={34} height={34} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <span className="font-semibold">Name</span> : {name}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="font-semibold">Email</span> : {email}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="font-semibold">Account Verified</span> :{" "}
          {accountVerified ? "Verified" : "Not Verified"}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="font-semibold">Subscription</span> : {subscription}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <Button
            onClick={async () => await SignOutEmail()}
            className=" cursor-pointer bg-blue-600 hover:bg-blue-700"
          >
            Sign Out
          </Button>{" "}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SignOutButton;

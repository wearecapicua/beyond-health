import Button from "components/Button";
import Avatar from "components/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import FormButton from "./forms/form-button";

type Props = {};

const LoginButton = (props: Props) => {
  const session = useSession();
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "authenticated" && session.data?.user) {
    return (
      <div>
        <p className="mb-2">Welcome back!</p>
        <div className="mb-2">
          {session.data.user.image && (
            <Avatar
              name={session.data.user.name || ""}
              picture={{
                url: session.data.user.image,
                dimensions: {
                  width: 64,
                  height: 64,
                },
                alt: session.data.user.name || null,
                copyright: null,
              }}
            />
          )}
        </div>
        <FormButton type="submit" text="Login" onClick={() => signIn("google")}/>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    );
  }

  return <Button onClick={() => signIn("google")}>Login</Button>;
};

export default LoginButton;

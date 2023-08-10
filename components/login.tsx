import Avatar from "components/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

type Props = {};

const LoginButton = (props: Props) => {
  const session = useSession();
  if (session.status === "authenticated" && session.data?.user) {
    return (
      <>
        <button onClick={() => signOut()} className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">Log Out</button>
        {session.data.user.image && (
          <Avatar
            // name={session.data.user.name || ""}
            picture={{
              url: session.data.user.image,
              dimensions: {
                width: 40,
                height: 40,
              },
              alt: session.data.user.name || null,
              copyright: null,
            }}
          />
        )}
      </>
    );
  }
  return <button onClick={() => signIn("google")} className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">Log In</button>;
};

export default LoginButton;

import Avatar from "components/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

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

        <button
          onClick={() => signOut()}
          className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-1 px-4 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="my-2 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-1 px-4 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
    >
      Login
    </button>
  );
};

export default LoginButton;

import { useState } from 'react'
import Avatar from "components/avatar"
import { signIn, signOut as nextAuthSignOut, useSession } from "next-auth/react"
import React from "react"
import { createCustomerPortalSession } from "lib/stripeUtils"

type Props = {};

const LoginButton = (props: Props) => {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const signOut = async () => {
    localStorage.removeItem('form-status-store');
    localStorage.removeItem('form-store');
    await nextAuthSignOut({ callbackUrl: '/' })
  };

  if (session.status === "authenticated" && session.data?.user) {

    const handlePortalClick = async () => {
      setLoading(true);
      const portalUrl = await createCustomerPortalSession();
  
      if (portalUrl) {
        window.location.href = portalUrl; // Redirect to the Customer Portal
      }
      setLoading(false);
    };

    return (
      <>
        <button onClick={() => signOut()} className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">Log Out</button>
        {session.data.user.image && (
          <button onClick={handlePortalClick} disabled={loading}>
            <Avatar
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
          </button>
        )}
      </>
    );
  }
  return <button onClick={() => signIn("google")} className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">Log In</button>;
};

export default LoginButton;

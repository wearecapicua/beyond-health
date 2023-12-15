import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "components/container";
import Layout from "components/layout";
import FormHeader from "components/forms/form-header";
import FormButton from "components/forms/form-button";
import { signIn } from "next-auth/react";
import useLoginStore from "store/login"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { getProfileData } from "lib/api/supabase";
import { useFormStore } from 'store/useFormStore';

type LoginProps = {
  preview: boolean;
  login: boolean;
  fullPage: boolean;
}

export default function LoginPage({ preview }: LoginProps) {
  const session = useSession();
  const router = useRouter();
  const userLoggedIn = session.status === "authenticated" && session.data?.user;
  const [profileData, setProfileData] = useState();
  const { updateFormStore } = useFormStore();
  const { loginState, setLoginState } = useLoginStore()
  const [loginDetails, setLoginDetails] = useState({
    titleText: "Log In",
    subtitleText: "Sign in to start your visit.",
    buttonText: "Log in with Google",
    loginSpan: "Don't have an account? ",
    loginLink: "Sign Up",
    image: "/images/login_image.jpg"
  });

  useEffect(() => {
    setLoginDetails({
      titleText: loginState ? "Log In" : "Sign Up",
      subtitleText: loginState ? "Sign in to start your visit." : "Create an account to start your visit.",
      buttonText: loginState ? "Log in with Google" : "Sign up with Google",
      loginSpan: loginState ? "Don't have an account? " : "Already have an account? ",
      loginLink: loginState ? "Sign Up" : "Log In",
      image: loginState ? "/images/login_image.jpg" : "/images/signup_image.jpg"
    });
  }, [loginState]);

  useEffect(() => {
    const getUserProfileData = async () => {
      const userProfileData = await getProfileData();

      setProfileData(userProfileData);
    }
    
    if (!profileData) {
      getUserProfileData();
    }

    if (userLoggedIn && profileData) {
      updateFormStore(profileData);
    }

  }, [userLoggedIn, profileData]);

  if (userLoggedIn) {
    router.push('/form/step-1');
    return null;
  }

  const handleToggle = () => {
    setLoginState(!loginState);
  };

  return (
    <Layout preview={preview} fullPage >
      <Head>
        <title>Beyond Health</title>
      </Head>
      <Container>
        <div className="flex h-[calc(100vh-4.5rem)] flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <FormHeader title={loginDetails.titleText} subtitle={loginDetails.subtitleText} />
              <div className="mt-4 pb-20">
                <FormButton type="submit" text={loginDetails.buttonText} icon="google" onClick={() => signIn("google")}/>
                <div className="mt-10 text-center">
                  <span className="bg-white px-6 text-gray-900">{loginDetails.loginSpan}
                    <button className="underline" onClick={handleToggle}>{loginDetails.loginLink}</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="py-12 hidden w-0 flex-1 lg:block">
            <img
              className="h-full w-full rounded-3xl object-cover"
              src={loginDetails.image}
              alt="login image"
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
}


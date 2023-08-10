import Head from "next/head";
import Container from "components/container";
import Layout from "components/layout";
import FormHeader from "components/forms/form-header";
import FormButton from "components/forms/form-button";
import { signIn } from "next-auth/react";
import useLoginStore from "store/login"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

type LoginProps = {
  preview: boolean;
  login: boolean;
  fullPage: boolean;
}

export default function LoginPage({ preview }: LoginProps) {
  const session = useSession();
  const router = useRouter();
  const userLoggedIn = session.status === "authenticated" && session.data?.user

  const { loginState, setLoginState } = useLoginStore()
  const titleText = loginState ? "Log In" : "Sign Up"
  const subtitleText = loginState ? "Sign in to start your visit." : "Create an account to start your visit."
  const buttonText = loginState ? "Log in with Google" : "Sign up with Google"
  const loginSpan = loginState ? "Don't have an account? " : "Already have an account? "
  const loginLink = loginState ? "Sign Up" : "Log In"
  const image = loginState ? "/images/login_image.jpg" : "/images/signup_image.jpg"

  if (userLoggedIn) {
    router.push('/form/step-one');
    return null;
  }

  return (
    <Layout preview={preview} fullPage >
      <Head>
        <title>Beyond Health</title>
      </Head>
      <Container>
        <div className="flex h-[calc(100vh-4.5rem)] flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <FormHeader title={titleText} subtitle={subtitleText} />
              <div className="mt-4 pb-20">
                <FormButton type="submit" text={buttonText} icon="google" onClick={() => signIn("google")}/>
                <div className="mt-10 text-center">
                  <span className="bg-white px-6 text-gray-900">{loginSpan}
                    <button className="underline" onClick={() => setLoginState(!loginState)}>{loginLink}</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="py-12 hidden w-0 flex-1 lg:block">
            <img
              className="h-full w-full rounded-3xl object-cover"
              src={image}
              alt="login image"
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
}


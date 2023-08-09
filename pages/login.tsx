import Head from "next/head";
import Container from "components/container";
import Layout from "components/layout";
import FormHeader from "components/forms/form-header";
import FormButton from "components/forms/form-button";
import { signIn, signOut } from "next-auth/react";

type LoginProps = {
  preview: boolean;
  login: boolean;
  setLogin: () => void;
  fullPage: boolean;
}

export default function LoginPage({ preview, login }: LoginProps) {
  const titleText = login ? "Login" : "Sign Up"
  const subtitleText = login ? "Sign in to start your visit." : "Create an account to start your visit."
  const buttonText = login ? "Login with Google" : "Sign Up with Google"

  return (
    <>
      <Layout preview={preview} fullPage >
        <Head>
          <title>Beyond Health</title>
        </Head>
        <div className="min-h-screen">
          <Container>
            <div className="flex min-h-full flex-1">
              <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                <FormHeader title={titleText} subtitle={subtitleText} />
                  <div className="mt-10">
                    <FormButton type="submit" text={buttonText} icon="google" onClick={() => signIn("google")}/>
                    <div className="mt-10 text-center">
                      <span className="bg-white px-6 text-gray-900">{"Don't have an account? "}
                        <button className="underline" >Sign Up</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden w-0 flex-1 lg:block">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                  alt=""
                />
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
}


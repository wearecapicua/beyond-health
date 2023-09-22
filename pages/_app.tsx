import React, { useEffect } from "react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../lib/prismic";
import "../styles/index.css";
import App, { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { getFormStatus } from "lib/supabaseUtils";
import { useFormStatusStore } from 'store/useFormStatusStore';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { setFormStep } = useFormStatusStore()

  useEffect(() => {
    async function fetchFormStatus() {
      const formStatus = await getFormStatus();
      setFormStep(formStatus)
    }
    fetchFormStatus();
  }, []);

  return (
    <PrismicPreview repositoryName={repositoryName}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </PrismicPreview>
  );
};

export default MyApp;

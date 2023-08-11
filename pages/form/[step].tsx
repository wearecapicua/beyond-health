import React, { useState } from "react";
import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Layout from 'components/layout';
import Container from 'components/container';
import FormStepper from 'components/forms/form-stepper';
import FormButton from 'components/forms/form-button';
import FormContainer from 'components/forms/form-container';
import { incrementString, decrementString } from "utils"
import { useRouter } from "next/router";

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData }: StepProps) => {
  const [activeStep, setActiveStep] = useState(formData.step);
  const router = useRouter();
  const FormStepContent = require(`components/forms/steps/${activeStep}`).default;

  const nextPage = () => {
    const next = incrementString(formData.step)
    setActiveStep(next)
    router.push(`/form/${next}`);
  }
  const prevPage = () => {
    const next = decrementString(formData.step)
    setActiveStep(next)
    router.push(`/form/${next}`);
  }

  return (
    <Layout fullPage>
      <Container>
        <FormStepper />
      </Container>
      <div className="max-w-screen-md mx-auto">
        <FormStepContent />
      </div>
      <FormContainer>
        <div className="flex flex-col gap-4 pt-6">
          <FormButton text="Next" type="submit" style="solid" onClick={nextPage} />
          <FormButton text="Save for later" type="submit" style="outline"/>
          <FormButton text="Go Back" type="submit" onClick={prevPage} />
        </div>
      </FormContainer>
      
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  // if (!session?.user) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   };
  // }
  // @ts-ignore
  const { step } = context.params;
  const formFilePath = path.join(process.cwd(), 'components/forms/steps', `${step}.tsx`);
  const formContent = fs.readFileSync(formFilePath, 'utf8');

  return {
    props: {
      formData: {
        step,
        content: formContent,
      },
      //user: session.user,
    },
  };
}

export default FormStep;

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
import { FormProvider, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
});

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData }: StepProps) => {
  const [activeStep, setActiveStep] = useState(formData.step);
  const router = useRouter();
  const FormStepContent = require(`components/forms/steps/${activeStep}`).default;

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    //defaultValues: useMemo(() => state, [state]),
  });
  const { handleSubmit, trigger } = methods;
  
  const prevPage = () => {
    const next = decrementString(formData.step)
    setActiveStep(next)
    router.push(`/form/${next}`);
  }
  const onSubmit = async (data: any) => {
    const isStepValid = await trigger();
   
    console.log("data", data)
    console.log("valid", isStepValid)
    if (isStepValid) {
      const next = incrementString(formData.step)
      setActiveStep(next)
      router.push(`/form/${next}`);
    }
    console.log(isStepValid);
  }

  return (
    <Layout fullPage>
      <Container>
        <FormStepper />
      </Container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-screen-md mx-auto">
            <FormStepContent />
          </div>
          <FormContainer>
            <div className="flex flex-col gap-4 py-6">
              <FormButton text="Next" type="submit" style="solid"  />
              <FormButton text="Save for later" type="button" style="outline"/>
              <FormButton text="Go Back" type="button" onClick={prevPage} />
            </div>
          </FormContainer>
        </form>
      </FormProvider>
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

import React, { useState, useEffect, useCallback } from "react";
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
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, IFormProps } from "utils/forms/form-schema";
import { formSteps, FormStep, stepExists } from "components/forms/steps/form-steps";


type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData }: StepProps) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormStep>(formData.step)
  const StepComponent = formSteps[activeStep]

  const methods = useForm<IFormProps>({
    resolver: zodResolver(schema)as unknown as Resolver<IFormProps>,
    mode: "onBlur",
    //defaultValues: useMemo(() => state, [state]),
  });
  const { handleSubmit, trigger } = methods;
  
  const prevPage = () => {
    const next = decrementString(formData.step)
    setActiveStep(next)
    router.push(`/form/${next}`);
  }
  const onSubmit: SubmitHandler<IFormProps> = async (data: any) => {
    const isStepValid = await trigger();
    console.log("data", data)

    if (isStepValid) {
      const next = incrementString(formData.step)
      setActiveStep(next)
      router.push(`/form/${next}`);
    }
  }

  return (
    <Layout fullPage>
      <Container>
        <FormStepper />
      </Container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-screen-md mx-auto">
          <StepComponent/>
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

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  const step = context.params?.step?.toString() ?? ""
 
  if (!stepExists(step)) { return { notFound: true } }

  const formFilePath = path.join(process.cwd(), 'components/forms/steps', `${step}.tsx`);
  const formContent = fs.readFileSync(formFilePath, 'utf8');

  return {
    props: {
      formData: {
        step,
        content: formContent,
      },
      user: session.user,
    },
  };
}

export default FormStep;

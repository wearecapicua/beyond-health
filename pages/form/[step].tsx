import React, { useState } from "react";
import { getSession } from 'next-auth/react';
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
import axios from 'axios';

import { useFormStore } from 'store/useFormStore';


type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData }: StepProps) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormStep>(formData.step)
  const StepComponent = formSteps[activeStep]

  const { formStore, updateFormStore } = useFormStore();
  
  console.log("state", formStore)

  const currentSchema = schema[activeStep];
  const methods = useForm<IFormProps>({
    resolver: zodResolver(currentSchema)as unknown as Resolver<IFormProps>,
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
      updateFormStore(data);

      const next = incrementString(formData.step)
      setActiveStep(next)
      router.push(`/form/${next}`);
    }
  }
  const handleSave = async () => {
    try {
      const response = await axios.post('/api/jotform', formStore);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Layout fullPage>
      <Container>
        <FormStepper />
      </Container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepComponent/>
          <FormContainer>
            <div className="flex flex-col gap-4 py-6">
              <FormButton text="Next" type="submit" style="solid"  />
              <FormButton text="Save for later" type="button" style="outline" onClick={handleSave}/>
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
  
  const step = context.params?.step?.toString() ?? ""
 
  if (!stepExists(step)) { return { notFound: true } }

  return {
    props: {
      formData: {
        step
      },
      //user: session.user,
    },
  };
}

export default FormStep;

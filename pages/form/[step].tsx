import React, { useState, useEffect } from "react";
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
import useRepository from "lib/hooks/useRepository";
import { useFormStore } from 'store/useFormStore';
import { useProductStore } from 'store/useProductStore';

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const endpoints = useRepository(({ jotform }) => ({
  submissions: jotform.submissions,
  updateJotformId: jotform.updateJotformId
}));

const FormStep = ({ formData, products }: StepProps) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormStep>(formData.step)
  const StepComponent = formSteps[activeStep]

  const numericSplit = activeStep.replace("step-", "")
  const numericStep = parseInt(numericSplit, 10)

  const { formStore, updateFormStore } = useFormStore()
  const { updateProductStore } = useProductStore()
  
  console.log("state", formStore)

  useEffect(() => {
    updateProductStore(products.productsWithPrices)
  }, []);

  const currentSchema = schema[activeStep];

 
  const methods = useForm<IFormProps>({
    resolver: zodResolver(currentSchema)as unknown as Resolver<IFormProps>,
    mode: "onBlur",
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

  const handleSave = async (data: any) => {
    const isStepValid = await trigger();

    if (isStepValid) {
      updateFormStore(data);
      
      const updatedData = { ...formStore, ...data};
   
     // endpoints.submissions.updateSubmission('5685559061518721844', updatedData)
      //endpoints.submissions.createSubmission(updatedData)
      endpoints.updateJotformId('0617eaea-86f6-4494-acbd-086ffb5bd774', '5685559061518721844')
      .then(
        (data: any) => {
          console.log('Form submitted successfully:', data);
      })
      .catch(
        (error: any) => {
          console.error('Error submitting form:', error);
        }
      );
    }
  }

  return (
    <Layout fullPage>
      <Container>
        <FormStepper activeStep={numericStep} />
      </Container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepComponent />
          <FormContainer>
            <div className="flex flex-col gap-4 py-6">
              <FormButton text="Next" type="submit" style="solid"  />
              <FormButton text="Save for later" type="button" style="outline" onClick={handleSubmit(handleSave)}/>
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

  const res = await fetch(`${process.env.HOST}/api/all-products`);
  const products = await res.json();

  return {
    props: {
      products,
      formData: {
        step
      },
      user: session.user,
    },
  };
}

export default FormStep;

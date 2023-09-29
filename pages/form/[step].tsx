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
import { useFormStore } from 'store/useFormStore';
import { useProductStore } from 'store/useProductStore';
import env from "lib/env";
import useStripe from "lib/useStripe";
import {
  createUserProfile,
  captureUserPayment,
  uploadImages,
  getImages
} from "lib/api/supabase";
import { sendUpdatedData } from "lib/api/supabase";
import { filterFormData } from "utils/forms/prop-filter";
import { useFormStatusStore } from 'store/useFormStatusStore';
import { toast } from 'react-toastify';
import Snackbar from "components/snackbar";

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData, products, userId, user }: StepProps) => {
  // console.log("users", user)
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormStep>(formData.step)
  const StepComponent = formSteps[activeStep]
  const stripe = useStripe();

  const numericSplit = activeStep.replace("step-", "")
  const numericStep = parseInt(numericSplit, 10)
  
  const { formStep, setFormStep } = useFormStatusStore()
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

  const handleCheckout = async (data: any) => {
    if (!stripe) {
      console.error("Failed to load Stripe.js");
      return;
    }
    const updatedData = { ...formStore, ...data, form_step: activeStep }
    const { filteredBillingData } = filterFormData(updatedData)
    const response = await captureUserPayment(filteredBillingData) as any
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    });
    console.error({ error });
    console.warn(error.message);
  };
  
  const prevPage = () => {
    const next = decrementString(formData.step)
    setActiveStep(next)
    router.push(`/form/${next}`);
  }
  console.log("form-step", formStep)

  const submitFormData = async (data: any) => {
    updateFormStore(data);
    const updatedData = { ...formStore, ...data, form_step: activeStep }
    const { filteredData } = filterFormData(updatedData)

    try {
      if (formStep) {
        return await sendUpdatedData(filteredData)
      } else {
        return await createUserProfile(filteredData)
      }
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    }
  }

  const onSubmit: SubmitHandler<IFormProps> = async (data: any) => {
    const isStepValid = await trigger();
    console.log("data", data)

    // if (isStepValid && activeStep === 'step-14') {
    //   uploadImages(data.picture)
    //   //getImages()
    // }

    if (isStepValid && activeStep !== "step-18") {
      updateFormStore(data);
      const next = incrementString(formData.step)
      setActiveStep(next)
      router.push(`/form/${next}`);
    } if (isStepValid && activeStep === "step-18") {
      const isSubmitSuccess = await submitFormData(data);
      if (isSubmitSuccess) {
        localStorage.removeItem('form-status-store');
        localStorage.removeItem('form-store');
        toast("Saving form data", {
          onClose: () => handleCheckout(data)
        })
      } else {
        toast.error("Form not saved successfully")
      }
    }
  }

  const handleSave = async (data: any) => {
    const isStepValid = await trigger();
    if (isStepValid) {
      const isSubmitSuccess = await submitFormData(data);
      if (isSubmitSuccess) {
        setFormStep(activeStep)
        toast.success("Form saved successfully", {
          onClose: () => router.push('/')
        })
      } else {
        toast.error("Form not saved successfully")
      }
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
              {activeStep === "step-18" ?
                <FormButton text="Go to Checkout" type="submit" style="solid"  />
              :
                <FormButton text="Next" type="submit" style="solid"  />
              }
              <FormButton text="Save for later" type="button" style="outline" onClick={handleSubmit(handleSave)}/>
              {activeStep !== "step-1" && <FormButton text="Go Back" type="button" onClick={prevPage} />}
              
            </div>
          </FormContainer>
        </form>
      </FormProvider>
      <Snackbar />
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

  const res = await fetch(`${env.host}/api/all-products`);
  const products = await res.json();

  return {
    props: {
      products,
      formData: {
        step
      },
      user: session.user,
      userId: session.user.id
    },
  };
}

export default FormStep;

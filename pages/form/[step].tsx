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
import { fetchPostJSON } from "lib/http";
import { type CheckoutSessionBody } from "pages/api/checkout_sessions/capture-payment";
import type Stripe from "stripe";
import { supabaseClient } from "lib/supabaseClient"; 
import { useSession } from "next-auth/react";


type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData, products, supabaseAccessToken, userId }: StepProps) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormStep>(formData.step)
  const StepComponent = formSteps[activeStep]
  const stripe = useStripe();

  const numericSplit = activeStep.replace("step-", "")
  const numericStep = parseInt(numericSplit, 10)

  const { formStore, updateFormStore } = useFormStore()
  const { updateProductStore } = useProductStore()

  console.log("state", formStore)

console.log("sbb", userId)
 
  useEffect(() => {
    async function getProfile() {
      const supabase = supabaseClient(supabaseAccessToken); // Call the function to get the Supabase client instance
      const { data } = await supabase
        .from('profile')
        .select('*')
        .eq('user_id', userId)
        .single();
      console.log("nmnm", data);
    }
    getProfile();
}, [supabaseClient]);

  useEffect(() => {
    updateProductStore(products.productsWithPrices)
  }, []);

  const currentSchema = schema[activeStep];

  const methods = useForm<IFormProps>({
    resolver: zodResolver(currentSchema)as unknown as Resolver<IFormProps>,
    mode: "onBlur",
  });
  
  const { handleSubmit, trigger } = methods;

  const handleCheckout = async (billingAddress: any) => {
    if (!stripe) {
      console.error("Failed to load Stripe.js");
      return;
    }
    const response = await fetchPostJSON<
      CheckoutSessionBody,
      Stripe.Checkout.Session
    >("/api/checkout_sessions/capture-payment", {
      productId: formStore.product.default_price,
      amount: formStore.product.price,
      billingAddress: billingAddress || formStore.billingAddress,
      shippingAddress: formStore.shippingAddress,
      name: `${formStore.firstName} ${formStore.lastName}`
    })
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
  const onSubmit: SubmitHandler<IFormProps> = async (data: any) => {
    const isStepValid = await trigger();
    const billingAddress = data.billingAddress
    console.log("data", data)

    if (isStepValid && activeStep !== "step-18") {
      updateFormStore(data);
      
      const next = incrementString(formData.step)
      setActiveStep(next)
      router.push(`/form/${next}`);
    } if (isStepValid && activeStep === "step-18") {
      updateFormStore(data);
      handleCheckout(billingAddress)
    }
  }

  const handleSave = async (data: any) => {
    
    // const isStepValid = await trigger();

    // if (isStepValid) {
    //   updateFormStore(data);

    //   const updatedData = { ...formStore, ...data};
   
    // }
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
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  console.log("sss", session)
  const { supabaseAccessToken } = session;

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
      userId: session.user.id,
      supabaseAccessToken: supabaseAccessToken
    },
  };
}

export default FormStep;

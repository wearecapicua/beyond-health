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
import { getProfileData, uploadImages, getImages } from "lib/supabaseUtils";
import { sendUpdatedData } from "lib/supabaseUtils";
import { filterFormData } from "utils/forms/prop-filter";

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData, products }: StepProps) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormStep>(formData.step)
  const StepComponent = formSteps[activeStep]
  const stripe = useStripe();

  const numericSplit = activeStep.replace("step-", "")
  const numericStep = parseInt(numericSplit, 10)

  const { formStore, updateFormStore } = useFormStore()
  const { updateProductStore } = useProductStore()

  console.log("state", formStore)
 
  useEffect(() => {
    async function fetchData() {
      const profileData = await getProfileData();
      console.log("profile", profileData);
    }
    fetchData();
}, []);

  useEffect(() => {
    updateProductStore(products.productsWithPrices)
  }, []);

  const currentSchema = schema[activeStep];

  const methods = useForm<IFormProps>({
    resolver: zodResolver(currentSchema)as unknown as Resolver<IFormProps>,
    mode: "onBlur",
  });
  
  const { handleSubmit, trigger } = methods;

  const handleCheckout = async (billing_address: any) => {
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
      billingAddress: billing_address || formStore.billing_address,
      shippingAddress: formStore.shipping_address,
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
    const billing_address = data.billing_address
    console.log("data", data)

    if (isStepValid && activeStep === 'step-14') {
      uploadImages(data.picture)
      //getImages()
    }

    if (isStepValid && activeStep !== "step-18") {
      updateFormStore(data);
      
      const next = incrementString(formData.step)
      setActiveStep(next)
      router.push(`/form/${next}`);
    } if (isStepValid && activeStep === "step-18") {
      updateFormStore(data);
      handleCheckout(billing_address)
    }
  }

  const handleSave = async (data: any) => {

    const isStepValid = await trigger();

    if (isStepValid) {
      updateFormStore(data);
      const updatedData = { ...formStore, ...data};
      const filteredData = filterFormData(updatedData )
      await sendUpdatedData(filteredData);
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
              <img src="https://xwnseddwrupggpwzwqin.supabase.co/storage/v1/object/sign/profile-images/pictures/30fa0955-9073-4b4f-a2fb-725fd561bc05/cat.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlLWltYWdlcy9waWN0dXJlcy8zMGZhMDk1NS05MDczLTRiNGYtYTJmYi03MjVmZDU2MWJjMDUvY2F0LmpwZyIsImlhdCI6MTY5NTIzNDA4MCwiZXhwIjoxNjk1MjM0MTQwfQ.jfMBDU-AJR_6FXwUMYORvH2OW-pW9p0yzhFxIzto7Oc"/>
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

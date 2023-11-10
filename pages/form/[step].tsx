import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Layout from "components/layout";
import Container from "components/container";
import FormStepper from "components/forms/form-stepper";
import FormButton from "components/forms/form-button";
import FormContainer from "components/forms/form-container";
import { incrementString, decrementString } from "utils";
import { useRouter } from "next/router";
import {
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, IFormProps } from "utils/forms/form-schema";
import {
  formSteps,
  FormStep,
  stepExists,
} from "components/forms/steps/form-steps";
import { useFormStore } from "store/useFormStore";
import { useProductStore } from "store/useProductStore";
import env from "lib/env";
import useStripe from "lib/useStripe";
import {
  createUserProfile,
  captureUserPayment,
  uploadImages,
} from "lib/api/supabase";
import { sendUpdatedData } from "lib/api/supabase";
import { filterFormData } from "utils/forms/prop-filter";
import { useFormStatusStore } from "store/useFormStatusStore";
import { toast } from "react-toastify";
import Snackbar from "components/snackbar";
import Spinner from "components/forms/spinner";
import { getNullFieldsAndMap } from "utils";

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const FormStep = ({ formData, products }: StepProps) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<FormStep>(formData.step);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const StepComponent = formSteps[activeStep];
  const stripe = useStripe();

  const numericSplit = activeStep.replace("step-", "");
  const numericStep = parseInt(numericSplit, 10);

  const { formStep, setFormStep } = useFormStatusStore();
  const { formStore, updateFormStore } = useFormStore();
  const { updateProductStore } = useProductStore();

  useEffect(() => {
    updateProductStore(products.productsWithPrices);
  }, []);

  const currentSchema = schema[activeStep];

  const methods = useForm<IFormProps>({
    resolver: zodResolver(currentSchema) as unknown as Resolver<IFormProps>,
    mode: "onBlur",
  });

  const { handleSubmit, trigger } = methods;

  const handleCheckout = async (data: any) => {
    if (!stripe) {
      console.error("Failed to load Stripe.js");
      return;
    }
    const updatedData = { ...formStore, ...data, form_step: activeStep };
    const { filteredBillingData } = filterFormData(updatedData);
    const response = (await captureUserPayment(filteredBillingData)) as any;
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    });
    setIsSaving(false)
    console.error({ error });
    console.warn(error.message);
  };

  const prevPage = () => {
    const next = decrementString(formData.step);
    setActiveStep(next);
    router.push(`/form/${next}`);
  };

  const submitFormData = async (data: any) => {
    updateFormStore(data);
    const updatedData = { ...formStore, ...data, form_step: activeStep };
    const { filteredData } = filterFormData(updatedData);

    try {
      if (formStep) {
        return await sendUpdatedData(filteredData);
      } else {
        return await createUserProfile(filteredData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      return false;
    }
  };

  const onSubmit: SubmitHandler<IFormProps> = async (data: any) => {
    const stepNum = parseInt(activeStep.split("-")[1]);
    const isStepValid = await trigger();

    if (isStepValid && activeStep === "step-14" && data.picture?.file) {
      const imageSaveData = await uploadImages(data.picture?.file);
      await sendUpdatedData({ profile_image_url: imageSaveData.data?.path });
      updateFormStore({ profile_image_url: imageSaveData?.data?.path, picture: null });
      const next = incrementString(formData.step);
      setActiveStep(next);
      router.push(`/form/${next}`);
    }

    if (isStepValid && activeStep === "step-15" && data.photo_id?.file) {
      const imageSaveData = await uploadImages(data.photo_id?.file);
      await sendUpdatedData({ photo_id_url: imageSaveData.data?.path });
      updateFormStore({ photo_id_url: imageSaveData?.data?.path, photo_id: null });
      const next = incrementString(formData.step);
      setActiveStep(next);
      router.push(`/form/${next}`);
    }

    if (isStepValid && activeStep === "step-16" && data.health_card?.file) {
      const imageSaveData = await uploadImages(data.health_card?.file);
      await sendUpdatedData({ health_card_image_url: imageSaveData.data?.path });
      updateFormStore({ health_card_image_url: imageSaveData?.data?.path, health_card: null });
      const next = incrementString(formData.step);
      setActiveStep(next);
      router.push(`/form/${next}`);
    }

    if (isStepValid && activeStep === "step-17" && data.insurance?.file) {
      const imageSaveData = await uploadImages(data.insurance?.file);
      await sendUpdatedData({ insurance_image_url: imageSaveData.data?.path });
      updateFormStore({ insurance_image_url: imageSaveData?.data?.path, insurance: null });
      const next = incrementString(formData.step);
      setActiveStep(next);
      router.push(`/form/${next}`);
    }

    if (isStepValid && ( stepNum === 14 && formStore.profile_image_url || 
      stepNum === 15 && formStore.photo_id_url || 
      stepNum === 16 && (formStore.health_card_image_url || !formStore.has_health_card) || 
      stepNum === 17 && formStore.insurance_image_url )) {
      updateFormStore(data);
      
      const next = incrementString(formData.step);
      setActiveStep(next);
      router.push(`/form/${next}`);
    }
    if(stepNum === 14 && formStore.profile_image_url === null && !data.picture?.file || 
      stepNum === 15 && formStore.photo_id_url === null && !data.photo_id?.file || 
      stepNum === 16 && formStore.health_card_image_url === null && data.has_health_card || 
      stepNum === 17 && formStore.insurance_image_url === null && data.has_insurance){
        toast.error("Please upload an image");
      }
    if (isStepValid && activeStep === "step-18") {
      const validateResults = getNullFieldsAndMap({ ...formStore, ...data })
      console.log("validate results ", validateResults)
     
      if (validateResults) {
        toast.error("Missing data in previous step", {
          onClose: () => {
            setActiveStep(validateResults as FormStep);
            router.push(`/form/${validateResults}`)
          },
        });
        return
      }
      setIsSaving(true)
      const isSubmitSuccess = await submitFormData(data);
      if (isSubmitSuccess) {
        handleCheckout(data)
      } else {
        toast.error("Form not saved successfully");
      }
    }
  };

  const handleSave = async (data: any) => {
    setIsSaving(true)
    const isStepValid = await trigger();
    if (isStepValid) {
      if (!data.profile_image_url && data.picture?.file) {
        const imageSaveData = await uploadImages(data.picture?.file);
        await sendUpdatedData({ profile_image_url: imageSaveData?.data?.path });
        updateFormStore({ profile_image_url: imageSaveData?.data?.path });
      }

      if (!data.photo_id_url && data.photo_id?.file) {
        const photoIdSaveData = await uploadImages(data.photo_id?.file);
        await sendUpdatedData({ photo_id_url: photoIdSaveData?.data?.path });
        updateFormStore({ photo_id_url: photoIdSaveData?.data?.path });
      }

      if (!data.health_card_image_url && data.health_card?.file) {
        const healthCardImageSaveData = await uploadImages(data.health_card?.file);
        await sendUpdatedData({ health_card_image_url: healthCardImageSaveData?.data?.path });
        updateFormStore({ health_card_image_url: healthCardImageSaveData?.data?.path });
      }

      if (!data.insurance_image_url && data.insurance?.file) {
        const insuranceImageSaveData = await uploadImages(data.insurance?.file);
        await sendUpdatedData({ insurance_image_url: insuranceImageSaveData?.data?.path });
        updateFormStore({ insurance_image_url: insuranceImageSaveData?.data?.path });
      }

      const isSubmitSuccess = await submitFormData(data);
      if (isSubmitSuccess) {
        setFormStep(activeStep);
        toast.success("Form saved successfully", {
          onClose: () => {
            router.push("/")
          },
        });
      } else {
        toast.error("Form not saved successfully");
      }
    }
  };

  return (
    <Layout fullPage>
      <Container>
        <FormStepper activeStep={numericStep} />
      </Container>
      {activeStep === "step-18" && isSaving?
        <div className="flex flex-col align-items justify-center h-[70vh] w-full">
          <Spinner />
        </div>
        :
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepComponent />
          <FormContainer>
            <div className="flex flex-col gap-4 py-6">
              {activeStep === "step-18" ? (
                <FormButton disabled={isSaving} text="Go to Checkout" type="submit" style="solid" />
              ) : (
                <FormButton disabled={isSaving} text="Next" type="submit" style="solid" />
              )}
              <FormButton
                disabled={isSaving}
                text="Save for later"
                type="button"
                style="outline"
                onClick={handleSubmit(handleSave)}
              />
              {activeStep !== "step-1" && (
                <FormButton disabled={isSaving} text="Go Back" type="button" onClick={prevPage} />
              )}
            </div>
          </FormContainer>
        </form>
      </FormProvider>
      }
      <Snackbar />
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const step = context.params?.step?.toString() ?? "";

  if (!stepExists(step)) {
    return { notFound: true };
  }

  const res = await fetch(`${env.host}/api/all-products`);
  const products = await res.json();

  const restwo = await fetch(`${env.host}/api/get-stripe-customer`);
  const stripes = await restwo.json();

  return {
    props: {
      products,
      formData: {
        step,
      },
      user: session.user,
    },
  };
}

export default FormStep;

import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Layout from 'components/layout';
import Container from 'components/container';
import FormStepper from 'components/forms/form-stepper';

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData, user }: StepProps) => {

  const FormStepContent = require(`components/forms/${formData.step}`).default;
  return (
    <Layout fullPage>
      <Container>
        <FormStepper />
        <FormStepContent />
      </Container>
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
  // @ts-ignore
  const { step } = context.params;
  const formFilePath = path.join(process.cwd(), 'components/forms', `${step}.tsx`);
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

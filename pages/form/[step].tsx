import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Layout from 'components/layout';
import Container from 'components/container';

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData, user }: StepProps) => {
  return (
    <Layout fullPage>
      <Container>
      <h1>Form Step: {formData.step}</h1>
      <p>Content of Step: {formData.content}</p>
      <p>Welcome, {user?.name}!</p>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login', // Redirect to the login page
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

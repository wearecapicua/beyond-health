import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';

const FormStep = ({ formData, user }) => {
  return (
    <div>
      <h1>Form Step: {formData.step}</h1>
      <p>Content of Step: {formData.content}</p>
      <p>Welcome, {user?.name}!</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login', // Redirect to the login page
        permanent: false,
      },
    };
  }

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





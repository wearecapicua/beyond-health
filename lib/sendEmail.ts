import { FormData } from '../components/contact-form';
import { fetchPostJSON } from "../lib/http";

export async function sendEmail(data: FormData) {
  try {
    const response = await fetchPostJSON('/api/email/route', {
      method: 'POST',
      data,
    });

    if (response) {
      const data = await response;
      console.log("Email sent ", data);
      return data; 
    } else {
      console.error('Error1:', response);
      return null;
    }
  } catch (error) {
    console.error('Error2:', error);
    return null;
  }
}
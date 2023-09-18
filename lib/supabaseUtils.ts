import { fetchPostJSON } from "lib/http";

export async function getProfileData() {
  const response = await fetchPostJSON('/api/get-profile', {
    method: 'POST',
  });
  return response;
}

export async function sendUpdatedData(updatedData: any) {
    const response = await fetchPostJSON('/api/update-profile', {
      method: 'PUT',
      updatedData
    });
  return response
}
import { fetchPostJSON, fetchGetJSON } from "lib/http";

export async function getProfileData() {
  const response = await fetchGetJSON('/api/get-profile');
  console.log(response)
  return response;
}

export async function getFormStatus() {
  const response = await fetchGetJSON('/api/get-form-status');
  console.log(response)
  return response;
}

export async function getImages() {
  const response = await fetchGetJSON('/api/upload-images');
  console.log(response)
return response
}

export async function sendUpdatedData(updatedData: any) {
  const response = await fetchPostJSON('/api/update-profile', {
    method: 'PUT',
    updatedData
  });
  return response
}

export async function createUserProfile(updatedData: any) {
  const response = await fetchPostJSON('/api/update-profile', {
    method: 'POST',
    updatedData
  });
  return response
}

export async function uploadImages(file: any) {
  const response = await fetchPostJSON('/api/upload-images', {
    method: 'POST',
    file
  });
  console.log(response)
return response
}

// export async function uploadImages(file: any) {
//   const body = new FormData();
//   body.append('file', file.fileObject);

//   const response = await fetch('/api/upload-images', {
//     method: 'POST',
//     headers: {
//       // Set the Content-Type to multipart/form-data
//       "Content-Type": "multipart/form-data",
//     },
//     body,
//   });
//   console.log(response)
//   return response
// }
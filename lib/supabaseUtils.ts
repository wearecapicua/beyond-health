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

export async function getImages() {
  const response = await fetchPostJSON('/api/upload-images');
  console.log(response)
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
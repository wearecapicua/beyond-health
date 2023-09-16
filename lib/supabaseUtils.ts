export async function getProfileData() {
  try {
    const response = await fetch('/api/get-profile', {
      method: 'POST',
    });

    if (response.ok) {
      const profileData = await response.json();
      console.log("dds", profileData)
      return profileData;
    } else {
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
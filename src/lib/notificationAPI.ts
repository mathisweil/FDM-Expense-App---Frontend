import axios, { AxiosResponse } from "axios";

async function createNotification(claim: Partial<Claim>): Promise<Claim> {
  try {
    console.log(claim);
    const response: AxiosResponse<Claim> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/claims/send-claim/`,
      claim,
      {
        withCredentials: true,
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
    }
    throw error;
  }
}

async function getNotifications(
  permission: string,
  employee_id: number,
  current: boolean
): Promise<Claim[]> {
  try {
    const response: AxiosResponse<Claim | Claim[]> = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/claims/get-claims/${employee_id}/${permission.toUpperCase()}/${current}/`,
      { withCredentials: true }
    );

    const notificationsArray: Claim[] = Array.isArray(response.data)
      ? response.data
      : [response.data];

    return notificationsArray;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
    }
    return [];
  }
}

async function deleteNotification(claim_id: number) {
  try {
    const response: AxiosResponse<Claim | Claim[]> = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/claims/delete-claim/${claim_id}/`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
    }
    throw error;
  }
}

export { createNotification, getNotifications, deleteNotification };

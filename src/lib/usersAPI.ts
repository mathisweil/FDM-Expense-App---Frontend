import axios, { AxiosResponse } from "axios";
import { User } from "@/types/User";

async function createUser(user: Partial<User>): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/create-user/`,
      user,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
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

async function getUsers(
  permission: string,
  employee_id: number
): Promise<User[]> {
  try {
    const response: AxiosResponse<User | User[]> = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/users/get-users/${permission.toUpperCase()}/${employee_id}/`,
      { withCredentials: true }
    );

    const usersArray: User[] = Array.isArray(response.data)
      ? response.data
      : [response.data];

    return usersArray;
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

async function getUser(
  employee_id: number
): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/get-user/${employee_id}`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
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

async function updateUser(
  user: Partial<User>,
  employee_id: number
) {
  try {
    const response: AxiosResponse<User> = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update-user/${employee_id}/`,
      user,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
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

async function deleteUser(employee_id: number) {
  try {
    const response: AxiosResponse<User> = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/delete-user/${employee_id}/`,
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

export { createUser, getUsers, getUser, updateUser, deleteUser};

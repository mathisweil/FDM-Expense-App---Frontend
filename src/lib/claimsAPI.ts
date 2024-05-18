import axios, { AxiosResponse } from "axios";
import { Claim } from "@/types/Claim";
import { formatCurrency, formatDate } from "@/lib/formatUtils";

async function createClaim(claim: Partial<Claim>): Promise<Claim> {
  try {
    const response: AxiosResponse<Claim> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/claims/send-claim/`,
      claim,
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

async function getClaims(
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

    const claimsArray: Claim[] = Array.isArray(response.data)
      ? response.data
      : [response.data];

    const transformedClaims = claimsArray.map((claim) => ({
      ...claim,
      currency: formatCurrency(claim.currency),
      approved_on: claim.approved_on ? formatDate(claim.approved_on) : undefined,
    }));

    return transformedClaims;
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

async function updateClaim(
  claim: Partial<Claim>,
  claim_id: number,
  employee_id: number
) {
  try {
    const response: AxiosResponse<Claim> = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/claims/update-claim/${claim_id}/${employee_id}/`,
      claim,
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

async function deleteClaim(claim_id: number) {
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

export { createClaim, getClaims, updateClaim, deleteClaim };

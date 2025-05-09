// import { HeaderType, subscriptionType } from "@/types/subsciption";
import apiClient from "./service";

const fileHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  }
}
//Get all subscriptions of a user  
export const getUserSubscriptions = async (userId: string) => {
  const response = await apiClient.get(`/subscriptions/user/${userId}`);
  return response.data;
};

// Create a Subscription
export const createSubscription = async (subscriptionData: FormData) => {
  const response = await apiClient.post("/subscriptions", subscriptionData, fileHeader);
  console.log(response);
  return response.data;
};

// Edit a Subscription
export const updateSubscription = async (subscriptionId: string, updateData: any) => {
  const response = await apiClient.put(`/subscriptions/${subscriptionId}`, updateData);
  return response.data;
};

// Delete a Subscription
export const deleteSubscription = async (subscriptionId: string) => {
  const response = await apiClient.delete(`/subscriptions/${subscriptionId}`);
  return response.data;
};

//Cancel a Subscription
export const cancelSubscription = async (subscriptionId: string) => {
  const response = await apiClient.put(`/cancel/${subscriptionId}`);
  return response.data;
}

//Get all renewal dates of a user
export const getUserSubscriptionRenewalDetails = async () => {
  const response = await apiClient.get('/upcoming-renewals');
  return response.data;
} 

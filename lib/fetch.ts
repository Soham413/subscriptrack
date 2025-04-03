import apiClient from "./service";

//Get all subscriptions of a user  
export const getUserSubscriptions = async (userId: string) => {
    const response = await apiClient.get(`/user/${userId}`);
    return response.data;
  };
  
  // Create a Subscription
  export const createSubscription = async (subscriptionData: subscriptionType) => {
    const response = await apiClient.post("/subscriptions", subscriptionData);
    return response.data;
  };
  
  // Edit a Subscription
  export const updateSubscription = async (subscriptionId: string, updateData: subscriptionType) => {
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

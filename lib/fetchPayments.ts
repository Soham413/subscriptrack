import apiClient from "./service";

export const getAllPayments = async() => {
    const response = await apiClient.get('/payments');
    return response.data
}

export const addPayment = async (id:string, subInfo: any) => {
    const response = await apiClient.post(`/payments/${id}`, subInfo)
    return response.data
}
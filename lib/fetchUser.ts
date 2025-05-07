import { loggedUserType, usersDataType } from "@/types/subsciption";
import apiClient from "./service";

export const signUp = async (usersData: usersDataType) => {
    const response = await apiClient.post('/auth/sign-up', usersData);
    return response.data;
}

export const signIn = async (usersData: loggedUserType) => {
    const response = await apiClient.post('/auth/sign-in', usersData);
    return response.data;
}

export const getUserDetails = async (userID:string) => {
    const response = await apiClient.get(`/users/${userID}`);
    return response.data
}

export const updateUser = async (id:string, userInfo: { name: any; email: any; password?: string }) => {
    const response = await apiClient.put(`/users/${id}`, userInfo)
    return response.data
}
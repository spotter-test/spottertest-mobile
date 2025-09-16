import React,{useState} from "react";
import { 
    SignUp,
    Login,
    updatePassword,
    getUser,
    UpdateUserData
} from "@/utils/api";

import { storeToken } from "@/utils/token";


export const useAuth = () => {
    const [_error,setError] = useState(false);
    const [notification,setNotification] = useState(false);


    const GetUser = async() => {
        const response: any = await getUser();
        return response;
    }

    const UpdatePassword = async(data: any) => {
        const response = await updatePassword(data);
        const responseData = await response.json();
        return responseData;
    }

    const CreateAccount = async(data: any) => {
        const {email,firstName,lastName,password} = data;
        const response: any = await SignUp(data);
        const responseData = await response.json();
        return responseData;
    }

    const LoginUser = async(data:any) => {
        const response = await Login(data);
        const responseData = await response.json();
        
        return responseData;
    }

    const UpdateData = async(data: any) => {
        const response = await UpdateUserData(data);
        const responseData = await response.json();
        return responseData;
    }

    return {
        CreateAccount,
        LoginUser,
        _error,
        notification,
        UpdatePassword,
        GetUser,
        UpdateData
    };
};
  
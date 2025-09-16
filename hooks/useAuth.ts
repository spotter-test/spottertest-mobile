import React,{useState} from "react";
import { 
    SignUp,
    Login,
    updatePassword,
    getUser
} from "@/utils/api";

import { storeToken } from "@/utils/token";


export const useAuth = () => {
    const [_error,setError] = useState(false);
    const [notification,setNotification] = useState(false);


    const GetUser = async(email: string) => {
        const response: any = await getUser(email);
        return response;
    }

    const UpdatePassword = async(data: any) => {
       const {email, password} = data;
        const response = await updatePassword(email,password)
        const responseData = await response.json();
        return responseData;
    }

    const CreateAccount = async(data: any) => {
        const {email,firstname,lastname,password,phonenumber} = data;
        const response: any = await SignUp({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phonenumber: phonenumber
        });
        const responseData = await response.json();
        return responseData;
    }

    const LoginUser = async(data:any) => {
        const response = await Login(data);
        const responseData = await response.json();
        if(responseData.statusCode == 200) {
            storeToken(responseData.token);
        } 
        return responseData;
    }


    return {
        CreateAccount,
        LoginUser,
        _error,
        notification,
        UpdatePassword,
        GetUser
    };
};
  
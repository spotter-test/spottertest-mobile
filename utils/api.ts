import { 
    signInUrl,
    signUpUrl,
    updateUrl,
    otpUrl,
    verifyOtpUrl,
    verifyUserUrl,
    updatePasswordUrl,
    getUserUrl
} from "./endpoints";
import { getToken } from "./token";

export const VerifyUser = async(data: any) => {
    const {firstname,lastname,email,password,phonenumber} = data;

    const response = await fetch(verifyUserUrl,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            phonenumber
        }),
    })
 
    return response;
} 

export const getUser = async(email: string) => {
    try {
        const token = await getToken();
        const response = await fetch(getUserUrl,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email
            }),
        })
         
        const data = await response.json(); // Extract the actual JSON content
        return data;
    }catch(err){
        return err;
    }
}

export const updatePassword = async(email:string,password:string) => {
    const response = await fetch(updatePasswordUrl,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    return response;
}

export const SignUp = async(data: any) => {
    const response = await fetch(signUpUrl,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            phonenumber: data.phonenumber
        }),
    })

    return response;
}

export const  Login = async(data:any) => {
    const response = await fetch(signInUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response;
}

export const RequestOtp = async(email:string) => {
    const response = await fetch(otpUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    })

    return response;
}

export const VerifyOtp = async(data: { email: string, otp: string }) => {
    const response = await fetch(verifyOtpUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response;
}
import { 
    signInUrl,
    signUpUrl,
    updateUrl,
    updatePasswordUrl,
    getUserUrl
} from "./endpoints";
import { getToken,clearFirstLogin,removeToken } from "./token";
 

export const getUser = async() => {
    try {
        const token = await getToken();
        const response = await fetch(getUserUrl,{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
         
        const data = await response.json(); // Extract the actual JSON content
        return data;
    }catch(err){
        return err;
    }
}

export const updatePassword = async(data: any) => {
    const {currentPassword,newPassword} = data;
    const token = await getToken();
    const response = await fetch(updatePasswordUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            currentPassword,
            newPassword
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

export const UpdateUserData = async(data: any) => {
    const token = await getToken()
    const response = await fetch(updateUrl,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })


    return response;
}

export const logout = async() => {
    clearFirstLogin();
    removeToken();
    
}

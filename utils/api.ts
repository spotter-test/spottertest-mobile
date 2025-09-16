import { 
    signInUrl,
    signUpUrl,
    updateUrl,
    updatePasswordUrl,
    getUserUrl
} from "./endpoints";
import { getToken } from "./token";
 

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
    console.log(response)

    return response;
}

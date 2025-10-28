export interface LoginPayload{
    email: string,
    password:string,
}

export interface RegisterPayload{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    role: string; 
}

export interface AuthReponse{
    access_token:string;
    token_type:string;
}
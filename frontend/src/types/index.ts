export interface User{
    _id : string ; 
    username:string ;
    createdAt? : string ; 
}

export interface Message{
    _id:string ; 
    reciever:string ; 
    content : string ; 
    createdAt:string ; 
}

export interface Notification{
    _id:string ; 
    user:string ; 
    message:string ; 
    read:boolean ; 
    createdAt:string ; 
}

export interface LoginResponse{
    user:User;
}

export interface MessageResponse{
    success:boolean ;
    count:number ; 
    message:Message[];
}

export interface ApiError{
    error:string ; 
    message? : string ; 
}
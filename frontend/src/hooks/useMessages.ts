import {useMutation , useQuery , useQueryClient} from "@tanstack/react-query"
import { apiClient } from "../api/client"
import { useAppSelector } from "./useAppSelector";

export const useMessages = () =>{
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user)
    const {data,isLoading,error} = useQuery({
        queryKey:['messages'] , 
        queryFn:()=>apiClient.getMessages(user!._id),
        refetchInterval:5000,
    })

    const sendMessageMutation = useMutation({
        mutationFn:({username , content}: {username:string , content:string}) => apiClient.sendMessage(username,content),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['messages']});
        },
    });

    return {
        messages:data?.message || [],
        messagesCount : data?.count || 0 ,
        isLoading , 
        error , 
        sendMessage:sendMessageMutation.mutate , 
        isSending:sendMessageMutation.isPending , 
        sendError:sendMessageMutation.error , 
        sendSuccess:sendMessageMutation.isSuccess ,
    };
}
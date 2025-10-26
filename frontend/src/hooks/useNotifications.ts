import {useMutation , useQuery , useQueryClient} from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { Notificaion } from "../types";

export const useNotifications = () =>{
    const queryClient = useQueryClient();
    const {data:notifications} = useQuery({
        queryKey:['notifications'],
        queryFn:()=>apiClient.getNotifications(),
        refetchInterval : 5000 , 
    })

    const markAsReadMutation = useMutation({
        mutationFn : ()=> apiClient.markAsRead(),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['notifications']});
        }
    })

    const unreadCount = notifications?.filter((n) => !n.read).length || 0;

}
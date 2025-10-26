import {useMutation , useQuery , useQueryClient} from "@tanstack/react-query"
import { apiClient } from "../api/client"
import { useAppDispatch } from "./useAppDispatch"
import { setUser , logout } from "../store/authSlice"

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (username: string) => apiClient.login(username),
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => apiClient.getMe(),
    retry: false,
  });

  const handleLogout = () => {
    dispatch(logout());
    queryClient.clear();
  };

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    user: userData?.user,
    logout: handleLogout,
  };
};
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { User } from "lucide-react";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector ; 


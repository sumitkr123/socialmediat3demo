import { AuthContext } from "@/provider/CustomAuthProvider";
import { useContext } from "react";

export const useAuthStatus = () => {
  return useContext(AuthContext);
};

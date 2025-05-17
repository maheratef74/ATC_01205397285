import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { authApi } from "@/services/auth";
import { startTransition } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log(data);

      dispatch(loginSuccess(data));
      localStorage.setItem("user", JSON.stringify(data));
      startTransition(() => {
        navigate("/", { replace: true });
      });
    },
    onError: (error: Error) => {
      toast.error("Login failed. Please try again. " + error.message);
    },
  });

  const { mutate: signup, isPending: signupIsPending } = useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      toast.success("Signup successful!");
      startTransition(() => {
        navigate("/login", { replace: true });
      });
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error("Signup failed. Please try again. " + error.message);
    },
  });

  return {
    login,
    isPending,
    signup,
    signupIsPending,
  };
};

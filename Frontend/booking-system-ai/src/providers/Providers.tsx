import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import React, { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      dispatch(
        loginSuccess({
          data: JSON.parse(user).data,
          token: JSON.parse(user).token,
        })
      );
    }
  }, [dispatch]);

  return <div className=" ">{children}</div>;
}

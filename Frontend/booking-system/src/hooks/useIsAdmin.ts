import { useAppSelector } from "@/store/hooks";

export default function useIsAdmin() {
  const data = useAppSelector((state) => state.auth.data);

  console.log(data);

  return data?.role === "Admin";
}

import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "@/services/categories";

export function useCategoryCounts() {
    return useQuery({
        queryKey: ["categoryCounts"],
        queryFn: categoriesApi.getCategoryCounts,
    });
} 
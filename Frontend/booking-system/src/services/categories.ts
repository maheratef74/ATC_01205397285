import axios from "@/lib/axios";


export interface CategoryCount {
    category: string;
    count: number;
}

export const categoriesApi = {
    getCategoryCounts: async (): Promise<CategoryCount[]> => {
        const response = await axios.get(`/event/category-counts`);
        return response.data;
    }
}; 
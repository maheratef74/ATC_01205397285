import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

export default function SecureImage({ fileName }: { fileName: string }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      return await axiosInstance
        .get(`/upload/${fileName}`, {
          responseType: "blob",
        })
        .then((res) => setImageUrl(URL.createObjectURL(res.data)));
    };

    fetchImage();
  }, [fileName]);

  return imageUrl ? (
    <img src={imageUrl} className="w-full h-full object-cover" alt="Secure image" />
  ) : (
    <p>Loading...</p>
  );
}

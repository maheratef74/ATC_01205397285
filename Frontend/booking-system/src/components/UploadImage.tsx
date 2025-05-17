import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface UploadImageProps {
    value: string;
    onChange: (value: string) => void;
}

export function UploadImage({ value, onChange }: UploadImageProps) {
    const [preview, setPreview] = useState<string>(value);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result as string;
                    setPreview(result);
                    onChange(result);
                };
                reader.readAsDataURL(file);
            }
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif"],
        },
        maxFiles: 1,
    });

    const removeImage = () => {
        setPreview("");
        onChange("");
    };

    return (
        <div className="space-y-4">
            {preview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                    >
                        <FaTimes className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50"
                        }`}
                >
                    <input {...getInputProps()} />
                    <FaCloudUploadAlt className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        {isDragActive
                            ? "Drop the image here"
                            : "Drag and drop an image, or click to select"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 5MB
                    </p>
                </div>
            )}
        </div>
    );
} 
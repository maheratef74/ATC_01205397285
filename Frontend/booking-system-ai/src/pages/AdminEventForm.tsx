import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { eventsApi, ECategory } from "@/services/events";
import { enumToOptions } from "@/lib/utils";
import axiosInstance from "@/lib/axios";

const schema = z.object({
  eventName: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  category: z.coerce.number(),
  venue: z.string().min(1, "Required"),
  startDate: z.string().refine((s) => !isNaN(Date.parse(s)), "Invalid date"),
  endDate: z.string().refine((s) => !isNaN(Date.parse(s)), "Invalid date"),
  price: z.coerce.number().min(0, "Cannot be negative"),
  organizer: z.string().min(1, "Required"),
  capacity: z.coerce.number().min(1, "At least 1"),
  image: z.instanceof(File),
});

type FormValues = z.infer<typeof schema>;
const opts = enumToOptions(ECategory);

export default function AdminEventForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      eventName: "",
      description: "",
      category: ECategory.Conference,
      venue: "",
      startDate: "",
      endDate: "",
      price: 0,
      organizer: "",
      capacity: 1,
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);

    const formData = new FormData();
    formData.append("formFile", values.image);

    console.log(values.image);
    let res;
    try {
      res = await axiosInstance.post<{
        data: {
          contentType: string;
          fileName: string;
          id: number;
          storedFileName: string;
        };
      }>("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      // const imageUrl = res.data;
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
      return;
    }

    const action = isEdit
      ? eventsApi.update({
          ...values,
          imageUrl: res.data.data.storedFileName,
          id: id as string,
        })
      : eventsApi.create({ ...values, imageUrl: res.data.data.storedFileName });

    action
      .then(() => {
        toast.success(isEdit ? "Event updated!" : "Event created!");
        navigate("/admin");
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Event" : "Add New Event"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Event Name */}
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {opts.map((cat) => {
                        // console.log(cat);
                        return (
                          <SelectItem key={cat.label} value={String(cat.value)}>
                            {cat.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Venue */}
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="Enter venue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Price & Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Organizer */}
          <FormField
            control={form.control}
            name="organizer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organizer</FormLabel>
                <FormControl>
                  <Input placeholder="Enter organizer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image URL */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    accept="image/*"
                    type="file"
                    placeholder="enter file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {isEdit ? "Update Event" : "Create Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

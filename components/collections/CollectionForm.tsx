"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";

import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import Delete from "../custom ui/Delete";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500),
  image: z.string()

})

interface CollectionFormProps {
  initialData?: CollectionType | null
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {

  const [loading, SetLoading] = useState(false)
  const router = useRouter();
  const params = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: "",
    },
  })

  console.log(initialData)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = initialData ? `/api/collections/${params.collectionId}` : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values)
      })
      if (res.ok) {
        SetLoading(false);
        toast.success(`Collections ${initialData ? "updated" : "created"}`)
        window.location.href = "/collections";
        router.push("/collections")
      }else{
        
        window.location.href = "/sign-in";
      }
    } catch (err) {
      console.log("[collections_POST]", err)
      toast.error("something went wrong! try again.")
    }
  }


  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete id={initialData._id}  item="collection"/>
        </div>
      ) : (<p className="text-heading2-bold">Create Collection</p>)}
      <Separator className="bg-grey-1 mt-4 mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description"  {...field} rows={5} />
                </FormControl>
                <FormDescription>
                  This is your public display description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")} />
                </FormControl>
                <FormDescription>
                  Upload Image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className='bg-blue-1 text-white'>Submit</Button>
            <Button type="button" className='bg-blue-1 text-white'
              onClick={() => router.push('/collections')}>Discard</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}




export default CollectionForm;
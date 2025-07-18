"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, RefreshCw } from "lucide-react";

type Post = {
  id: number;
  title: string;
  body: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("/api/posts");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function PostList() {
  const { data, error, isLoading, isFetching } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-5 w-3/5 rounded-md" />
            <Skeleton className="h-4 w-4/5 mt-3 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Fetching Posts</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="relative">
      {isFetching && !isLoading && (
        <div className="absolute top-2 right-2 flex items-center text-sm text-muted-foreground">
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          <span>Updating...</span>
        </div>
      )}
      <div className="space-y-6">
        {data?.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
            <h3 className="text-lg font-semibold text-primary">{post.title}</h3>
            <p className="mt-1 text-muted-foreground">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

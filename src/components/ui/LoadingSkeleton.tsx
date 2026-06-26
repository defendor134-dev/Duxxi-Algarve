"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "card" | "image" | "table";
}

export function LoadingSkeleton({ className, variant = "text" }: LoadingSkeletonProps) {
  if (variant === "card") {
    return (
      <div className={cn("card p-4 space-y-4", className)}>
        <div className="skeleton h-48 w-full rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-5/6" />
        </div>
      </div>
    );
  }

  if (variant === "image") {
    return <div className={cn("skeleton", className)} />;
  }

  if (variant === "table") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="skeleton h-8 w-full" />
        <div className="skeleton h-8 w-full" />
        <div className="skeleton h-8 w-full" />
        <div className="skeleton h-8 w-full" />
        <div className="skeleton h-8 w-full" />
      </div>
    );
  }

  return <div className={cn("skeleton h-4", className)} />;
}

export function CardSkeleton() {
  return <LoadingSkeleton variant="card" />;
}

export function TableSkeleton() {
  return <LoadingSkeleton variant="table" />;
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
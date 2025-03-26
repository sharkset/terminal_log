import { Skeleton } from "@/components/ui/skeleton";

export default function RowLoading() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="bg-secondary border-t border-[hsl(224,19%,16%)] px-8 py-4" key={index}>
          <header className="flex items-center gap-2 m-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="w-full">
              <Skeleton className="h-3 w-25 mb-1" />
              <Skeleton className="h-3 w-15" />
              <Skeleton className="h-3 w-15" />
            </div>
          </header>
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-15 mt-3" />
            <Skeleton className="h-3 w-20 mt-3" />
          </div>
        </div>
      ))}
    </>
  )
}
import { Skeleton } from "@/components/ui/skeleton";

export default function RowLoading() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="bg-black border-t border-[hsl(224,19%,16%)] px-8 py-4" key={index}>
          <header className="flex items-center gap-[0.55rem] m-[0.55rem]">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="w-full">
              <Skeleton className="h-3 w-dvw mb-1" />
              <Skeleton className="h-3 w-15" />
            </div>
          </header>
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-15 mt-3" />
          </div>
        </div>
      ))}
    </>
  )
}
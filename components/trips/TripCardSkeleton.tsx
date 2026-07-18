export default function TripCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-48 w-full animate-pulse bg-slate-200" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
          <div className="h-7 w-20 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
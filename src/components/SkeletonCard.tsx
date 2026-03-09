export default function SkeletonCard() {
  return (
    <div className="border border-gray-200 rounded-xl p-5 animate-skeleton">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

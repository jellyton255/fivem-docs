import Loader from "@/components/loader";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Loader />
    </div>
  );
}

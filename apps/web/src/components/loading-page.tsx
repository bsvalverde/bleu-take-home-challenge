import { Loader } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}

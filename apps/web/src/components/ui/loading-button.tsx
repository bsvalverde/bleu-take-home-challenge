import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Button, ButtonProps } from "./button";

interface Props extends ButtonProps {
  loading: boolean;
}

export function LoadingButton({
  children,
  className,
  disabled,
  loading,
  variant,
  ...props
}: Props) {
  return (
    <Button
      className={cn(className, "relative")}
      disabled={disabled || loading}
      variant={variant}
      {...props}
    >
      <span className={cn(loading && "text-transparent")}>{children}</span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      )}
    </Button>
  );
}

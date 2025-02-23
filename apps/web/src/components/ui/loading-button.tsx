import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Button, ButtonProps } from "./button";

interface Props extends ButtonProps {
  loading: boolean;
}

const spinnerVariants = cva(
  "absolute inset-0 flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "",
        secondary: "text-secondary-foreground",
        ghost: "",
        link: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function LoadingButton({
  className,
  disabled,
  loading,
  variant,
  ...props
}: Props) {
  return (
    <div className="relative inline-block">
      <Button
        className={cn(className, loading && "text-transparent")}
        disabled={disabled || loading}
        variant={variant}
        {...props}
      />
      {loading && (
        <span className={cn(spinnerVariants({ variant, className }))}>
          Loading...
        </span>
      )}
    </div>
  );
}

// TODO add spinner

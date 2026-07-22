import type { ReactNode } from "react";
import { useMeQuery } from "../services/authApi";

interface AuthInitializerProps {
  children: ReactNode;
}

function AuthInitializer({
  children,
}: AuthInitializerProps) {
  const { isLoading } = useMeQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}

export default AuthInitializer;
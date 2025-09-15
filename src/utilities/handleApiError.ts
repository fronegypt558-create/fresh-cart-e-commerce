// src/utils/handleApiError.ts
import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleApiError(
  err: unknown,
  fallbackMessage = "Something went wrong"
) {
  if (err instanceof AxiosError) {
    const message = err.response?.data?.message || fallbackMessage;
    console.error("Axios error:", message);
    toast.error(message, { position: "top-center", duration: 3000 });
  } else if (err instanceof Error) {
    console.error("Error:", err.message);
    toast.error(err.message, { position: "top-center", duration: 3000 });
  } else {
    console.error("Unknown error:", err);
    toast.error(fallbackMessage, { position: "top-center", duration: 3000 });
  }
}

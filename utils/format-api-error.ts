import { AuthError } from "@supabase/supabase-js"

function formatApiError(error: string | AuthError): string {
  if (typeof error === "string") {
    return error
  }

  return error.message
}

export default formatApiError

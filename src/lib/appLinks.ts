const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.cruxion.in";

/** Google sign-in that enrolls a new account as a free individual learner. */
export const GET_STARTED_URL = `${API_URL}/api/auth/google?intent=signup`;

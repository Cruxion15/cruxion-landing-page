const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.cruxion.in";

/** Google sign-in that enrolls a new account as a free individual learner. */
export const GET_STARTED_URL = `${API_URL}/api/auth/google?intent=signup`;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.cruxion.in";

/** The DSA plan: open to visitors without an account. */
export const DASHBOARD_URL = `${APP_URL}/learn/dsa`;
export const SIGN_IN_URL = APP_URL;

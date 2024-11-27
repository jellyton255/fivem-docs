export default function getBaseURL() {
	if (typeof window !== "undefined") {
		return window.location.origin;
	} else {
		return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
	}
}

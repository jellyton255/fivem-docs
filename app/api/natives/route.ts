export const dynamic = "force-dynamic";
import { getNatives } from "@/app/_data/natives";

export async function GET() {
	const natives = await getNatives();

	return Response.json(natives);
}

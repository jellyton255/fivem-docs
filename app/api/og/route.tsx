import { ImageResponse } from "next/og";

const sharedGradient = `linear-gradient(
	50deg,
	#228BE6 50%,
	#F76707 50%
)`;

const clientGradient = `linear-gradient(
	50deg,
	#F76707 50%,
	#F76707 50%
)`;

const serverGradient = `linear-gradient(
	50deg,
	#228BE6 50%,
	#228BE6 50%
)`;

const realmMapper = {
	Client: clientGradient,
	Server: serverGradient,
	Shared: sharedGradient,
};

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// ?title=<title>
		const hasTitle = searchParams.has("title");
		const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Unknown Native";

		const hasDescription = searchParams.has("description");
		const description = hasDescription ? searchParams.get("description")?.slice(0, 100) : "This page lacks a native description! If you have any information on this native, consider contributing!";

		const hasRealm = searchParams.has("realm");
		const realm = hasRealm ? searchParams.get("realm")?.slice(0, 100) : "Client";

		const hasNamespace = searchParams.has("namespace");
		const namespace = hasNamespace ? searchParams.get("namespace")?.slice(0, 100) : "CFX";

		return new ImageResponse(
			(
				<div
					style={{
						display: "flex",
						height: "100%",
						width: "100%",
						paddingLeft: "12px",
						paddingTop: "42px",
						alignItems: "flex-start",
						flexDirection: "column",
						justifyContent: "flex-start",
						letterSpacing: "-.02em",
						fontWeight: 700,
						background: "white",
						backgroundColor: "white",
						backgroundImage: "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
						backgroundSize: "100px 100px",
					}}>
					<div
						style={{
							right: 42,
							bottom: 42,
							position: "absolute",
							display: "flex",
							alignItems: "center",
						}}>
						<span
							style={{
								marginLeft: 8,
								fontSize: 32,
								fontWeight: 700,
							}}>
							Mantine FiveM Docs
						</span>
					</div>
					<div
						style={{
							right: 32,
							top: 22,
							position: "absolute",
							display: "flex",
							alignItems: "center",
							fontSize: 32,
							fontWeight: 700,
							backgroundImage: realmMapper[realm],
							borderRadius: "6px",
						}}>
						<span
							style={{
								color: "white",
								padding: "10px 30px",
							}}>
							{realm}
						</span>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							flexWrap: "wrap",
							justifyContent: "center",
							fontSize: 20,
							width: "auto",
						}}>
						<div
							style={{
								paddingLeft: "20px",
								margin: "0 42px",
								fontSize: 40,
								width: "auto",
								maxWidth: 550,
								textAlign: "left",
								color: "#808080",
								lineHeight: 1.4,
								fontWeight: 700,
							}}>
							{namespace}
						</div>
						<div
							style={{
								paddingLeft: "20px",
								margin: "0 42px",
								fontSize: 60,
								width: "auto",
								maxWidth: 550,
								textAlign: "left",
								lineHeight: 1.4,
								fontWeight: 700,
							}}>
							{title}
						</div>
					</div>

					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
							padding: "20px 50px",
							margin: "20px 62px",
							fontSize: 28,
							width: "auto",
							maxWidth: 670,
							textAlign: "left",
							backgroundColor: "black",
							color: "white",
							lineHeight: 1.4,
						}}>
						{description}
					</div>
				</div>
			),
			{
				width: 1200,
				height: 600,
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}

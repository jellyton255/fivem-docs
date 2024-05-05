import { Box, Tooltip, useMantineTheme } from "@mantine/core";
import { capitalizeFirstLetter } from "../_utils/stringUtils";

type Realm = "client" | "server" | "shared";
const realmMapper: Record<Realm, string> = {
	client: "orange",
	server: "blue",
	shared: "green",
};

const gradient = `linear-gradient(
	50deg,
	#228BE6 50%,
	#F76707 50%
)`;

function RealmIndicator(props: { realm: Realm }) {
	const { realm } = props;

	const theme = useMantineTheme();

	return (
		<Tooltip label={capitalizeFirstLetter(realm)}>
			<Box
				bg={(realm == "shared" && gradient) || realmMapper[realm]}
				w={22}
				h={22}
				style={{
					borderRadius: theme.radius.md,
				}}
			/>
		</Tooltip>
	);
}

export default RealmIndicator;

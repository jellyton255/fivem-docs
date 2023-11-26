import { Badge, Tooltip } from "@mantine/core";
import { capitalizeFirstLetter } from "../utils/stringUtils";

type Realm = "client" | "server" | "shared";

const realmMapper = {
	client: "orange",
	server: "blue",
	shared: "green",
};

function RealmIndicator(props: { realm: Realm }) {
	const { realm } = props;

	return (
		<Tooltip label={capitalizeFirstLetter(realm)}>
			<Badge color={realmMapper[realm]} radius="sm" w={22} h={22} />
		</Tooltip>
	);
}

export default RealmIndicator;

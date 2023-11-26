export interface Natives {
	name?: string;
	params: Param[];
	results: Results;
	description: string;
	examples: Example[];
	hash: string;
	ns: NS;
	jhash?: string;
	manualHash: boolean;
	resultsDescription?: string;
	annotations?: Annotations;
	aliases?: string[];
	apiset?: string;
}

export interface Annotations {
	cs_type: Results;
}

export enum Results {
	Any = "Any",
	AnyPtr = "AnyPtr",
	Blip = "Blip",
	Bool = "BOOL",
	Cam = "Cam",
	Char = "char*",
	CharPtr = "charPtr",
	Entity = "Entity",
	FireID = "FireId",
	Float = "float",
	Hash = "Hash",
	Int = "int",
	IntPtr = "intPtr",
	Object = "Object",
	Ped = "Ped",
	Pickup = "Pickup",
	Player = "Player",
	ResultsAny = "Any*",
	ScrHandle = "ScrHandle",
	ScrHandlePtr = "ScrHandlePtr",
	Vector3 = "Vector3",
	Vehicle = "Vehicle",
	Void = "void",
}

export interface Example {
	lang: Lang;
	code: string;
}

export enum Lang {
	CS = "cs",
	Csharp = "csharp",
	JS = "js",
	Javascript = "javascript",
	Lua = "lua",
}

export enum NS {
	App = "APP",
	Audio = "AUDIO",
	Brain = "BRAIN",
	Cam = "CAM",
	Clock = "CLOCK",
	Cutscene = "CUTSCENE",
	Datafile = "DATAFILE",
	Decorator = "DECORATOR",
	Dlc = "DLC",
	Entity = "ENTITY",
	Event = "EVENT",
	Files = "FILES",
	Fire = "FIRE",
	Graphics = "GRAPHICS",
	Hud = "HUD",
	Interior = "INTERIOR",
	Itemset = "ITEMSET",
	Loadingscreen = "LOADINGSCREEN",
	Localization = "LOCALIZATION",
	Misc = "MISC",
	Mobile = "MOBILE",
	Money = "MONEY",
	Netshopping = "NETSHOPPING",
	Network = "NETWORK",
	Object = "OBJECT",
	Pad = "PAD",
	Pathfind = "PATHFIND",
	Ped = "PED",
	Physics = "PHYSICS",
	Player = "PLAYER",
	Recording = "RECORDING",
	Replay = "REPLAY",
	Savemigration = "SAVEMIGRATION",
	Script = "SCRIPT",
	Shapetest = "SHAPETEST",
	Socialclub = "SOCIALCLUB",
	Stats = "STATS",
	Streaming = "STREAMING",
	System = "SYSTEM",
	Task = "TASK",
	Vehicle = "VEHICLE",
	Water = "WATER",
	Weapon = "WEAPON",
	Zone = "ZONE",
}

export interface Param {
	name: string;
	type: Type;
	annotations?: Annotations;
	description?: string;
}

export enum Type {
	Any = "Any",
	Blip = "Blip",
	Bool = "BOOL",
	Cam = "Cam",
	Char = "char*",
	Entity = "Entity",
	FireID = "FireId",
	Float = "float",
	Hash = "Hash",
	Int = "int",
	Object = "Object",
	Ped = "Ped",
	Pickup = "Pickup",
	Player = "Player",
	ScrHandle = "ScrHandle*",
	TypeAny = "Any*",
	TypeBOOL = "BOOL*",
	TypeBlip = "Blip*",
	TypeBool = "bool*",
	TypeEntity = "Entity*",
	TypeFloat = "float*",
	TypeHash = "Hash*",
	TypeInt = "int*",
	TypeObject = "Object*",
	TypePed = "Ped*",
	TypeScrHandle = "ScrHandle",
	TypeVehicle = "Vehicle*",
	Vector3 = "Vector3*",
	Vehicle = "Vehicle",
}

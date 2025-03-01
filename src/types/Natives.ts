export interface Native {
  name?: string;
  params: Param[];
  results: Results;
  description: string;
  examples: Example[];
  hash: string;
  ns: NS;
  jhash?: string;
  manualHash?: boolean;
  resultsDescription?: string;
  annotations?: Annotations;
  aliases?: string[];
  apiset?: Apiset;
  game?: Game;
}

export enum Apiset {
  Client = "client",
  Server = "server",
  Shared = "shared",
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

export enum Game {
  Gta5 = "gta5",
  Ny = "ny",
  Rdr3 = "rdr3",
}

export enum NS {
  Cfx = "CFX",
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
  Func = "func",
  Hash = "Hash",
  Int = "int",
  Long = "long",
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
  Void = "void",
  ResultsBOOL = "BOOL*",
  ResultsBlip = "Blip*",
  ResultsBool = "bool",
  ResultsEntity = "Entity*",
  ResultsFloat = "float*",
  ResultsInt = "int*",
  ResultsObject = "object",
  ResultsVector3 = "Vector3",
}

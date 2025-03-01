import { createSearchParamsCache, parseAsString, parseAsBoolean } from "nuqs/server";

export const searchParams = {
  hash: parseAsString,
  search: parseAsString.withDefault(""),
  activeTab: parseAsString.withDefault("CFX"),
  showUnnamedNatives: parseAsBoolean.withDefault(false),
};

export const searchParamsCache = createSearchParamsCache(searchParams);

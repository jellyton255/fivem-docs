import Loader from "@/components/loader";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},

    scrollRestoration: true,

    defaultPreloadStaleTime: 0,
    defaultPendingComponent: Loader,
  });

  return router;
};

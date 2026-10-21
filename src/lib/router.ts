import { useEffect, useState } from "react";

/** Tiny hash router: "#/", "#/learn/<id>", "#/review/<id>", "#/tricky" — linkable/shareable. */
export type Route =
  | { page: "home" }
  | { page: "tricky" }
  | { page: "learn" | "review"; id: string };

function parse(hash: string): Route {
  if (hash.startsWith("#/tricky")) return { page: "tricky" };
  const m = hash.match(/^#\/(learn|review)\/([\w-]+)/);
  return m ? { page: m[1] as "learn" | "review", id: m[2] } : { page: "home" };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigate(route: Route) {
  window.location.hash =
    "id" in route
      ? `/${route.page}/${route.id}`
      : `/${route.page === "home" ? "" : "tricky"}`;
  window.scrollTo({ top: 0 });
}

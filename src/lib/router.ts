import { useEffect, useState } from "react";

/** Tiny hash router: "#/" (home) or "#/learn/<openingId>" so lessons are linkable/shareable. */
export type Route = { page: "home" } | { page: "learn"; id: string };

function parse(hash: string): Route {
  const m = hash.match(/^#\/learn\/([\w-]+)/);
  return m ? { page: "learn", id: m[1] } : { page: "home" };
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
  window.location.hash = route.page === "home" ? "/" : `/learn/${route.id}`;
  window.scrollTo({ top: 0 });
}

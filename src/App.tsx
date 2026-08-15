import { getOpening } from "./data/openings";
import { useRoute } from "./lib/router";
import { Home } from "./components/Home";
import { Lesson } from "./components/Lesson";

export default function App() {
  const route = useRoute();
  if (route.page === "learn") {
    const opening = getOpening(route.id);
    if (opening) return <Lesson key={opening.id} opening={opening} />;
  }
  return <Home />;
}

import type { Route } from "./+types/home";
import ToleranceCalculator from "../components/ToleranceCalculator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ISO 286 Tolerance Calculator" },
    { name: "description", content: "Calcul toleranțe și abaterilor dimensionale ISO 286" },
  ];
}

export default function Home() {
  return <ToleranceCalculator />;
}

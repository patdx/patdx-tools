import { Clock } from './clock';
// import dynamic from "next/dynamic";

// const Clock = dynamic(() => import("./clock"), {
//   ssr: false,
// });

export default function ClockPage() {
  return <Clock />;
}

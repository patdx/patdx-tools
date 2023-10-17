import { Clock } from './clock';
// import dynamic from "next/dynamic";

// const Clock = dynamic(() => import("./clock"), {
//   ssr: false,
// });

export default function ClockPage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Clock />
    </div>
  );
}

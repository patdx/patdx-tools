import logo from 'assets/src/icon.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Image src={logo} alt="Logo" className="h-32 w-32" />
    </div>
  );
}

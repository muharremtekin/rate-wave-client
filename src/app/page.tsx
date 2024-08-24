import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <Link className="bg-slate-500 px-4 py-3 text-white rounded " href="/profile/mtkn">Muharrem Profili Gör</Link>
    </div>
  );
}

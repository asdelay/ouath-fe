import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl mb-5">Welcome!</h1>
      <Link
        className="p-4 border-1 rounded-2xl hover:border-white/50"
        href={`${process.env.BACKEND_URL}auth/google/url`}
      >
        Sign In with Google
      </Link>
    </div>
  );
}

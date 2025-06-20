import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <a
        href="/api/auth/signin/github"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Sign in with GitHub
      </a>
    </div>
  );
}

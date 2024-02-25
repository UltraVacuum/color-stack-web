import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
// import { initClient } from "@/supabase/init";
// import { Auth } from '@supabase/auth-ui-react'
import GoogleIcon from './google-icon';

export default function Login({
  searchParams,
}: {
  searchParams: {
    message?: string,
    code?: string
  };
}) {

  const signInWithGoogle = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const redirectUrl = process.env.NEXT_AUTH_REDIRECT_URL
    const { data, error }: any = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    })
    if (data) {
      // console.log(data.url)
      return redirect(data.url)
    }
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // console.log(error);
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  // const supabase = initClient();
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div className="animate-in text-center flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <form action={signInWithGoogle}>
          <button type="submit"
            formAction={signInWithGoogle}
            className="btn-md grow w-full flex items-center justify-center border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2">
            <div className="w-4 h-4 mr-4">
              <GoogleIcon />
            </div>
            Continue with Google
          </button>
        </form>
        <form action={signIn}>
          <div className="flex items-center mb-4">
            <label className="flex-none w-20 py-2 text-md text-left" htmlFor="email">
              Email
            </label>
            <input
              className="flex-1 rounded-md px-4 py-2 bg-inherit border"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="flex-none w-20 py-2 text-md text-left" htmlFor="password">
              Password
            </label>
            <input
              className="flex-1 rounded-md px-4 py-2 bg-inherit border"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button className="w-full bg-sky-400 rounded-md px-4 py-2 text-foreground mb-2">
            Sign In
          </button>
          <button
            formAction={signUp}
            className="w-full border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          >
            Sign Up
          </button>
          {/* <Auth supabaseClient={supabase} /> */}
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

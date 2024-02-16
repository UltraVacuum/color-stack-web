import Link from "next/link";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthButton() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";

        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/login");
    };

    return user ? (
        <div className="flex items-center gap-4">
            Hey, {user.email}!
            <form action={signOut}>
                <button className="rounded-md 
                    no-underline bg-btn-background 
                    hover:bg-btn-background-hover">
                    Logout
                </button>
            </form>
        </div>
    ) : (
        <Link
            href="/login"
            className="flex rounded-md 
                no-underline bg-btn-background 
                hover:bg-btn-background-hover"
        >
            Login
        </Link>
    );
}

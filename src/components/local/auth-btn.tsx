import Link from "next/link";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function AuthButton() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    // console.log(user)
    const signOut = async () => {
        "use server";
        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/");
    };

    return user ? (
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="w-8 h-8 rounded-full"
                        style={{ background: `url(${user.user_metadata.avatar_url}) center / cover no-repeat` }}
                    ></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                        <form action={signOut}>
                            <button className="rounded-md 
                    no-underline bg-btn-background 
                    hover:bg-btn-background-hover">
                                Logout
                            </button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
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

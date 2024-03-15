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
    // // console.log(user)

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
                    <div className="
                        w-8 h-8 rounded-full bg-gray-400 
                        bg-no-repeat bg-center bg-cover"
                        style={{ backgroundImage: `url(${user.user_metadata.avatar_url})` }}
                    >

                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href="/user/profile">Profile</Link>
                    </DropdownMenuItem>
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

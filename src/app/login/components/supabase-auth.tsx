import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { initClient } from '@/supabase/init'


export const SupabaseAuth = () => {
    const supabase = initClient()
    return (
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'twitter']}
        />
    )
}

"use client";

import { createClient } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function Account() {
    const supabase = createClient();

    // Define your custom theme colors and spacing
    const customTheme = {
        default: {
            colors: {
                brand: '#6B46C1', // custom purple
                brandAccent: '#9F7AEA', // light purple
                brandButtonText: '#FFFFFF',
                inputBorder: '#9F7AEA',
                inputText: '#333333',
                inputLabelText: '#6B46C1',
                messageText: '#9F7AEA',
            },
            spacing: {
                inputPadding: '12px 16px',
                buttonPadding: '12px 20px',
                labelMargin: '0 0 10px',
                containerPadding: '20px',
            },
            radii: {
                inputBorderRadius: '8px',
                buttonBorderRadius: '8px',
            }
        }
    };

    return (
        <div className="flex flex-1 h-screen justify-center items-center bg-gray-100">
            <div className="max-w-md py-8 px-6 mx-auto bg-purple-200 rounded-xl shadow-2xl shadow-purple-500/50 space-y-6 sm:py-6 sm:flex outline-purple-200">
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa, variables: customTheme }}
                />
            </div>
        </div>
    );
}

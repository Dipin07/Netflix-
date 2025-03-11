
import axios from 'axios'
import { create } from 'zustand'
import toast from 'react-hot-toast'
import { AwardIcon } from 'lucide-react'

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    signup: async (credentials) => {
        set({ isSigningUp: true })
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials)

            set({ user: response.data.user, isSigningUp: false })
            toast.success("Account Created Successful!")
        } catch (error) {
            toast.error(error.response.data.message || "Signup Failed!")
            set({ isSigningUp: false, user: null })
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true })
        try {
            const response = await axios.post("/api/v1/auth/login", credentials)

            set({ user: response.data.user, isLoggingIn: false })
            toast.success("Login Successfully!");
        } catch (error) {
            set({ isSigningUp: false, user: null })
            toast.error(error.response.data.message || "Login Failed!");
        }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("Logged Out Successfully!");
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response?.data?.message || "Logout Failed");
        }
    },

    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get('/api/v1/auth/authCheck');

            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },
}))


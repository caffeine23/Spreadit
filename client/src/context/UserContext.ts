import { create } from "zustand";
import axios from "axios";

interface User {
    userId: string,
    username: string,
    pfp: string,
    followers: string[],
    following: string[]
}

interface UserState {
    user: User | null,
    fetchUser: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    fetchUser: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/auth/fetchUser", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            set({user: response.data})
        } catch (err) {
            console.error("Invalid token or error fetching user data", err);
      set({ user: null });
        }
    }
}))

export default useUserStore;
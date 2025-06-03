import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface USER {
  name :string
  email:string
  id:string
}
export interface USERSTORE {
  user:USER|null
  token:string|null
  setUser:(user: USER, token:string )=>void
    logout: () => void;

}
export const useUserStore = create<USERSTORE>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

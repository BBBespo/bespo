import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  accessToken: string;
  name: string;
  profile: string;
  email: string;
  hasTeam: boolean;
  role: string;
};

interface Store {
  accessToken: string | null;
  name: string | null;
  profile: string | null;
  email: string | null;
  hasTeam: boolean | false;
  role: string | null;
  setUser: (user: User) => void;
}

const useStore = create(
  persist<Store>(
    (set) => ({
      accessToken: null,
      name: null,
      profile: null,
      email: null,
      hasTeam: false,
      role: null,
      setUser: (user: User) => {
        set({ accessToken: user.accessToken });
        set({ name: user.name });
        set({ profile: user.profile });
        set({ email: user.email });
        set({ hasTeam: user.hasTeam });
        set({ role: user.role });
      },
    }),
    {
      name: 'login-state',
    },
  ),
);

export default useStore;

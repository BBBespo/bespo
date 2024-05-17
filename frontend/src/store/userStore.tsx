import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  accessToken: string;
  name: string;
  profile: string;
  email: string;
  hasTeam: boolean;
  role: string;
  team: {
    teamId: number;
    name: string;
    image: string;
  } | null;
};

interface Store {
  accessToken: string | null;
  name: string | null;
  profile: string | null;
  email: string | null;
  hasTeam: boolean | false;
  role: string | null;
  team: {
    teamId: number;
    name: string;
    image: string;
  } | null;
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
      team: null,
      // hasTeam: true,
      // role: 'player',
      setUser: (user: User) => {
        set({ accessToken: user.accessToken });
        set({ name: user.name });
        set({ profile: user.profile });
        set({ email: user.email });
        set({ hasTeam: user.hasTeam });
        set({ role: user.role });
        set({ team: user.team });
      },
    }),
    {
      name: 'login-state',
    },
  ),
);

export default useStore;

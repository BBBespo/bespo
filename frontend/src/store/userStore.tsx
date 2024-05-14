import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  accessToken: string;
  nickname: string;
  profile: string;
  email: string;
};

interface Store {
  accessToken: string | null;
  nickname: string | null;
  profile: string | null;
  email: string | null;
  setUser: (user: User) => void;
}

const useStore = create(
  persist<Store>(
    (set) => ({
      accessToken: null,
      nickname: null,
      profile: null,
      email: null,
      setUser: (user: User) => {
        set({ accessToken: user.accessToken });
        set({ nickname: user.nickname });
        set({ profile: user.profile });
      },
    }),
    {
      name: 'login-state',
    },
  ),
);

export default useStore;

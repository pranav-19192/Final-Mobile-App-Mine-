
import { db } from './db.ts';

export interface UserSession {
  name: string;
  email: string;
  avatar: string;
}

export const googleAuth = {
  login: async (): Promise<UserSession> => {
    await new Promise(r => setTimeout(r, 1200));
    const mockUser = {
      name: 'Alex Sterling',
      email: 'alex.sterling@example.com',
      avatar: 'https://picsum.photos/seed/alex-Sterling/200'
    };
    db.users.create(mockUser);
    localStorage.setItem('swift_session', JSON.stringify(mockUser));
    return mockUser;
  },
  logout: () => {
    localStorage.removeItem('swift_session');
  },
  getCurrentUser: (): UserSession | null => {
    const session = localStorage.getItem('swift_session');
    return session ? JSON.parse(session) : null;
  }
};

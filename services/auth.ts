import { db } from './db.ts';

export interface UserSession {
  name: string;
  email: string;
  avatar: string;
}

export const googleAuth = {
  login: async (): Promise<UserSession> => {
    // Simulated Google OAuth Delay
    await new Promise(r => setTimeout(r, 1200));
    
    const mockUser = {
      name: 'Pranav',
      email: 'pranav.travels@gmail.com',
      avatar: 'https://picsum.photos/seed/pranav/200'
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
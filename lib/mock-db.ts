// lib/mock-db.ts
type User = {
  id: string;
  username: string;
  email: string;
  password: string; // 💡 Note: Password harus di-hash di produksi!
};

const users: User[] = [];

export const db = {
  user: {
    create: (data: Omit<User, 'id'>) => {
      const user = { ...data, id: Date.now().toString() };
      users.push(user);
      return user;
    },
    findUnique: (where: { email: string }) => {
      return users.find((user) => user.email === where.email) || null;
    },
  },
};
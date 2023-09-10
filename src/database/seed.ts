import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () =>
  await prisma.user.createMany({
    data: [
      { name: 'user', email: 'user@example.com', roles: ['user'] },
      { name: 'admin', email: 'admin@example.com', roles: ['admin'] },
      { name: 'root', email: 'root@example.com', roles: ['root'] },
      { name: 'John', email: 'John@example.com', roles: ['user', 'admin'] },
      {
        name: 'Bob',
        email: 'Bob@example.com',
        roles: ['user', 'admin', 'root'],
      },
      { name: 'Alice', email: 'Alice@example.com', roles: [] },
    ],
  });

seed()
  .then((users) =>
    console.log(`DB successfully seeded, created ${users.count} users`),
  )
  .catch((err) => console.log(err))
  .finally(async () => await prisma.$disconnect());

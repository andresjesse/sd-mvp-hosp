import { User } from '@prisma/client';
import hasher from '../hasher/impl/BcryptjsHasher';
import { HasherError, HashResponse } from '../hasher/interfaces/Hasher';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const adminPass: string | undefined = process.env.ADMIN_PASSWORD;

    if (adminPass === undefined) {
        throw new Error("ADMIN_PASSWORD enviroment variable not set on .env.");
    }

    const hashOperation: HasherError | HashResponse = await hasher.hashAsync(adminPass as string);

    if (!hashOperation.ok) {
        const failure = (hashOperation as HasherError);
        throw new Error(failure.errorMessage);
    }
  
    const adminPassHashed: string = (hashOperation as HashResponse).hashedInput;
    
    /* This is a transactional create */
    const createUser: User = await prisma.user.create({
        data: {
            name: "example-admin",
            email: "exampleAdmin@gmail.com",
            passwordHash: adminPassHashed,
            role: "ADMIN",
            admin: {
                create: 
                    {
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
            }
        }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
import { RequestHandler } from "express";
import * as bcrypt from 'bcrypt'
import prisma from "../../utils/prisma";


const createUserIntoDB = async(data:any) => {
    const hashedPassword:string=await bcrypt.hashSync(data.password, 10);

    const userWithProfile = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          profile: {
            create: {
              bio: data.bio,
              profession: data.profession,
              address: data.address,
            },
          },
        },
        include: {
          profile: true, // Include the profile in the response
        },
      });
      const response = {
        id: userWithProfile.id,
        name: userWithProfile.name,
        email: userWithProfile.email,
        createdAt: userWithProfile.createdAt,
        updatedAt: userWithProfile.updatedAt,
      };
    
    return { success: true, message: "User created successfully", data: response };
}

export const UserServices = {
    createUserIntoDB
}
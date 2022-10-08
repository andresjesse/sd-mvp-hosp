// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../lib/prisma";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {

if(req.method === 'POST'){

try {

  const{userId, crm, crmUf, isActive, createdAt, updatedAt} = req.body;

  const doctor = await prisma.doctor.create({
    data:{
      //user,
      userId,    
      crm,       
      crmUf,    
      isActive,  
      createdAt, 
      updatedAt
    }
  });
  res.status(201).json(doctor);
  console.log(doctor);
} catch (error) {
  res.status(500).json({ name: 'bad request' });
}
}

  
}

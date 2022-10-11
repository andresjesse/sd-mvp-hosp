// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { create } from 'domain';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {

if(req.method === 'POST'){

try {
  const{name,email,passwordHash, crm, crmUf} = req.body;


  // const user = await prisma.user.create({
  //   data:{
  //     id: undefined, //pensando em como pegar esse id
  //     name,
  //     email,
  //     passwordHash,
      
  //   }
  // });

  

  const doctor = await prisma.doctor.create({
    data:{
      user: 
      {create: {
        name,
        email,
        passwordHash,
        createdAt: Date(),
      updatedAt: Date(),
      }
         },  
      crm,       
      crmUf,    
      isActive: false,  
      createdAt: Date(), 
      updatedAt: Date()
    },
    include:{
      user: true
    }
  });
  res.status(201).json({name: 'Doctor Created'});
  console.log(doctor);
} catch (error) {
  res.status(500).json({ name: 'bad request' });
}
}

  
}

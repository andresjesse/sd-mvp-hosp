import { Doctor, Sector, User } from "@prisma/client";
import { sectors } from "../prisma/seeds/sectors";

export const fakeUsers: Array<User> = [
  {
    id: 1,
    name: "William",
    email: "william@mail.com",
    passwordHash: "sdasdasdas",
    role: "DOCTOR",
    createdAt: JSON.parse(JSON.stringify(new Date("2022-10-10"))),
    updatedAt: JSON.parse(JSON.stringify(new Date("2022-10-10"))),
  },
  {
    id: 2,
    name: "Renan",
    email: "renan@mail.com",
    passwordHash: "sdasdasdas",
    role: "DOCTOR",
    createdAt: JSON.parse(JSON.stringify(new Date("2022-10-10"))),
    updatedAt: JSON.parse(JSON.stringify(new Date("2022-10-10"))),
  },
];
export const fakeDoctors: Array<Doctor> = [
  {
    id: 1,
    userId: 1,
    crm: "1231478",
    crmUf: "PR",
    isActive: true,
    createdAt: JSON.parse(JSON.stringify(new Date("2022-10-10"))),
    updatedAt: JSON.parse(JSON.stringify(new Date("2022-10-10"))),
  },
  {
    id: 2,
    userId: 2,
    crm: "546468",
    crmUf: "PR",
    isActive: true,
    createdAt: JSON.parse(JSON.stringify(new Date("2022-10-10"))),
    updatedAt: JSON.parse(JSON.stringify(new Date("2022-10-10"))),
  },
];

export type TScale = {
  id: number;
  date: string;
  hourStart: number;
  hourEnd: number;
  idDoctor: number;
  nameDoctor: string;
  idSector: number;
  isFixed: boolean;
};

export const fakeScales: Array<TScale> = [
  {
    id: 1,
    date: "2022-10-1",
    hourStart: 7,
    hourEnd: 19,
    idDoctor: 1,
    nameDoctor: "William",
    idSector: 1,
    isFixed: true,
  },
  {
    id: 2,
    date: "2022-10-1",
    hourStart: 19,
    hourEnd: 7,
    idDoctor: 2,
    nameDoctor: "Renan",
    idSector: 1,
    isFixed: true,
  },
  {
    id: 3,
    date: "2022-10-2",
    hourStart: 7,
    hourEnd: 19,
    idDoctor: 1,
    nameDoctor: "William",
    idSector: 1,
    isFixed: true,
  },
  {
    id: 4,
    date: "2022-10-2",
    hourStart: 19,
    hourEnd: 7,
    idDoctor: 2,
    nameDoctor: "Renan",
    idSector: 1,
    isFixed: true,
  },
  {
    id: 5,
    date: "2022-10-3",
    hourStart: 19,
    hourEnd: 7,
    idDoctor: 2,
    nameDoctor: "Heloisa",
    idSector: 1,
    isFixed: true,
  },
];

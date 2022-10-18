import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: number
    name: string
    email: string
    role: Role
    admin: Admin | null
    doctor: Doctor | null
  }
}

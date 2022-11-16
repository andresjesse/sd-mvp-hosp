import { TSessionUser } from '../../pages/api/auth/[...nextauth]'
import Roles from './Roles'

const Policies = {
  allowProtected: async (user: TSessionUser, obj: any) => {
    if (obj.color !== 'orange')
      throw new Error('Policy error, color should be orange!')
  },
  allowRed: async (user: TSessionUser, obj: any) => {
    // admins can handle orange and red
    // if (user.roles.includes(Roles.ADMIN)) {
    if (user.admin !== null) {
      const accepted = ['orange', 'red']

      if (!accepted.includes(obj.color))
        throw new Error('Policy error, color should be orange!')

      console.log('admin allowed!')
    } // regular users can only handle orange
    else {
      if (obj.color !== 'orange')
        throw new Error('Policy error, color should be orange!')

      console.log('allowed reglar user')
    }
  },
}

export default Policies

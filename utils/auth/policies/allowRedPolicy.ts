import { AuthPolicyError } from '../../../errors/AuthPolicyError'
import { TSessionUser } from '../../../pages/api/auth/[...nextauth]'

export default async function allowPolicy(
  user: TSessionUser,
  obj: {
    color: string
  }
) {
  if (user.admin !== null) {
    const accepted = ['orange', 'red']

    if (!accepted.includes(obj.color))
      throw new AuthPolicyError('Policy error, color should be orange!')

    console.log('admin allowed!')
  } else {
    if (obj.color !== 'orange')
      throw new AuthPolicyError('Policy error, color should be orange!')

    console.log('allowed reglar user')
  }
}

import type { GetServerSidePropsContext, NextPage } from 'next'
import { rolesCheckModeEnum } from '../utils/auth/policies/allowByRolePolicy'
import Policies from '../utils/auth/policies/index'
import Roles from '../utils/auth/Roles'
import withAuth from '../utils/auth/withAuth'
import { TSessionUser } from './api/auth/[...nextauth]'

const Welcome: NextPage = () => {
  return (
    <div>
      <h1>Protected</h1>
    </div>
  )
}

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext, user: TSessionUser) => {
    const fetchData = {
      color: 'red',
    }

    await Policies.allowRed(user, fetchData)
    await Policies.allowByRole(
      user,
      [Roles.ADMIN, Roles.DOCTOR],
      rolesCheckModeEnum.SOME
    )

    return {
      props: {
        fetchData,
      },
    }
  }
)

export default Welcome

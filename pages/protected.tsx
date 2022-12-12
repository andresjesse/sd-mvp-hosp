import type { GetServerSidePropsContext, NextPage } from 'next'
import { RolesCheckModeEnum } from '../utils/auth/policies/allowByRole'
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
      color: 'orange',
    }

    await Policies.allowRed(user, fetchData)
    await Policies.allowByRole(
      user,
      [Roles.ADMIN, Roles.DOCTOR],
      RolesCheckModeEnum.ACCEPT_ANY
    )

    return {
      props: {
        fetchData,
      },
    }
  }
)

export default Welcome

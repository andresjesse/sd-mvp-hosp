import type { GetServerSidePropsContext, NextPage } from 'next'
import Policies from '../utils/auth/Policies'
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

    // Policies.allowProtected(user, fetchData)
    Policies.allowRed(user, fetchData)

    return {
      props: {
        fetchData,
      },
    }
  }
)

export default Welcome

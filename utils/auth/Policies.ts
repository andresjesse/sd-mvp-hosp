import { Shift } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { TSessionUser } from '../../pages/api/auth/[...nextauth]'

export abstract class Policy<Props> {
  props: Props | undefined
  propsInitializer: (
    ctx: GetServerSidePropsContext,
    user: TSessionUser
  ) => Promise<Props>

  constructor(
    propsInitializer: (ctx: GetServerSidePropsContext) => Promise<Props>
  ) {
    this.propsInitializer = propsInitializer
  }

  async init(
    ctx: GetServerSidePropsContext,
    user: TSessionUser
  ): Promise<this> {
    this.props = await this.propsInitializer(ctx, user)
    return this
  }

  abstract run(user?: TSessionUser): Promise<boolean>
}

export class DoctorOwnsShift extends Policy<{
  shift: Shift
}> {
  constructor(
    propsInitializer: (ctx: GetServerSidePropsContext) => Promise<{
      shift: Shift
    }>
  ) {
    super(propsInitializer)
  }

  async run(user: TSessionUser) {
    if (this.props?.shift === null || this.props?.shift === undefined) {
      console.log('aaaausuário: ', user.email)
      return false
    }
    console.log('shift', this.props.shift)
    console.log('doctorId: ', user.doctor?.id)
    return this.props?.shift.idDoctor === user.doctor?.id
  }
}

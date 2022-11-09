import { Shift } from '@prisma/client'

export abstract class Policy<Props> {
  props: Props

  constructor(propsInitializer: () => Props) {
    this.props = propsInitializer()
  }

  abstract run(): boolean
}

export class OnlyFixedShiftsPolicy extends Policy<{
  shift: Shift
}> {
  run(): boolean {
    return this.props.shift.isFixed
  }

  constructor(
    propsInitializer: () => {
      shift: Shift
    }
  ) {
    super(propsInitializer)
  }
}

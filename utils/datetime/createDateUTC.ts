const createDateUTC = (baseDate: Date, utcHour: number) => {
  return new Date(
    Date.UTC(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      utcHour
    )
  )
}

export default createDateUTC

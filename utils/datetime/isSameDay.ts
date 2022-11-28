const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getDate() == d2.getDate() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getFullYear() == d1.getFullYear()
  )
}

export default isSameDay

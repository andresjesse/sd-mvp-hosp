const formatHashShift = (date: Date, sectorId: number) => {
  return `${date.toLocaleDateString()}&${date.getHours()}&${sectorId}`
}

export default formatHashShift

export const formatDate = (date: Date) => {
  const dateObj = new Date(date)
  const yyyy = dateObj.getFullYear()
  let mm = dateObj.getMonth() + 1 // Months start at 0!
  let dd = dateObj.getDate()

  return `${dd < 10 ? '0' + dd : dd}. ${mm < 10 ? '0' + mm : mm}. ${yyyy}`
}

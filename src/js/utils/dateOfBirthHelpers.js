export function dateOfBirth (days) {
  const dob = new Date(1900, 0, 1)
  dob.setDate(dob.getDate() + days)
  return dob
}

export function haveYears (birthDate, years) {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age >= years
}

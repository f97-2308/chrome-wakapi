export const getCurrentToday = async (server: string, token: string) => {
  const res = await fetch(`${server}/api/users/current/statusbar/today`, {
    method: 'GET',
    headers: { Authorization: 'Basic ' + token }
  })
  return await res.json()
}

export default getCurrentToday

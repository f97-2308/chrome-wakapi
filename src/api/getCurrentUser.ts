export const getCurrentUser = async (server: string, token: string) => {
  const res = await fetch(`${server}/api/compat/wakatime/v1/users/current`, {
    method: 'GET',
    headers: { Authorization: 'Basic ' + token }
  })
  return await res.json()
}

export default getCurrentUser

import info from '../info'

export const postCurrentHeartbeats = async (server: string, token: string, entity: string, timestamp: number) => {
  const body = JSON.stringify({
    entity,
    type: 'domain',
    time: Math.round(timestamp / 1000),
    project: '<<LAST_PROJECT>>',
    plugin: 'browser-wakatime/' + info.version
  })
  const res = await fetch(`${server}/api/compat/wakatime/v1/users/current/heartbeats`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + token,
      'Content-Type': 'application/json'
    },
    body
  })
  return await res.json()
}

export default postCurrentHeartbeats

import OBSWebSocket from 'obs-websocket-js'

export const obs = new OBSWebSocket()

export async function sendCommand (command, params) {
  try {
    return await obs.call(command, params || {})
  } catch (e) {
    console.log('Error sending command', command, ' - error is:', e.message)
    return {}
  }
}

obs.on('error', err => {
  console.error('Socket error:', err)
})

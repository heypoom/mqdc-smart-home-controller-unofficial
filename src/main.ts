import {connect} from 'async-mqtt'

import {Devices} from './config/devices'

import {
  ACAction,
  ACState,
  createACPayload,
  createTopic,
} from './payload/air-conditioner'

const BROKER_URI = 'mqtt://iotservices.obotrons.dtgsiam.com:1883'
const BROKER_USERNAME = 'mqttAirDaikin'
const BROKER_PASSWORD = 'Ob0tronsW101HR1'

const createPayload = (action: string, deviceId: string) => {
  const create = (command: ACAction, state: ACState) =>
    createACPayload(deviceId, command, state)

  switch (action) {
    case 'on':
      return create(ACAction.SET_POWER, ACState.POWER_ON)
    case 'off':
      return create(ACAction.SET_POWER, ACState.POWER_OFF)
    case 'max':
      return create(ACAction.SET_FAN_SPEED, ACState.FAN_SPEED_5)
  }
}

async function main() {
  const action = process.argv[2]?.trim()
  const deviceKey = process.argv[3]?.trim()

  console.log('input:', {action, deviceKey})

  const client = connect(BROKER_URI, {
    username: BROKER_USERNAME,
    password: BROKER_PASSWORD,
  })

  const deviceId = Devices[deviceKey] ?? Devices.BEDROOM_AC
  const topic = createTopic(deviceId)
  let payload = createPayload(action, deviceId)

  console.log('sending:', {topic, payload})

  if (payload) await client.publish(topic, payload)

  console.log('done!')

  process.exit()
}

main()

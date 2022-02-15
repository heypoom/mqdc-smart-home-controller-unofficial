// (2C3AE8487CD1 000001 04 010100 070F)

import {checksum} from './checksum'

const SEPARATOR_A = '000001'
const SEPARATOR_B = '010100'

export enum ACAction {
  SET_POWER = '02',
  SET_FAN_SPEED = '04',
  SET_TEMPERATURE = '05',
  SET_SWING = '07',
  SET_MODE = '08',
}

export enum ACState {
  POWER_OFF = '00',
  POWER_ON = '01',

  FAN_SPEED_1 = '03',
  FAN_SPEED_2 = '04',
  FAN_SPEED_3 = '05',
  FAN_SPEED_4 = '06',
  FAN_SPEED_5 = '07',
  FAN_SPEED_AUTO = '0A',

  SWING_OFF = '00',
  SWING_VERTICAL = '01',
  SWING_HORIZONTAL = '02',
  SWING_BOTH = '03',

  MODE_FAN = '00',
  MODE_COOL = '01',
  MODE_DRY = '02',
}

export const createACPayload = (
  deviceId: string,
  action: ACAction,
  state: ACState | string
) => {
  const data = `${deviceId}${SEPARATOR_A}${action}${SEPARATOR_B}${state}`

  return `(${data}${checksum(data)})`
}

export const updateTemperature = (deviceId: string, temperature: number) =>
  createACPayload(
    deviceId,
    ACAction.SET_TEMPERATURE,
    (temperature * 2).toString(16).toUpperCase()
  )

export const createTopic = (deviceId: string) =>
  `/query/device/${deviceId}/app/${deviceId}`

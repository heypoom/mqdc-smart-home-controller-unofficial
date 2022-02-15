import {Devices} from '../src/config/devices'

import {
  ACAction,
  ACState,
  createACPayload,
} from '../src/payload/air-conditioner'

describe('AC Payload', () => {
  const id = Devices.BEDROOM_AC

  it('can turn off', () => {
    expect(createACPayload(id, ACAction.SET_POWER, ACState.POWER_OFF)).toBe(
      '(2C3AE8487CC0000001020101000029)'
    )
  })

  it('can turn on', () => {
    expect(createACPayload(id, ACAction.SET_POWER, ACState.POWER_ON)).toBe(
      '(2C3AE8487CC0000001020101000128)'
    )
  })
})

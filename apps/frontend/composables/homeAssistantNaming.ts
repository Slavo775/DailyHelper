import type {
  HomeAssistantDeviceManufacturer,
  HomeAssistantRoom,
} from '~/config/homeAssistant'

export type DeviceHomeAssistantNamingData = {
  manufacturer: HomeAssistantDeviceManufacturer
  room: HomeAssistantRoom
  deviceType: string
}

export type AutomatizationHomeAssistantNamingData = {
  room: HomeAssistantRoom
  trigger: string
  action: string
}

export enum HomeAssistantDataType {
  device = 'device',
  automatization = 'automatization',
}

export type HomeAssistantData =
  | {
      type: HomeAssistantDataType.device
      data: DeviceHomeAssistantNamingData
    }
  | {
      type: HomeAssistantDataType.automatization
      data: AutomatizationHomeAssistantNamingData
    }

export const useHomeAssistantNaming = () => {
  const createNamingForHomeAssistance = ({ type, data }: HomeAssistantData) => {
    if (type === HomeAssistantDataType.device)
      return createNamingForHomeAssistanceDevice(data)
    else if (type === HomeAssistantDataType.automatization)
      return createNamingForHomeAssistanceAutomatization(data)
    return null
  }

  const createNamingForHomeAssistanceDevice = ({
    manufacturer,
    room,
    deviceType,
  }: DeviceHomeAssistantNamingData) => `${manufacturer}_${room}_${deviceType}`

  const createNamingForHomeAssistanceAutomatization = ({
    room,
    trigger,
    action,
  }: AutomatizationHomeAssistantNamingData) => `${room}_${trigger}_${action}`

  return { createNamingForHomeAssistance }
}

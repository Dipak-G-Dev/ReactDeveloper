import { LocationInterface } from './Location'

export interface InstanceInterface {
  id: string
  ipAddress: string
  channelId: string
  currentUsers: number
  ended: boolean
  podName: string
  assigned: boolean
  assignedAt: Date
  locationId?: string
  location?: LocationInterface
}

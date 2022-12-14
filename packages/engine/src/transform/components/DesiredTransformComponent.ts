import { Quaternion, Vector3 } from 'three'

import { createMappedComponent } from '../../ecs/functions/ComponentFunctions'

export type DesiredTransformComponentType = {
  position: Vector3
  rotation: Quaternion
  positionRate: number
  rotationRate: number
  lockRotationAxis: [boolean, boolean, boolean]
  positionDelta: number
  rotationDelta: number
}

export const DesiredTransformComponent =
  createMappedComponent<DesiredTransformComponentType>('DesiredTransformComponent')

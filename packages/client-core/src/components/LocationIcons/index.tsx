import React from 'react'

import { TouchGamepad } from '@xrengine/client-core/src/common/components/TouchGamepad'
import { UserMenu } from '@xrengine/client-core/src/user/components/UserMenu'
import { getState, useHookstate } from '@xrengine/hyperflux'

import { LoadingSystemState } from '../../systems/state/LoadingState'
import { Fullscreen } from '../Fullscreen'
import { InstanceChatWrapper } from '../InstanceChat'
import { MediaIconsBox } from '../MediaIconsBox'
import { Shelves } from '../Shelves'
import { UserMediaWindows } from '../UserMediaWindows'
import styles from './index.module.scss'

export const LocationIcons = () => {
  const loadingSystemState = useHookstate(getState(LoadingSystemState))
  return (
    <>
      <UserMenu />
      {/** Container for fading most stuff in and out depending on if the location is loaded or not  */}
      <div style={{ opacity: 1 - loadingSystemState.loadingScreenOpacity.value }}>
        <div className={`${styles.rightSidebar}`}>
          <UserMediaWindows />
          <InstanceChatWrapper />
        </div>
        <Shelves />
        <MediaIconsBox />
        <TouchGamepad />
        <Fullscreen />
      </div>
    </>
  )
}

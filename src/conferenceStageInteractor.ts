import { renderUtil } from '@sprucelabs/heartwood-view-controllers'
import { assertOptions } from '@sprucelabs/schema'
import { generateId } from '@sprucelabs/test-utils'
import {
    ConferenceStageViewController,
    OnDeviceChangeOptions,
    OnJoinOptions,
} from './conferenceStage.types'
import SpruceError from './errors/SpruceError'

const conferenceStageInteractor = {
    async simulateClickJoin(
        stageVc: ConferenceStageViewController,
        options?: OnJoinOptions
    ): Promise<void> {
        assertOptions({ stageVc }, ['stageVc'])
        const { onJoin } = renderUtil.render(stageVc)
        await onJoin?.(
            options ?? {
                audioInputId: generateId(),
                audioOutputId: generateId(),
                videoDeviceId: generateId(),
            }
        )
    },

    async simulateDeviceError(
        stageVc: ConferenceStageViewController,
        error: SpruceError
    ): Promise<void> {
        assertOptions({ stageVc, error }, ['stageVc', 'error'])
        const { onDeviceError } = renderUtil.render(stageVc)
        await onDeviceError?.(error)
    },

    async simulateDeviceChange(
        stageVc: ConferenceStageViewController,
        changes: OnDeviceChangeOptions
    ): Promise<void> {
        assertOptions({ stageVc, changes }, ['stageVc', 'changes'])
        const { onDeviceChange } = renderUtil.render(stageVc)
        await onDeviceChange?.(changes)
    },
}

export default conferenceStageInteractor

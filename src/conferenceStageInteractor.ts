import { renderUtil } from '@sprucelabs/heartwood-view-controllers'
import { assertOptions } from '@sprucelabs/schema'
import { assert, generateId } from '@sprucelabs/test-utils'
import {
    ConferenceStageViewController,
    OnDeviceChangeOptions,
    OnJoinOptions,
} from './conferenceStage.types'
import SpruceError from './errors/SpruceError'

const conferenceStageInteractor = {
    async clickJoin(
        stageVc: ConferenceStageViewController,
        options?: OnJoinOptions
    ): Promise<void> {
        assertOptions({ stageVc }, ['stageVc'])
        const { onJoin } = renderUtil.render(stageVc)

        assert.isFunction(
            onJoin,
            `Could not trigger onJoin because it is not set. Make sure to pass onJoin when creating the ConferenceStageViewController.`
        )

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

        assert.isFunction(
            onDeviceError,
            `Could not trigger onDeviceError because it is not set. Make sure to pass onDeviceError when creating the ConferenceStageViewController.`
        )

        await onDeviceError?.(error)
    },

    async changeDevice(
        stageVc: ConferenceStageViewController,
        changes: OnDeviceChangeOptions
    ): Promise<void> {
        assertOptions({ stageVc, changes }, ['stageVc', 'changes'])
        const { onDeviceChange } = renderUtil.render(stageVc)

        assert.isFunction(
            onDeviceChange,
            `Could not trigger onDeviceChange because it is not set. Make sure to pass onDeviceChange when creating the ConferenceStageViewController.`
        )

        await onDeviceChange?.(changes)
    },

    async clickLeave(stageVc: ConferenceStageViewController): Promise<void> {
        assertOptions({ stageVc }, ['stageVc'])
        const { onLeave } = renderUtil.render(stageVc)
        assert.isFunction(
            onLeave,
            `Could not trigger onLeave because it is not set. Make sure to pass onLeave when creating the ConferenceStageViewController.`
        )
        await onLeave?.()
    },
}

export default conferenceStageInteractor

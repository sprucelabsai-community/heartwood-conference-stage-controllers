import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import {
    ConferenceStageViewController,
    OnDeviceChangeOptions,
    OnJoinOptions,
} from '../../../conferenceStage.types'
import conferenceStageInteractor from '../../../conferenceStageInteractor'
import SpruceError from '../../../errors/SpruceError'

@suite()
export default class InteractingWithTheConferenceStageTest extends AbstractSpruceFixtureTest {
    private didTriggerOnJoin = false
    private stageVc!: ConferenceStageViewController
    private onJoinOptions?: OnJoinOptions
    private deviceError?: SpruceError
    private deviceChangeOptions?: OnDeviceChangeOptions
    private didTriggerOnLeave = true

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.didTriggerOnJoin = false
        this.stageVc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {
                onJoin: async (options) => {
                    this.onJoinOptions = options
                    this.didTriggerOnJoin = true
                },
                onDeviceError: async (err) => {
                    this.deviceError = err
                },
                onDeviceChange: async (options) => {
                    this.deviceChangeOptions = options
                },
                onLeave: async () => {
                    this.didTriggerOnLeave = true
                },
            }
        )
    }

    @test()
    protected async simulateClickJoinThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            conferenceStageInteractor.clickJoin()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc'],
        })
    }

    @test()
    protected async canSimulateJoin() {
        await conferenceStageInteractor.clickJoin(this.stageVc)
        assert.isTrue(this.didTriggerOnJoin, 'Join handler was not hit!')
    }

    @test()
    protected async canPassDeviceIdsToJoinHandler() {
        const expected = await this.clickJoin()

        assert.isEqualDeep(
            this.onJoinOptions,
            expected,
            'Options passed to onJoin do not match!'
        )
    }

    @test()
    protected async simulateDeviceErrorThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            conferenceStageInteractor.simulateDeviceError()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc', 'error'],
        })
    }

    @test()
    protected async canSimulateDeviceError() {
        const expected = await this.simulateDeviceError()

        assert.isEqualDeep(
            this.deviceError,
            expected,
            'Device error passed to onDeviceError does not match!'
        )
    }

    @test()
    protected async simulateDeviceChangeThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            conferenceStageInteractor.changeDevice()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc', 'changes'],
        })
    }

    @test()
    protected async canSimulateDeviceChange() {
        const expected: OnDeviceChangeOptions =
            await this.simulateDeviceChange()

        assert.isEqualDeep(
            this.deviceChangeOptions,
            expected,
            'Device change options passed to onDeviceChange do not match!'
        )
    }

    @test()
    protected async clickLeaveThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            conferenceStageInteractor.clickLeave()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc'],
        })
    }

    @test()
    protected async canClickLeave() {
        await this.clickLeave()
        assert.isTrue(this.didTriggerOnLeave, 'Leave handler was not hit!')
    }

    @test()
    protected async clicksThrowWhenNoHandlerSet() {
        this.stageVc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {}
        )

        await assert.doesThrowAsync(() => this.clickJoin(), 'onJoin')
        await assert.doesThrowAsync(() => this.clickLeave(), 'onLeave')
        await assert.doesThrowAsync(
            () => this.simulateDeviceChange(),
            'onDeviceChange'
        )

        await assert.doesThrowAsync(
            () => this.simulateDeviceError(),
            'onDeviceError'
        )
    }

    private async simulateDeviceError() {
        const expected = new SpruceError({
            code: 'DEVICE_ERROR',
        })

        await conferenceStageInteractor.simulateDeviceError(
            this.stageVc,
            expected
        )
        return expected
    }

    private async clickJoin() {
        const expected = {
            audioInputId: generateId(),
            audioOutputId: generateId(),
            videoDeviceId: generateId(),
        }
        await conferenceStageInteractor.clickJoin(this.stageVc, expected)
        return expected
    }

    private async clickLeave() {
        await conferenceStageInteractor.clickLeave(this.stageVc)
    }

    private async simulateDeviceChange() {
        const expected: OnDeviceChangeOptions = {
            audioInputId: generateId(),
            audioOutputId: generateId(),
            videoDeviceId: generateId(),
        }

        await conferenceStageInteractor.changeDevice(this.stageVc, expected)
        return expected
    }
}

import { fake } from '@sprucelabs/spruce-test-fixtures'
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

@fake.login()
@suite()
export default class InteractingWithTheConferenceStageTest extends AbstractSpruceFixtureTest {
    private didTriggerOnJoin = false
    private stageVc!: ConferenceStageViewController
    private onJoinOptions?: OnJoinOptions
    private deviceError?: SpruceError
    private deviceChangeOptions?: OnDeviceChangeOptions

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
            }
        )
    }

    @test()
    protected async simulateClickJoinThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            conferenceStageInteractor.simulateClickJoin()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc'],
        })
    }

    @test()
    protected async canSimulateJoin() {
        await conferenceStageInteractor.simulateClickJoin(this.stageVc)
        assert.isTrue(this.didTriggerOnJoin, 'Join handler was not hit!')
    }

    @test()
    protected async canPassDeviceIdsToJoinHandler() {
        const expected = {
            audioInputId: generateId(),
            audioOutputId: generateId(),
            videoDeviceId: generateId(),
        }
        await conferenceStageInteractor.simulateClickJoin(
            this.stageVc,
            expected
        )

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
        const expected = new SpruceError({
            code: 'DEVICE_ERROR',
        })

        await conferenceStageInteractor.simulateDeviceError(
            this.stageVc,
            expected
        )

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
            conferenceStageInteractor.simulateDeviceChange()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc', 'changes'],
        })
    }

    @test()
    protected async canSimulateDeviceChange() {
        const expected: OnDeviceChangeOptions = {
            audioInputId: generateId(),
            audioOutputId: generateId(),
            videoDeviceId: generateId(),
        }

        await conferenceStageInteractor.simulateDeviceChange(
            this.stageVc,
            expected
        )

        assert.isEqualDeep(
            this.deviceChangeOptions,
            expected,
            'Device change options passed to onDeviceChange do not match!'
        )
    }
}

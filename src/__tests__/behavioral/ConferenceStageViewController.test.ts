import { vcAssert } from '@sprucelabs/heartwood-view-controllers'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import ConferenceStageViewController from '../../conferenceStage/ConferenceStage.vc'
import {
    AddParticipantSurfaceOptions,
    ConnectionStatus,
    OnJoinOptions,
    SurfaceRenderer,
} from '../../conferenceStage.types'
import MockParticipantSurface from '../../participantSurface/MockParticipantSurface'

@suite()
export default class ConferenceStageViewControllerTest extends AbstractSpruceFixtureTest {
    private vc!: ConferenceStageViewController
    private lastOnJoinOptions?: OnJoinOptions
    private lastOnDeviceChangeOptions?: Partial<OnJoinOptions>

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {
                onJoin: async (options) => {
                    this.lastOnJoinOptions = options
                },
                onLeave: async () => {
                    //no test needed because of passthrough
                },
                onDeviceChange: async (options) => {
                    this.lastOnDeviceChangeOptions = options
                },
            }
        )
    }

    @test()
    protected async canCreateViewController() {
        assert.isTruthy(this.vc, 'View controller should be created')
    }

    @test()
    protected async passesThroughOnJoin() {
        const model = this.render()
        const options = {
            audioInputId: generateId(),
            audioOutputId: generateId(),
            videoDeviceId: generateId(),
        }
        await model.onJoin?.(options)

        assert.isEqualDeep(
            this.lastOnJoinOptions,
            options,
            'onJoin options mismatch'
        )
    }

    @test()
    protected async passesThroughDeviceChange() {
        const model = this.render()
        const options: Partial<OnJoinOptions> = {
            audioInputId: generateId(),
        }
        await model.onDeviceChange?.(options)

        assert.isEqualDeep(
            this.lastOnDeviceChangeOptions,
            options,
            'onDeviceChange options mismatch'
        )
    }

    @test(
        'can invoke addParticipantSurface callback with rederer canvas',
        'canvas'
    )
    @test(
        'can invoke addParticipantSurface callback with rederer video',
        'video'
    )
    protected async addingParticipantSurfaceInvokesCallabackInViewModel(
        renderer: SurfaceRenderer
    ) {
        const model = this.render()
        let passedOptions: AddParticipantSurfaceOptions | undefined
        const surface = new MockParticipantSurface()

        model.setAddParticipantSurfaceHandler(async (options) => {
            passedOptions = options
            return surface
        })

        const options: AddParticipantSurfaceOptions = { renderer }
        const actual = await this.addParticipant(options)

        assert.isEqualDeep(
            passedOptions,
            options,
            'Options to setAddParticipantSurfaceHandler mismatch'
        )

        assert.isEqual(actual, surface, 'Returned participant surface mismatch')
    }

    @test('can set connection status to connecting', 'connecting')
    @test('can set connection status to connected', 'connected')
    protected async canSetVcsConnectionStatus(status: ConnectionStatus) {
        this.setConnectionStatus(status)
        const { connectionStatus } = this.render()
        assert.isEqual(connectionStatus, status, 'Connection status mismatch')
    }

    @test()
    protected async canSetCriticalError() {
        const err = new Error('Critical failure!')
        this.setCriticalError(err)
        const { criticalError } = this.render()
        assert.isEqual(criticalError, err, 'Critical error mismatch')
    }

    @test()
    protected async canClearCriticalError() {
        this.setCriticalError(new Error('Critical failure!'))
        this.clearCriticalError()
        const { criticalError } = this.render()
        assert.isFalsy(criticalError, 'Critical error should be undefined')
    }

    @test()
    protected async leaveCallsOnLeaveInViewModel() {
        const { setLeaveConferenceHandler } = this.render()
        let wasHit = false
        setLeaveConferenceHandler(() => {
            wasHit = true
        })

        assert.isFalse(wasHit, 'onLeave handler was hit too early')

        this.leaveConference()

        assert.isTrue(
            wasHit,
            'onLeave handler was not called when calling leave on vc'
        )
    }

    @test()
    protected async triggersRenderWhenExpected() {
        this.setConnectionStatus('connected')
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        this.setCriticalError(new Error('Critical failure!'))
        vcAssert.assertTriggerRenderCount(this.vc, 2)
        this.clearCriticalError()
        vcAssert.assertTriggerRenderCount(this.vc, 3)
    }

    @test()
    protected async canEnterConference() {
        const { setEnterConferenceHandler } = this.render()
        let wasHit = false
        setEnterConferenceHandler(async () => {
            wasHit = true
        })

        assert.isFalse(wasHit, 'enterConference handler was hit too early')

        this.vc.enterConference()

        assert.isTrue(
            wasHit,
            'enterConference handler was not called when calling enterConference on vc'
        )
    }

    private clearCriticalError() {
        this.vc.clearCriticalError()
    }

    private setConnectionStatus(status: ConnectionStatus) {
        this.vc.setConnectionStatus(status)
    }

    private leaveConference() {
        this.vc.leaveConference()
    }

    private setCriticalError(err: Error) {
        this.vc.setCriticalError(err)
    }

    private async addParticipant(options: AddParticipantSurfaceOptions) {
        return await this.vc.addParticipantSurface(options)
    }

    private render() {
        return this.views.render(this.vc)
    }
}

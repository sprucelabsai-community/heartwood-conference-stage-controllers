import { vcAssert } from '@sprucelabs/heartwood-view-controllers'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import {
    test,
    suite,
    assert,
    generateId,
    errorAssert,
} from '@sprucelabs/test-utils'
import MockConferenceParticipant from '../../conferenceParticipant/MockConferenceParticipant'
import ConferenceStageViewController from '../../conferenceStage/ConferenceStage.vc'
import {
    AddConferenceParticipantOptions,
    ConnectionStatus,
    OnJoinOptions,
} from '../../conferenceStage.types'

class HTMLCanvasElement {}
class HTMLVideoElement {}

@suite()
export default class ConferenceStageViewControllerTest extends AbstractSpruceFixtureTest {
    private vc!: ConferenceStageViewController
    private lastOnJoinOptions?: OnJoinOptions
    private lastOnDeviceChangeOptions?: Partial<OnJoinOptions>
    private onJoinResponse?: boolean

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {
                onJoin: async (options) => {
                    this.lastOnJoinOptions = options
                    return this.onJoinResponse
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
        'can invoke addParticipant callback with rederer canvas',
        new HTMLCanvasElement()
    )
    @test(
        'can invoke addParticipant callback with rederer video',
        new HTMLVideoElement()
    )
    protected async addingParticipantInvokesCallbackInViewModel(
        element: HTMLElement
    ) {
        const model = this.render()
        let passedOptions: AddConferenceParticipantOptions | undefined
        const participant = new MockConferenceParticipant({
            onDestroy: () => {},
            videoElement: element,
            id: generateId(),
        })

        model.handlers.setAddParticipantHandler(async (options) => {
            passedOptions = options
            return participant
        })

        const options: AddConferenceParticipantOptions = {
            videoElement: element,
            id: generateId(),
        }
        const actual = await this.addParticipant(options)

        assert.isEqualDeep(
            passedOptions,
            options,
            'Options to setAddParticipantHandler mismatch'
        )

        assert.isEqual(actual, participant, 'Returned participant mismatch')
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
        const {
            handlers: { setLeaveConferenceHandler },
        } = this.render()

        let wasHit = false
        setLeaveConferenceHandler(async () => {
            wasHit = true
        })

        assert.isFalse(wasHit, 'onLeave handler was hit too early')

        await this.leaveConference()

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
        const {
            handlers: { setEnterConferenceHandler },
        } = this.render()
        let wasHit = false
        setEnterConferenceHandler(async () => {
            wasHit = true
        })

        assert.isFalse(wasHit, 'enterConference handler was hit too early')

        await this.enterConference()

        assert.isTrue(
            wasHit,
            'enterConference handler was not called when calling enterConference on vc'
        )
    }

    @test()
    protected async notSettingAParticipantHandlerThrowsHelpfulError() {
        this.vc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {}
        )

        const err = await assert.doesThrowAsync(async () => {
            await this.addParticipant({
                id: generateId(),
                videoElement: {} as HTMLElement,
            })
        })

        errorAssert.assertError(err, 'ADD_PARTICIPANT_HANDLER_NOT_SET')
    }

    private async enterConference() {
        await this.vc.enterConference()
    }

    private clearCriticalError() {
        this.vc.clearCriticalError()
    }

    private setConnectionStatus(status: ConnectionStatus) {
        this.vc.setConnectionStatus(status)
    }

    private async leaveConference() {
        await this.vc.leaveConference()
    }

    private setCriticalError(err: Error) {
        this.vc.setCriticalError(err)
    }

    private async addParticipant(options: AddConferenceParticipantOptions) {
        return await this.vc.addParticipant(options)
    }

    private render() {
        return this.views.render(this.vc)
    }
}

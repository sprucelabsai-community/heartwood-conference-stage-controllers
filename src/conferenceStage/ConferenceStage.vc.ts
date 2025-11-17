import {
    AbstractViewController,
    ViewControllerOptions,
    removeUniversalViewOptions,
} from '@sprucelabs/heartwood-view-controllers'
import {
    AddParticipantHandler,
    AddConferenceParticipantOptions,
    ConferenceStage,
    ConnectionStatus,
    GenericStateChangeHandler,
    ConferenceParticipant,
} from '../conferenceStage.types'
import SpruceError from '../errors/SpruceError'

export default class ConferenceStageViewController extends AbstractViewController<ConferenceStage> {
    public static id = 'conference-stage'
    private model: ConferenceStage
    private addParticipantHandler?: AddParticipantHandler
    private leaveConferenceHandler?: GenericStateChangeHandler
    private enterConferenceHandler?: GenericStateChangeHandler

    public constructor(
        options: ViewControllerOptions & ConferenceStageViewControllerOptions
    ) {
        super(options)

        this.model = {
            ...removeUniversalViewOptions(options),
            controller: this,
            handlers: {
                setAddParticipantHandler: async (handler) => {
                    this.addParticipantHandler = handler
                },
                setLeaveConferenceHandler: (handler) => {
                    this.leaveConferenceHandler = handler
                },
                setEnterConferenceHandler: (handler) => {
                    this.enterConferenceHandler = handler
                },
                setClickRetryOnCriticalErrorHandler: async () => {},
            },
        }
    }

    public async addParticipant(
        options: AddConferenceParticipantOptions
    ): Promise<ConferenceParticipant> {
        if (!this.addParticipantHandler) {
            throw new SpruceError({
                code: 'ADD_PARTICIPANT_HANDLER_NOT_SET',
            })
        }
        return await this.addParticipantHandler(options)
    }

    public setConnectionStatus(status: ConnectionStatus) {
        this.model.connectionStatus = status
        this.triggerRender()
    }

    public setCriticalError(err: Error) {
        this.model.criticalError = err
        this.triggerRender()
    }

    public clearCriticalError() {
        this.model.criticalError = undefined
        this.triggerRender()
    }

    public async leaveConference() {
        await this.leaveConferenceHandler?.()
    }

    public async enterConference() {
        await this.enterConferenceHandler?.()
    }

    public render(): ConferenceStage {
        return this.model
    }
}

export type ConferenceStageViewControllerOptions = Omit<
    ConferenceStage,
    'handlers'
>

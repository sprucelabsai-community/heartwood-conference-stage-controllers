import {
    AbstractViewController,
    ViewControllerOptions,
    removeUniversalViewOptions,
} from '@sprucelabs/heartwood-view-controllers'
import {
    AddParticipantSurfaceHandler,
    AddParticipantSurfaceOptions,
    ConferenceStage,
    ConnectionStatus,
    ParticipantSurface,
} from '../conferenceStage.types'

export default class ConferenceStageViewController extends AbstractViewController<ConferenceStage> {
    public static id = 'conference-stage'
    private model: ConferenceStage
    private addParticipantSurfaceHandler?: AddParticipantSurfaceHandler
    private leaveConferenceHandler?: () => void
    private enterConferenceHandler?: () => void

    public constructor(
        options: ViewControllerOptions & ConferenceStageViewControllerOptions
    ) {
        super(options)

        this.model = {
            ...removeUniversalViewOptions(options),
            controller: this,
            setAddParticipantSurfaceHandler: async (handler) => {
                this.addParticipantSurfaceHandler = handler
            },
            setLeaveConferenceHandler: (handler) => {
                this.leaveConferenceHandler = handler
            },
            setEnterConferenceHandler: (handler) => {
                this.enterConferenceHandler = handler
            },
        }
    }

    public async addParticipantSurface(
        options: AddParticipantSurfaceOptions
    ): Promise<ParticipantSurface> {
        return await this.addParticipantSurfaceHandler!(options)
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

    public leaveConference() {
        this.leaveConferenceHandler?.()
    }

    public enterConference() {
        this.enterConferenceHandler?.()
    }

    public render(): ConferenceStage {
        return this.model
    }
}

export type ConferenceStageViewControllerOptions = Omit<
    ConferenceStage,
    | 'setAddParticipantSurfaceHandler'
    | 'setLeaveConferenceHandler'
    | 'setEnterConferenceHandler'
>

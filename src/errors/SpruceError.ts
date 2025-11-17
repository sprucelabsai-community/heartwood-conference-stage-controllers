import BaseSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions> {
    /** an easy to understand version of the errors */
    public friendlyMessage(): string {
        const { options } = this
        let message
        switch (options?.code) {
            case 'DEVICE_ERROR':
                message = `There was an issue connecting to your device! The original error is ${options.originalError?.message}`
                break

            case 'ADD_PARTICIPANT_HANDLER_NOT_SET':
                message = `This conference bridge has not been configured properly. Make sure to call setAddParticipantHandler(...) in your front-end component and that you have actually entered the conference using 'await this.conferenceStage.enterConference()' before adding participants.`
                break

            case 'PARTICIPANT_ALREADY_EXISTS':
                message = `That participant is already in the conference!`
                break

            default:
                message = super.friendlyMessage()
        }

        const fullMessage = options.friendlyMessage
            ? options.friendlyMessage
            : message

        return fullMessage
    }
}

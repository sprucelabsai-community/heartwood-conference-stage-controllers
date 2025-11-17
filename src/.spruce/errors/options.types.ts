import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface DeviceErrorErrorOptions extends SpruceErrors.ConferenceStageControllers.DeviceError, ISpruceErrorOptions {
	code: 'DEVICE_ERROR'
}
export interface AddParticipantHandlerNotSetErrorOptions extends SpruceErrors.ConferenceStageControllers.AddParticipantHandlerNotSet, ISpruceErrorOptions {
	code: 'ADD_PARTICIPANT_HANDLER_NOT_SET'
}

type ErrorOptions =  | DeviceErrorErrorOptions  | AddParticipantHandlerNotSetErrorOptions 

export default ErrorOptions

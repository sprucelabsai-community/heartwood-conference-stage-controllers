import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface DeviceErrorErrorOptions extends SpruceErrors.ConferenceStageControllers.DeviceError, ISpruceErrorOptions {
	code: 'DEVICE_ERROR'
}
export interface AddParticipantSurfaceHandlerNotSetErrorOptions extends SpruceErrors.ConferenceStageControllers.AddParticipantSurfaceHandlerNotSet, ISpruceErrorOptions {
	code: 'ADD_PARTICIPANT_SURFACE_HANDLER_NOT_SET'
}

type ErrorOptions =  | DeviceErrorErrorOptions  | AddParticipantSurfaceHandlerNotSetErrorOptions 

export default ErrorOptions

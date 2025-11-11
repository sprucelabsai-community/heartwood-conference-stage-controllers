import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface DeviceErrorErrorOptions extends SpruceErrors.ConferenceStageControllers.DeviceError, ISpruceErrorOptions {
	code: 'DEVICE_ERROR'
}

type ErrorOptions =  | DeviceErrorErrorOptions 

export default ErrorOptions

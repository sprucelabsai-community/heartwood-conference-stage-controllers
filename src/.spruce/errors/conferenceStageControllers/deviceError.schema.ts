import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const deviceErrorSchema: SpruceErrors.ConferenceStageControllers.DeviceErrorSchema  = {
	id: 'deviceError',
	namespace: 'ConferenceStageControllers',
	name: 'Device error',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(deviceErrorSchema)

export default deviceErrorSchema

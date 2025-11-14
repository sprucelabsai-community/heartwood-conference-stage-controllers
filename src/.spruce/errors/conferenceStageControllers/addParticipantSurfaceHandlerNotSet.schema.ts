import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const addParticipantSurfaceHandlerNotSetSchema: SpruceErrors.ConferenceStageControllers.AddParticipantSurfaceHandlerNotSetSchema  = {
	id: 'addParticipantSurfaceHandlerNotSet',
	namespace: 'ConferenceStageControllers',
	name: 'Add participant surface handler not set',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(addParticipantSurfaceHandlerNotSetSchema)

export default addParticipantSurfaceHandlerNotSetSchema

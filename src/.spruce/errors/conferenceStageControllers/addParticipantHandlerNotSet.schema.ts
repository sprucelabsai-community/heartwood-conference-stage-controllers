import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const addParticipantHandlerNotSetSchema: SpruceErrors.ConferenceStageControllers.AddParticipantHandlerNotSetSchema  = {
	id: 'addParticipantHandlerNotSet',
	namespace: 'ConferenceStageControllers',
	name: 'Add participant handler not set',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(addParticipantHandlerNotSetSchema)

export default addParticipantHandlerNotSetSchema

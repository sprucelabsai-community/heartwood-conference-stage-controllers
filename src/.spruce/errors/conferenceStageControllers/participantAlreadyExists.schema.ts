import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const participantAlreadyExistsSchema: SpruceErrors.ConferenceStageControllers.ParticipantAlreadyExistsSchema  = {
	id: 'participantAlreadyExists',
	namespace: 'ConferenceStageControllers',
	name: 'Participant already exists',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(participantAlreadyExistsSchema)

export default participantAlreadyExistsSchema

import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const conferenceStageHandlersSchema: SpruceSchemas.ConferenceStageControllers.v2025_11_10.ConferenceStageHandlersSchema  = {
	id: 'conferenceStageHandlers',
	version: 'v2025_11_10',
	namespace: 'ConferenceStageControllers',
	name: '',
	    fields: {
	            /** . */
	            'setAddParticipantHandler': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `ConferenceStageTypes.SetAddParticipantHandler`,}
	            },
	            /** . */
	            'setEnterConferenceHandler': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `ConferenceStageTypes.SetGenericStateChangeHandler`,}
	            },
	            /** . */
	            'setLeaveConferenceHandler': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `ConferenceStageTypes.SetGenericStateChangeHandler`,}
	            },
	            /** . */
	            'setClickRetryOnCriticalErrorHandler': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `ConferenceStageTypes.SetGenericStateChangeHandler`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(conferenceStageHandlersSchema)

export default conferenceStageHandlersSchema

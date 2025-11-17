import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import conferenceStageHandlersSchema_v2025_11_10 from '#spruce/schemas/conferenceStageControllers/v2025_11_10/conferenceStageHandlers.schema'

const conferenceStageSchema: SpruceSchemas.ConferenceStageControllers.v2025_11_10.ConferenceStageSchema  = {
	id: 'conferenceStage',
	version: 'v2025_11_10',
	namespace: 'ConferenceStageControllers',
	name: 'Conference Stage',
	importsWhenRemote: ['import * as ConferenceStageTypes from "@sprucelabsai-community/heartwood-conference-stage-controllers/build/types/conferenceStage.types"',],
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `ConferenceStageTypes.ConferenceStageViewController`,}
	            },
	            /** . */
	            'onJoin': {
	                type: 'raw',
	                options: {valueType: `ConferenceStageTypes.OnJoinHandler`,}
	            },
	            /** . */
	            'onLeave': {
	                type: 'raw',
	                options: {valueType: `() => Promise<void>`,}
	            },
	            /** . */
	            'onDeviceChange': {
	                type: 'raw',
	                options: {valueType: `ConferenceStageTypes.OnDeviceChangeHandler`,}
	            },
	            /** . */
	            'onDeviceError': {
	                type: 'raw',
	                options: {valueType: `ConferenceStageTypes.OnDeviceErrorHandler`,}
	            },
	            /** . */
	            'criticalError': {
	                type: 'raw',
	                options: {valueType: `Error`,}
	            },
	            /** . Label for the button rendered under the critical error message. Set to null to hide the button. */
	            'retryAfterCriticalErrorButtonLabel': {
	                type: 'text',
	                hint: 'Label for the button rendered under the critical error message. Set to null to hide the button.',
	                options: undefined
	            },
	            /** . */
	            'onClickRetryAfterCriticalError': {
	                type: 'raw',
	                options: {valueType: `() => Promise<void>`,}
	            },
	            /** . */
	            'connectionStatus': {
	                type: 'select',
	                options: {choices: [{"value":"connected","label":"Connected"},{"value":"connecting","label":"Connecting"},{"value":"reconnecting","label":"Reconnecting"},{"value":"disconnected","label":"Disconnected"}],}
	            },
	            /** . */
	            'handlers': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: conferenceStageHandlersSchema_v2025_11_10,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(conferenceStageSchema)

export default conferenceStageSchema

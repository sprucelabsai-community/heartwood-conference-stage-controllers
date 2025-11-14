import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



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
	            /** . */
	            'connectionStatus': {
	                type: 'select',
	                options: {choices: [{"value":"connected","label":"Connected"},{"value":"connecting","label":"Connecting"},{"value":"reconnecting","label":"Reconnecting"},{"value":"disconnected","label":"Disconnected"}],}
	            },
	            /** . */
	            'setAddParticipantSurfaceHandler': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `ConferenceStageTypes.SetAddParticipantSurfaceHandler`,}
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
	    }
}

SchemaRegistry.getInstance().trackSchema(conferenceStageSchema)

export default conferenceStageSchema

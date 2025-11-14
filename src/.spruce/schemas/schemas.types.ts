/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */

export { SpruceSchemas } from '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types'

import { default as SchemaEntity } from '@sprucelabs/schema'



import * as SpruceSchema from '@sprucelabs/schema'

import * as ConferenceStageTypes from "../../conferenceStage.types"

declare module '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types' {


	namespace SpruceSchemas.ConferenceStageControllers.v2025_11_10 {

		
		interface ConferenceStage {
			
				
				'id'?: string | undefined | null
				
				'controller'?: (ConferenceStageTypes.ConferenceStageViewController) | undefined | null
				
				'onJoin'?: (ConferenceStageTypes.OnJoinHandler) | undefined | null
				
				'onLeave'?: (() => Promise<void>) | undefined | null
				
				'onDeviceChange'?: (ConferenceStageTypes.OnDeviceChangeHandler) | undefined | null
				
				'onDeviceError'?: (ConferenceStageTypes.OnDeviceErrorHandler) | undefined | null
				
				'criticalError'?: (Error) | undefined | null
				
				'connectionStatus'?: ("connected" | "connecting" | "reconnecting" | "disconnected") | undefined | null
				
				'setAddParticipantSurfaceHandler': (ConferenceStageTypes.SetAddParticipantSurfaceHandler)
				
				'setEnterConferenceHandler': (ConferenceStageTypes.SetGenericStateChangeHandler)
				
				'setLeaveConferenceHandler': (ConferenceStageTypes.SetGenericStateChangeHandler)
		}

		interface ConferenceStageSchema extends SpruceSchema.Schema {
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

		interface ConferenceStageEntity extends SchemaEntity<SpruceSchemas.ConferenceStageControllers.v2025_11_10.ConferenceStageSchema> {}

	}

}

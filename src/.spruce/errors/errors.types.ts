import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'






export declare namespace SpruceErrors.ConferenceStageControllers {

	
	export interface DeviceError {
		
	}

	export interface DeviceErrorSchema extends SpruceSchema.Schema {
		id: 'deviceError',
		namespace: 'ConferenceStageControllers',
		name: 'Device error',
		    fields: {
		    }
	}

	export type DeviceErrorEntity = SchemaEntity<SpruceErrors.ConferenceStageControllers.DeviceErrorSchema>

}


export declare namespace SpruceErrors.ConferenceStageControllers {

	
	export interface AddParticipantHandlerNotSet {
		
	}

	export interface AddParticipantHandlerNotSetSchema extends SpruceSchema.Schema {
		id: 'addParticipantHandlerNotSet',
		namespace: 'ConferenceStageControllers',
		name: 'Add participant handler not set',
		    fields: {
		    }
	}

	export type AddParticipantHandlerNotSetEntity = SchemaEntity<SpruceErrors.ConferenceStageControllers.AddParticipantHandlerNotSetSchema>

}





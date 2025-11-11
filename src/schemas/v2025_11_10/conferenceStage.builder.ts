import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'conferenceStage',
    name: 'Conference Stage',
    importsWhenLocal: [
        'import * as ConferenceStageTypes from "../../conferenceStage.types"',
    ],
    importsWhenRemote: [
        'import * as ConferenceStageTypes from "@sprucelabsai-community/heartwood-conference-stage-controllers/build/types/conferenceStage.types"',
    ],
    fields: {
        id: {
            type: 'id',
        },
        controller: {
            type: 'raw',
            options: {
                valueType: 'ConferenceStageTypes.ConferenceStageViewController',
            },
        },
        onJoin: {
            type: 'raw',
            options: {
                valueType: 'ConferenceStageTypes.OnJoinHandler',
            },
        },
        onLeave: {
            type: 'raw',
            options: {
                valueType: '() => Promise<void>',
            },
        },
        onDeviceChange: {
            type: 'raw',
            options: {
                valueType: 'ConferenceStageTypes.OnDeviceChangeHandler',
            },
        },
        onDeviceError: {
            type: 'raw',
            options: {
                valueType: 'ConferenceStageTypes.OnDeviceErrorHandler',
            },
        },
        setAddParticipantSurfaceHandler: {
            type: 'raw',
            isRequired: true,
            options: {
                valueType:
                    'ConferenceStageTypes.SetAddParticipantSurfaceHandler',
            },
        },
        connectionStatus: {
            type: 'select',
            options: {
                choices: [
                    {
                        value: 'connected',
                        label: 'Connected',
                    },
                    {
                        value: 'connecting',
                        label: 'Connecting',
                    },
                    {
                        value: 'reconnecting',
                        label: 'Reconnecting',
                    },
                    {
                        value: 'disconnected',
                        label: 'Disconnected',
                    },
                ],
            },
        },
        criticalError: {
            type: 'raw',
            options: {
                valueType: 'Error',
            },
        },
        setLeaveHandler: {
            type: 'raw',
            isRequired: true,
            options: {
                valueType: '(handler: () => void) => void',
            },
        },
    },
})

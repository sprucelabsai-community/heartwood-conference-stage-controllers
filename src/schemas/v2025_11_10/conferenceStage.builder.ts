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
        criticalError: {
            type: 'raw',
            options: {
                valueType: 'Error',
            },
        },
        retryAfterCriticalErrorButtonLabel: {
            type: 'text',
            hint: 'Label for the button rendered under the critical error message. Set to null to hide the button.',
        },
        onClickRetryAfterCriticalError: {
            type: 'raw',
            options: {
                valueType: '() => Promise<void>',
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
        handlers: {
            type: 'schema',
            isRequired: true,
            options: {
                schema: buildSchema({
                    id: 'conferenceStageHandlers',
                    fields: {
                        setAddParticipantHandler: {
                            type: 'raw',
                            isRequired: true,
                            options: {
                                valueType:
                                    'ConferenceStageTypes.SetAddParticipantHandler',
                            },
                        },
                        setEnterConferenceHandler: {
                            type: 'raw',
                            isRequired: true,
                            options: {
                                valueType:
                                    'ConferenceStageTypes.SetGenericStateChangeHandler',
                            },
                        },
                        setLeaveConferenceHandler: {
                            type: 'raw',
                            isRequired: true,
                            options: {
                                valueType:
                                    'ConferenceStageTypes.SetGenericStateChangeHandler',
                            },
                        },
                        setClickRetryOnCriticalErrorHandler: {
                            type: 'raw',
                            isRequired: true,
                            options: {
                                valueType:
                                    'ConferenceStageTypes.SetGenericStateChangeHandler',
                            },
                        },
                    },
                }),
            },
        },
    },
})

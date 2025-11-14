import { ConferenceStage } from './conferenceStage.types'

declare module '@sprucelabs/heartwood-view-controllers/build/.spruce/schemas/schemas.types' {
    namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {
        interface CardSection {
            conferenceStage?: ConferenceStage
        }
    }
}

export * from './.spruce/views/views'
export * from './.spruce/schemas/schemas.types'
export * from './conferenceStage.types'
export { default as ConferenceStageViewController } from './conferenceStage/ConferenceStage.vc'
export * from './conferenceStage/ConferenceStage.vc'
export { default as MockParticipantSurface } from './participantSurface/MockParticipantSurface'
export { default as ConferenceStageError } from './errors/SpruceError'
export { default as conferenceStageInteractor } from './conferenceStageInteractor'
export { default as MockConferenceStageViewController } from './conferenceStage/MockConferenceStageViewController'
export { default as conferenceStageAssert } from './conferenceStageAssert'

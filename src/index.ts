import { ConferenceStage } from './conferenceStage.types'

declare module '@sprucelabs/heartwood-view-controllers/build/.spruce/schemas/schemas.types' {
    namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {
        interface CardSection {
            conferenceStage?: ConferenceStage
        }
    }
}

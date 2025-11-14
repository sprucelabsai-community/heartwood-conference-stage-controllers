import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'
import { ConferenceStageViewController } from '../../../conferenceStage.types'
import { conferenceStageAssert } from '../../../conferenceStageAssert'

@suite()
export default class ConferenceAssertRequiresBeforeEachTest extends AbstractSpruceFixtureTest {
    @test()
    protected async assertThrowsIfBeforeEachNotRun() {
        assert.doesThrow(
            () =>
                conferenceStageAssert.cardRendersConferenceStage(
                    this.views.Controller('card', {})
                ),
            'beforeEach'
        )
    }

    @test()
    protected async beforeEachThrowsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => conferenceStageAssert.beforeEach())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['views'],
        })
    }

    @test()
    protected async assertRendersStageThrowsIfNotMockReturned() {
        conferenceStageAssert.beforeEach(this.views)

        this.views.setController(
            'conference-stage-controllers.conference-stage',
            ConferenceStageViewController
        )

        const cardVc = this.views.Controller('card', {
            body: {
                sections: [
                    {
                        conferenceStage: this.views
                            .Controller(
                                'conference-stage-controllers.conference-stage',
                                {}
                            )
                            .render(),
                    },
                ],
            },
        })

        assert.doesThrow(
            () => conferenceStageAssert.cardRendersConferenceStage(cardVc),
            'hasController'
        )
    }
}

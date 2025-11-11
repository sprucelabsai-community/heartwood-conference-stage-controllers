import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert } from '@sprucelabs/test-utils'

@suite()
export default class RenderingInACardTest extends AbstractSpruceFixtureTest {
    @test()
    protected async card() {
        const stageVc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {}
        )

        const cardVc = this.views.Controller('card', {
            body: {
                sections: [
                    {
                        conferenceStage: stageVc.render(),
                    },
                ],
            },
        })

        const rendered = this.views.render(cardVc)
        assert.isEqual(
            rendered.body?.sections?.[0].conferenceStage?.controller,
            stageVc,
            'Conference stage not rendered in card section'
        )
    }
}

import {
    CardSection,
    CardViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'
import MockConferenceStageViewController from '../../../conferenceStage/MockConferenceStageViewController'
import conferenceStageAssert from '../../../conferenceStageAssert'

@suite()
export default class TestingTheConferenceStageTest extends AbstractSpruceFixtureTest {
    private cardVc!: CardViewController
    private stageVc!: MockConferenceStageViewController

    protected async beforeEach() {
        await super.beforeEach()

        conferenceStageAssert.beforeEach(this.views)

        this.stageVc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {}
        ) as MockConferenceStageViewController
    }

    @test()
    protected async assertRendersConferenceStageThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            conferenceStageAssert.cardRendersConferenceStage()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['cardVc'],
        })
    }

    @test()
    protected async throwsIfCardDoesNotRenderConferenceStage() {
        this.setupCard([{}])
        assert.doesThrow(
            () => this.assertCardRendersConferenceStage(),
            'not rend'
        )
    }

    @test()
    protected async passesIfRendersConferenceStageInFirstSection() {
        this.setupCard([
            {
                conferenceStage: this.renderStage(),
            },
        ])

        this.assertCardRendersConferenceStage()
    }

    @test()
    protected async passesIfRendersConferenceStageInSecondSection() {
        this.setupCard([
            {
                title: 'not here!',
            },
            {
                conferenceStage: this.renderStage(),
            },
        ])

        this.assertCardRendersConferenceStage()
    }

    @test()
    protected async returnsTheRenderedStage() {
        this.setupCard([
            {
                conferenceStage: this.renderStage(),
            },
        ])
        const match = this.assertCardRendersConferenceStage()
        assert.isEqual(match, this.stageVc, 'Returned stage does not match')
    }

    @test()
    protected async returnsAnInstanceOfTheMockConferenceStageViewController() {
        this.setupCard([
            {
                conferenceStage: this.renderStage(),
            },
        ])
        const match = this.assertCardRendersConferenceStage()
        assert.isInstanceOf(
            match,
            MockConferenceStageViewController,
            'Returned stage is not an instance of MockConferenceStageViewController'
        )
    }

    @test()
    protected async throwsIfTryingToAddParticipantBeforeEnteringStage() {
        await assert.doesThrowAsync(() =>
            this.stageVc.addParticipant({
                id: 'participant-1',
                videoElement: {} as HTMLVideoElement,
            })
        )
    }

    private renderStage() {
        return this.stageVc.render()
    }

    private assertCardRendersConferenceStage() {
        return conferenceStageAssert.cardRendersConferenceStage(this.cardVc)
    }

    private setupCard(sections: CardSection[]) {
        this.cardVc = this.views.Controller('card', {
            body: {
                sections,
            },
        })
    }
}

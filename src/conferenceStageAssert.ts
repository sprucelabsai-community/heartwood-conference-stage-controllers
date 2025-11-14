import {
    Card,
    pluckFirstFromCard,
    renderUtil,
    SimpleViewControllerFactory,
    ViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { ConnectionStatus } from '@sprucelabs/mercury-client'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import MockConferenceStageViewController from './conferenceStage/MockConferenceStageViewController'
import { ConferenceStage } from './conferenceStage.types'

let wasBeforeEachRun = false
export const conferenceStageAssert = {
    beforeEach(views: SimpleViewControllerFactory) {
        assertOptions(
            { views },
            ['views'],
            `conferenceStageAssert.beforeEach requires the view factory. Try "conferenceStageAssert.beforeEach(this.views)" in the beforeEach of your test.`
        )
        views.setController(
            'conference-stage-controllers.conference-stage',
            MockConferenceStageViewController
        )
        wasBeforeEachRun = true
    },

    connectionStatusEquals(
        stageVc: ViewController<ConferenceStage>,
        expectedStatus: ConnectionStatus
    ) {
        assertOptions({ stageVc, expectedStatus }, [
            'stageVc',
            'expectedStatus',
        ])
        const stage = stageVc as MockConferenceStageViewController
        stage.assertConnectionStatusEquals(expectedStatus)
    },

    didEnterConference(stageVc: ViewController<ConferenceStage>) {
        assertOptions({ stageVc }, ['stageVc'])
        const stage = stageVc as MockConferenceStageViewController
        stage.assertDidEnterConference()
    },

    hasCriticalError(stageVc: ViewController<ConferenceStage>) {
        assertOptions({ stageVc }, ['stageVc'])
        const stage = stageVc as MockConferenceStageViewController
        stage.assertHasCriticalError()
    },

    didClearCriticalError(stageVc: ViewController<ConferenceStage>) {
        assertOptions({ stageVc }, ['stageVc'])
        const stage = stageVc as MockConferenceStageViewController
        stage.assertClearedCriticalError()
    },

    cardRendersConferenceStage(cardVc: ViewController<Card>) {
        assert.isTrue(
            wasBeforeEachRun,
            'You must run "conferenceStageAssert.beforeEach(this.views)" in your test before using conferenceStageAssert methods.'
        )
        assertOptions({ cardVc }, ['cardVc'])
        const model = renderUtil.render(cardVc)
        const match = pluckFirstFromCard(model, 'conferenceStage')
        assert.isTruthy(
            match,
            `Your card is not rendering a Conference Stage! Try "this.Controller('conference-stage-controllers.conference-stage', {})"`
        )

        assert.isInstanceOf(
            match.controller,
            MockConferenceStageViewController,
            `The conference stage controller being rendered is not a MockConferenceStageViewController. Make sure you are checking if the controller is set before setting it:
            
if (!this.views.hasController('conference-stage-controllers.conference-stage')) {
    this.views.setController(
        'conference-stage-controllers.conference-stage',
        ConferenceStageViewController
    )
}`
        )

        return match.controller as MockConferenceStageViewController
    },
}

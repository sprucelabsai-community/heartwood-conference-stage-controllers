import { ConnectionStatus } from '@sprucelabs/mercury-client'
import { fake } from '@sprucelabs/spruce-test-fixtures'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'
import MockConferenceStageViewController from '../../../conferenceStage/MockConferenceStageViewController'
import conferenceStageAssert from '../../../conferenceStageAssert'

@fake.login()
@suite()
export default class AssertingStageStateTest extends AbstractSpruceFixtureTest {
    private stageVc!: MockConferenceStageViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        conferenceStageAssert.beforeEach(this.views)
        this.stageVc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {}
        ) as MockConferenceStageViewController
    }

    @test()
    protected async assertEnteredConferenceThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            conferenceStageAssert.didEnterConference()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc'],
        })
    }

    @test()
    protected async throwsIfDidNotEnterConference() {
        assert.doesThrow(
            () => conferenceStageAssert.didEnterConference(this.stageVc),
            'enterConference'
        )
        assert.doesThrow(() => this.stageVc.assertDidEnterConference())
    }

    @test()
    protected async knowsIfEnteredConference() {
        await this.stageVc.enterConference()
        conferenceStageAssert.didEnterConference(this.stageVc)
        this.stageVc.assertDidEnterConference()
    }

    @test()
    protected async assertCriticalErrorThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            conferenceStageAssert.hasCriticalError()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc'],
        })
    }

    @test()
    protected async canAssertCriticalError() {
        assert.doesThrow(
            () => conferenceStageAssert.hasCriticalError(this.stageVc),
            'criticalError'
        )

        assert.doesThrow(
            () => this.stageVc.assertHasCriticalError(),
            'criticalError'
        )

        this.stageVc.setCriticalError(new Error('Critical failure!'))

        conferenceStageAssert.hasCriticalError(this.stageVc)
        this.stageVc.assertHasCriticalError()
    }

    @test()
    protected async assertClearedCriticalErrorThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            conferenceStageAssert.didClearCriticalError()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc'],
        })
    }

    @test()
    protected async canAssertClearedCriticalError() {
        assert.doesThrow(() =>
            conferenceStageAssert.didClearCriticalError(this.stageVc)
        )
        assert.doesThrow(() => this.stageVc.assertClearedCriticalError())

        this.stageVc.clearCriticalError()
        conferenceStageAssert.didClearCriticalError(this.stageVc)
        this.stageVc.assertClearedCriticalError()
    }

    @test()
    protected async assertSetConnetionStatusThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            conferenceStageAssert.connectionStatusEquals()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stageVc', 'expectedStatus'],
        })
    }

    @test()
    protected async canAssertConnectionStatusEquals() {
        assert.doesThrow(
            () =>
                conferenceStageAssert.connectionStatusEquals(
                    this.stageVc,
                    'connected'
                ),
            'setConnectionStatus'
        )

        this.assertConnectionStatusEqualsThrows('connected')

        this.setConnectionStatus('connected')

        conferenceStageAssert.connectionStatusEquals(this.stageVc, 'connected')
        this.stageVc.assertConnectionStatusEquals('connected')

        this.assertConnectionStatusEqualsThrows('disconnected')
        this.setConnectionStatus('disconnected')
        conferenceStageAssert.connectionStatusEquals(
            this.stageVc,
            'disconnected'
        )
    }

    private setConnectionStatus(status: ConnectionStatus) {
        this.stageVc.setConnectionStatus(status)
    }

    private assertConnectionStatusEqualsThrows(status: ConnectionStatus) {
        assert.doesThrow(
            () => this.stageVc.assertConnectionStatusEquals(status),
            'setConnectionStatus'
        )
    }
}

import { assert } from '@sprucelabs/test-utils'
import {
    AddParticipantSurfaceOptions,
    ConnectionStatus,
} from '../conferenceStage.types'
import MockParticipantSurface from '../participantSurface/MockParticipantSurface'
import ConferenceStageViewController from './ConferenceStage.vc'

export default class MockConferenceStageViewController extends ConferenceStageViewController {
    private didEnterConference = false
    private criticalError?: Error
    private didClearCriticalError = false
    private connectionStatus?: ConnectionStatus
    private surfaceCount = 0
    private surfaces: MockParticipantSurface[] = []

    public async enterConference(): Promise<void> {
        this.didEnterConference = true
    }

    public setCriticalError(err: Error) {
        this.criticalError = err
    }

    public clearCriticalError(): void {
        this.didClearCriticalError = true
    }

    public setConnectionStatus(status: ConnectionStatus): void {
        this.connectionStatus = status
    }

    public getParticipantSurface(idOrIdx: number | string) {
        if (typeof idOrIdx === 'string') {
            const match = this.surfaces.find((s) => s.id === idOrIdx)
            assert.isTruthy(
                match,
                'No participant surface found with id: ' + idOrIdx
            )
            return match
        }

        const match = this.surfaces[idOrIdx]
        assert.isTruthy(
            match,
            'No participant surface found at index: ' + idOrIdx
        )
        return match
    }

    public async addParticipantSurface(
        options: AddParticipantSurfaceOptions
    ): Promise<MockParticipantSurface> {
        this.surfaceCount++
        const surface = new MockParticipantSurface({
            onDestroy: () => {
                this.surfaceCount--
            },
            ...options,
        })
        this.surfaces.push(surface)
        return surface
    }

    public assertDidEnterConference() {
        assert.isTrue(
            this.didEnterConference,
            `You did not enter the conference! Try "this.stageVc.enterConference()"`
        )
    }

    public assertHasCriticalError() {
        assert.isTruthy(
            this.criticalError,
            `You do not have a critical error! Try "this.stageVc.setCriticalError(...)"`
        )
    }

    public assertClearedCriticalError() {
        assert.isTrue(
            this.didClearCriticalError,
            `You did not clear the critical error! Try "this.stageVc.clearCriticalError()"`
        )
    }

    public assertConnectionStatusEquals(expected: ConnectionStatus) {
        assert.isEqual(
            this.connectionStatus,
            expected,
            `Connection status does not equal expected. Try "this.stageVc.setConnectionStatus('${expected}')"`
        )
    }

    public assertTotalParticipantSurfaces(expected: number) {
        assert.isEqual(
            this.surfaceCount,
            expected,
            `Expected ${expected} participant surfaces, but found ${this.surfaceCount}.`
        )
    }
}

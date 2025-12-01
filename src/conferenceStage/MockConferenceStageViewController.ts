import { assert } from '@sprucelabs/test-utils'
import MockConferenceParticipant from '../conferenceParticipant/MockConferenceParticipant'
import {
    AddConferenceParticipantOptions,
    ConnectionStatus,
} from '../conferenceStage.types'
import SpruceError from '../errors/SpruceError'
import ConferenceStageViewController from './ConferenceStage.vc'

export default class MockConferenceStageViewController extends ConferenceStageViewController {
    private didEnterConference = false
    private didLeaveConference = false
    private criticalError?: Error
    private didClearCriticalError = false
    private connectionStatus?: ConnectionStatus
    private participantCount = 0
    private participants: MockConferenceParticipant[] = []

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

    public async leaveConference(): Promise<void> {
        this.didLeaveConference = true
        await super.leaveConference()
    }

    public getParticipant(idOrIdx: number | string) {
        const match = this._getParticipant(idOrIdx)
        assert.isTruthy(
            match,
            `No participant found for id or index "${idOrIdx}".`
        )
        return match
    }

    private _getParticipant(idOrIdx: number | string) {
        if (typeof idOrIdx === 'string') {
            const match = this.participants.find((s) => s.id === idOrIdx)
            return match
        }

        const match = this.participants[idOrIdx]
        return match
    }

    public async addParticipant(
        options: AddConferenceParticipantOptions
    ): Promise<MockConferenceParticipant> {
        this.participantCount++

        const { id } = options
        if (this._getParticipant(id)) {
            throw new SpruceError({
                code: 'PARTICIPANT_ALREADY_EXISTS',
                id,
            })
        }

        assert.isTruthy(
            this.didEnterConference,
            `You must enter the conference before adding participants. Try "this.stageVc.enterConference()" before adding participants.`
        )

        const participant = new MockConferenceParticipant({
            onDestroy: () => {
                this.participantCount--
            },
            ...options,
        })

        this.participants.push(participant)

        return participant
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

    public assertDidLeaveConference() {
        assert.isTrue(
            this.didLeaveConference,
            `You did not leave the conference! Try "this.stageVc.leaveConference()"`
        )
    }

    public assertTotalParticipants(expected: number) {
        assert.isEqual(
            this.participantCount,
            expected,
            `Expected ${expected} participants, but found ${this.participantCount}.`
        )
    }
}

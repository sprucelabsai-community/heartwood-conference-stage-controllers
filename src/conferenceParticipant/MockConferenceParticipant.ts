import { assert } from '@sprucelabs/test-utils'
import {
    AddConferenceParticipantOptions,
    AudioStatus,
    ConnectionQuality,
    ConferenceParticipant,
    VideoStatus,
} from '../conferenceStage.types'

export default class MockConferenceParticipant
    implements ConferenceParticipant
{
    public id: string
    private destroyHandler: DestroyHandler
    private name?: string
    private audioStatus?: AudioStatus
    private videoStatus?: VideoStatus
    private connectionQuality?: ConnectionQuality
    private isSpeaking = false
    private videoElement?: HTMLElement | null
    private isSelf: boolean | undefined
    private isDestroyed = false

    public constructor(options: MockParticipantOptions) {
        const { onDestroy, id, videoElement: element, isSelf, name } = options
        this.destroyHandler = onDestroy
        this.isSelf = isSelf ?? false
        this.videoElement = element
        this.id = id
        this.name = name
    }

    public setName(name: string) {
        this.name = name
    }

    public getName() {
        return this.name
    }

    public setAudioStatus(status: AudioStatus) {
        this.audioStatus = status
    }

    public setVideoStatus(status: VideoStatus) {
        this.videoStatus = status
    }

    public assertVideoStatusEquals(expected: VideoStatus) {
        assert.isEqual(
            this.videoStatus,
            expected,
            'VideoStatus does not match!'
        )
    }

    public setConnectionQuality(quality: ConnectionQuality) {
        this.connectionQuality = quality
    }

    public assertConnectionQualityEquals(expected: string) {
        assert.isEqual(
            this.connectionQuality,
            expected,
            'ConnectionQuality does not match!'
        )
    }

    public setIsSpeaking(isSpeaking: boolean) {
        this.isSpeaking = isSpeaking
    }

    public assertIsSpeaking(expected: boolean) {
        assert.isEqual(
            this.isSpeaking,
            expected,
            'isSpeaking status does not match!'
        )
    }

    public destroy() {
        this.destroyHandler()
        this.isDestroyed = true
    }

    public assertIsDestroyed() {
        assert.isTrue(this.isDestroyed, 'Participant is not destroyed!')
    }

    public assertNameEquals(name: string) {
        assert.isEqual(this.name, name, 'Participant name does not match!')
    }

    public assertIdEquals(id: string) {
        assert.isEqual(this.id, id, 'Participant id does not match!')
    }

    public assertAudioStatusEquals(expected: AudioStatus) {
        assert.isEqual(
            this.audioStatus,
            expected,
            'AudioStatus does not match!'
        )
    }

    public assertVideoElementEquals(element: HTMLElement) {
        assert.isEqual(
            this.videoElement,
            element,
            'HTMLElement does not match!'
        )
    }

    public assertNoVideoElement() {
        assert.isFalsy(
            this.videoElement,
            'Video element is set and should not be!'
        )
    }

    public assertIsNotSelf() {
        assert.isFalse(this.isSelf, 'Participant is self!')
    }

    public assertIsSelf() {
        assert.isTrue(this.isSelf, 'Participant is not self!')
    }

    public setVideoElement(element: HTMLElement | null): void {
        if (element) {
            assert.isFalsy(this.videoElement, 'Video element is already set!')
        }
        this.videoElement = element
    }

    public getHasVideo(): boolean {
        return !!this.videoElement
    }
}

type DestroyHandler = () => void

interface MockParticipantOptions extends AddConferenceParticipantOptions {
    onDestroy: DestroyHandler
}

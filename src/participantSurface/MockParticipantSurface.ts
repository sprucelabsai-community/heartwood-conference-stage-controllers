import { assert } from '@sprucelabs/test-utils'
import {
    AddParticipantSurfaceOptions,
    AudioStatus,
    ConnectionQuality,
    ParticipantSurface,
    VideoStatus,
} from '../conferenceStage.types'

export default class MockParticipantSurface implements ParticipantSurface {
    public id: string
    private destroyHandler: DestroyHandler
    private name?: string
    private audioStatus?: AudioStatus
    private videoStatus?: VideoStatus
    private connectionQuality?: ConnectionQuality
    private isSpeaking = false
    private element: HTMLElement
    private isSelf: boolean | undefined

    public constructor(options: MockParticipantSurfaceOptions) {
        const { onDestroy, id, element, isSelf } = options
        this.destroyHandler = onDestroy
        this.isSelf = isSelf ?? false
        this.element = element
        this.id = id
    }

    public setName(name: string) {
        this.name = name
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
    }

    public assertNameEquals(name: string) {
        assert.isEqual(
            this.name,
            name,
            'ParticipantSurface name does not match!'
        )
    }

    public assertIdEquals(id: string) {
        assert.isEqual(this.id, id, 'ParticipantSurface id does not match!')
    }

    public assertAudioStatusEquals(expected: AudioStatus) {
        assert.isEqual(
            this.audioStatus,
            expected,
            'AudioStatus does not match!'
        )
    }

    public assertElementEquals(element: HTMLElement) {
        assert.isEqual(this.element, element, 'HTMLElement does not match!')
    }

    public assertIsNotSelf() {
        assert.isFalse(this.isSelf, 'ParticipantSurface is self!')
    }

    public assertIsSelf() {
        assert.isTrue(this.isSelf, 'ParticipantSurface is not self!')
    }
}

type DestroyHandler = () => void

interface MockParticipantSurfaceOptions extends AddParticipantSurfaceOptions {
    onDestroy: DestroyHandler
}

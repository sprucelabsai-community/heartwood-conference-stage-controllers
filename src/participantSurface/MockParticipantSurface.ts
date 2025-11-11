import { generateId } from '@sprucelabs/test-utils'
import { ParticipantSurface } from '../conferenceStage.types'

export default class MockParticipantSurface implements ParticipantSurface {
    public id: string
    public mediaElement: HTMLVideoElement | HTMLCanvasElement

    public constructor() {
        this.id = generateId()
        this.mediaElement = {} as any
    }

    public setName(_name: string): void {}
    public setAudioStatus(_status: 'muted' | 'unmuted' | 'unknown'): void {}
    public setVideoStatus(_status: 'enabled' | 'disabled' | 'blocked'): void {}
    public setConnectionQuality(
        _status: 'good' | 'fair' | 'poor' | 'lost'
    ): void {}
    public setIsSpeaking(_isSpeaking: boolean): void {}
    public destroy(): void {}
}

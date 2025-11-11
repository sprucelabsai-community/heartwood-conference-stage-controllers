import { ParticipantSurface } from '../conferenceStage.types'

export default class ParticipantSurfaceImpl implements ParticipantSurface {
    public id: string
    public mediaElement: HTMLVideoElement | HTMLCanvasElement
    public setName(name: string): void {}
    public setAudioStatus(status: 'muted' | 'unmuted' | 'unknown'): void {}
    public setVideoStatus(status: 'enabled' | 'disabled' | 'blocked'): void {}
    public setConnectionQuality(
        status: 'good' | 'fair' | 'poor' | 'lost'
    ): void {}
    public setIsSpeaking(isSpeaking: boolean): void {}
    public destroy(): void {}
}

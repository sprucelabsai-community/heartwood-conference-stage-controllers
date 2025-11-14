import { generateId } from '@sprucelabs/test-utils'
import {
    AudioStatus,
    ConnectionQuality,
    ParticipantSurface,
    VideoStatus,
} from '../conferenceStage.types'

export default class MockParticipantSurface implements ParticipantSurface {
    public id: string

    public constructor() {
        this.id = generateId()
    }

    public setName(_name: string): void {}
    public setAudioStatus(_status: AudioStatus): void {}
    public setVideoStatus(_status: VideoStatus): void {}
    public setConnectionQuality(_status: ConnectionQuality): void {}
    public setIsSpeaking(_isSpeaking: boolean): void {}
    public destroy(): void {}
}

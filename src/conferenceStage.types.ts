import { SpruceSchemas } from '@sprucelabs/mercury-types'

export { default as ConferenceStageViewController } from './conferenceStage/ConferenceStage.vc'

export type OnJoinHandler = (options: OnJoinOptions) => Promise<void>
export type OnDeviceChangeHandler = (
    options: OnDeviceChangeOptions
) => Promise<void>

export type SetAddParticipantSurfaceHandler = (
    handler: AddParticipantSurfaceHandler
) => void

export type AddParticipantSurfaceHandler = (
    options: AddParticipantSurfaceOptions
) => Promise<ParticipantSurface>

export interface ParticipantSurface {
    id: string
    mediaElement: HTMLVideoElement | HTMLCanvasElement
    setName(name: string): void
    setAudioStatus(status: 'muted' | 'unmuted' | 'unknown'): void
    setVideoStatus(status: 'enabled' | 'disabled' | 'blocked'): void
    setConnectionQuality(status: 'good' | 'fair' | 'poor' | 'lost'): void
    setIsSpeaking(isSpeaking: boolean): void
    destroy(): void
}

export type SurfaceRenderer = 'canvas' | 'video'

export interface AddParticipantSurfaceOptions {
    renderer: SurfaceRenderer
}

export interface OnJoinOptions {
    videoDeviceId: string | null
    audioInputId: string | null
    audioOutputId: string | null
}

export type OnDeviceChangeOptions = Partial<OnJoinOptions>
export type ConferenceStage =
    SpruceSchemas.ConferenceStageControllers.v2025_11_10.ConferenceStage

export type ConnectionStatus = NonNullable<ConferenceStage['connectionStatus']>

export type OnDeviceErrorHandler = (error: Error) => Promise<void> | void

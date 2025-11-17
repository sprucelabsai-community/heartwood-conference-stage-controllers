import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from './errors/SpruceError'

export { default as ConferenceStageViewController } from './conferenceStage/ConferenceStage.vc'

export type OnJoinHandler = (options: OnJoinOptions) => Promise<void | boolean>
export type OnDeviceChangeHandler = (
    options: OnDeviceChangeOptions
) => Promise<void>
export type OnDeviceErrorHandler = (error: SpruceError) => Promise<void> | void
export type SetGenericStateChangeHandler = (
    handler: GenericStateChangeHandler
) => void
export type GenericStateChangeHandler = () => Promise<void>
export type SetAddParticipantHandler = (handler: AddParticipantHandler) => void

export type AddParticipantHandler = (
    options: AddConferenceParticipantOptions
) => Promise<ConferenceParticipant>

export type AudioStatus = 'muted' | 'unmuted' | 'unknown'
export type VideoStatus = 'enabled' | 'disabled' | 'blocked'
export type ConnectionQuality = 'good' | 'fair' | 'poor' | 'lost'

export interface ConferenceParticipant {
    id: string
    setName(name: string): void
    getName(): string | undefined
    setAudioStatus(status: AudioStatus): void
    setVideoStatus(status: VideoStatus): void
    setConnectionQuality(status: ConnectionQuality): void
    setIsSpeaking(isSpeaking: boolean): void
    setVideoElement(element: HTMLElement | null): void
    getHasVideo(): boolean
    destroy(): void
}

export interface AddConferenceParticipantOptions {
    videoElement?: HTMLElement
    id: string
    isSelf?: boolean
    name?: string
    avatarUrl?: string
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

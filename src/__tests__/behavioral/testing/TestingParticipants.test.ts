import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import MockConferenceParticipant from '../../../conferenceParticipant/MockConferenceParticipant'
import MockConferenceStageViewController from '../../../conferenceStage/MockConferenceStageViewController'
import { AddConferenceParticipantOptions } from '../../../conferenceStage.types'
import conferenceStageAssert from '../../../conferenceStageAssert'

@suite()
export default class TestingParticipantTest extends AbstractSpruceFixtureTest {
    private stageVc!: MockConferenceStageViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        conferenceStageAssert.beforeEach(this.views)
        this.stageVc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {}
        ) as MockConferenceStageViewController
        await this.stageVc.enterConference()
    }

    @test()
    protected async canAssertTotalParticipants() {
        assert.doesThrow(() => this.assertTotalParticipants(1))
        this.assertTotalParticipants(0)
        await this.addParticipant()
        this.assertTotalParticipants(1)
        await this.addParticipant()
        this.assertTotalParticipants(2)
    }

    @test()
    protected async canRemoveParticipant() {
        const participant = await this.addParticipant()
        participant.destroy()
        this.assertTotalParticipants(0)

        const participant2 = await this.addParticipant()
        const participant3 = await this.addParticipant()
        participant2.destroy()
        this.assertTotalParticipants(1)
        participant3.destroy()
        this.assertTotalParticipants(0)
    }

    @test()
    protected async canGetFirstParticipantAndAssertName() {
        const name = generateId()
        const participant = await this.addParticipant()
        participant.setName(name)
        const match = this.stageVc.getParticipant(0)
        match.assertNameEquals(name)
        assert.doesThrow(() => match.assertNameEquals(generateId()))
    }

    @test()
    protected async canGetSecondAndAssertName() {
        const name1 = generateId()
        const name2 = generateId()

        const participant1 = await this.addParticipant()
        participant1.setName(name1)
        const participant2 = await this.addParticipant()
        participant2.setName(name2)

        const match1 = this.stageVc.getParticipant(0)
        const match2 = this.stageVc.getParticipant(1)

        match1.assertNameEquals(name1)
        assert.doesThrow(() => match1.assertNameEquals(name2))

        match2.assertNameEquals(name2)
        assert.doesThrow(() => match2.assertNameEquals(name1))
    }

    @test()
    protected async participantCanAssertId() {
        const id = generateId()
        const participant = await this.addParticipant({ id })
        participant.assertIdEquals(id)
        assert.doesThrow(() => participant.assertIdEquals(generateId()))
    }

    @test()
    protected async canGetParticipantById() {
        const id = generateId()
        const participant = await this.addParticipant({ id })
        const match = this.getParticipant(id)
        assert.isEqual(
            match,
            participant,
            'Gotten participant does not match added participant'
        )
    }

    @test()
    protected async canGetSecondParticipantById() {
        const id1 = generateId()
        const id2 = generateId()

        const participant1 = await this.addParticipant({ id: id1 })
        const participant2 = await this.addParticipant({ id: id2 })

        const match1 = this.getParticipant(id1)
        const match2 = this.getParticipant(id2)

        assert.isEqual(
            match1,
            participant1,
            'Gotten participant 1 does not match added participant 1'
        )
        assert.isEqual(
            match2,
            participant2,
            'Gotten participant 2 does not match added participant 2'
        )
    }

    @test()
    protected async getParticipantThrowsIfNotFound() {
        assert.doesThrow(
            () => this.getParticipant(generateId()),
            'no participant'
        )
    }

    @test()
    protected async canAssertParticipantAudioStatus() {
        const participant = await this.addParticipant()
        participant.setAudioStatus('muted')
        assert.doesThrow(() => participant.assertAudioStatusEquals('unmuted'))
        participant.assertAudioStatusEquals('muted')
        participant.setAudioStatus('unmuted')
        assert.doesThrow(() => participant.assertAudioStatusEquals('muted'))
        participant.assertAudioStatusEquals('unmuted')
    }

    @test()
    protected async canAssertVideoStatus() {
        const participant = await this.addParticipant()
        participant.setVideoStatus('enabled')
        assert.doesThrow(() => participant.assertVideoStatusEquals('disabled'))
        participant.assertVideoStatusEquals('enabled')
        participant.setVideoStatus('disabled')
        assert.doesThrow(() => participant.assertVideoStatusEquals('enabled'))
        participant.assertVideoStatusEquals('disabled')
    }

    @test()
    protected async canAssertConnectionQuality() {
        const participant = await this.addParticipant()
        participant.setConnectionQuality('good')
        assert.doesThrow(() =>
            participant.assertConnectionQualityEquals('poor')
        )
        participant.assertConnectionQualityEquals('good')
        participant.setConnectionQuality('poor')
        assert.doesThrow(() =>
            participant.assertConnectionQualityEquals('good')
        )
        participant.assertConnectionQualityEquals('poor')
    }

    @test()
    protected async getParticipantThrowsWithInvalidIndex() {
        assert.doesThrow(() => this.stageVc.getParticipant(0))
    }

    @test()
    protected async canAssertIsSpeaking() {
        const participant = await this.addParticipant()
        participant.setIsSpeaking(true)
        assert.doesThrow(() => participant.assertIsSpeaking(false))
        participant.assertIsSpeaking(true)
        participant.setIsSpeaking(false)
        assert.doesThrow(() => participant.assertIsSpeaking(true))
        participant.assertIsSpeaking(false)
    }

    @test()
    protected async participantStartsOffNotSpeaking() {
        const participant = await this.addParticipant()
        assert.doesThrow(() => participant.assertIsSpeaking(true))
        participant.assertIsSpeaking(false)
    }

    @test()
    protected async canAssertPassedElement() {
        const element = {} as HTMLElement
        const participant = await this.addParticipant({ videoElement: element })
        participant.assertElementEquals(element)
        assert.doesThrow(() =>
            participant.assertElementEquals({} as HTMLElement)
        )
    }

    @test()
    protected async canAssertIsSelf() {
        const participant = await this.addParticipant({ isSelf: true })
        participant.assertIsSelf()
        assert.doesThrow(() => participant.assertIsNotSelf())

        const participant2 = await this.addParticipant({ isSelf: false })
        participant2.assertIsNotSelf()
        assert.doesThrow(() => participant2.assertIsSelf())
    }

    @test()
    protected async participantIsNotSelfByDefault() {
        const participant = await this.addParticipant()
        participant.assertIsNotSelf()
        assert.doesThrow(() => participant.assertIsSelf())
    }

    @test()
    protected async canSetNameWhenAddingParticipant() {
        const name = generateId()
        const participant = await this.addParticipant({ name })
        participant.assertNameEquals(name)
    }

    @test()
    protected async knowsIfDestroyed() {
        const participant = await this.addParticipant()
        assert.doesThrow(() => participant.assertIsDestroyed())
        participant.destroy()
        participant.assertIsDestroyed()
    }

    @test()
    protected async knowsIfHasVideo() {
        const participant = await this.addParticipant()
        assert.isTrue(
            participant.getHasVideo(),
            'Participant should have video'
        )
        participant.setVideoElement(null)

        assert.isFalse(
            participant.getHasVideo(),
            'Participant should not have video'
        )

        participant.setVideoElement({} as HTMLElement)

        assert.isTrue(
            participant.getHasVideo(),
            'Participant should have video'
        )
    }

    private getParticipant(id: string) {
        return this.stageVc.getParticipant(id)
    }

    private async addParticipant(
        options?: Partial<AddConferenceParticipantOptions>
    ) {
        return (await this.stageVc.addParticipant({
            id: generateId(),
            videoElement: {} as HTMLElement,
            ...options,
        })) as MockConferenceParticipant
    }

    private assertTotalParticipants(expected: number) {
        this.stageVc.assertTotalParticipants(expected)
    }
}

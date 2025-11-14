import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import MockConferenceStageViewController from '../../../conferenceStage/MockConferenceStageViewController'
import { AddParticipantSurfaceOptions } from '../../../conferenceStage.types'
import conferenceStageAssert from '../../../conferenceStageAssert'

@suite()
export default class TestingParticipantSurfaceTest extends AbstractSpruceFixtureTest {
    private stageVc!: MockConferenceStageViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        conferenceStageAssert.beforeEach(this.views)
        this.stageVc = this.views.Controller(
            'conference-stage-controllers.conference-stage',
            {}
        ) as MockConferenceStageViewController
    }

    @test()
    protected async canAssertTotalParticipantSurfaces() {
        assert.doesThrow(() => this.assertTotalParticipantSurfaces(1))
        this.assertTotalParticipantSurfaces(0)
        await this.addParticipantSurface()
        this.assertTotalParticipantSurfaces(1)
        await this.addParticipantSurface()
        this.assertTotalParticipantSurfaces(2)
    }

    @test()
    protected async canRemoveParticipantSurfaces() {
        const surface = await this.addParticipantSurface()
        surface.destroy()
        this.assertTotalParticipantSurfaces(0)

        const surface2 = await this.addParticipantSurface()
        const surface3 = await this.addParticipantSurface()
        surface2.destroy()
        this.assertTotalParticipantSurfaces(1)
        surface3.destroy()
        this.assertTotalParticipantSurfaces(0)
    }

    @test()
    protected async canGetFirstSurfaceAndAssertName() {
        const name = generateId()
        const surface = await this.addParticipantSurface()
        surface.setName(name)
        const match = this.stageVc.getParticipantSurface(0)
        match.assertNameEquals(name)
        assert.doesThrow(() => match.assertNameEquals(generateId()))
    }

    @test()
    protected async canGetSecondSurfaceAndAssertName() {
        const name1 = generateId()
        const name2 = generateId()

        const surface1 = await this.addParticipantSurface()
        surface1.setName(name1)
        const surface2 = await this.addParticipantSurface()
        surface2.setName(name2)

        const match1 = this.stageVc.getParticipantSurface(0)
        const match2 = this.stageVc.getParticipantSurface(1)

        match1.assertNameEquals(name1)
        assert.doesThrow(() => match1.assertNameEquals(name2))

        match2.assertNameEquals(name2)
        assert.doesThrow(() => match2.assertNameEquals(name1))
    }

    @test()
    protected async surfaceCanAssertId() {
        const id = generateId()
        const surface = await this.addParticipantSurface({ id })
        surface.assertIdEquals(id)
        assert.doesThrow(() => surface.assertIdEquals(generateId()))
    }

    @test()
    protected async canGetSurfaceById() {
        const id = generateId()
        const surface = await this.addParticipantSurface({ id })
        const match = this.getSurface(id)
        assert.isEqual(
            match,
            surface,
            'Gotten surface does not match added surface'
        )
    }

    @test()
    protected async canGetSecondSurfaceById() {
        const id1 = generateId()
        const id2 = generateId()
        const surface1 = await this.addParticipantSurface({ id: id1 })
        const surface2 = await this.addParticipantSurface({ id: id2 })

        const match1 = this.getSurface(id1)
        const match2 = this.getSurface(id2)

        assert.isEqual(
            match1,
            surface1,
            'Gotten surface 1 does not match added surface 1'
        )
        assert.isEqual(
            match2,
            surface2,
            'Gotten surface 2 does not match added surface 2'
        )
    }

    @test()
    protected async getSurfaceThrowsIfNotFound() {
        assert.doesThrow(() => this.getSurface(generateId()), 'no participant')
    }

    @test()
    protected async canAssertSurfaceAudioStatus() {
        const surface = await this.addParticipantSurface()
        surface.setAudioStatus('muted')
        assert.doesThrow(() => surface.assertAudioStatusEquals('unmuted'))
        surface.assertAudioStatusEquals('muted')
        surface.setAudioStatus('unmuted')
        assert.doesThrow(() => surface.assertAudioStatusEquals('muted'))
        surface.assertAudioStatusEquals('unmuted')
    }

    @test()
    protected async canAssertVideoStatus() {
        const surface = await this.addParticipantSurface()
        surface.setVideoStatus('enabled')
        assert.doesThrow(() => surface.assertVideoStatusEquals('disabled'))
        surface.assertVideoStatusEquals('enabled')
        surface.setVideoStatus('disabled')
        assert.doesThrow(() => surface.assertVideoStatusEquals('enabled'))
        surface.assertVideoStatusEquals('disabled')
    }

    @test()
    protected async canAssertConnectionQuality() {
        const surface = await this.addParticipantSurface()
        surface.setConnectionQuality('good')
        assert.doesThrow(() => surface.assertConnectionQualityEquals('poor'))
        surface.assertConnectionQualityEquals('good')
        surface.setConnectionQuality('poor')
        assert.doesThrow(() => surface.assertConnectionQualityEquals('good'))
        surface.assertConnectionQualityEquals('poor')
    }

    @test()
    protected async getSurfaceThrowsWithInvalidIndex() {
        assert.doesThrow(() => this.stageVc.getParticipantSurface(0))
    }

    @test()
    protected async canAssertIsSpeaking() {
        const surface = await this.addParticipantSurface()
        surface.setIsSpeaking(true)
        assert.doesThrow(() => surface.assertIsSpeaking(false))
        surface.assertIsSpeaking(true)
        surface.setIsSpeaking(false)
        assert.doesThrow(() => surface.assertIsSpeaking(true))
        surface.assertIsSpeaking(false)
    }

    @test()
    protected async surfaceStartsOffNotSpeaking() {
        const surface = await this.addParticipantSurface()
        assert.doesThrow(() => surface.assertIsSpeaking(true))
        surface.assertIsSpeaking(false)
    }

    @test()
    protected async canAssertPassedElement() {
        const element = {} as HTMLElement
        const surface = await this.addParticipantSurface({ element })
        surface.assertElementEquals(element)
        assert.doesThrow(() => surface.assertElementEquals({} as HTMLElement))
    }

    @test()
    protected async canAssertIsSelf() {
        const surface = await this.addParticipantSurface({ isSelf: true })
        surface.assertIsSelf()
        assert.doesThrow(() => surface.assertIsNotSelf())

        const surface2 = await this.addParticipantSurface({ isSelf: false })
        surface2.assertIsNotSelf()
        assert.doesThrow(() => surface2.assertIsSelf())
    }

    @test()
    protected async surfaceIsNotSelfByDefault() {
        const surface = await this.addParticipantSurface()
        surface.assertIsNotSelf()
        assert.doesThrow(() => surface.assertIsSelf())
    }

    private getSurface(id: string) {
        return this.stageVc.getParticipantSurface(id)
    }

    private async addParticipantSurface(
        options?: Partial<AddParticipantSurfaceOptions>
    ) {
        return await this.stageVc.addParticipantSurface({
            id: generateId(),
            element: {} as HTMLElement,
            ...options,
        })
    }

    private assertTotalParticipantSurfaces(expected: number) {
        this.stageVc.assertTotalParticipantSurfaces(expected)
    }
}

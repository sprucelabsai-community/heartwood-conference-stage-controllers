import ConferenceStageViewController from '../../conferenceStage/ConferenceStage.vc'

import '@sprucelabs/heartwood-view-controllers'

const vcs = {
    ConferenceStageViewController,
}

export const pluginsByName = {
}




declare module '@sprucelabs/heartwood-view-controllers/build/types/heartwood.types' {
	interface SkillViewControllerMap {
	}

	interface SkillViewControllerArgsMap {
	}

	interface ViewControllerMap {
		'conference-stage-controllers.conference-stage': ConferenceStageViewController
	}

    interface ViewControllerOptionsMap {
		'conference-stage-controllers.conference-stage': ConstructorParameters<typeof ConferenceStageViewController>[0]
	}

	interface ViewControllerPlugins {
	}

	interface AppControllerMap {
	}
}


//@ts-ignore
if(typeof heartwood === 'function') { 
	//@ts-ignore
	heartwood({ vcs, pluginsByName }) 
}

export default vcs


export const App = undefined

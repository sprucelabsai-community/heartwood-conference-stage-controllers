import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'participantAlreadyExists',
    name: 'Participant already exists',
    fields: {
        id: {
            type: 'id',
            isRequired: true,
        },
    },
})

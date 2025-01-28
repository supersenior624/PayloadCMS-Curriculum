import { CollectionConfig } from 'payload';

const Questions: CollectionConfig = {
    slug: 'questions',
    versions: {
        drafts: true, // Enable draft functionality
    },
    admin: {
        useAsTitle: 'questionID',
        preview: (doc, config) => {
        // Live preview URL
        return `${config}/preview/questions/${doc.id}`;
        },
    },
    fields: [
        {
            name: 'questionID',
            type: 'text',
            required: true,
            label: 'Question ID',
        },
        {
            name: 'questionType',
            type: 'select',
            required: true,
            label: 'Question Type',
            options: [
                { value: 'multipleChoice', label: 'Multiple Choice' },
                { value: 'dragAndDrop', label: 'Drag and Drop' },
                { value: 'fillInTheBlanks', label: 'Fill in the blanks' },
            ],
        },
        {
            name: 'templateMarkup',
            type: 'textarea',
            label: 'Question Text(Rich Text)',
            admin: {
                condition: (data) => data.questionType === 'dragAndDrop',
            },
        },
        {
            name: 'Zones',
            type: 'array',
            admin: {
                condition: (data) => data.questionType === 'dragAndDrop',
            },
            fields: [
                {
                    name: 'Zones',
                    type: 'group',
                    fields: [
                        {
                            name: 'zoneID',
                            type: 'text',
                            label: 'Zone ID',
                        },
                        {
                            name: 'lable',
                            type: 'text',
                            label: 'Lable',
                        },
                        {
                            name: 'coordinates',
                            type: 'group',
                            fields: [
                                {
                                    name: 'x',
                                    type: 'number',
                                    label: 'X',
                                },
                                {
                                    name: 'y',
                                    type: 'number',
                                    label: 'Y',
                                },
                                {
                                    name: 'width',
                                    type: 'number',
                                    label: 'Width',
                                },
                                {
                                    name: 'height',
                                    type: 'number',
                                    label: 'Height',
                                },
                            ]
                        },
                    ],
                },
            ],
        },
        {
            name: 'Draggables',
            type: 'array',
            admin: {
                condition: (data) => data.questionType === 'dragAndDrop',
            },
            fields: [
                {
                    name: 'Draggables',
                    type: 'group',
                    fields: [
                        {
                            name: 'draggableImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Draggable Image',
                        },
                        {
                            name: 'correctZone',
                            type: 'text',
                            label: 'Correct Zone',
                        },
                    ],
                },
            ],
        },
        // Sidebar fields
        {
            name: 'createdBy',
            type: 'relationship',
            relationTo: 'users',
            admin: {
                position: 'sidebar', // Place this field in the sidebar
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar', // Place this field in the sidebar
            },
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                position: 'sidebar', // Place this field in the sidebar
            },
        },
    ],
};

export default Questions;

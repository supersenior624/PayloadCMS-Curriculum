// src/collections/questions.ts
import { CollectionConfig } from 'payload';

const Questions: CollectionConfig = {
    slug: 'questions',
    admin: {
        useAsTitle: 'title',
        preview: (doc, config) => {
            // Live preview URL
            return `${config}/preview/questions/${doc.id}`;
        },
    },
    fields: [
        // Question Title
        {
        name: 'title',
        type: 'text',
        label: 'Question Title',
        required: true,
        },
        // Question Type
        {
        name: 'type',
        type: 'select',
        label: 'Question Type',
        required: true,
        options: [
            { label: 'Cloze with Drag & Drop', value: 'cloze-drag-drop' },
            { label: 'Label Image with Drag & Drop', value: 'label-image-drag-drop' },
            { label: 'Number Line with Drag & Drop', value: 'number-line-drag-drop' },
        ],
        },
        // Common Field: Compose Question
        {
        name: 'composeQuestion',
        type: 'textarea',
        label: 'Compose Question',
        required: true,
        },
        // Cloze with Drag & Drop Fields
        {
        name: 'templateMarkup',
        type: 'textarea',
        label: 'Template Markup',
        admin: {
            condition: (data) => data.type === 'cloze-drag-drop',
        },
        },
        {
        name: 'possibleResponses',
        type: 'array',
        label: 'Possible Responses',
        admin: {
            condition: (data) => data.type === 'cloze-drag-drop',
        },
        fields: [
            {
            name: 'response',
            type: 'text',
            label: 'Response Text',
            },
        ],
        },
        {
        name: 'correctAnswers',
        type: 'array',
        label: 'Set Correct Answers',
        admin: {
            condition: (data) => data.type === 'cloze-drag-drop',
        },
        fields: [
            {
            name: 'correctResponse',
            type: 'text',
            label: 'Correct Response',
            },
        ],
        },
        // Label Image with Drag & Drop Fields
        {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Image',
        admin: {
            condition: (data) => data.type === 'label-image-drag-drop',
        },
        },
        {
        name: 'responsePositions',
        type: 'array',
        label: 'Response Positions',
        admin: {
            condition: (data) => data.type === 'label-image-drag-drop',
        },
        fields: [
            {
            name: 'xCoordinate',
            type: 'number',
            label: 'X Coordinate',
            },
            {
            name: 'yCoordinate',
            type: 'number',
            label: 'Y Coordinate',
            },
            {
            name: 'responseText',
            type: 'text',
            label: 'Response Text',
            },
        ],
        },
        {
        name: 'correctLabels',
        type: 'array',
        label: 'Correct Labels',
        admin: {
            condition: (data) => data.type === 'label-image-drag-drop',
        },
        fields: [
            {
            name: 'label',
            type: 'text',
            label: 'Label Text',
            },
        ],
        },
        // Number Line with Drag & Drop Fields
        {
        name: 'lineRange',
        type: 'group',
        label: 'Line Range (For Number Line)',
        admin: {
            condition: (data) => data.type === 'number-line-drag-drop',
        },
        fields: [
            {
            name: 'minValue',
            type: 'number',
            label: 'Minimum Value',
            required: true,
            },
            {
            name: 'maxValue',
            type: 'number',
            label: 'Maximum Value',
            required: true,
            },
        ],
        },
        {
        name: 'points',
        type: 'array',
        label: 'Points (For Number Line)',
        admin: {
            condition: (data) => data.type === 'number-line-drag-drop',
        },
        fields: [
            {
            name: 'point',
            type: 'text',
            label: 'Point Label',
            },
        ],
        },
        {
        name: 'correctPlacement',
        type: 'array',
        label: 'Correct Placement',
        admin: {
            condition: (data) => data.type === 'number-line-drag-drop',
        },
        fields: [
            {
            name: 'pointLabel',
            type: 'text',
            label: 'Point Label',
            },
            {
            name: 'position',
            type: 'number',
            label: 'Position on Number Line',
            },
        ],
        },
    ],
};

export default Questions;

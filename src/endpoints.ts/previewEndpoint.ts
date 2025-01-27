// src/routes/preview.ts
import { Endpoint } from 'payload';

const previewEndpoint: Endpoint = {
    path: '/preview/questions/:id', // Define a route for question preview
    method: 'get',
    handler: async (req : any, res : any, next : any) : Promise<any> => {
        const { id } = req.params;

        try {
        // Fetch the question by ID
        const question = await req.payload.findByID({
            collection: 'questions',
            id,
        });

        if (!question) {
            return res.status(404).send('Question not found');
        }

        // Render HTML response
        res.setHeader('Content-Type', 'text/html');
        res.send(`
            <html>
            <head>
                <title>Preview Question</title>
                <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .preview-container { border: 1px solid #ccc; padding: 20px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <h1>Live Preview: ${question.title}</h1>
                <div class="preview-container">
                ${renderQuestionHTML(question)}
                </div>
            </body>
            </html>
        `);
        } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        }
    },
};

// Helper to render the question as HTML
function renderQuestionHTML(question : any) {
    switch (question.type) {
        case 'cloze-drag-drop':
        return `<p>${question.composeQuestion}</p>
                <div>
                    ${question.templateMarkup.replace(
                    /\[blank\]/g,
                    '<span style="border: 1px dashed #ccc; padding: 5px;">[ Drag Here ]</span>'
                    )}
                </div>`;
        case 'label-image-drag-drop':
        return `<img src="${question.image}" alt="${question.title}" style="width: 100%; height: auto;">
                <p>Drag labels to their positions</p>`;
        case 'number-line-drag-drop':
        return `<p>${question.composeQuestion}</p>
                <div style="margin-top: 20px;">
                    <div style="border: 1px solid #000; height: 2px; position: relative; margin: 10px 0;">
                    ${Array.from({ length: question.lineRange.maxValue - question.lineRange.minValue + 1 }, (_, i) =>
                        `<span style="position: absolute; left: ${
                        (i / (question.lineRange.maxValue - question.lineRange.minValue)) * 100
                        }%; top: -10px; font-size: 10px;">${question.lineRange.minValue + i}</span>`
                    ).join('')}
                    </div>
                </div>`;
        default:
        return `<p>Unsupported question type.</p>`;
    }
}

export default previewEndpoint;

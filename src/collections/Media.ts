// src/collections/media.ts
import { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  upload: {
    staticDir: 'uploads',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      label: 'Alternative Text',
    },
  ],
};

export default Media;

import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'shimabukuromeg',
  apiKey: process.env.API_KEY || '',
});

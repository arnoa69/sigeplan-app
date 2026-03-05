import { Client, Account, Databases, Storage } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client();

if (projectId) {
  client
    .setEndpoint(endpoint)
    .setProject(projectId);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const APPWRITE_CONFIG = {
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collections: {
    projects: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID,
    templates: import.meta.env.VITE_APPWRITE_TEMPLATES_COLLECTION_ID,
  }
};

export default client;

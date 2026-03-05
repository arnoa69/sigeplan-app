export interface Project {
  $id?: string;
  name: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  trades: string[];
  status: 'draft' | 'active' | 'completed';
  documents: {
    vorankündigung: boolean;
    sigePlan: boolean;
    ordnung: boolean;
    unterlagen: boolean;
    koordinationsplan: boolean;
  };
  createdAt: string;
}

export interface UserProfile {
  name: string;
  company: string;
  smtpSettings?: {
    host: string;
    port: number;
    user: string;
  };
  isAdmin: boolean;
}

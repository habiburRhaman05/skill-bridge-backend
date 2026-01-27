
export interface TutorProfileCreatePayload {
  bio: string;
  profileAvater: string;
  subjects: string[];    
  hourlyRate: number;       
  availability: string[];  
}


export interface TutorProfileUpdatePayload {
  bio?: string;
   categories:any;  
  hourlyRate?: number;
  availability?: string[];
  subjects?: string[];
}


export interface TutorProfileResponse {
  id: string;
  userId: string;
  bio: string;
  hourlyRate: number;
  availability: string[];
  user?: {
    name: string;
    email: string;
  };
}

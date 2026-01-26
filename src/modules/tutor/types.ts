
export interface TutorProfileCreatePayload {
  bio: string;
  categories:any;       
  experience: number;      
  hourlyRate: number;       
  availability: string[];  
}


export interface TutorProfileUpdatePayload {
  bio?: string;
   categories:any;  
  experience?: number;
  hourlyRate?: number;
  availability?: string[];
}


export interface TutorProfileResponse {
  id: string;
  userId: string;
  bio: string;
  categories:any;  
  experience: number;
  hourlyRate: number;
  availability: string[];
  user?: {
    name: string;
    email: string;
  };
}

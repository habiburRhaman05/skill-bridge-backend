export const corsConfig = {
  origin: ['http://localhost:3000',"https://skill-bridge-frontend-gamma.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
};

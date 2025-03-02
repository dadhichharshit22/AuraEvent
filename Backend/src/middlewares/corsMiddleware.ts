import cors from "cors";

const getCorsOptions = () => ({
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
  credentials: true,
});

const corsMiddleware = cors(getCorsOptions());

export default corsMiddleware;

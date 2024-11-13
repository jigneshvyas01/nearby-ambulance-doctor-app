import express from 'express';
import cors from "cors"
import { json } from 'body-parser';
import ambulanceRouter from './routes/ambulances/ambulances.router';
import doctorRouter from './routes/doctors/doctors.router';

const PORT = process.env.PORT || 8000;

export const app = express();

const whiteListURLs = process.env.WHITELIST_URL?.split(",") || "*";

app.use(cors({
    origin: whiteListURLs,
}))
app.use(json());
app.use("/api/ambulances", ambulanceRouter);
app.use("/api/doctors", doctorRouter);

app.use("/health-check", (_, res) => {
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




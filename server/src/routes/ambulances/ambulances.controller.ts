import { RequestHandler } from "express";
import { randomUUID } from "crypto";
import { ambulance, db } from "../../db";
import { asc, eq } from "drizzle-orm";
import { getPaginated } from "../doctors/doctors.controller";

export const getAmbulances: RequestHandler = async (req, res) => {
    const page = req.query.page ?? 1;
    const limit = 10;

    const ambulanceResponse = await db.select().from(ambulance).orderBy(asc(ambulance.title));
    const ambulanceData = getPaginated(page, limit, ambulanceResponse);

    res.json(ambulanceData);
};

export const createAmbulance: RequestHandler = async (req, res) => {
    const ambulanceData = req.body;
    const newAmbulance = await db.insert(ambulance).values({ ...ambulanceData, id: randomUUID() });
    res.status(201).json(newAmbulance);
}

export const updateAmbulance: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updatedAmbulance = req.body;
    const updateAmbulance = await db.update(ambulance).set(updatedAmbulance).where(eq(ambulance.id, id));

    if (updateAmbulance) {
        res.json(updateAmbulance);
    } else {
        res.status(404).json({ message: 'Ambulance not found' });
    }
}

export const deleteAmbulance: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await db.delete(ambulance).where(eq(ambulance.id, id));

    res.status(200).json({ message: 'Ambulance deleted successfully' });
}
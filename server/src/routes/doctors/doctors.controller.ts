import { RequestHandler } from "express";
import { randomUUID } from "crypto";
import { doctors, db } from "../../db";
import { asc, eq } from "drizzle-orm";

export const paginate = (page: number, limit: number) => {

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return { startIndex, endIndex };
}

export const getPaginated = (page: any, limit: number, data: any) => {
    const { startIndex, endIndex } = paginate(page, limit);
    return {
        data: data.slice(startIndex, endIndex),
        total: data.length,
        page,
        totalPages: Math.ceil(data.length / limit)
    };
}

export const getDoctors: RequestHandler = async (req, res) => {
    const page = req.query.page ?? 1;
    const limit = 10;

    const doctorsResponse = await db.select().from(doctors).orderBy(asc(doctors.title));
    const doctorData = getPaginated(page, limit, doctorsResponse);

    res.json(doctorData);
};

export const createDoctor: RequestHandler = async (req, res) => {
    const doctorData = req.body;

    const newDoctor = await db.insert(doctors).values({ ...doctorData, id: randomUUID() });

    res.status(201).json(newDoctor);
}

export const updateDoctor: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updatedDoctor = req.body;
    const doctor = await db.update(doctors).set(updatedDoctor).where(eq(doctors.id, id));

    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }

}

export const deleteDoctor: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await db.delete(doctors).where(eq(doctors.id, id));

    res.status(200).json({ message: 'Doctor deleted successfully' });
}
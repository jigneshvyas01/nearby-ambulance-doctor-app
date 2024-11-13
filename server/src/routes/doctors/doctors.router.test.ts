import request from 'supertest';
import express from 'express';
import doctorsRouter from './doctors.router';

const app = express();
app.use(express.json());
app.use('/api/doctors', doctorsRouter);
describe('Doctors Routes', () => {
    let testDoctor = { id: 1, title: 'Dr. John Doe', description: 'Cardiologist' };

    it('should fetch all doctors', async () => {
        const response = await request(app).get('/api/doctors');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create a new doctor', async () => {
        const response = await request(app).post('/api/doctors').send(testDoctor);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(testDoctor.description);
        expect(response.body.description).toBe(testDoctor.description);
    });

    it('should update a doctor by ID', async () => {
        const updatedDoctor = { title: 'Dr. Jane Doe', description: 'Neurologist' };
        const response = await request(app).put(`/api/doctors/${testDoctor.id}`).send(updatedDoctor);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedDoctor.title);
        expect(response.body.description).toBe(updatedDoctor.description);
    });

    it('should delete a doctor by ID', async () => {
        const response = await request(app).delete(`/api/doctors/${testDoctor.id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Doctor deleted successfully');
    });

    it('should return 404 for non-existing doctor on PUT', async () => {
        const response = await request(app).put('/api/doctors/999').send({ title: 'Non-existent', description: 'Unknown' });
        expect(response.status).toBe(404);
    });

    it('should return 404 for non-existing doctor on DELETE', async () => {
        const response = await request(app).delete('/api/doctors/999');
        expect(response.status).toBe(404);
    });
});

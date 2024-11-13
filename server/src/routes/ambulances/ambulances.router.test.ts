import request from 'supertest';
import express from 'express';
import ambulanceRouter from './ambulances.router';

const app = express();
app.use(express.json());
app.use('/api/ambulances', ambulanceRouter);

describe('Ambulance Routes', () => {
    let testAmbulance = { id: 1, name: 'Ambulance 1', location: 'Location 1' };

    it('should fetch all ambulances', async () => {
        const response = await request(app).get('/api/ambulances');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create a new ambulance', async () => {
        const response = await request(app).post('/api/ambulances').send(testAmbulance);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(testAmbulance.name);
        expect(response.body.location).toBe(testAmbulance.location);
    });

    it('should update an ambulance by ID', async () => {
        const updatedAmbulance = { name: 'Updated Ambulance 1', location: 'Updated Location' };
        const response = await request(app).put(`/api/ambulances/${testAmbulance.id}`).send(updatedAmbulance);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedAmbulance.name);
        expect(response.body.location).toBe(updatedAmbulance.location);
    });

    it('should delete an ambulance by ID', async () => {
        const response = await request(app).delete(`/api/ambulances/${testAmbulance.id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Ambulance deleted successfully');
    });

    it('should return 404 for non-existing ambulance on PUT', async () => {
        const response = await request(app).put('/api/ambulances/999').send({ name: 'Non-existent' });
        expect(response.status).toBe(404);
    });

    it('should return 404 for non-existing ambulance on DELETE', async () => {
        const response = await request(app).delete('/api/ambulances/999');
        expect(response.status).toBe(404);
    });
});

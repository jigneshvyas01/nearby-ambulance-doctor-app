import request from 'supertest';
import { app } from '../..';
import { db } from '../../db';
import { randomUUID } from 'crypto';

jest.mock('../../db', () => ({
    db: {
        select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
                orderBy: jest.fn().mockReturnValue({
                    limit: jest.fn().mockReturnValue({
                        offset: jest.fn().mockReturnValue([{
                            id: "jsdhjhsjdhjhds782787e3",
                            title: 'Ambulance A',
                        }]),
                    }),
                }),
            }),
        }),
        insert: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

jest.mock('drizzle-orm', () => ({
    asc: jest.fn().mockReturnValue('asc'),
    eq: jest.fn().mockReturnValue('eq'),
}));

describe('Ambulances Controller', () => {
    const mockAmbulance = { id: randomUUID(), title: 'Ambulance A' };

    describe('GET /ambulances', () => {
        it('should return a list of ambulances', async () => {
            (db.select as jest.Mock).mockReturnValueOnce({
                from: jest.fn().mockReturnValueOnce({
                    orderBy: jest.fn().mockReturnValueOnce({
                        limit: jest.fn().mockReturnValueOnce({
                            offset: jest.fn().mockReturnValueOnce([mockAmbulance]),
                        }),
                    }),
                }),
            });

            const response = await request(app).get('/api/ambulances').query({ page: 1 });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([mockAmbulance]);
            expect(db.select).toHaveBeenCalledTimes(1);
        }, 10000);
    });

    describe('POST /ambulances', () => {
        it('should create a new ambulance', async () => {
            (db.insert as jest.Mock).mockReturnValue([mockAmbulance]);

            const response = await request(app)
                .post('/api/ambulances')
                .send({ title: 'Ambulance A' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockAmbulance);
            expect(db.insert).toHaveBeenCalledWith(expect.objectContaining({ title: 'Ambulance A' }));
        });
    });

    describe('PUT /ambulances/:id', () => {
        it('should update an existing ambulance', async () => {
            (db.update as jest.Mock).mockReturnValue([mockAmbulance]);

            const response = await request(app)
                .put(`/api/ambulances/${mockAmbulance.id}`)
                .send({ title: 'Updated Ambulance' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([mockAmbulance]);
            expect(db.update).toHaveBeenCalledWith(expect.objectContaining({ title: 'Updated Ambulance' }));
        });

        it('should return 404 if ambulance is not found', async () => {
            (db.update as jest.Mock).mockReturnValue([]);

            const response = await request(app)
                .put(`/api/ambulances/${mockAmbulance.id}`)
                .send({ title: 'Nonexistent Ambulance' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Ambulance not found' });
        });
    });

    describe('DELETE /ambulances/:id', () => {
        it('should delete an ambulance', async () => {
            (db.delete as jest.Mock).mockReturnValue(1);

            const response = await request(app).delete(`/api/ambulances/${mockAmbulance.id}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Ambulance deleted successfully' });
            expect(db.delete).toHaveBeenCalledWith(expect.objectContaining({ id: mockAmbulance.id }));
        });
    });
});

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
                            title: 'Dr. Smith',
                            location: 'Test'
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

describe('Doctors Controller', () => {
    const mockDoctor = { id: randomUUID(), title: 'Dr. Smith', location: 'Test' };

    describe('GET /doctors', () => {
        it('should return a list of doctors', async () => {
            (db.select as jest.Mock).mockReturnValueOnce({
                from: jest.fn().mockReturnValueOnce({
                    orderBy: jest.fn().mockReturnValueOnce({
                        limit: jest.fn().mockReturnValueOnce({
                            offset: jest.fn().mockReturnValueOnce([mockDoctor]),
                        }),
                    }),
                }),
            });

            const response = await request(app).get('/api/doctors').query({ page: 1 });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([mockDoctor]);
            expect(db.select).toHaveBeenCalledTimes(1);
        }, 10000);
    });

    describe('POST /doctors', () => {
        it('should create a new doctor', async () => {
            (db.insert as jest.Mock).mockReturnValue([mockDoctor]);

            const response = await request(app)
                .post('/api/doctors')
                .send({ title: 'Dr. Smith', location: 'Test' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockDoctor);
            expect(db.insert).toHaveBeenCalledWith(expect.objectContaining({ title: 'Dr. Smith' }));
        });
    });

    describe('PUT /doctors/:id', () => {
        it('should update an existing doctor', async () => {
            (db.update as jest.Mock).mockReturnValue([mockDoctor]);

            const response = await request(app)
                .put(`/api/doctors/${mockDoctor.id}`)
                .send({ title: 'Test name' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([mockDoctor]);
            expect(db.update).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test name' }));
        });

        it('should return 404 if doctor is not found', async () => {
            (db.update as jest.Mock).mockReturnValue([]);

            const response = await request(app)
                .put(`/api/doctors/${mockDoctor.id}`)
                .send({ title: 'Test not found' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Doctor not found' });
        });
    });

    describe('DELETE /doctors/:id', () => {
        it('should delete a doctor', async () => {
            (db.delete as jest.Mock).mockReturnValue(1);

            const response = await request(app).delete(`/api/doctors/${mockDoctor.id}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Doctor deleted successfully' });
            expect(db.delete).toHaveBeenCalledWith(expect.objectContaining({ id: mockDoctor.id }));
        });
    });
});

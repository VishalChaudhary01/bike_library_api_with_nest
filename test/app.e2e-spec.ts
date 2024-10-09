import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('BikeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/bikes (GET) - should return an empty array initially', () => {
    return request(app.getHttpServer())
      .get('/bikes')
      .expect(200)
      .expect([]);
  });

  it('/bikes (POST) - should create a new bike', () => {
    const newBike = {
      make: 'Royal Enfield',
      model: 'Classic 350',
      year: 2021,
      type: 'Cruiser',
    };

    return request(app.getHttpServer())
      .post('/bikes')
      .send(newBike)
      .expect(201)
      .expect((res) => {
        console.log("expected bike", res.body);
        console.log("created bike: ", newBike)
        expect(res.body).toHaveProperty('id');
        expect(res.body.make).toBe(newBike.make);
        expect(res.body.model).toBe(newBike.model);
        expect(res.body.year).toBe(newBike.year);
        expect(res.body.type).toBe(newBike.type);
      });
  });

  it('/bikes/:id (PUT) - should update a bike by id', async () => {
    const newBike = {
      make: 'Royal Enfield',
      model: 'Classic 350',
      year: 2021,
      type: 'Cruiser',
    };

    const bike = await request(app.getHttpServer())
      .post('/bikes')
      .send(newBike)
      .expect(201);

    const bikeId = bike.body.id;

    const updatedBike = {
      make: 'Yamaha',
      model: 'FZ',
      year: 2022,
      type: 'Sport',
    };

    return request(app.getHttpServer())
      .put(`/bikes/${bikeId}`)
      .send(updatedBike)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', bikeId);
        expect(res.body.make).toBe(updatedBike.make);
        expect(res.body.model).toBe(updatedBike.model);
        expect(res.body.year).toBe(updatedBike.year);
        expect(res.body.type).toBe(updatedBike.type);
      });
  });

  it('/bikes/:id (DELETE) - should delete a bike by id', async () => {
    const newBike = {
      make: 'Royal Enfield',
      model: 'Classic 350',
      year: 2021,
      type: 'Cruiser',
    };

    const bike = await request(app.getHttpServer())
      .post('/bikes')
      .send(newBike)
      .expect(201);

    const bikeId = bike.body.id;

    await request(app.getHttpServer())
      .delete(`/bikes/${bikeId}`)
      .expect(200);

    return request(app.getHttpServer())
      .get(`/bikes/${bikeId}`)
      .expect(404);
  });
});

import request from "supertest";
import http from "http"
import { app, launchDB } from "../database";
import { collections } from "../services/db.service";
import { Ironman, Spiderman, Superman } from "./test_consts";

let server: http.Server;

describe('REST Endpoints', () => {
    beforeAll(async () => {
      server = await launchDB();
    });
    
    it('Should create a new superhero', async () => {
      const res = await request(app)
        .post('/api/superheroes/')
        .send(Superman)
      expect(res.statusCode).toEqual(201)
    })

    it('Should get a superheroes', async () => {
      const res = await request(app)
        .get('/api/superheroes/')
      res.body.forEach((el: any) => delete el._id);
      expect(res.body).toEqual([Spiderman, Superman])
      expect(res.statusCode).toEqual(200)
    })

    it('Should get a superhero', async () => {
      const res = await request(app)
        .get('/api/superheroes/Spider%20Man')
      delete res.body._id
      expect(res.body).toEqual(Spiderman)
      expect(res.statusCode).toEqual(200)
    })

    it('Should update a superhero', async () => {
      const res = await request(app)
        .put('/api/superheroes/Spider%20Man')
        .send(Ironman)
      delete res.body._id
      expect(res.statusCode).toEqual(200)
    })

    it('Should delete a superhero', async () => {
      const res = await request(app)
        .delete('/api/superheroes/Iron%20Man')
      expect(res.statusCode).toEqual(202)
    })

    afterAll(() => {
      collections.superheroes?.deleteMany({})
      collections.superheroes?.insertOne(Spiderman)
        .then(() =>
            server.close((err) => {
              process.exit(err ? 1 : 0);
            })
        )
    })
  })
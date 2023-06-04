import request from 'supertest';
import Config from './config';

const { authentification_url } = Config;

export async function requestAuthentificationSession(login: string, password: string) {
  return await request(authentification_url)
    .post("/session")
    .send({ login, password })
    .set('Accept', 'application/json')
}


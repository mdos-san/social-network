// TODO: move
export interface SessionModel {
  sessionId: string,
  userId: string,
}

export interface SessionRepository {
  findSessionById: (sessionId: string) => Promise<SessionModel | null>,
  createSession: (session: SessionModel) => Promise<boolean> // TODO: Error management ?
}

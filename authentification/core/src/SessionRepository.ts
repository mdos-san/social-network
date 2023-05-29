// TODO: move
export interface SessionModel {
  sessionId: string,
  userId: string,
}

export interface SessionRepository {
  findSessionById: (sessionId: SessionModel['sessionId']) => Promise<SessionModel | null>,
  createSession: (session: SessionModel) => Promise<boolean> // TODO: Error management ?
  deleteSessionBySessionId: (userId: SessionModel['userId']) => Promise<boolean> // TODO: Error management ?
}

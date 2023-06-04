import axios from "axios";
import { AuthentificationProvider, UserInfo } from "core/dist/Providers/Authentification";

const DefaultAuthentificationProvider: AuthentificationProvider = {
  init: async () => {
  },
  close: async () => {
  },
  getUserInfo: async (sessionId) => {
    const authentification_url = process.env.PROFILE_AUTHENTIFICATION_URL || "http://localhost:3000";
    const response = await axios.get<UserInfo>(`${authentification_url}/userinfo`, {
      headers: {
        Cookie: `session=${sessionId}`
      }
    });

    return {
      userId: response.data.userId,
      scopes: response.data.scopes,
    }
  }
}

export default DefaultAuthentificationProvider;


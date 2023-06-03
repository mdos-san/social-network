import axios from "axios";
import { AuthentificationProvider, UserInfo } from "core/dist/Providers/Authentification";

const DefaultAuthentificationProvider: AuthentificationProvider = {
  init: async () => {
  },
  close: async () => {
  },
  getUserInfo: async (sessionId) => {
    const response = await axios.get<UserInfo>("http://localhost:3000/userinfo", {
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


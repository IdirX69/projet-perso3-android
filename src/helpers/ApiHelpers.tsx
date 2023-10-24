import * as SecureStore from "expo-secure-store";
export default async function ApiHelper(
  url: string,
  method: string = "GET",
  body: string | null = null
): Promise<any> {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;
  const tokenString = await SecureStore.getItemAsync("userToken");
  let token = "";
  if (tokenString) {
    try {
      const tokenParsed = JSON.parse(tokenString);
      if (tokenParsed && tokenParsed.token) {
        token = tokenParsed.token;
      }
    } catch (error) {
      console.error("Erreur dans le parse du token:", error);
    }
  }
  return await fetch(backendUrl + url, {
    method: method,
    body: body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function ApiLoginHelper(body: string): Promise<any> {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

  return await fetch(`${backendUrl}/api/login`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export async function ApiRegisterHelper(body: string): Promise<any> {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

  return await fetch(`${backendUrl}/api/register`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

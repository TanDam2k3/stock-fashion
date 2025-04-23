import Cookies from "universal-cookie";
import { IUserCookie } from "../../types/User";

const cookies = new Cookies();

export const setGoogleLoginCookies = (userData: IUserCookie): void => {
  cookies.set("userLogin", userData, { path: "/" });
};

export const getGoogleLoginCookies = (): IUserCookie | null => {
  const cookiesResult = cookies.get("userLogin");
  if (!cookiesResult) return null;
  return cookiesResult;
};

export const deleteGoogleLoginCookies = (): void => {
  cookies.remove("userLogin", { path: "/" });
};

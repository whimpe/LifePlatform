import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  console.log("send refresh cookkie")
  res.cookie("jwt", token, {
    httpOnly: true,
    path: '/refresh_token'
  });
};

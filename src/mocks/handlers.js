import { rest } from "msw";
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const handlers = [
  rest.get(`${baseUrl}/weather`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json("nairobi"));
  }),
];

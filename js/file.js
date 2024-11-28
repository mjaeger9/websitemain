import { Client } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  if (req.method === 'GET') {
    console.log(req.URL)
    return res.send({
      name: "Master",
      money: 910000,
    });
  }
  return null;
};
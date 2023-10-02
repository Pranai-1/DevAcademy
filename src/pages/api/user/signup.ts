import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { user } from "@/pages/api/user/interface";
import { UserModel } from "@/lib/db";

const userInput = z.object({
  email: z.string().min(10).max(40).email(),
  password: z.string().min(5).max(40),
});

type Data = {
  message: string;
  cookie?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = await req.body;

  const parsedInput = userInput.safeParse(body);
  if (!parsedInput.success) {
    return res.status(404).json({ message: "failed" });
  }
  const email = parsedInput.data.email;
  const password = parsedInput.data.password;
  const user: user | null = await UserModel.findOne({ email });
  if (user) {

    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new UserModel({ email, password });
    newUser.save();
    res.setHeader("Set-Cookie", "token=; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    return res.status(200).json({ message: "success" });
  }
}

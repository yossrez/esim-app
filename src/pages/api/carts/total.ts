import { NextApiRequest, NextApiResponse } from "next";
import { getInMemCartItemTotal } from "../store";
import { CartItemTotal, HttpResponse } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<CartItemTotal>>,
) {
  try {
    res.status(200).json({ data: { total: getInMemCartItemTotal() } });
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
  }
}

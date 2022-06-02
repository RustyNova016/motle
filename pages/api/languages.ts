import {NextApiRequest, NextApiResponse} from "next";

type language = {
    languageName: string;
};
type Data = language[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json([{languageName: "English"}, {languageName: "Francais"}]);
}
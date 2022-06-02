// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {mots} from "./motslist";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Get a random word from wordlist that is five letters long
    let word = "";
    while (word.length !== 5) {
        word = mots[Math.floor(Math.random() * mots.length)]
    }
    res.status(200).json(word)
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {wordlist} from "./wordlist";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Get a random word from wordlist
    let word = "";
    while (word.length !== 5) {
        word = wordlist[Math.floor(Math.random() * wordlist.length)]
    }
    res.status(200).json(word)
}


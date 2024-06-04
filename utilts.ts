import { verifyKey } from "discord-interactions";

export function DiscordPong(key: any) {
    return function (req: any, res: any, buf: any) {
        const sign = req.get("X-Signature-Ed25519");
        const time = req.get("X-Signature-Timestamp");
        console.log(sign, time, key);

        const isValid = verifyKey(buf, sign, time, key);
        if (!isValid) {
            res.status(401).send("Bad request signature");
            throw new Error("Bad request signature");
        }
    };
}

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

export async function DiscordRequest(endpoint: string, options: any) {
    const url = 'https://discord.com/api/v10/' + endpoint;

    if (options.body) options.body = JSON.stringify(options.body);

    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent':
                'DiscordBot (https://github.com/tinierlizard/dndbot, 1.0.0)',
        },
        ...options,
    });

    if (!res.ok) {
        const dat = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(dat));
    }

    return res;
}
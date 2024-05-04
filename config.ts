import { IntentsBitField } from "discord.js";

export const config = {
    servs: {
        dev: "1236133278214393927",
    },
    clientOpts: {
        intents: [IntentsBitField.Flags.Guilds],
    },
};

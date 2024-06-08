import {
    CommandInteraction,
    CacheType,
    EmbedBuilder,
} from "discord.js";
import { Command, ContextTypes, IntegrationTypes, StatusMessage } from "discordoop";
import { DNDBot, client } from "../index";

class ServerTest extends Command {
    constructor(client: DNDBot) {
        super({
            name: "servertest",
            desc: "A command integrated ONLY on the guild and only works in guild",
            isNSFW: false,
            integrationTypes: [IntegrationTypes.GUILD],
            commandType: "CHI",
            contextTypes: [ContextTypes.GUILD],
            guildID: client.guildID
        });
    }

    public run(int: CommandInteraction<CacheType>): Promise<StatusMessage> {
        return new Promise(async (r) => {
            let embed = new EmbedBuilder()
                .setDescription(
                    "I'm alive! I promise!\nP.S. If you're running into a problem, ping <@!271714172201467905> for help!"
                )
                .setTimestamp();

            int.reply({
                embeds: [embed],
                fetchReply: false,
            })
                .then(() => {
                    r({ code: "200 OK", message: "Message sent successfully" });
                })
                .catch((err) => {
                    r({ code: "400 ERR", message: err });
                });
        });
    }
}

export const command = new ServerTest(client);
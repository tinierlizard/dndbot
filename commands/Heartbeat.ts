import {
    CommandInteraction,
    CacheType,
    EmbedBuilder,
} from "discord.js";
import { Command, StatusMessage } from "discordoop";

class Heartbeat extends Command {
    constructor() {
        super({
            name: "testcommand",
            isNSFW: false,
            runContext: "CHI",
            desc: "Simple heartbeat command",
        });
    }

    public run(int: CommandInteraction<CacheType>): Promise<StatusMessage> {
        return new Promise(async (r) => {
            console.log("Command ran");
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
                    r({ code: "404 ERR", message: err });
                });
        });
    }
}

const command = new Heartbeat();

module.exports = command;

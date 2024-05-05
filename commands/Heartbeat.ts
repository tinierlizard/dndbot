import { CommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import { Command, StatusMessage } from "discordoop";

class Heartbeat extends Command {
    constructor() {
        super({
            name: "heartbeat",
            isNSFW: false,
            runContext: "CHI",
            desc: "Simple heartbeat command",
        });
    }

    public run(int: CommandInteraction<CacheType>): Promise<StatusMessage> {
        return new Promise(async (r) => {
            console.log("Command ran");
            let embed = new EmbedBuilder().setDescription(this.data.name);

            int.reply({
                embeds: [embed],
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

import { CommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import { Command, StatusMessage } from "discordoop";

class Heartbeat extends Command {
    constructor() {
        super({
            name: "heartbeat",
            isNSFW: false,
            runContext: "CHI",
            desc: "Simple heartbeat command"
        });
    }

    public run(int: CommandInteraction<CacheType>): StatusMessage {
        let embed = new EmbedBuilder().setDescription(this.data.name);

        int.reply({
            embeds: [embed],
        });

        return { code: "OK 200", message: "Replied successfully" };
    }
}

const command = new Heartbeat();

module.exports = command;

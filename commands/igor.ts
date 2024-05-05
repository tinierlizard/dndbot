import { CommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import { Command, StatusMessage } from "discordoop";

class Igor extends Command {
    constructor() {
        super({
            name: "igor",
            isNSFW: false,
            runContext: "CHI",
            desc: "igor command",
        });
    }

    public run(int: CommandInteraction<CacheType>): Promise<StatusMessage> {
        return new Promise(async (r) => {
            console.log("Command ran");
            let embed = new EmbedBuilder()
                .setDescription("igor has autism :)")
                .setColor([133, 38, 222])
                .setImage(
                    "https://cdn.discordapp.com/attachments/1044381780540653702/1236594599368196096/yippee.jpg"
                );

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

const command = new Igor();

module.exports = command;

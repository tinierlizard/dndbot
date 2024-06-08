import {
    EmbedBuilder,
} from "discord.js";
import { Command, ContextTypes, IntegrationTypes, StatusMessage } from "discordoop";
import { DiscordRequest } from "../utils";
import { InteractionResponseFlags } from "discord-interactions";

class Igor extends Command {
    constructor() {
        super({
            name: "igor",
            desc: "",
            isNSFW: false,
            integrationTypes: [IntegrationTypes.USER],
            commandType: "MSG",
            contextTypes: [ContextTypes.BOT_DM, ContextTypes.GUILD, ContextTypes.PRIV_CHAN],
        });
    }

    public run(int: any): Promise<StatusMessage> {
        return new Promise(async (r) => {
            console.log("Heartbeat ran");
            let embed = new EmbedBuilder()
                .setDescription(
                    "igor are artistuc <#=3"
                )
                .setTimestamp()
                .setImage('https://cdn.discordapp.com/attachments/1044381780540653702/1236594599368196096/yippee.jpg?ex=6664be37&is=66636cb7&hm=7858f62f6e75a3c228f39d4308e0c5e757b8d2ff43285be657ebde08d91c7ddb&')
                .setColor([121, 32, 245]);

            await DiscordRequest(`/interactions/${int.id}/${int.token}/callback`, {
                method: "POST",
                body: {
                    type: 4,
                    data: {
                        embeds: [embed.toJSON()],
                        // flags: InteractionResponseFlags.EPHEMERAL
                    }
                },
            }).then((res) => {
                if (res.status == 204) {
                    r({ code: "200 OK", message: "Message sent successfully" });
                } else {
                    console.log(res);
                    r({ code: "400 ERR", message: "Not sure... check the log" });
                }
            })

            

            // int.reply({
            //     embeds: [embed],
            //     fetchReply: false,
            // })
            //     .then(() => {
            //         r({ code: "200 OK", message: "Message sent successfully" });
            //     })
            //     .catch((err) => {
            //         r({ code: "400 ERR", message: err });
            //     });
        });
    }
}

export const command = new Igor();
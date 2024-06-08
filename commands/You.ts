import {
    EmbedBuilder,
} from "discord.js";
import { Command, ContextTypes, IntegrationTypes, StatusMessage } from "discordoop";
import { DiscordRequest } from "../utils";
import { InteractionResponseFlags } from "discord-interactions";

class hate extends Command {
    constructor() {
        super({
            name: "hate",
            desc: "",
            isNSFW: false,
            integrationTypes: [IntegrationTypes.USER],
            commandType: "USER",
            contextTypes: [ContextTypes.BOT_DM, ContextTypes.GUILD, ContextTypes.PRIV_CHAN],
        });
    }

    public run(int: any): Promise<StatusMessage> {
        return new Promise(async (r) => {
            console.log(int);
            let embed = new EmbedBuilder()
                .setDescription(
                    `this is an automated message to tell you that the rat fucking hates <@!${int.data.target_id}> <3\n`
                )
                .setTimestamp()
                .setImage('https://cdn.discordapp.com/attachments/1044381780540653702/1248906302789390446/autism.jpg?ex=66655e22&is=66640ca2&hm=b4b53c17b227c4fae79f45fc75e02c3a6d56a3c37dfb8203cf2410ffd0db6f2c&')
                .setColor([173, 16, 16]);

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

export const command = new hate();
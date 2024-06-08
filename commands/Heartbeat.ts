import {
    EmbedBuilder,
} from "discord.js";
import { Command, ContextTypes, IntegrationTypes, StatusMessage } from "discordoop";
import { DiscordRequest } from "../utils";
import { InteractionResponseFlags } from "discord-interactions";

class Heartbeat extends Command {
    constructor() {
        super({
            name: "heartbeat",
            desc: "Simple heartbeat command",
            isNSFW: false,
            integrationTypes: [IntegrationTypes.GUILD, IntegrationTypes.USER],
            commandType: "CHI",
            contextTypes: [ContextTypes.BOT_DM, ContextTypes.GUILD, ContextTypes.PRIV_CHAN],
        });
    }

    public run(int: any): Promise<StatusMessage> {
        return new Promise(async (r) => {
            console.log("Heartbeat ran");
            let embed = new EmbedBuilder()
                .setDescription(
                    "I'm alive! I promise!\nP.S. If you're running into a problem, ping <@!271714172201467905> for help!"
                )
                .setTimestamp();

            await DiscordRequest(`/interactions/${int.id}/${int.token}/callback`, {
                method: "POST",
                body: {
                    type: 4,
                    data: {
                        embeds: [embed.toJSON()],
                        content: "hello!"
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

export const command = new Heartbeat();
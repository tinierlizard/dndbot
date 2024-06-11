import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import {
    Command,
    ContextTypes,
    IntegrationTypes,
    StatusMessage,
} from "discordoop";
import { DiscordRequest } from "../utils";
import { InteractionResponseFlags } from "discord-interactions";

class LPP extends Command {
    quotes: Array<string>;

    constructor() {
        super({
            name: "lppquote",
            desc: "Get a random quote from the original French version of Le Petit Prince",
            isNSFW: false,
            integrationTypes: [IntegrationTypes.USER],
            commandType: "CHI",
            contextTypes: [
                ContextTypes.BOT_DM,
                ContextTypes.GUILD,
                ContextTypes.PRIV_CHAN,
            ],
            options: [
                {
                    name: "ephemeral",
                    description: "whether the reply message is ephemeral",
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
            ],
        });

        this.quotes = [
            "Droit devant soi on ne peut pas aller bien loin",
            "Mais j'etais trop jeune pour savoir l'aimer",
            "On ne sait jamais",
            "Tache d'etre heureux",
            'Qu\'est-ce que signifie, "apprivoiser"?',
            "Le langage est source de malentendues",
            "On ne voit bien qu'avec le coeur. L'essential est invisible pour les yeux.",
            "Ce qui est important, ca ne se voit pas.",
            "Je ne te quitterai pas",
        ];
    }

    public run(int: any): Promise<StatusMessage> {
        return new Promise(async (r) => {
            const opts: Array<any> = int.data.options;
            const ephemeral = opts.filter((opt) => opt.name == "ephemeral")[0]
                .value;
            let embed = new EmbedBuilder()
                .setDescription(
                    this.quotes[Math.floor(Math.random() * this.quotes.length)]
                )
                .setColor([66, 135, 245]);

            await DiscordRequest(
                `/interactions/${int.id}/${int.token}/callback`,
                {
                    method: "POST",
                    body: {
                        type: 4,
                        data: {
                            embeds: [embed.toJSON()],
                            flags: ephemeral
                                ? InteractionResponseFlags.EPHEMERAL
                                : 0,
                        },
                    },
                }
            ).then((res) => {
                if (res.status == 204) {
                    r({ code: "200 OK", message: "Message sent successfully" });
                } else {
                    console.log(res);
                    r({
                        code: "400 ERR",
                        message: "Not sure... check the log",
                    });
                }
            });
        });
    }
}

export const command = new LPP();

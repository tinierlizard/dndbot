import { EmbedBuilder } from "discord.js";
import {
    Command,
    ContextTypes,
    IntegrationTypes,
    StatusMessage,
} from "discordoop";
import { DiscordRequest } from "../utils";
import { InteractionResponseFlags } from "discord-interactions";

class insult extends Command {
    insults: Array<string>;

    constructor() {
        super({
            name: "insult",
            desc: "",
            isNSFW: false,
            commandType: "USER",
            integrationTypes: [IntegrationTypes.USER],
            contextTypes: [
                ContextTypes.BOT_DM,
                ContextTypes.GUILD,
                ContextTypes.PRIV_CHAN,
            ],
        });

        this.insults = [
            "You... a cockalorum\n\ncockalorum • \\kah-kuh-LOR-um\\ • noun. 1 : a boastful and self-important person",
            "I hope you outlive your children",
            "You look like you need power tools to open a stick of butter",
            "If you were a spice, you'd be flour",
            "Even Bob Ross thinks you're a mistake.",
            "There are approximately 1,010,300 words in the english language, but I can not string enough of them together to properly convey how much I want to hit you with a chair",
            "You should start carrying around a plant to replace the oxygen you waste",
            "Why don't you go outside and play Hide and Go Fuck Yourself?",
            // "I don't have enough time or crayons to explain this to you",
            "You dense cabbage",
            "You wobbly dildo",
            "muppet.",
            "You couldn't organise a fuck in a brothel.",
            "You're just a banana sock, you worm.",
            "Your IQ is room temperature",
            "You are the human equivalent of a crack between 2 couch cushions",
            "You'd fuck up a wet dream!",
            "If I wanted to kill myself, I'd climb up your ego and jump down to your intelligence.",
            "May the rats ejaculate upon you.",
            "I hope both sides of your pillow are warm",
            "I hope your butter is always cold, so it rips your bread apart",
            "I hope your cheese breaks off in crumbles when you're trying to grate it",
            "I hope you bite into 5 unison kernels the next time you eat popcorn, then get a good piece, only to bite into another kernel after that",
            "I hope your wifi drops when you're trying to send an urgent email to your boss",
            "I hope you always get that little film of ketchup water on your bun",
            "I hope you start disliking the taste of toothpaste",
            "I hope you experience the \"I'm not going to make it\" phase when you're trying to find a public restroom",
        ];
    }

    public run(int: any): Promise<StatusMessage> {
        return new Promise(async (r) => {
            let userData = int.data.resolved.users[int.data.target_id];
            let embed = new EmbedBuilder()
                .setDescription(
                    this.insults[
                        Math.floor(Math.random() * this.insults.length)
                    ]
                )
                .setFooter({
                    text: `Yes, you, ${userData.global_name}.`,
                    iconURL: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp`,
                });

            await DiscordRequest(
                `/interactions/${int.id}/${int.token}/callback`,
                {
                    method: "POST",
                    body: {
                        type: 4,
                        data: {
                            embeds: [embed.toJSON()],
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

export const command = new insult();

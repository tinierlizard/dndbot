import { ApplicationCommandOptionType } from "discord.js";
import {
    Command,
    ContextTypes,
    IntegrationTypes,
    StatusMessage,
} from "discordoop";
import { DiscordRequest } from "../utils";
import { client } from "../index";

class game extends Command {
    private games: Map<string, Array<string>>;

    constructor() {
        super({
            name: "pickgame",
            desc: "igor is being stupid and cant pick a game, so we'll do it for him",
            isNSFW: false,
            integrationTypes: [IntegrationTypes.USER],
            commandType: "CHI",
            contextTypes: [ContextTypes.PRIV_CHAN],
            options: [
                {
                    name: "include",
                    description:
                        "a list of vr/misc/notvr to include options from",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        });

        this.games = new Map();

        this.games.set("vr", ["tabor", "rumble", "itr", "vtol", "ktane"]);

        this.games.set("not", [
            "lvl0",
            "tewaw",
            "yomi",
            "cock",
            "r6",
            "bg3",
            "mc",
            "ultrakill",
            "get the FUCK outta (my swamp)",
        ]);

        this.games.set("misc", ["anim", "solo activities"]);
    }

    public run(int: any): Promise<StatusMessage> {
        return new Promise(async (r) => {
            // defer update
            await DiscordRequest(
                `/interactions/${int.id}/${int.token}/callback`,
                {
                    method: "POST",
                    body: {
                        type: 4,
                        data: {
                            content: "lemme think about this one...",
                        },
                    },
                }
            ).then((res) => {
                if (res.status == 204) {
                    // r({ code: "200 OK", message: "Update deferred" });
                } else {
                    console.log(res);
                    r({
                        code: "400 ERR",
                        message: "Not sure... check the log",
                    });
                }
            });

            let allGames: Array<string> = [];
            const opts: Array<any> = int.data.options;
            const includeOpt: string = opts.filter(
                (opt) => opt.name == "include"
            )[0].value;

            const includes = includeOpt.split(",");

            for (const include of includes) {
                switch (include) {
                    case "vr":
                        allGames = allGames.concat(this.games.get("vr"));
                        break;
                    case "notvr":
                        allGames = allGames.concat(this.games.get("not"));
                        break;
                    case "misc":
                        allGames = allGames.concat(this.games.get("misc"));
                        break;
                }
            }

            await DiscordRequest(
                `/webhooks/${client.application.id}/${int.token}/messages/@original`,
                {
                    method: "PATCH",
                    body: {
                        content:
                            "I pick.... " +
                            allGames[
                                Math.floor(Math.random() * allGames.length)
                            ],
                    },
                }
            ).then((res) => {
                if (res.status == 200) {
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

export const command = new game();

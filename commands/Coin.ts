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
            name: "coin",
            desc: "flip a coin",
            isNSFW: false,
            integrationTypes: [IntegrationTypes.USER],
            commandType: "CHI",
            contextTypes: [ContextTypes.PRIV_CHAN],
        });
    }

    public run(int: any): Promise<StatusMessage> {
        return new Promise(async (r) => {
            let coin = Math.random();
            let res;
            if (coin > 0.5) {
                res = "heads!";
            } else if (coin < 0.5) {
                res = "tails!";
            } else {
                res = "its side... what.";
            }

            await DiscordRequest(
                `/interactions/${int.id}/${int.token}/callback`,
                {
                    method: "POST",
                    body: {
                        type: 4,
                        data: {
                            content: "The coin landed on... " + res
                        }
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

export const command = new game();

import { Events } from "discord.js";
import { Event, StatusMessage } from "discordoop";
import { DNDBot, client } from "../index";
import { InteractionType } from "discord-interactions";

class CommandCreated extends Event {
    constructor() {
        super({
            type: Events.InteractionCreate,
        });
    }

    public run(type, data, body): void {
        if (type == InteractionType.APPLICATION_COMMAND) {
            for (const cmdDat of client.commands) {
                const name = cmdDat[0];
                const cmd = cmdDat[1];

                if (name == data.name) {
                    cmd.run(body).then((r: StatusMessage) => {
                        console.log(
                            name +
                                " - " +
                                r.code +
                                " " +
                                (r.message != undefined ? r.message : "") +
                                "."
                        );
                    });
                }
            }
        }
    }

    public init(client: DNDBot): Promise<boolean> {
        return new Promise((r) => {
            client.on(this.data.type, this.run);
            r(true);
        });
    }
}

export const event = new CommandCreated();

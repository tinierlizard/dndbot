import { Events, CommandInteraction } from "discord.js";
import { Command, Event, StatusMessage } from "discordoop";
import { DNDBot, client } from "../index";

class Heartbeat extends Event {
    constructor() {
        super({
            type: Events.InteractionCreate,
        });
    }

    public run(...args: any[]): void {
        let interaction: CommandInteraction = args[0];

        if (interaction.isCommand()) {
            let commands: Map<string, Command> = client.commands;
            let ourCommand = commands.get(interaction.commandName);

            if (ourCommand) {
                let cmdPromise = ourCommand.run!(
                    interaction as CommandInteraction
                );

                cmdPromise.then((res: StatusMessage) => {
                    console.log(
                        interaction.commandName +
                            " - " +
                            res.code +
                            " " +
                            (res.message != undefined ? res.message : "") +
                            "."
                    );
                });
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

const command = new Heartbeat();

module.exports = command;

import { CommandInteraction, CacheType, Events, Client } from "discord.js";
import { Event, StatusMessage } from "discordoop";

class Heartbeat extends Event {
    constructor() {
        super({
            type: Events.InteractionCreate,
        });
    }

    public run(): StatusMessage {
        

        return {code: '200 OK'};
    }
    public init(client: Client): Promise<boolean> {
        return new Promise((r) => {
            client.on(this.data.type, this.run)
        })
    }
}

const command = new Heartbeat();

module.exports = command;

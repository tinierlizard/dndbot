import {
    Client,
    ClientOptions,
} from "discord.js";
import { config } from "./config";
import "dotenv/config";
import * as fs from "fs";
import { Command, Event } from "discordoop";
import express from 'express';
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { DiscordPong } from "./utilts";

// Create express app
const app = express();
// Parse request body, verify incoming requests using discord-interactions
app.use(
    express.json({
        verify: DiscordPong(process.env.PUBLIC_KEY)
    })
)

/** 
 * Interactions endpoint
*/
app.post('/interactions', async function(req, res) {
    const {type, data} = req.body;

    if (type == InteractionType.PING) {
        return res.send({
            type: InteractionResponseType.PONG
        });
    }

    console.log(req.body);
})

// Export DNDBot class
export class DNDBot extends Client {
    // Properties
    commands: Map<string, Command> = new Map();
    colors = {
        s: [41, 191, 0],
        wip: [255, 255, 0],
        f: [255, 0, 0],
    };

    // Constructor
    constructor(options: ClientOptions) {
        super(options);
    }

    // Init function
    // Ran one time, once the client is logged in
    async init(): Promise<boolean> {
        return new Promise(async (r) => {
            // register commands locally
            await this.registerLocalCommands();

            // hook events
            await this.hookEvents();

            r(true);
        });
    }

    // Create local register of commands
    // This is what's stored in the Commands object in Client
    // They take the form of DOOP's Command interface
    async registerLocalCommands(): Promise<boolean> {
        return new Promise((r) => {
            let commandFiles = fs.readdirSync("./commands/");

            commandFiles.forEach(async (name) => {
                let command = (await require("./commands/" +
                    name)) as unknown as Command;

                this.commands.set(command.data.name, command);
            });

            r(true);
        });
    }

    // Connect callback functions to events
    async hookEvents(): Promise<boolean> {
        return new Promise(async (r) => {
            let eventFiles = fs.readdirSync("./events/");

            eventFiles.forEach(async (name) => {
                let event = (await require("./events/" +
                    name)) as unknown as Event;

                event.init(this);
            });

            r(true);
        });
    }
}

export const client = new DNDBot(config.clientOpts);

client.on("ready", () => {
    let initPromise = client.init();
    
    initPromise.then(() => {
        console.log("Initialization complete");
    });
});

// Login to client
client.login(process.env.BOT_TOKEN);

// Listen on ngrok server
app.listen(3000, () => {
    console.log('Listening on port 3000');
})
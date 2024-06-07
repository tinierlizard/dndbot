import {
    ApplicationCommandData,
    ApplicationCommandType,
} from "discord.js";
import { Command } from "discordoop";
import * as fs from 'fs';
import { DiscordRequest } from "./utilts";

// Create maps
let localCommands: Map<string, Command> = new Map();
let discordFriendlyCommands: Array<ApplicationCommandData> = [];

// Gather local commandss
const commandFiles = fs.readdirSync('./commands/');
commandFiles.forEach(async (name) => {
    let command = (await require("./commands/" +
        name)) as unknown as Command;

    localCommands.set(command.data.name, command);
});

// Create discord friendly input
localCommands.forEach((cmd, name) => {
    let commandType;
    let data = cmd.data;

    switch (data.runContext) {
        case "CHI":
            commandType = ApplicationCommandType.ChatInput;
            break;
        case "MSG":
            commandType = ApplicationCommandType.Message;
            break;
        case "USER":
            commandType = ApplicationCommandType.User;
            break;
    }

    const toPush = {};

    toPush
        ['name'] = data.name
        ['description'] = data.desc
        ['type'] = commandType
    
    if (data.options) {
        toPush['options'] = data.options
    }

    discordFriendlyCommands.push({
        name: data.name,
        description: data.desc,
        options: data.options,
        type: commandType,
        nsfw: data.isNSFW,
        dmPermission: false,
    });
});

try {
    await DiscordRequest(`applications/${process.env.AP_ID}/commands`, {
        method: 'PUT',
        body: discordFriendlyCommands
    });
} catch (err) {
    console.error(err);
}
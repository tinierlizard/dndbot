import 'dotenv/config';
import {
    ApplicationCommandData,
    ApplicationCommandType,
} from "discord.js";
import * as fs from 'fs';
import { DiscordRequest } from "./utils.ts";
import { Command } from "discordoop";
import { client } from './index.ts';

// Create maps
let localCommands = new Map<string, Command>();
let discGlobal = [];
let discGuild = [];

/**
 * Loops through ./commands/ and adds all commands to localCommands map
 */
async function GetLocalCommands() {
    const commandFiles = fs.readdirSync('./commands/');
    for (const file of commandFiles) {
        const exports = await import('./commands/' + file);
        let command = exports.command;

        localCommands.set(command.data.name, command);
    }

    GetDiscordFriendly();
}

/**
 * Loops through localCommadns map to make discordFriendlyCommands array
 */
async function GetDiscordFriendly() {
    for (const entry of localCommands) {
        // get command from name
        const name = entry[0];
        const command = entry[1];

        // new discord-friendly command object
        let commandType;
        const data = command.data;

        switch (data.commandType) {
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

        if (data.guildID == null) {
            discGlobal.push({
                name: data.name,
                type: commandType,
                description: data.desc,
                integration_types: data.integrationTypes,
                contexts: data.contextTypes,
                options: data.options ? data.options : null,
            });
        } else {
            discGuild.push({
                name: data.name,
                type: commandType,
                description: data.desc,
                integration_types: data.integrationTypes,
                contexts: data.contextTypes,
                options: data.options ? data.options : null,
            });
        }
    }
    let res;

    try {
        res = await DiscordRequest(`applications/${process.env.APP_ID}/commands`, {
            method: 'PUT',
            body: discGlobal
        });
    } catch (err) {
        console.error(err);
    }

    console.log('Global commands pushed');

    try {
        res = await DiscordRequest(`applications/${process.env.APP_ID}/guilds/${client.guildID}/commands`, {
            method: 'PUT',
            body: discGuild
        });
    } catch (err) {
        console.error(err);
    }

    console.log('Guild commands pushed');

    process.exit();
}

GetLocalCommands();
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
const movie = require('./modules/movie-fetch.js');

dotenv.config();

const cli = Object.freeze({
    MOVIE: `/movie`,
    PING: `ping`,
    GG: `gg`,
});

function processMsg(content) {
    let splittedContent = String(content).split(" ");

    return {
        cmd: splittedContent[0],
        argument: splittedContent.slice(1).join("+"),
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    const content = processMsg(msg.content);
    // console.log(content);
    const cmd = content.cmd;
    let argument = content.argument;

    if (cmd === cli.PING) {
        msg.reply("Pong!");
    }

    if (cmd === cli.GG) {
        msg.reply("GG Pong!");
    }

    if (cmd === cli.MOVIE) {
        movie.fetchMoviesInfo(argument).then((res) => {
            msg.reply(res);
        }).catch(() => { msg.reply("Movie not found!"); });
    }
});

client.login(process.env.BOT_TOKEN);

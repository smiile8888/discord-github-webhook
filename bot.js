const Discord = require('discord.js');
const client = new Discord.Client();
const movie = require('./modules/movie-fetch.js');

const cli = Object.freeze({
    MOVIE: `/movie`,
    PING: `ping`,
    GG: `gg`,
    WEBHOOK: '/createHook'
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

    if (cmd.startsWith(cli.WEBHOOK)) {
        let args = msg.content.split(" ").slice(1);
        if (!args.length) {
            return msg.reply("Give me bot name and avatar image (optional)!");
        }
        let entireCmd = args.join(" ");
        const linkCheck = /https?:\/\/.+\.(?:png|jpg|jpeg)/gi;
        let avatar = "";
        try {
            avatar = entireCmd.match(linkCheck)[0];
        } catch {

        }
        const hookName = args[0];
        msg.channel.createWebhook(hookName, { avatar })
            .then(hook => {
                msg.author.send(`Here is your webhook https://discordapp.com/api/webhooks/${hook.id}/${hook.token}\n\nPlease keep this safe, as you could be exploited.`)
            })
            .catch(err => {
                msg.author.send(err);
            })
    }
});

client.login(process.env.BOT_TOKEN);

const { Client, Partials, GatewayIntentBits, ChannelType, EmbedBuilder } = require("discord.js");
const client = new Client({ partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction], intents: [32509, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });
const config = require("./config")

client.on("ready", () => console.log(`${client.user.tag} is up and ready to go!`))

client.on("messageCreate", async (message) => {
	if(!config.dmChannel) return

	if(message.channel.type === ChannelType.DM) {
		const embed = new EmbedBuilder()		
		.setTitle("__Nouveau message privé reçu !__")
		.setThumbnail(message.author.displayAvatarURL({dynamic : true}))
		.setDescription(
			`**Information Utilisateur :**
			➔ \`Utilisateur\` : ${message.author}
			➔ \`ID\` : *${message.author.id}*
			➔ \`Nom\` : *${message.author.tag}*
			➔ \`Bot\` : ${message.author.bot}\n
			**Information Message :**
			➔ <t:${Math.round(message.createdTimestamp / 1000)}:R>
			➔ \`Contenu\` : \`\`\`${message.content}\`\`\``
		)
		.setFooter({ text: `System DM - ${client.user.username}` })
		.setTimestamp()

		client.channels.cache.get(config.dmChannel).send({ embeds: [embed] });
	}
})

client.login(config.token)
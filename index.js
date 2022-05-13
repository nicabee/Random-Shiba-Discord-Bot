require("dotenv").config()
const { Client, MessageAttachment } = require("discord.js")
const axios = require("axios")
const client = new Client({ intents: 32767 })
const prefix = "!"

client.once("ready", () => {
  console.log("Arf Arf!")
})

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return
  const args = msg.content.slice(prefix.length).split(" ")
  const command = args[0]

  response_text = ""

  for (var i = 1; i < args.length; i++) {
    response_text = response_text + " " + args[i]
  }

  if (command === "shibe") {
    axios
      .get("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true")
      .then((resp) => {
        const dogPhoto = resp.data[0]
        const attachment = new MessageAttachment(dogPhoto)
        msg.channel.send({
          content: `doggo!`,
          files: [attachment],
        })
      })
  }
})

client.login(process.env.DISCORD_TOKEN)

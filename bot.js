var config = {
  channels: ["#appacademy"],
  server: "irc.foonetic.net",
  botName: "angelbot"
};

var http = require('http');

var irc = require("irc");

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

bot.addListener("message", function(from, to, text, message) {
  if(text === "angelbot company"){
    var url = 'http://api.angel.co/1/jobs';
    var response = "nothing yet"

    http.get(url, function(res) {
      var body = '';

      res.on('data', function(chunk) {
          body += chunk;
      });

      res.on('end', function() {
          response = JSON.parse(body)
          var job = Math.floor(Math.random() * response.jobs.length);
          console.log(job)
          var output = response.jobs[job].startup.name + ": " + response.jobs[job].startup.high_concept
          console.log("Got response: ", output);
          bot.say(config.channels[0], output);
      });
    }).on('error', function(e) {
        console.log("Got error: ", e);
    });
  } else if(text === "angelbot help") {
    bot.say(config.channels[0], "Type 'angelbot company' to get a company name and description");
  }
});

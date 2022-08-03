const fs = require("fs");
const inquirer = require("inquirer");
const generatePage = require("./src/page-template.js");

function saveFile(answers) {
  var pageHtml = generatePage(answers.name, answers.github);
  fs.writeFile(`index.html`, pageHtml, (err) => {
    if (err) throw err;
    console.log("File created at index.html");
  });
}

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "github",
      message: "What is your username?",
    },
  ])
  .then((answers) => {
    console.log(answers);
    saveFile(answers);
  });

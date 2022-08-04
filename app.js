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

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "github",
      message: "What is your GitHub username?",
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message: "Would you like to enter some information about yourself for an 'About' section?",
      default: true
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({confirmAbout}) => {
        if(confirmAbout){
          return true;
        }
        else {
          return false;
        }
      }
    },
  ]);
};

const promptProject = (portfolioData) => {
  if(!portfolioData.projects){
    portfolioData.projects = [];
  }
  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your project?",
      validate: nameInput => {
        if(nameInput){
          return true;
        }
        else {
          console.log("Please enter your name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "description",
      message: "Provide a description of the project (Required)",
    },
    {
      type: "checkbox",
      name: "languages",
      message: "What did you build this project with? (Check all that apply)",
      choices: [
        "Javascript",
        "HTML",
        "CSS",
        "ES6",
        "jQuery",
        "Bootstrap",
        "Node",
      ],
    },
    {
      type: "input",
      name: "link",
      message: "Enter the GitHub link to your project. (Required)",
    },
    {
      type: "confirm",
      name: "feature",
      message: "Would you like to feature this project?",
      default: false,
    },
    {
      type: "confirm",
      name: "confirmAddProject",
      message: "Would you like to enter another project?",
      default: false,
    },
  ]).then(projectData => {
    portfolioData.projects.push(projectData);
    if(projectData.confirmAddProject){
      return promptProject(portfolioData);
    }
    else {
      return portfolioData;
    }
  });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
});
const fs = require('fs');
const path = require('path');
// import { inquirer } from 'inquirer';
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = [
  {
    type: 'input',
    name: 'user',
    message: `What is your GitHub username?`,
  },
  {
    type: 'input',
    name: 'repo',
    message: `What is the name for the GitHub repository?`,
  },
  {
    type: 'list',
    name: 'license',
    message: `How is this project licenced?`,
    choices: ['none', 'MIT', 'APACHE2.0', 'Boost1.0', 'MPL2.0', 'BSD2', 'BSD3'],
  },
  {
    type: 'input',
    name: 'title',
    message: `What is the name of your project?`,
  },
  {
    type: 'input',
    name: 'about',
    message: `Provide a short description explaining the what, why, and how of your project.`,
  },
  {
    type: 'input',
    name: 'features',
    message: `List any features this project has, if any.`,
  },
  {
    type: 'input',
    name: 'screenshot',
    message: `Do you have a screenshot? If yes, please provide the relative path to the image you want to use as the screenshot.`,
  },
  {
    type: 'input',
    name: 'credits',
    message: `List all contributors, links to resources, etc. here in the credits section.`,
  },
  {
    type: 'input',
    name: 'test',
    message: `If you'd like to include tests section, describe your tests here.`,
  },
  {
    type: 'confirm',
    name: 'contribute',
    message: `Would you like to specify a contribution section with generic details how to contribute to this project?`,
  },
  {
    type: 'input',
    name: 'roadmap',
    message: `If you have future plans for this project, you can specify a roadmap here.`,
  },
  {
    type: 'confirm',
    name: 'toc',
    message: `Would you like to include a table of contents?`,
  },
];

// write README file
function writeToFile(fileName, resp) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), resp);
}

function init() {}
inquirer
  .prompt(questions)
  .then((result) => {
    writeToFile(`./sample-readme/README.md`, generateMarkdown({ ...result }));
    console.log('Your README has been created.');
  })
  .catch((error) => {
    console.log(error);
  });
init();

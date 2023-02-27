const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = [
  {
    type: 'input',
    name: 'user',
    message: `What is your GitHub username?`,
    when: (resp) => !resp.cancelled,
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
    choices: [
      'none',
      'MIT',
      'APACHE2.0',
      'GPL3.0',
      'BSD2',
      'BSD3',
      'LGPL3.0',
      'MPL2.0',
      'CDDL1.0',
      'EPL2.0',
      'AGPL3.0',
      'WTFPL',
      'ISC',
      'CC01.0',
      'UNLICENSED',
    ],
  },
  {
    type: 'confirm',
    name: 'deployment',
    message: `Is your project deployed?`,
  },
  {
    type: 'input',
    name: 'title',
    message: `What is the name of your project?`,
  },
  {
    type: 'input',
    name: 'subtitle',
    message: `If you'd like, you can add a subtitle to the project.`,
  },
  {
    type: 'input',
    name: 'about',
    message: `Provide a description explaining the what, why, and how of your project.`,
  },
  {
    type: 'confirm',
    name: 'includeInstallation',
    message: `Would you like to include installation guide?`,
    default: true,
  },
  {
    type: 'editor',
    name: 'installation',
    message: `Enter project installation guide:`,
    when: (resp) => resp.includeInstallation,
  },
  {
    type: 'input',
    name: 'screenshot',
    message: `Do you have a screenshot? If yes, please provide the relative path to the image you want to use as the screenshot.`,
  },
  {
    type: 'confirm',
    name: 'includeFeatures',
    message: `Would you like to include project features?`,
    default: true,
  },
  {
    type: 'editor',
    name: 'features',
    message: `Enter the project features (one per line):`,
    when: (resp) => resp.includeFeatures,
  },
  {
    type: 'confirm',
    name: 'includeCredits',
    message: `Would you like to include credits section?`,
    default: true,
  },
  {
    type: 'editor',
    name: 'credits',
    message: `List all contributors, links to resources, etc. (one per line)`,
    when: (resp) => resp.includeCredits,
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
    type: 'confirm',
    name: 'includeRoadmap',
    message: 'Do you want to include future development roadmap section?',
    default: true,
  },
  {
    type: 'editor',
    name: 'roadmap',
    message: `If you have future roadmap for this project, you can specify a future development steps here (one per line)`,
    when: (resp) => resp.includeRoadmap,
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

function init() {
  const cancelConfirmation = {
    type: 'confirm',
    name: 'cancelled',
    message: `Are you sure you want to cancel creating the README?`,
  };

  const prompt = inquirer.prompt(questions);

  function cancel(str, key) {
    if (key.name === 'escape') {
      prompt.ui.close();
      inquirer.prompt(cancelConfirmation).then((resp) => {
        if (resp.cancelled) {
          process.exit();
        } else {
          prompt.ui = new inquirer.ui.Prompt(prompt.resp, prompt.opts);
          prompt.run().catch(() => {});
        }
      });
    }
  }

  process.stdin.on('keypress', cancel);

  return prompt
    .then(([resp]) => {
      writeToFile(`./sample-readme/README.md`, generateMarkdown(resp));
      console.log(
        `Your README.md has been created. Find it at ${path.join(
          __dirname,
          'sample-readme',
          'README.md'
        )}`
      );
    })
    .catch((error) => {
      if (error.message !== 'README generation cancelled') {
        console.error(error);
      }
    });
}
init();

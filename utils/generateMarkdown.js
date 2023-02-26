// // function to generate markdown for README
// function generateMarkdown(resp) {
//   let year = new Date().getFullYear();
//   return `# ${resp.title}

//   ${
//     resp.toc
//       ? `## Table of Contents

//   - [About](#about)
//   ${resp.installation ? `- [Installation](#installation)` : ''}
//   ${resp.usage ? `- [Usage](#usage)` : ''}
//   ${resp.credits ? `- [Credits](#credits)` : ''}
//   ${resp.contribute ? `- [Contribute](#contribute)` : ''}
//   - [License](#license)`
//       : ''
//   }

//   ## About
//   ${resp.description}

//   ${
//     resp.features
//       ? `### Features

//   ${resp.features}`
//       : ''
//   }

//   ## Usage

//   ${
//     resp.installation
//       ? `### Installation

//   ${resp.installation}

//   `
//       : ''
//   }

//   ### [View Project :star:](https://${resp.user}.github.io/${resp.repo}
//   ![Screenshot](${resp.screenshot})

//   ${
//     resp.credits
//       ? `## Credits

//   ${resp.credits}`
//       : ''
//   }

//   ${
//     resp.tests
//       ? `## Tests

//   ${resp.tests}`
//       : ''
//   }

//   ${
//     resp.roadmap
//       ? `## Future development

//   ${resp.roadmap}`
//       : ''
//   }

//   ${
//     resp.contribute
//       ? `## Contribute

//   Contributions are always welcome!

//   See [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md) for ways to get started.

//   ### Creating A Pull Request
//     - Fork the Project
//     - Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
//     - Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
//     - Push to the Branch (\`git push origin feature/AmazingFeature\`)
//     - Open a Pull Request`
//       : ''
//   }
//   ${
//     resp.license !== 'none'
//       ? `## Licence

//       ![License](https://img.shields.io/badge/license-${resp.license}-blue.svg)`
//       : ''
//   }

//   _Copyright_ ${year} ${resp.user}
// `;
// }

module.exports = generateMarkdown;

function generateMarkdown(resp) {
  const year = new Date().getFullYear();
  let markdown = `# ${resp.title}\n\n`;

  // about
  resp.about && (markdown += `## About\n\n${resp.about}\n\n`);

  // table of contents
  if (resp.toc) {
    markdown += `## Table of Contents\n\n`;
    resp.installation && (markdown += `- [Installation](#installation)\n`);
    resp.features && (markdown += `- [Features](#features)\n`);
    resp.credits && (markdown += `- [Credits](#credits)\n`);
    resp.tests && (markdown += `- [Tests](#tests)\n`);
    resp.roadmap &&
      (markdown += `- [Future Development](#future-development)\n`);
    resp.contribute && (markdown += `- [Contributing](#contributing)\n`);
    resp.license !== 'none' && (markdown += `- [License](#license)\n`);
    markdown += '\n';
  }

  // installation
  resp.installation &&
    (markdown += `## Installation\n\n${resp.installation}\n\n`);

  markdown += `### [View Project :star:](https://${resp.user}.github.io/${resp.repo})\n\n`;

  // screenshot
  resp.screenshot && (markdown += `![Screenshot](${resp.screenshot})\n\n`);

  // features
  resp.features && (markdown += `## Features\n\n${resp.features}\n\n`);

  // credits
  resp.credits && (markdown += `## Credits\n\n${resp.credits}\n\n`);

  // tests
  resp.tests && (markdown += `## Tests\n\n${resp.tests}\n\n`);

  // roadmap
  resp.roadmap && (markdown += `## Future Development\n\n${resp.roadmap}\n\n`);

  // contributions
  resp.contribute &&
    (markdown += `## Contributing\n
    Contributions are always welcome!\n
    [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)\n
### Creating A Pull Request\n
- Fork the project
- Create your feature branch (\`git checkout -b feature/newfeature\`)
- Commit your changes (\`git commit -m 'Add feature'\`)
- Push to the branch (\`git push origin feature/newfeature\`)
- Open a Pull Request\n\n`);

  // licence
  resp.license !== 'none' &&
    (markdown += `## License\n\n![License](https://img.shields.io/badge/license-${resp.license}-blue.svg)\n\n`);

  // copyright
  markdown += `Copyright &copy; ${year} ${resp.user}\n`;

  return markdown;
}

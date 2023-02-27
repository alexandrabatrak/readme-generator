module.exports = generateMarkdown;

function generateMarkdown(resp) {
  const year = new Date().getFullYear();
  let markdown = `# ${resp.title ? resp.title : resp.repo}\n\n`;
  resp.subtitle && (markdown += `${resp.subtitle}\n`);

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

  // deployment
  resp.deployment &&
    (markdown += `### [View Project :star:](https://${resp.user}.github.io/${resp.repo})\n\n`);

  // screenshot
  resp.screenshot && (markdown += `![Screenshot](${resp.screenshot})\n\n`);

  // features
  resp.features &&
    (markdown += `## Features
${resp.features
  .split('\n')
  .map((feature) => feature.trim())
  .filter(Boolean)
  .map((feature) => `- [x] ${feature}`)
  .join('\n')}
  `);

  // credits
  resp.credits &&
    (markdown += `## Credits
${resp.credits
  .split('\n')
  .map((credit) => credit.trim())
  .filter(Boolean)
  .map((credit) => `- ${credit}`)
  .join('\n')}
  `);

  // tests
  resp.tests && (markdown += `## Tests\n\n${resp.tests}\n\n`);

  // roadmap
  resp.roadmap &&
    (markdown += `## Future Development
${resp.roadmap
  .split('\n')
  .map((dev) => dev.trim())
  .filter(Boolean)
  .map((dev) => `- ${dev}`)
  .join('\n')}`);

  // contributions
  resp.contribute &&
    (markdown += `
## Contributing\n
Contributions are always welcome!\n
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg?labelColor=2F2E32&style=for-the-badge&logo=simple-icons)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)\n
### Creating A Pull Request\n
- Fork the project
- Create your feature branch (\`git checkout -b feature/newfeature\`)
- Commit your changes (\`git commit -m 'Add feature'\`)
- Push to the branch (\`git push origin feature/newfeature\`)
- Open a Pull Request\n\n`);

  // licence
  resp.license !== 'none' &&
    (markdown += `## License\n\n![License](https://img.shields.io/badge/license-${resp.license}-3558AE.svg?labelColor=2F2E32&style=for-the-badge&logo=simple-icons)\n\n`);

  // copyright
  markdown += `Copyright &copy; ${year} [@${resp.user}](https://github.com/${resp.user})\n`;

  return markdown;
}

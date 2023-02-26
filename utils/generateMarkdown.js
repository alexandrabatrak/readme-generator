// function to generate markdown for README
function generateMarkdown(resp) {
  let year = new Date().getFullYear();
  return `# ${resp.title}

  ${
    resp.toc
      ? `## Table of Contents

  - [About](#about)
  ${resp.installation ? `- [Installation](#installation)` : ''}
  ${resp.usage ? `- [Usage](#usage)` : ''}
  ${resp.credits ? `- [Credits](#credits)` : ''}
  ${resp.contribute ? `- [Contribute](#contribute)` : ''}
  - [License](#license)`
      : ''
  }

  ## About
  ${resp.description}

  ${
    resp.features
      ? `### Features

  ${resp.features}`
      : ''
  }

  ## Usage

  ${
    resp.installation
      ? `### Installation

  ${resp.installation}

  `
      : ''
  }

  ### [View Project :star:](https://${resp.user}.github.io/${resp.repo}
  ![Screenshot](${resp.screenshot})

  ${
    resp.credits
      ? `## Credits

  ${resp.credits}`
      : ''
  }

  ${
    resp.tests
      ? `## Tests

  ${resp.tests}`
      : ''
  }

  ${
    resp.roadmap
      ? `## Future development

  ${resp.roadmap}`
      : ''
  }

  ${
    resp.contribute
      ? `## Contribute

  Contributions are always welcome!

  See [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md) for ways to get started.

  ### Creating A Pull Request
    - Fork the Project
    - Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
    - Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
    - Push to the Branch (\`git push origin feature/AmazingFeature\`)
    - Open a Pull Request`
      : ''
  }
  ${
    resp.license !== 'none'
      ? `## Licence

      ![License](https://img.shields.io/badge/license-${resp.license}-blue.svg)`
      : ''
  }

  _Copyright_ ${year} ${resp.user}
`;
}

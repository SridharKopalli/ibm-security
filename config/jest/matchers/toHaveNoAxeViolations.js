/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axe from 'axe-core';

function formatOutput(violations) {
  const firstViolation = violations[0];
  const { description, id, impact, help, helpUrl } = firstViolation;
  const nodes = firstViolation.nodes.map(node => {
    return ['Node:', node.html, '\n', ...node.failureSummary.split('\n')].join(
      '\n'
    );
  });
  const divider = '='.repeat(80);

  return `Rule violation: #${id} [${impact}]
> ${description}
${help}
${helpUrl}
${divider}
${nodes.join('\n')}`;
}

const defaultOptions = {
  rules: {
    'document-title': {
      enabled: false,
    },
    'html-has-lang': {
      enabled: false,
    },
    'landmark-one-main': {
      enabled: false,
    },
    'page-has-heading-one': {
      enabled: false,
    },
    region: {
      enabled: false,
    },
  },
};

function toHaveNoAxeViolations(node, options = {}) {
  return new Promise(resolve => {
    axe.run(
      node,
      {
        ...defaultOptions,
        ...options,
      },
      (error, result) => {
        if (error) {
          throw error;
        }

        if (result.violations.length > 0) {
          resolve({
            message: () => formatOutput(result.violations),
            pass: false,
          });
          return;
        }

        resolve({
          pass: true,
        });
      }
    );
  });
}

export default toHaveNoAxeViolations;

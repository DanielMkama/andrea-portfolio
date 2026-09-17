const test = require('node:test');
const assert = require('node:assert/strict');

global.window = global;
global.document = { createElement: () => ({}) };

require('../andrea-website/js/sanity-client.js');

test('normalizeInfoBio converts Sanity block content into paragraph HTML', () => {
  const input = [
    {
      _type: 'block',
      children: [
        { _type: 'span', text: 'Andrea is a ', marks: [] },
        { _type: 'span', text: 'director', marks: ['strong'] },
        { _type: 'span', text: ' working across fashion.', marks: [] }
      ]
    },
    {
      _type: 'block',
      children: [
        { _type: 'span', text: 'He shoots with a relaxed eye.', marks: [] }
      ]
    }
  ];

  const html = global.window.normalizeInfoBio(input);

  assert.match(html, /<p>/);
  assert.match(html, /director/);
  assert.match(html, /<strong>/);
  assert.match(html, /working across fashion\./);
});

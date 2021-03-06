import 'any-observable/register/zen';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as jsYaml from 'js-yaml';

window.jsyaml = jsYaml;

process.stdout = process.stderr = {
  isTTY: false,
  write: () => null
};

require('codemirror/addon/lint/lint');
require('codemirror/addon/lint/yaml-lint');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/comment/comment');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/search/search');
require('codemirror/addon/search/searchcursor');
require('codemirror/addon/search/jump-to-line');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/lint/lint');
require('codemirror/mode/yaml/yaml');
require('codemirror/mode/javascript/javascript');
require('codemirror/keymap/sublime');
require('codemirror-graphql/hint');
require('codemirror-graphql/lint');
require('codemirror-graphql/info');
require('codemirror-graphql/jump');
require('codemirror-graphql/mode');

ReactDOM.render(<App />, document.getElementById('root'));

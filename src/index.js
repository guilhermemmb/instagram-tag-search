'use strict';

import fs from 'fs';
import * as _ from 'lodash';
import InstagramHashtagFinder from './instagram';
import { argv } from 'yargs';

let loadJSON = (name) => {
  let content = {};

  try {
    content = fs.readFileSync(name);
    content = JSON.parse(content);
  }
  catch (err) {
    console.log(`loading default configuration for filename ${name}`);
  }

  return content;
};

let filename = argv.f.trim() || 'depressao';

let defaultConfig = loadJSON(`config/${filename}.json`);

let insta = new InstagramHashtagFinder(defaultConfig);

console.log(`starting instagram-hashtag-finder with filename ${filename}`);

insta.execute();

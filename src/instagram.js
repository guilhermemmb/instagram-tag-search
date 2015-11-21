'use strict';

import InstagramService from './services/instagram_service';
import _ from 'lodash';

let configs = Symbol();

export default class InstagramHashtagFinder {
  constructor(config) {
    this[configs] = config;
    this.ig = new InstagramService(this[configs]);
  }

  execute() {
    let result = {};


    this.ig.getMediaByTag("crossfit").then((data) => {
      console.log(data);

      _.each(data.elements, (el) => {
        this.ig.likeMedia(el.id).then((result) => {
          console.log(result);
        });
      });
    });
  }
}

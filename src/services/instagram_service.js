'use strict';

import ig from 'instagram-node';
import q from 'q';
import axios from 'axios';

const LOCATION = {
  RJ: 213088533
};

const instagram = ig.instagram();
let instanceConfig = Symbol();

export default class MediaService {
  constructor(configs) {
    this[instanceConfig] = configs;
    instagram.use(this[instanceConfig]);
  }

  getMediaByTag(tag) {
    const promise = new Promise((resolve, reject) => {
      instagram.tag_media_recent(tag, function(err, result, remaining, limit) {
        if(err) {
          const dt = {msg:`Error on search media for tag ${tag}`, error:err};
          console.log(dt);

          reject(dt);
        }
        else {
          const dt = {elements: result, rem:remaining, limit: limit};

          resolve(dt);
        }
      });

    });

    return promise;
  }

  getTagByQuery(query) {
    const promise = new Promise((resolve, reject) => {
      instagram.tag_search(query, function(err, result, remaining, limit) {
        if(err) {
          const dt = {msg:'Error on search tag', error:err};
          console.log(dt);

          reject(dt);
        }
        else {
          const dt = {elements: result, rem:remaining, limit: limit};

          resolve(dt);
        }
      });

    });

    return promise;
  }

  getMediaByLocationId(location = LOCATION.RJ) {
    const promise = new Promise((resolve, reject) => {
      instagram.location_media_recent(location, function(err, result, remaining, limit) {
        if(err) {
          const dt = {msg:'Error on search by location', error:err};
          console.log(dt);

          reject(dt);
        }
        else {
          const dt = {elements: result, rem:remaining, limit: limit};

          resolve(dt);
        }
      });

    });

    return promise;
  }

  likeMedia(mediaId) {
    const promise = new Promise((resolve, reject) => {
      instagram.add_like(mediaId, function(err, result, remaining, limit) {
        if(err) {
          const dt = {msg:`Error on like on media = ${mediaId}`, error:err};
          console.log(dt);

          reject(dt);
        }
        else {
          const dt = {elements: result, rem:remaining, limit: limit};

          resolve(dt);
        }
      });

    });

    return promise;
  }

  getMediaNear(geograph_id) {
    const promise = new Promise((resolve, reject) => {
      instagram.geography_media_recent(geograph_id, function(err, result, remaining, limit) {
        if(err) {
          const dt = {msg:`Error on search near location ${geograph_id}`, error:err};
          console.log(dt);

          reject(dt);
        }
        else {
          const dt = {elements: result, rem:remaining, limit: limit};

          resolve(dt);
        }
      });

    });

    return promise;
  }

  // getByHashtag(hashtag, size = 50, min_tag_id) {
  //   const url = `https://api.instagram.com/v1/tags/${hashtag}/media/recent?access_token=${this[instanceConfig].access_token}&count=${size}`;
  //
  //   return axios.get(url);
  // }
  //
  // getByLocation(location, size = 50, min_tag_id) {
  //   const location_id = location || LOCATION.RJ;
  //   const url = `https://api.instagram.com/v1/locations/${location_id}/media/recent?access_token=${this[instanceConfig].access_token}`;
  //
  //   return axios.get(url);
  // }
}

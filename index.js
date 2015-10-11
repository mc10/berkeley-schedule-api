'use strict';

let request = require('request');
let cheerio = require('cheerio');

const OSOC_URL = 'http://osoc.berkeley.edu/OSOC/osoc';
const CLASS_URLS = {
  fall: OSOC_URL + '?p_term=FL&p_list_all=Y',
  spring: OSOC_URL + '?p_term=SP&p_list_all=Y'
};

exports.classes = function(term, callback) {
  let url = CLASS_URLS[term];
  if (!url) {
    return 'Error: Invalid term name; must be "fall" or "spring".';
  }

  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let $ = cheerio.load(body);
      let $classTable = $('#mainform').find('table tr')
        .filter(function() {
          return $(this).find('label').hasClass('listbtn');
        });

      let classes = $classTable.map(function() {
        let $rowEle = $(this).find('td');
        let major = $rowEle.eq(0).find('label').text().trim();
        let shortName = $rowEle.eq(1).find('label').text().trim();
        let fullName = $rowEle.eq(2).find('label').text().trim();

        return major + ' ' + shortName + ': ' + fullName;
      }).get();

      callback(classes);
    }
  });
};

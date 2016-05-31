#!/usr/bin/env node

var path = require('path');

var command = path.basename(process.argv.slice(1));
var args = process.argv.slice(2);
if (args.length == 0) {
  console.log('Usage: ' + command + ' [invite-key]');
  process.exit();
}

var scraperjs = require('scraperjs');
scraperjs.StaticScraper.create({
	url: 'https://w.line.me/findme/web/invite?inviteKey=' + args.join(' '),
	headers: { 'Accept-Language': 'en' }
	})
    .scrape(function($) {
        return $(".shere_txt").map(function() {
            return $(this).text();
        }).get();
    })
    .then(function(yolo) {
        console.log(yolo[0].split(' ')[0]);
    })

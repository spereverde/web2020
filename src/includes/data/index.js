const kulak_en = require('./kulak_en.json');
const kulak_nl = require('./kulak_nl.json');
const generic_nl = require('./generic_nl.json');
const generic_en = require('./generic_en.json');
const hostedBy_en = require('./hosted-by_en.json');
const hostedBy_nl = require('./hosted-by_nl.json');
const intranet_nl = require('./intranet_nl.json');
const intranet_en = require('./intranet_en.json');
const landingpage_nl = require('./landingpage_nl.json');
const landingpage_en = require('./landingpage_en.json');

module.exports = {
  data: [
    kulak_nl,
    kulak_en,
    generic_nl,
    generic_en,
    hostedBy_nl,
    hostedBy_en,
    intranet_nl,
    intranet_en,
    landingpage_nl,
    landingpage_en
  ],
  langs: {
    general: { nl: generic_nl, en: generic_en },
    kulak: { nl: kulak_nl, en: kulak_en },
    'hosted-by': { nl: hostedBy_nl, en: hostedBy_en },
    intranet: { nl: intranet_nl, en: intranet_en },
    landingpage: { nl: landingpage_nl, en: landingpage_en }
  }
};

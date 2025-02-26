import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import translationEN from 'locales/en/translation.json';
import translationSP from 'locales/sp/translation.json';
import translationFR from 'locales/fr/translation.json';
import translationGE from 'locales/ge/translation.json';

import releaseInforEN from 'locales/en/release.json';
import releaseInforSP from 'locales/sp/release.json';
import releaseInforFR from 'locales/fr/release.json';
import releaseInforGE from 'locales/ge/release.json';

import contactEN from 'locales/en/contact.json';
import contactSP from 'locales/sp/contact.json';
import contactFR from 'locales/fr/contact.json';
import contactGE from 'locales/ge/contact.json';

import audioEN from 'locales/en/audio.json';
import audioSP from 'locales/sp/audio.json';
import audioFR from 'locales/fr/audio.json';
import audioGE from 'locales/ge/audio.json';

import trackEN from 'locales/en/track.json';
import trackSP from 'locales/sp/track.json';
import trackFR from 'locales/fr/track.json';
import trackGE from 'locales/ge/track.json';

import territorialEN from 'locales/en/territorial.json';
import territorialSP from 'locales/sp/territorial.json';
import territorialFR from 'locales/fr/territorial.json';
import territorialGE from 'locales/ge/territorial.json';

import reviewEN from 'locales/en/review.json';
import reviewSP from 'locales/sp/review.json';
import reviewFR from 'locales/fr/review.json';
import reviewGE from 'locales/fr/review.json';

import headerEN from 'locales/en/header.json';
import headerSP from 'locales/sp/header.json';
import headerFR from 'locales/fr/header.json';
import headerGE from 'locales/ge/header.json';

import inboxEN from 'locales/en/inbox.json';
import inboxSP from 'locales/sp/inbox.json';
import inboxFR from 'locales/fr/inbox.json';
import inboxGE from 'locales/ge/inbox.json';

import homeEN from 'locales/en/home.json';
import homeSP from 'locales/sp/home.json';
import homeFR from 'locales/fr/home.json';
import homeGE from 'locales/ge/home.json';

import searchEN from 'locales/en/search.json';
import searchSP from 'locales/sp/search.json';
import searchFR from 'locales/fr/search.json';
import searchGE from 'locales/ge/search.json';

import helpEN from 'locales/en/help.json';
import helpSP from 'locales/sp/help.json';
import helpFR from 'locales/fr/help.json';
import helpGE from 'locales/ge/help.json';

import blockingEN from 'locales/en/blocking.json';
import blockingSP from 'locales/sp/blocking.json';
import blockingFR from 'locales/fr/blocking.json';
import blockingGE from 'locales/ge/blocking.json';

import introEN from 'locales/en/intro.json';
import introSP from 'locales/sp/intro.json';
import introFR from 'locales/fr/intro.json';
import introGE from 'locales/ge/intro.json';

import adminEN from 'locales/en/admin.json';
import adminSP from 'locales/sp/admin.json';
import adminFR from 'locales/fr/admin.json';
import adminGE from 'locales/ge/admin.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
    releaseInfo: releaseInforEN,
    contact: contactEN,
    audio: audioEN,
    track: trackEN,
    territorial: territorialEN,
    review: reviewEN,
    header: headerEN,
    inbox: inboxEN,
    home: homeEN,
    search: searchEN,
    help: helpEN,
    blocking: blockingEN,
    intro: introEN,
    admin: adminEN,
  },
  sp: {
    translation: translationSP,
    releaseInfo: releaseInforSP,
    contact: contactSP,
    audio: audioSP,
    track: trackSP,
    territorial: territorialSP,
    review: reviewSP,
    header: headerSP,
    inbox: inboxSP,
    home: homeSP,
    search: searchSP,
    help: helpSP,
    blocking: blockingSP,
    intro: introSP,
    admin: adminSP,
  },
  fr: {
    translation: translationFR,
    releaseInfo: releaseInforFR,
    contact: contactFR,
    audio: audioFR,
    track: trackFR,
    territorial: territorialFR,
    review: reviewFR,
    header: headerFR,
    inbox: inboxFR,
    home: homeFR,
    search: searchFR,
    help: helpFR,
    blocking: blockingFR,
    intro: introFR,
    admin: adminFR,
  },
  ge: {
    translation: translationGE,
    releaseInfo: releaseInforGE,
    contact: contactGE,
    audio: audioGE,
    track: trackGE,
    territorial: territorialGE,
    review: reviewGE,
    header: headerGE,
    inbox: inboxGE,
    home: homeGE,
    search: searchGE,
    help: helpGE,
    blocking: blockingGE,
    intro: introGE,
    admin: adminGE,
  },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    ns: [
      'translations',
      'releaseInfo',
      'contact',
      'audio',
      'track',
      'territorial',
      'review',
      'header',
      'inbox',
      'home',
      'search',
      'help',
      'blocking',
      'intro',
      'admin',
    ],
    defaultNS: 'translations',
    keySeparator: false, // we do not use keys in form messages.welcome
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

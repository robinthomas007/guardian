import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import translationEN from 'locales/en/translation.json';
import translationSP from 'locales/sp/translation.json';

import releaseInforEN from 'locales/en/release.json';
import releaseInforSP from 'locales/sp/release.json';

import contactEN from 'locales/en/contact.json';
import contactSP from 'locales/sp/contact.json';

import audioEN from 'locales/en/audio.json';
import audioSP from 'locales/sp/audio.json';

import trackEN from 'locales/en/track.json';
import trackSP from 'locales/sp/track.json';

import territorialEN from 'locales/en/territorial.json';
import territorialSP from 'locales/sp/territorial.json';

import reviewEN from 'locales/en/review.json';
import reviewSP from 'locales/sp/review.json';

import headerEN from 'locales/en/header.json';
import headerSP from 'locales/sp/header.json';

import inboxEN from 'locales/en/inbox.json';
import inboxSP from 'locales/sp/inbox.json';

import homeEN from 'locales/en/home.json';
import homeSP from 'locales/sp/home.json';

import searchEN from 'locales/en/search.json';
import searchSP from 'locales/sp/search.json';

import helpEN from 'locales/en/help.json';
import helpSP from 'locales/sp/help.json';

import blockingEN from 'locales/en/blocking.json';
import blockingSP from 'locales/sp/blocking.json';

import introEN from 'locales/en/intro.json';
import introSP from 'locales/sp/intro.json';

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
    ],
    defaultNS: 'translations',
    keySeparator: false, // we do not use keys in form messages.welcome
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

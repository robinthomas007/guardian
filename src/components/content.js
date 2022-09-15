import React, { Component } from 'react';
import Header from './template/Header/Header';
// import { SecureRoute } from '@okta/okta-react';
import TrackInformationPage from './pages/TrackInformation/TrackInformationPage';
import ProjectContactsPage from './pages/ProjectContacts/ProjectContactsPage';
import AudioFilesPage from './pages/AudioFiles/AudioFilesPage';
import ReviewAndSubmitPage from './pages/ReviewAndSubmit/ReviewAndSubmitPage';
import BlockingPoliciesPage from './pages/BlockingPolicies/BlockingPoliciesPage';
import TerritorialRightsPage from './pages/TerritorialRights/TerritorialRightsPage';
import ReleaseInformationPage from './pages/ReleaseInformation/ReleaseInformationPage';
import FindProjectPage from './pages/FindProject/FindProjectPage';
import HelpGuide from './pages/HelpGuide/HelpGuidePage';
import UserAdmin from './pages/UserAdmin/UserAdmin';
import { withAuth } from '@okta/okta-react';
import { connect, createDispatchHook } from 'react-redux';
import ProjectInbox from './pages/ProjectInbox';
import ErrorBoundary from './common/ErrorBoundary';
import * as releaseAction from './pages/ReleaseInformation/releaseAction';
import * as territorialRightsAction from '../actions/territorialRightsAction';
import UploadProgressAlert from 'components/SharedPageComponents/UploadProgresAlert';
import { showNotyMaskWarning } from 'components/Utils';
import { Route } from 'react-router-dom';

class Content extends Component {
  constructor(props) {
    const uuidv4 = require('uuid/v4');

    super(props);
    this.state = {
      accesstoken: '',
      idtoken: '',
      user: {},
      isAdmin: false,
      userLoaded: false,
      sessionId: uuidv4(),
      pageViewCompact: true,
      projectID: '',
      pagePath: '',
      project: {
        Project: {},
      },
      serverTimeDate: '',
      clearProject: false,
    };
    this.setProjectID = this.setProjectID.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const accesstoken =
      'eyJraWQiOiJnbmtZWk1nVXJnazJJUy1KcU00SDNwTXpGWWVUWl9JWHdzdEVCdEpJaDlzIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmJMWlRHbDVBMlBfekYwWkdnZlhudElWSGFVS3Fta3phd0dNTkwxU1ZFS0UiLCJpc3MiOiJodHRwczovL3VtZ3BhcnRuZXIub2t0YXByZXZpZXcuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTY2MzEzMTk1NywiZXhwIjoxNjYzMTM1NTU3LCJjaWQiOiIwb2FqbjNhZjZhOXV1VTFhMDBoNyIsInVpZCI6IjAwdXlnajc1MDlJUENyajVXMGg3Iiwic2NwIjpbInByb2ZpbGUiLCJvcGVuaWQiLCJlbWFpbCJdLCJhdXRoX3RpbWUiOjE2NjMxMzE5NTQsInN1YiI6IlJvYmluLlRob21hc0B1bXVzaWMuY29tIn0.iXraqUdQvdfKlY_Dre3seIKpZgyB-jG1JRiM001XNKtatzW1F4REQR6KlVGid4Ss1xNEmEEgtgq3J17oIMiOwMRGLFmaN2Ve4haJsrgo145RnN3iQesrsBDxfx8x9EmAm8TCl5RbgAgymO1BBc9xHGhXSPsKlsF19yn6D5qsX3WSQkC0fcFZ_hByl78pZR89svfwBUkx-s_2BjKULL54GIjOkWwEpXZ3-jFpjwv57hrBODr5-N3cedphUiRLxx8gnrWuIj_3Vxm5Wk2unPjXpiOHMuIbn_vgXI8XpVjETj0ay_7BleMkf7yp0_HYkI0gHi5J0xEn59PuUiZ2Z9TTJg'; //await this.props.auth.getAccessToken();
    const idtoken =
      'eyJraWQiOiJnbmtZWk1nVXJnazJJUy1KcU00SDNwTXpGWWVUWl9JWHdzdEVCdEpJaDlzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHV5Z2o3NTA5SVBDcmo1VzBoNyIsIm5hbWUiOiJSb2JpbiBUaG9tYXMiLCJlbWFpbCI6IlJvYmluLlRob21hc0B1bXVzaWMuY29tIiwidmVyIjoxLCJpc3MiOiJodHRwczovL3VtZ3BhcnRuZXIub2t0YXByZXZpZXcuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiMG9ham4zYWY2YTl1dVUxYTAwaDciLCJpYXQiOjE2NjMxMzE5NTcsImV4cCI6MTY2MzEzNTU1NywianRpIjoiSUQuLTdkR0t5V3ZOTTd0Mnp2blNWQkVBMFVKMFVNTExrY292WGNGMGIyb25XVSIsImFtciI6WyJwd2QiXSwiaWRwIjoiMG9hZWZtY3JxemlRTFRpMHgwaDciLCJub25jZSI6IkJ1Nk1XRE5ianY0UllvbkhyVGlpSEtJTXdoVHhHVWpLejdlYU9KMWlQU2g1VDhGMVA5ZGpIWVBDQzJWcGpjZG4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJSb2Jpbi5UaG9tYXNAdW11c2ljLmNvbSIsImF1dGhfdGltZSI6MTY2MzEzMTk1NCwiYXRfaGFzaCI6InQ0V19mNkVCdDJkNml1SHJ3ZVc1ancifQ.cPhj_zZouqt13FK-bzWxSF_7g58UU20TWqJ4O_3IKQveEvWtW1vJmZw0Vyet8mk5_ksUrBgQqWOk1VoDUS3FBBnyab3fWD1sH9PVDCg8mXIqkHdsdpfmfb3zLTcwGIWfCid5k--X1QV1p7m5wFLBr7ii7wolxqbFSHdAjpsHPpMON0bGjUOwKCKXClyJ5VBvlcvrYmx7MWschOzUCgG5lMJ0zsyPDI2ssxYVwrtZeZCkgLxKRGSoYigRxZX4FN3CtbEswnHvS5_69XDTwiA7pEHOS7asf-hwocnyRaAGNUQQSAGjarIijD26PmEou4qL0TD02kvQPJsfn1GUcVBHPA'; //await this.props.auth.getIdToken();
    const user = {
      IsAdmin: true,
      ReleasingLabels: [
        {
          id: '-1',
          name: 'ZDeviner',
        },
        {
          id: '140',
          name: '0207 Def Jam',
        },
        {
          id: '3',
          name: 'Abbey Audio',
        },
        {
          id: '4',
          name: 'ABKCO',
        },
        {
          id: '130',
          name: 'Alamo Records',
        },
        {
          id: '1',
          name: 'A&M',
        },
        {
          id: '2',
          name: 'A&M Canada',
        },
        {
          id: '61',
          name: 'Arts & Crafts',
        },
        {
          id: '62',
          name: 'Astralwerks',
        },
        {
          id: '63',
          name: 'Barclay',
        },
        {
          id: '5',
          name: 'Big Machine',
        },
        {
          id: '6',
          name: 'Blue Note',
        },
        {
          id: '7',
          name: 'Canada',
        },
        {
          id: '64',
          name: 'Capital Latin',
        },
        {
          id: '8',
          name: 'Capitol Christian Music Group',
        },
        {
          id: '65',
          name: 'Capitol France',
        },
        {
          id: '66',
          name: 'Capitol Latino',
        },
        {
          id: '67',
          name: 'Capitol Motown',
        },
        {
          id: '68',
          name: 'Capitol Nashville',
        },
        {
          id: '69',
          name: 'Capitol Records',
        },
        {
          id: '70',
          name: 'Capitol UK',
        },
        {
          id: '71',
          name: 'Capitol/Vertigo',
        },
        {
          id: '9',
          name: 'Capitol/Virgin',
        },
        {
          id: '75',
          name: 'Cash Money Records',
        },
        {
          id: '131',
          name: 'Chapter ONE',
        },
        {
          id: '76',
          name: 'Christian Music Group',
        },
        {
          id: '11',
          name: 'Concord',
        },
        {
          id: '12',
          name: 'Co-operative Music',
        },
        {
          id: '13',
          name: 'Decca',
        },
        {
          id: '77',
          name: 'Decca UK',
        },
        {
          id: '14',
          name: 'Def Jam',
        },
        {
          id: '78',
          name: 'Def Jam France',
        },
        {
          id: '15',
          name: 'Deutsche Grammophon GmbH',
        },
        {
          id: '16',
          name: 'Disney',
        },
        {
          id: '79',
          name: 'Disney Records',
        },
        {
          id: '17',
          name: 'Domestic Division',
        },
        {
          id: '18',
          name: 'Dreamworks',
        },
        {
          id: '19',
          name: 'Eagle Rock',
        },
        {
          id: '80',
          name: 'ECM Records',
        },
        {
          id: '81',
          name: 'EMI Australia',
        },
        {
          id: '20',
          name: 'EMI Germany',
        },
        {
          id: '82',
          name: 'EMI Music Canada',
        },
        {
          id: '83',
          name: 'EMI Nashville',
        },
        {
          id: '84',
          name: 'EMI Records',
        },
        {
          id: '85',
          name: 'Fearless - Concord',
        },
        {
          id: '86',
          name: 'Fiction Records',
        },
        {
          id: '21',
          name: 'Fontana',
        },
        {
          id: '132',
          name: 'Geffen Records',
        },
        {
          id: '87',
          name: 'Glassnote',
        },
        {
          id: '88',
          name: 'Global Entertainment',
        },
        {
          id: '22',
          name: 'Globe Productions',
        },
        {
          id: '89',
          name: 'Harvest Records',
        },
        {
          id: '23',
          name: 'Hollywood',
        },
        {
          id: '24',
          name: 'IGA',
        },
        {
          id: '139',
          name: 'Imperial',
        },
        {
          id: '25',
          name: 'Island',
        },
        {
          id: '90',
          name: 'Island Records UK',
        },
        {
          id: '26',
          name: 'Latin Entertainment',
        },
        {
          id: '91',
          name: 'Loma Vista / Concord',
        },
        {
          id: '27',
          name: 'London',
        },
        {
          id: '28',
          name: 'London Records',
        },
        {
          id: '92',
          name: 'MCA Nashville Records',
        },
        {
          id: '93',
          name: 'Mercury',
        },
        {
          id: '94',
          name: 'Mercury Classics',
        },
        {
          id: '95',
          name: 'Mercury Nashville Records',
        },
        {
          id: '29',
          name: 'Mercury(UK)',
        },
        {
          id: '133',
          name: 'Method Records',
        },
        {
          id: '96',
          name: 'Modular Records',
        },
        {
          id: '97',
          name: 'Motown Records',
        },
        {
          id: '30',
          name: 'Nashville',
        },
        {
          id: '98',
          name: 'Polydor France',
        },
        {
          id: '99',
          name: 'Polydor Records',
        },
        {
          id: '31',
          name: 'Polydor(UK)',
        },
        {
          id: '32',
          name: 'Republic',
        },
        {
          id: '100',
          name: 'Republic Nashville',
        },
        {
          id: '101',
          name: 'RocNation',
        },
        {
          id: '102',
          name: 'South Africa',
        },
        {
          id: '103',
          name: 'Spinefarm',
        },
        {
          id: '134',
          name: 'Top Notch',
        },
        {
          id: '33',
          name: 'UME',
        },
        {
          id: '35',
          name: 'UMGI - Fontana',
        },
        {
          id: '104',
          name: 'UMG International',
        },
        {
          id: '105',
          name: 'UMG Nashville',
        },
        {
          id: '34',
          name: 'UMG Recordings. Inc.',
        },
        {
          id: '106',
          name: 'UMLE',
        },
        {
          id: '36',
          name: 'UMPG',
        },
        {
          id: '37',
          name: 'UMVD',
        },
        {
          id: '38',
          name: 'Universal',
        },
        {
          id: '39',
          name: 'Universal Austria',
        },
        {
          id: '107',
          name: 'Universal France',
        },
        {
          id: '40',
          name: 'Universal Germany (UK) Digital Services',
        },
        {
          id: '108',
          name: 'Universal Greece',
        },
        {
          id: '41',
          name: 'Universal International Music B.V.',
        },
        {
          id: '42',
          name: 'Universal Island(UK)',
        },
        {
          id: '109',
          name: 'Universal Italia',
        },
        {
          id: '110',
          name: 'Universal Latin',
        },
        {
          id: '111',
          name: 'Universal Latino',
        },
        {
          id: '112',
          name: 'Universal Mexico',
        },
        {
          id: '113',
          name: 'Universal Motown',
        },
        {
          id: '59',
          name: 'Universal/Motown',
        },
        {
          id: '114',
          name: 'Universal Music',
        },
        {
          id: '44',
          name: 'Universal Music AB',
        },
        {
          id: '45',
          name: 'Universal Music AG',
        },
        {
          id: '115',
          name: 'Universal Music Argentina',
        },
        {
          id: '43',
          name: 'Universal Music A/S (Norway)',
        },
        {
          id: '116',
          name: 'Universal Music Australia',
        },
        {
          id: '138',
          name: 'Universal Music Brazil',
        },
        {
          id: '117',
          name: 'Universal Music Canada',
        },
        {
          id: '46',
          name: 'Universal Music Classics',
        },
        {
          id: '47',
          name: 'Universal Music Denmark A/S',
        },
        {
          id: '118',
          name: 'Universal Music Enterprises',
        },
        {
          id: '119',
          name: 'Universal Music France',
        },
        {
          id: '120',
          name: 'Universal Music Germany',
        },
        {
          id: '48',
          name: 'Universal Music GmbH',
        },
        {
          id: '137',
          name: 'Universal Music India',
        },
        {
          id: '49',
          name: 'Universal Music Ireland Ltd.',
        },
        {
          id: '50',
          name: 'Universal Music Italia srL.',
        },
        {
          id: '51',
          name: 'Universal Music K.K.',
        },
        {
          id: '121',
          name: 'Universal Music Latino',
        },
        {
          id: '135',
          name: 'Universal Music New Zealand',
        },
        {
          id: '52',
          name: 'Universal Music Oy (Finland)',
        },
        {
          id: '53',
          name: 'Universal Music S.A. (Belgium)',
        },
        {
          id: '54',
          name: 'Universal Music S.A. (France)',
        },
        {
          id: '55',
          name: 'Universal Music S.p.A.',
        },
        {
          id: '122',
          name: 'Universal Music Spain',
        },
        {
          id: '123',
          name: 'Universal Music Sweden',
        },
        {
          id: '56',
          name: 'Universal Music The Netherlands',
        },
        {
          id: '57',
          name: 'Universal South',
        },
        {
          id: '124',
          name: 'Universal South Africa',
        },
        {
          id: '125',
          name: 'Universal Sweden',
        },
        {
          id: '126',
          name: 'Universal UK',
        },
        {
          id: '58',
          name: 'Universal UK Digital Services',
        },
        {
          id: '60',
          name: 'Verve',
        },
        {
          id: '136',
          name: 'Victor Victor',
        },
        {
          id: '127',
          name: 'Virgin EMI',
        },
        {
          id: '128',
          name: 'Virgin Music',
        },
        {
          id: '129',
          name: 'Virgin UK',
        },
      ],
      DefaultReleasingLabelID: '-1',
      ProjectTypes: [
        {
          id: '1',
          name: 'Album',
        },
        {
          id: '2',
          name: 'Collection',
        },
        {
          id: '3',
          name: 'Single',
        },
        {
          id: '4',
          name: 'EP',
        },
      ],
      ProjectSecurities: [],
      ProjectStatuses: [],
      Countries: [
        {
          id: 'WW',
          name: 'Worldwide',
        },
        {
          id: 'AF',
          name: 'Afghanistan',
        },
        {
          id: 'AX',
          name: 'Aland Islands',
        },
        {
          id: 'AL',
          name: 'Albania',
        },
        {
          id: 'DZ',
          name: 'Algeria',
        },
        {
          id: 'AS',
          name: 'American Samoa',
        },
        {
          id: 'AD',
          name: 'Andorra',
        },
        {
          id: 'AO',
          name: 'Angola',
        },
        {
          id: 'AI',
          name: 'Anguilla',
        },
        {
          id: 'AQ',
          name: 'Antarctica',
        },
        {
          id: 'AG',
          name: 'Antigua and Barbuda',
        },
        {
          id: 'AR',
          name: 'Argentina',
        },
        {
          id: 'AM',
          name: 'Armenia',
        },
        {
          id: 'AW',
          name: 'Aruba',
        },
        {
          id: 'AU',
          name: 'Australia',
        },
        {
          id: 'AT',
          name: 'Austria',
        },
        {
          id: 'AZ',
          name: 'Azerbaijan',
        },
        {
          id: 'BS',
          name: 'Bahamas',
        },
        {
          id: 'BH',
          name: 'Bahrain',
        },
        {
          id: 'BD',
          name: 'Bangladesh',
        },
        {
          id: 'BB',
          name: 'Barbados',
        },
        {
          id: 'BY',
          name: 'Belarus',
        },
        {
          id: 'BE',
          name: 'Belgium',
        },
        {
          id: 'BZ',
          name: 'Belize',
        },
        {
          id: 'BJ',
          name: 'Benin',
        },
        {
          id: 'BM',
          name: 'Bermuda',
        },
        {
          id: 'BT',
          name: 'Bhutan',
        },
        {
          id: 'BO',
          name: 'Bolivia',
        },
        {
          id: 'BQ',
          name: 'Bonaire, Sint Eustatius and Saba',
        },
        {
          id: 'BA',
          name: 'Bosnia and Herzegovina',
        },
        {
          id: 'BW',
          name: 'Botswana',
        },
        {
          id: 'BV',
          name: 'Bouvet Island',
        },
        {
          id: 'BR',
          name: 'Brazil',
        },
        {
          id: 'IO',
          name: 'British Indian Ocean Territory',
        },
        {
          id: 'VG',
          name: 'British Virgin Islands',
        },
        {
          id: 'BN',
          name: 'Brunei Darussalam',
        },
        {
          id: 'BG',
          name: 'Bulgaria',
        },
        {
          id: 'BF',
          name: 'Burkina Faso',
        },
        {
          id: 'BI',
          name: 'Burundi',
        },
        {
          id: 'KH',
          name: 'Cambodia',
        },
        {
          id: 'CM',
          name: 'Cameroon',
        },
        {
          id: 'CA',
          name: 'Canada',
        },
        {
          id: 'XA',
          name: 'Canary Islands',
        },
        {
          id: 'CV',
          name: 'Cape Verde',
        },
        {
          id: 'KY',
          name: 'Cayman Islands',
        },
        {
          id: 'CF',
          name: 'Central African Republic',
        },
        {
          id: 'TD',
          name: 'Chad',
        },
        {
          id: 'CL',
          name: 'Chile',
        },
        {
          id: 'CN',
          name: 'China',
        },
        {
          id: 'CX',
          name: 'Christmas Island',
        },
        {
          id: 'CC',
          name: 'Cocos (Keeling) Islands',
        },
        {
          id: 'CO',
          name: 'Colombia',
        },
        {
          id: 'KM',
          name: 'Comoros',
        },
        {
          id: 'CG',
          name: 'Congo',
        },
        {
          id: 'CK',
          name: 'Cook Islands',
        },
        {
          id: 'CR',
          name: 'Costa Rica',
        },
        {
          id: 'CI',
          name: "Cote d'Ivoire",
        },
        {
          id: 'HR',
          name: 'Croatia',
        },
        {
          id: 'CU',
          name: 'Cuba',
        },
        {
          id: 'CW',
          name: 'Curacao',
        },
        {
          id: 'CY',
          name: 'Cyprus',
        },
        {
          id: 'CZ',
          name: 'Czech Republic',
        },
        {
          id: 'CD',
          name: 'Democratic Republic Of The Congo',
        },
        {
          id: 'DK',
          name: 'Denmark',
        },
        {
          id: 'DJ',
          name: 'Djibouti',
        },
        {
          id: 'DM',
          name: 'Dominica',
        },
        {
          id: 'DO',
          name: 'Dominican Republic',
        },
        {
          id: 'TL',
          name: 'East Timor',
        },
        {
          id: 'EC',
          name: 'Ecuador',
        },
        {
          id: 'EG',
          name: 'Egypt',
        },
        {
          id: 'SV',
          name: 'El Salvador',
        },
        {
          id: 'GQ',
          name: 'Equatorial Guinea',
        },
        {
          id: 'ER',
          name: 'Eritrea',
        },
        {
          id: 'EE',
          name: 'Estonia',
        },
        {
          id: 'ET',
          name: 'Ethiopia',
        },
        {
          id: 'FK',
          name: 'Falkland Islands (Malvinas)',
        },
        {
          id: 'FO',
          name: 'Faroe Islands',
        },
        {
          id: 'FJ',
          name: 'Fiji',
        },
        {
          id: 'FI',
          name: 'Finland',
        },
        {
          id: 'FR',
          name: 'France',
        },
        {
          id: 'GF',
          name: 'French Guiana',
        },
        {
          id: 'PF',
          name: 'French Polynesia',
        },
        {
          id: 'TF',
          name: 'French Southern and Antarctic Terr.',
        },
        {
          id: 'GA',
          name: 'Gabon',
        },
        {
          id: 'GM',
          name: 'Gambia',
        },
        {
          id: 'GE',
          name: 'Georgia',
        },
        {
          id: 'DE',
          name: 'Germany',
        },
        {
          id: 'GH',
          name: 'Ghana',
        },
        {
          id: 'GI',
          name: 'Gibraltar',
        },
        {
          id: 'GR',
          name: 'Greece',
        },
        {
          id: 'GL',
          name: 'Greenland',
        },
        {
          id: 'GD',
          name: 'Grenada',
        },
        {
          id: 'GP',
          name: 'Guadeloupe',
        },
        {
          id: 'GU',
          name: 'Guam',
        },
        {
          id: 'GT',
          name: 'Guatemala',
        },
        {
          id: 'GG',
          name: 'Guernsey',
        },
        {
          id: 'GN',
          name: 'Guinea',
        },
        {
          id: 'GW',
          name: 'Guinea-Bissau',
        },
        {
          id: 'GY',
          name: 'Guyana',
        },
        {
          id: 'HT',
          name: 'Haiti',
        },
        {
          id: 'HM',
          name: 'Heard and McDonald Islands',
        },
        {
          id: 'HN',
          name: 'Honduras',
        },
        {
          id: 'HK',
          name: 'Hong Kong',
        },
        {
          id: 'HU',
          name: 'Hungary',
        },
        {
          id: 'IS',
          name: 'Iceland',
        },
        {
          id: 'IN',
          name: 'India',
        },
        {
          id: 'ID',
          name: 'Indonesia',
        },
        {
          id: 'IR',
          name: 'Iran',
        },
        {
          id: 'IQ',
          name: 'Iraq',
        },
        {
          id: 'IE',
          name: 'Ireland',
        },
        {
          id: 'IM',
          name: 'Isle of Man',
        },
        {
          id: 'IL',
          name: 'Israel',
        },
        {
          id: 'IT',
          name: 'Italy',
        },
        {
          id: 'JM',
          name: 'Jamaica',
        },
        {
          id: 'JP',
          name: 'Japan',
        },
        {
          id: 'JE',
          name: 'Jersey',
        },
        {
          id: 'JO',
          name: 'Jordan',
        },
        {
          id: 'KZ',
          name: 'Kazakhstan',
        },
        {
          id: 'KE',
          name: 'Kenya',
        },
        {
          id: 'KI',
          name: 'Kiribati',
        },
        {
          id: 'KR',
          name: 'Korea',
        },
        {
          id: 'KP',
          name: 'Korea, Democratic Republic',
        },
        {
          id: 'XK',
          name: 'Kosovo',
        },
        {
          id: 'KW',
          name: 'Kuwait',
        },
        {
          id: 'KG',
          name: 'Kyrgyzstan',
        },
        {
          id: 'LA',
          name: 'Laos',
        },
        {
          id: 'LV',
          name: 'Latvia',
        },
        {
          id: 'LB',
          name: 'Lebanon',
        },
        {
          id: 'LS',
          name: 'Lesotho',
        },
        {
          id: 'LR',
          name: 'Liberia',
        },
        {
          id: 'LY',
          name: 'Libyan Arab Jamahiriya',
        },
        {
          id: 'LI',
          name: 'Liechtenstein',
        },
        {
          id: 'LT',
          name: 'Lithuania',
        },
        {
          id: 'LU',
          name: 'Luxembourg',
        },
        {
          id: 'MO',
          name: 'Macau',
        },
        {
          id: 'MK',
          name: 'Macedonia',
        },
        {
          id: 'MG',
          name: 'Madagascar',
        },
        {
          id: 'MW',
          name: 'Malawi',
        },
        {
          id: 'MY',
          name: 'Malaysia',
        },
        {
          id: 'MV',
          name: 'Maldives',
        },
        {
          id: 'ML',
          name: 'Mali',
        },
        {
          id: 'MT',
          name: 'Malta',
        },
        {
          id: 'MH',
          name: 'Marshall Islands',
        },
        {
          id: 'MQ',
          name: 'Martinique',
        },
        {
          id: 'MR',
          name: 'Mauritania',
        },
        {
          id: 'MU',
          name: 'Mauritius',
        },
        {
          id: 'YT',
          name: 'Mayotte',
        },
        {
          id: 'MX',
          name: 'Mexico',
        },
        {
          id: 'FM',
          name: 'Micronesia',
        },
        {
          id: 'MD',
          name: 'Moldova',
        },
        {
          id: 'MC',
          name: 'Monaco',
        },
        {
          id: 'MN',
          name: 'Mongolia',
        },
        {
          id: 'ME',
          name: 'Montenegro',
        },
        {
          id: 'MS',
          name: 'Montserrat',
        },
        {
          id: 'MA',
          name: 'Morocco',
        },
        {
          id: 'MZ',
          name: 'Mozambique',
        },
        {
          id: 'MM',
          name: 'Myanmar',
        },
        {
          id: 'NA',
          name: 'Namibia',
        },
        {
          id: 'NR',
          name: 'Nauru',
        },
        {
          id: 'NP',
          name: 'Nepal',
        },
        {
          id: 'NL',
          name: 'Netherlands',
        },
        {
          id: 'NC',
          name: 'New Caledonia',
        },
        {
          id: 'NZ',
          name: 'New Zealand',
        },
        {
          id: 'NI',
          name: 'Nicaragua',
        },
        {
          id: 'NE',
          name: 'Niger',
        },
        {
          id: 'NG',
          name: 'Nigeria',
        },
        {
          id: 'NU',
          name: 'Niue',
        },
        {
          id: 'NF',
          name: 'Norfolk Island',
        },
        {
          id: 'MP',
          name: 'Northern Mariana Islands',
        },
        {
          id: 'NO',
          name: 'Norway',
        },
        {
          id: 'OM',
          name: 'Oman',
        },
        {
          id: 'PK',
          name: 'Pakistan',
        },
        {
          id: 'PW',
          name: 'Palau',
        },
        {
          id: 'PS',
          name: 'Palestinian Territory, Occupied',
        },
        {
          id: 'PA',
          name: 'Panama',
        },
        {
          id: 'PG',
          name: 'Papua New Guinea',
        },
        {
          id: 'PY',
          name: 'Paraguay',
        },
        {
          id: 'PE',
          name: 'Peru',
        },
        {
          id: 'PH',
          name: 'Philippines',
        },
        {
          id: 'PN',
          name: 'Pitcairn',
        },
        {
          id: 'PL',
          name: 'Poland',
        },
        {
          id: 'PT',
          name: 'Portugal',
        },
        {
          id: 'PR',
          name: 'Puerto Rico',
        },
        {
          id: 'QA',
          name: 'Qatar',
        },
        {
          id: 'RE',
          name: 'Reunion',
        },
        {
          id: 'RO',
          name: 'Romania',
        },
        {
          id: 'RU',
          name: 'Russia',
        },
        {
          id: 'RW',
          name: 'Rwanda',
        },
        {
          id: 'BL',
          name: 'Saint Barthelemy',
        },
        {
          id: 'LC',
          name: 'Saint Lucia',
        },
        {
          id: 'MF',
          name: 'Saint Martin',
        },
        {
          id: 'VC',
          name: 'Saint Vincent and the Grenadines',
        },
        {
          id: 'WS',
          name: 'Samoa',
        },
        {
          id: 'SM',
          name: 'San Marino',
        },
        {
          id: 'ST',
          name: 'Sao Tome and Principe',
        },
        {
          id: 'SA',
          name: 'Saudi Arabia',
        },
        {
          id: 'SN',
          name: 'Senegal',
        },
        {
          id: 'RS',
          name: 'Serbia',
        },
        {
          id: 'SC',
          name: 'Seychelles',
        },
        {
          id: 'SL',
          name: 'Sierra Leone',
        },
        {
          id: 'SG',
          name: 'Singapore',
        },
        {
          id: 'SX',
          name: 'Sint Maarten',
        },
        {
          id: 'SK',
          name: 'Slovakia',
        },
        {
          id: 'SI',
          name: 'Slovenia',
        },
        {
          id: 'SB',
          name: 'Solomon Islands',
        },
        {
          id: 'SO',
          name: 'Somalia',
        },
        {
          id: 'ZA',
          name: 'South Africa',
        },
        {
          id: 'GS',
          name: 'South Georgia and the Sth Sandwich Isls.',
        },
        {
          id: 'SS',
          name: 'South Sudan',
        },
        {
          id: 'ES',
          name: 'Spain',
        },
        {
          id: 'XB',
          name: 'Spanish North Africa',
        },
        {
          id: 'LK',
          name: 'Sri Lanka',
        },
        {
          id: 'SH',
          name: 'St. Helena',
        },
        {
          id: 'KN',
          name: 'St. Kitts-Nevis',
        },
        {
          id: 'PM',
          name: 'St. Pierre and Miquelon',
        },
        {
          id: 'SD',
          name: 'Sudan',
        },
        {
          id: 'SR',
          name: 'Suriname',
        },
        {
          id: 'SJ',
          name: 'Svalbard Mayen Islands',
        },
        {
          id: 'SZ',
          name: 'Swaziland',
        },
        {
          id: 'SE',
          name: 'Sweden',
        },
        {
          id: 'CH',
          name: 'Switzerland',
        },
        {
          id: 'SY',
          name: 'Syrian Arab Republic',
        },
        {
          id: 'TW',
          name: 'Taiwan',
        },
        {
          id: 'TJ',
          name: 'Tajikistan',
        },
        {
          id: 'TZ',
          name: 'Tanzania',
        },
        {
          id: 'TH',
          name: 'Thailand',
        },
        {
          id: 'TG',
          name: 'Togo',
        },
        {
          id: 'TK',
          name: 'Tokelau',
        },
        {
          id: 'TO',
          name: 'Tonga',
        },
        {
          id: 'TT',
          name: 'Trinidad and Tobago',
        },
        {
          id: 'TN',
          name: 'Tunisia',
        },
        {
          id: 'TR',
          name: 'Turkey',
        },
        {
          id: 'TM',
          name: 'Turkmenistan',
        },
        {
          id: 'TC',
          name: 'Turks and Caicos Islands',
        },
        {
          id: 'TV',
          name: 'Tuvalu',
        },
        {
          id: 'UG',
          name: 'Uganda',
        },
        {
          id: 'UA',
          name: 'Ukraine',
        },
        {
          id: 'AE',
          name: 'United Arab Emirates',
        },
        {
          id: 'GB',
          name: 'United Kingdom',
        },
        {
          id: 'US',
          name: 'United States',
        },
        {
          id: 'UM',
          name: 'United States Minor Outlying Islands',
        },
        {
          id: 'UY',
          name: 'Uruguay',
        },
        {
          id: 'UZ',
          name: 'Uzbekistan',
        },
        {
          id: 'VU',
          name: 'Vanuatu',
        },
        {
          id: 'VA',
          name: 'Vatican City State (Holy See)',
        },
        {
          id: 'VE',
          name: 'Venezuela',
        },
        {
          id: 'VN',
          name: 'Vietnam',
        },
        {
          id: 'VI',
          name: 'Virgin Islands, U.S.',
        },
        {
          id: 'WF',
          name: 'Wallis and Futuna Islands',
        },
        {
          id: 'EH',
          name: 'Western Sahara',
        },
        {
          id: 'YE',
          name: 'Yemen',
        },
        {
          id: 'ZM',
          name: 'Zambia',
        },
        {
          id: 'ZW',
          name: 'Zimbabwe',
        },
      ],
      TerritorialRightsTemplates: [],
      UtcDateTime: '2022-09-14T05:06:01.7054194Z',
      sub: '00uygj7509IPCrj5W0h7',
      name: 'Robin Thomas',
      locale: 'en-US',
      email: 'Robin.Thomas@umusic.com',
      preferred_username: 'Robin.Thomas@umusic.com',
      given_name: 'Robin',
      family_name: 'Thomas',
      zoneinfo: 'America/Los_Angeles',
      updated_at: 1663119572,
      email_verified: true,
    }; //await this.props.auth.getUser();

    if (accesstoken !== this.state.accesstoken) {
      this.setState({ accesstoken });
    }

    if (idtoken !== this.state.idtoken) {
      this.setState({ idtoken });
    }

    if (user !== this.state.user) {
      this.setState({ user });
    }

    sessionStorage.setItem('idtoken', idtoken);
    sessionStorage.setItem('accessToken', accesstoken);
    sessionStorage.setItem('user', JSON.stringify(user));

    if (this.state.user !== user) {
      this.setState({ user: user });
    }

    if (!this.state.userLoaded) {
      this.getUserData();
    }
  }

  getUserData(lang) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      User: {
        email: this.state.user.email,
      },
      languagecode: lang || localStorage.getItem('languageCode') || 'en',
    });

    fetch(window.env.api.url + '/login', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(userJSON => {
        const newUserObj = Object.assign(userJSON, user);
        this.setState({
          user: newUserObj,
          userLoaded: true,
        });
        sessionStorage.setItem('user', JSON.stringify(newUserObj));
      })
      .catch(error => console.error(error));
  }

  showNotiBarIfMasked = response => {
    if (response.Project && response.Project.isMasked) {
      showNotyMaskWarning(
        'This projects meta data is being masked. The Project Title, Artist, Track Titles and Artists will all be masked.',
        () => {},
        10,
      );
    }
  };

  handleProjectDataLoad = pagePath => {
    if (pagePath && pagePath !== '' && this.state.projectID !== '') {
      const fetchHeaders = new Headers({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken'),
      });

      const fetchBody = JSON.stringify({
        PagePath: pagePath,
        ProjectID: this.state.projectID ? this.state.projectID : '',
        languagecode: localStorage.getItem('languageCode') || 'en',
      });

      fetch(window.env.api.url + '/project/review', {
        method: 'POST',
        headers: fetchHeaders,
        body: fetchBody,
      })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          this.showNotiBarIfMasked(responseJSON);
          // console.log('responseJSON.Project.projectStatus', responseJSON.Project.projectStatus);
          // if (
          //   responseJSON.Project.projectStatus !== 'In Progress' &&
          //   responseJSON.Project.projectStatus !== 'No Rights' &&
          //   !pagePath.includes('reviewSubmit')
          // ) {
          //   this.props.history.push('/reviewSubmit/' + this.state.projectID);
          // }
          return this.state.project !== responseJSON
            ? this.setState({ project: responseJSON })
            : '';
        })
        .catch(error => {
          console.error(error);
          this.setState({ showloader: false });
        });
    }
  };

  updateHistory(projectID) {
    this.props.history.push('/reviewSubmit/' + projectID);
    this.setProjectID(projectID, '/reviewSubmit/' + projectID);
  }

  setProjectID(pid, pagePath) {
    if (!pid) {
      this.setState({ projectID: '' });
    }
    if (pid && this.state.projectID !== pid) {
      this.setState({ projectID: pid }, () => {
        this.handleProjectDataLoad(pagePath);
      });
    } else {
      if (pagePath && this.state.pagePath !== pagePath) {
        //For blocking, We can't call the review api on the submit and preview page. So we are calling here.
        if (this.state.pagePath.includes('blockingPolicies')) {
          this.setState({ pagePath: pagePath }, () => {
            this.handleProjectDataLoad(pagePath);
          });
        } else {
          this.setState({ pagePath: pagePath });
        }
      }
    }
  }

  setPageViewType = isCompactView => {
    return this.state.pageViewCompact !== isCompactView
      ? this.setState({ pageViewCompact: isCompactView })
      : null;
  };

  clearProject = () => {
    const blankProject = {
      Project: {},
    };
    localStorage.removeItem('projectData');
    localStorage.removeItem('upc');
    this.props.initializeUpcData();
    this.props.initializeRightsData();
    this.setState({ project: blankProject, clearProject: true }, () =>
      this.setState({ clearProject: false }),
    );
  };

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.auth.logout('/');
    localStorage.clear();
  };

  setHeaderProjectData = projectData => {
    if (this.state.project !== projectData && projectData.Project) {
      this.setState({ project: projectData });
    }
  };

  componentDidUpdate = () => {
    if (
      sessionStorage.getItem('user') &&
      this.state.serverTimeDate !== JSON.parse(sessionStorage.getItem('user')).UtcDateTime
    ) {
      this.setState({ serverTimeDate: JSON.parse(sessionStorage.getItem('user')).UtcDateTime });
    }

    //alert(this.props.location.pathname)
  };

  render() {
    if (this.state.userLoaded) {
      return (
        <ErrorBoundary>
          <UploadProgressAlert uploads={this.props.uploads} />
          <div className="row d-flex no-gutters">
            <div
              className="col-12"
              style={{ marginTop: Object.keys(this.props.uploads).length > 0 ? '54px' : '0px' }}
            >
              <Header
                userData={this.state.user}
                projectData={this.state.project}
                pagePath={this.props.location.pathname}
                setPageViewType={this.setPageViewType}
                updateHistory={this.updateHistory}
                clearProject={this.clearProject}
                handleLogoutClick={this.handleLogoutClick}
                getUserData={this.getUserData}
              />
              <div
                className={
                  this.state.pageViewCompact
                    ? 'row d-flex no-gutters content compact'
                    : 'row d-flex no-gutters content'
                }
              >
                <div className="col-1"></div>

                <Route
                  path="/releaseInformation/:projectID?"
                  render={() => (
                    <ReleaseInformationPage
                      user={this.state.user}
                      clearProject={this.state.clearProject}
                      data={this.state.project.Project}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/inbox"
                  render={() => (
                    <ProjectInbox
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/projectContacts/:projectID?"
                  render={() => (
                    <ProjectContactsPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                      data={this.state.project.Project}
                      showNotiBarIfMasked={this.showNotiBarIfMasked}
                    />
                  )}
                />
                <Route
                  path="/trackInformation/:projectID?"
                  render={() => (
                    <TrackInformationPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/territorialRights/:projectID?"
                  render={() => (
                    <TerritorialRightsPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/blockingPolicies/:projectID?"
                  render={() => (
                    <BlockingPoliciesPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/audioFiles/:projectID?"
                  render={() => (
                    <AudioFilesPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/reviewSubmit/:projectID?"
                  render={() => (
                    <ReviewAndSubmitPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      projectID={this.state.project.Project.projectID}
                      data={this.state.project}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/findProject"
                  render={() => (
                    <FindProjectPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route path="/helpGuide/:id?" render={() => <HelpGuide />} />
                <Route
                  path="/userAdmin"
                  render={() => (
                    <UserAdmin
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <div className="col-1"></div>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      );
    } else {
      return <div className="row d-flex no-gutters"></div>;
    }
  }
}

export default withAuth(
  connect(
    state => ({
      uploads: state.uploadProgressAlert.uploads,
    }),
    dispatch => ({
      initializeUpcData: () => dispatch(releaseAction.initializeUpcData()),
      initializeRightsData: () => dispatch(territorialRightsAction.initializeRightsData()),
    }),
  )(Content),
);

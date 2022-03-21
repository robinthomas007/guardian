import React from 'react';
import { Table, Modal, Form } from 'react-bootstrap';
import './AuditModal.css';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';

const audit = [
  {
    StepId: 2,
    ActionType: 'Save',
    Project: {
      projectID: '1241',
      projectTitle: 'Audit-Testing-1',
      projectTypeID: '1',
      projectType: 'Album',
      projectArtistName: 'selvam',
      projectReleasingLabelID: '-1',
      projectReleasingLabel: 'ZDeviner',
      projectReleaseDate: '3/26/2022 12:00',
      projectReleaseDateTBD: false,
      projectPrimaryContact: 'selvam murugan',
      projectPrimaryContactEmail: 'selvam.murugan@umusic.com',
      projectAdditionalContacts: '',
      projectNotes: '',
      projectSecurityID: '1',
      projectSecurity: 'Private (Viewable By You)',
      projectStatusID: '1',
      projectStatus: 'In Progress',
      projectCoverArtFileName: '',
      projectCoverArtBase64Data: '',
      releaseInfoStatus: '3',
      projectContactsStatus: '3',
      audioFilesStatus: '2',
      trackInfoStatus: '2',
      territorialRightsStatus: '2',
      blockingPoliciesStatus: '2',
      projectSubmitStatus: '2',
      isProjectComplete: false,
      isProjectReviewable: false,
      upc: '',
      isMasked: false,
    },
    AudioFiles: [],
    Discs: [],
    TerritorialRightsSets: [],
    UnassignedTerritorialRightsSetTracks: [],
    BlockingPolicySets: [],
    UnassignedBlockingPolicySetTracks: [],
    message: null,
    CreatedDateTime: '2022-03-21T10:22:20.695431',
    UserName: 'selvam murugan',
  },
  {
    StepId: 3,
    ActionType: 'Save',
    Project: {
      projectID: '1241',
      projectTitle: 'Audit-Testing-1',
      projectTypeID: '1',
      projectType: 'Album',
      projectArtistName: 'selvam',
      projectReleasingLabelID: '-1',
      projectReleasingLabel: 'ZDeviner',
      projectReleaseDate: '3/26/2022 12:00',
      projectReleaseDateTBD: false,
      projectPrimaryContact: 'selvam murugan',
      projectPrimaryContactEmail: 'selvam.murugan@umusic.com',
      projectAdditionalContacts: '',
      projectNotes: '',
      projectSecurityID: '1',
      projectSecurity: 'Private (Viewable By You)',
      projectStatusID: '1',
      projectStatus: 'In Progress',
      projectCoverArtFileName: '',
      projectCoverArtBase64Data: '',
      releaseInfoStatus: '3',
      projectContactsStatus: '3',
      audioFilesStatus: '3',
      trackInfoStatus: '2',
      territorialRightsStatus: '2',
      blockingPoliciesStatus: '2',
      projectSubmitStatus: '2',
      isProjectComplete: false,
      isProjectReviewable: false,
      upc: '',
      isMasked: false,
    },
    AudioFiles: [
      {
        FileName: 'file_example_MP3_700KB - Copy (3).mp3',
        FileSize: '0.73 MB',
        FileFormat: 'MP3',
        IsCompleted: false,
      },
    ],
    Discs: [
      {
        discNumber: '1',
        Tracks: [
          {
            trackID: '3241',
            trackNumber: '1',
            hasUpload: true,
            trackTitle: 'Title1',
            isrc: 'USUG12100193',
            isSingle: false,
            trackReleaseDate: '3/26/2022 12:00',
            fileName: 'file_example_MP3_700KB - Copy (3).mp3',
            artist: 'selvam',
            isInProgress: true,
            isCisAudio: false,
          },
        ],
      },
    ],
    TerritorialRightsSets: [],
    UnassignedTerritorialRightsSetTracks: [
      {
        trackID: '3241',
        trackTitle: 'Title1',
        IsLockedByUgc: false,
      },
    ],
    BlockingPolicySets: [],
    UnassignedBlockingPolicySetTracks: [
      {
        trackID: '3241',
        trackTitle: 'Title1',
        IsLockedByUgc: false,
      },
    ],
    message: null,
    CreatedDateTime: '2022-03-21T10:22:41.218943',
    UserName: 'selvam murugan',
  },
  {
    StepId: 4,
    ActionType: 'Save',
    Project: {
      projectID: '1241',
      projectTitle: 'Audit-Testing-1',
      projectTypeID: '1',
      projectType: 'Album',
      projectArtistName: 'selvam',
      projectReleasingLabelID: '-1',
      projectReleasingLabel: 'ZDeviner',
      projectReleaseDate: '3/26/2022 12:00',
      projectReleaseDateTBD: false,
      projectPrimaryContact: 'selvam murugan',
      projectPrimaryContactEmail: 'selvam.murugan@umusic.com',
      projectAdditionalContacts: '',
      projectNotes: '',
      projectSecurityID: '1',
      projectSecurity: 'Private (Viewable By You)',
      projectStatusID: '1',
      projectStatus: 'In Progress',
      projectCoverArtFileName: '',
      projectCoverArtBase64Data: '',
      releaseInfoStatus: '3',
      projectContactsStatus: '3',
      audioFilesStatus: '3',
      trackInfoStatus: '3',
      territorialRightsStatus: '2',
      blockingPoliciesStatus: '2',
      projectSubmitStatus: '2',
      isProjectComplete: false,
      isProjectReviewable: false,
      upc: '',
      isMasked: false,
    },
    AudioFiles: [
      {
        FileName: 'file_example_MP3_700KB - Copy (3).mp3',
        FileSize: '0.73 MB',
        FileFormat: 'MP3',
        IsCompleted: true,
      },
    ],
    Discs: [
      {
        discNumber: '1',
        Tracks: [
          {
            trackID: '3241',
            trackNumber: '1',
            hasUpload: true,
            trackTitle: 'Title1',
            isrc: 'USUG12100193',
            isSingle: false,
            trackReleaseDate: '3/26/2022 12:00',
            fileName: 'file_example_MP3_700KB - Copy (3).mp3',
            artist: 'selvam',
            isInProgress: false,
            isCisAudio: false,
          },
        ],
      },
    ],
    TerritorialRightsSets: [],
    UnassignedTerritorialRightsSetTracks: [
      {
        trackID: '3241',
        trackTitle: 'Title1',
        IsLockedByUgc: false,
      },
    ],
    BlockingPolicySets: [],
    UnassignedBlockingPolicySetTracks: [
      {
        trackID: '3241',
        trackTitle: 'Title1',
        IsLockedByUgc: false,
      },
    ],
    message: null,
    CreatedDateTime: '2022-03-21T10:22:48.408802',
    UserName: 'selvam murugan',
  },
  {
    StepId: 5,
    ActionType: 'Save',
    Project: {
      projectID: '1241',
      projectTitle: 'Audit-Testing-1',
      projectTypeID: '1',
      projectType: 'Album',
      projectArtistName: 'selvam',
      projectReleasingLabelID: '-1',
      projectReleasingLabel: 'ZDeviner',
      projectReleaseDate: '3/26/2022 12:00',
      projectReleaseDateTBD: false,
      projectPrimaryContact: 'selvam murugan',
      projectPrimaryContactEmail: 'selvam.murugan@umusic.com',
      projectAdditionalContacts: '',
      projectNotes: '',
      projectSecurityID: '1',
      projectSecurity: 'Private (Viewable By You)',
      projectStatusID: '1',
      projectStatus: 'In Progress',
      projectCoverArtFileName: '',
      projectCoverArtBase64Data: '',
      releaseInfoStatus: '3',
      projectContactsStatus: '3',
      audioFilesStatus: '3',
      trackInfoStatus: '3',
      territorialRightsStatus: '3',
      blockingPoliciesStatus: '2',
      projectSubmitStatus: '2',
      isProjectComplete: false,
      isProjectReviewable: false,
      upc: '',
      isMasked: false,
    },
    AudioFiles: [
      {
        FileName: 'file_example_MP3_700KB - Copy (3).mp3',
        FileSize: '0.73 MB',
        FileFormat: 'MP3',
        IsCompleted: true,
      },
    ],
    Discs: [
      {
        discNumber: '1',
        Tracks: [
          {
            trackID: '3241',
            trackNumber: '1',
            hasUpload: true,
            trackTitle: 'Title1',
            isrc: 'USUG12100193',
            isSingle: false,
            trackReleaseDate: '3/26/2022 12:00',
            fileName: 'file_example_MP3_700KB - Copy (3).mp3',
            artist: 'selvam',
            isInProgress: false,
            isCisAudio: false,
          },
        ],
      },
    ],
    TerritorialRightsSets: [
      {
        territorialRightsSetID: '748',
        sequence: '1',
        description: '',
        countries: [
          {
            id: 'WW',
            name: 'Worldwide',
          },
        ],
        tracks: [
          {
            trackID: '3241',
            trackTitle: 'Title1',
            IsLockedByUgc: false,
          },
        ],
        hasRights: true,
      },
    ],
    UnassignedTerritorialRightsSetTracks: [],
    BlockingPolicySets: [],
    UnassignedBlockingPolicySetTracks: [
      {
        trackID: '3241',
        trackTitle: 'Title1',
        IsLockedByUgc: false,
      },
    ],
    message: null,
    CreatedDateTime: '2022-03-21T10:23:01.175328',
    UserName: 'selvam murugan',
  },
  {
    StepId: 6,
    ActionType: 'Save',
    Project: {
      projectID: '1241',
      projectTitle: 'Audit-Testing-1',
      projectTypeID: '1',
      projectType: 'Album',
      projectArtistName: 'selvam',
      projectReleasingLabelID: '-1',
      projectReleasingLabel: 'ZDeviner',
      projectReleaseDate: '3/26/2022 12:00',
      projectReleaseDateTBD: false,
      projectPrimaryContact: 'selvam murugan',
      projectPrimaryContactEmail: 'selvam.murugan@umusic.com',
      projectAdditionalContacts: '',
      projectNotes: '',
      projectSecurityID: '1',
      projectSecurity: 'Private (Viewable By You)',
      projectStatusID: '1',
      projectStatus: 'In Progress',
      projectCoverArtFileName: '',
      projectCoverArtBase64Data: '',
      releaseInfoStatus: '3',
      projectContactsStatus: '3',
      audioFilesStatus: '3',
      trackInfoStatus: '3',
      territorialRightsStatus: '3',
      blockingPoliciesStatus: '3',
      projectSubmitStatus: '2',
      isProjectComplete: true,
      isProjectReviewable: true,
      upc: '',
      isMasked: false,
    },
    AudioFiles: [
      {
        FileName: 'file_example_MP3_700KB - Copy (3).mp3',
        FileSize: '0.73 MB',
        FileFormat: 'MP3',
        IsCompleted: true,
      },
    ],
    Discs: [
      {
        discNumber: '1',
        Tracks: [
          {
            trackID: '3241',
            trackNumber: '1',
            hasUpload: true,
            trackTitle: 'Title1',
            isrc: 'USUG12100193',
            isSingle: false,
            trackReleaseDate: '3/26/2022 12:00',
            fileName: 'file_example_MP3_700KB - Copy (3).mp3',
            artist: 'selvam',
            isInProgress: false,
            isCisAudio: false,
          },
        ],
      },
    ],
    TerritorialRightsSets: [
      {
        territorialRightsSetID: '748',
        sequence: '1',
        description: '',
        countries: [
          {
            id: 'WW',
            name: 'Worldwide',
          },
        ],
        tracks: [
          {
            trackID: '3241',
            trackTitle: 'Title1',
            IsLockedByUgc: false,
          },
        ],
        hasRights: true,
      },
    ],
    UnassignedTerritorialRightsSetTracks: [],
    BlockingPolicySets: [
      {
        blockingPolicySetID: '482',
        sequence: '1',
        description: 'Set #1',
        platformPolicies: [
          {
            platformName: 'YouTube',
            block: false,
            duration: '',
            expirationDate: '',
          },
          {
            platformName: 'SoundCloud',
            block: true,
            duration: '> 3o sec',
            expirationDate: '12/10/2022',
          },
          {
            platformName: 'Facebook',
            block: false,
            duration: '',
            expirationDate: '',
          },
          {
            platformName: 'Instagram',
            block: false,
            duration: '',
            expirationDate: '',
          },
        ],
        tracks: [
          {
            trackID: '3241',
            trackTitle: 'Title1',
            IsLockedByUgc: false,
          },
          {
            trackID: '3242',
            trackTitle: 'Title2',
            IsLockedByUgc: false,
          },
          {
            trackID: '3243',
            trackTitle: 'Title3',
            IsLockedByUgc: false,
          },
          {
            trackID: '3244',
            trackTitle: 'Title4',
            IsLockedByUgc: false,
          },
        ],
      },
    ],
    UnassignedBlockingPolicySetTracks: [],
    message: null,
    CreatedDateTime: '2022-03-21T10:23:20.198805',
    UserName: 'selvam murugan',
  },
  {
    StepId: 7,
    ActionType: 'Submit',
    Project: {
      projectID: '1241',
      projectTitle: 'Audit-Testing-1',
      projectTypeID: '1',
      projectType: 'Album',
      projectArtistName: 'selvam',
      projectReleasingLabelID: '-1',
      projectReleasingLabel: 'ZDeviner',
      projectReleaseDate: '3/26/2022 12:00',
      projectReleaseDateTBD: false,
      projectPrimaryContact: 'selvam murugan',
      projectPrimaryContactEmail: 'selvam.murugan@umusic.com',
      projectAdditionalContacts: '',
      projectNotes: '',
      projectSecurityID: '1',
      projectSecurity: 'Private (Viewable By You)',
      projectStatusID: '2',
      projectStatus: 'Submitted',
      projectCoverArtFileName: '',
      projectCoverArtBase64Data: '',
      releaseInfoStatus: '3',
      projectContactsStatus: '3',
      audioFilesStatus: '3',
      trackInfoStatus: '3',
      territorialRightsStatus: '3',
      blockingPoliciesStatus: '3',
      projectSubmitStatus: '3',
      isProjectComplete: true,
      isProjectReviewable: true,
      upc: '',
      isMasked: false,
    },
    AudioFiles: [
      {
        FileName: 'file_example_MP3_700KB - Copy (3).mp3',
        FileSize: '0.73 MB',
        FileFormat: 'MP3',
        IsCompleted: true,
      },
    ],
    Discs: [
      {
        discNumber: '1',
        Tracks: [
          {
            trackID: '3241',
            trackNumber: '1',
            hasUpload: true,
            trackTitle: 'Title1',
            isrc: 'USUG12100193',
            isSingle: false,
            trackReleaseDate: '3/26/2022 12:00',
            fileName: 'file_example_MP3_700KB - Copy (3).mp3',
            artist: 'selvam',
            isInProgress: false,
            isCisAudio: false,
          },
        ],
      },
    ],
    TerritorialRightsSets: [
      {
        territorialRightsSetID: '748',
        sequence: '1',
        description: '',
        countries: [
          {
            id: 'WW',
            name: 'Worldwide',
          },
        ],
        tracks: [
          {
            trackID: '3241',
            trackTitle: 'Title1',
            IsLockedByUgc: false,
          },
        ],
        hasRights: true,
      },
    ],
    UnassignedTerritorialRightsSetTracks: [],
    BlockingPolicySets: [
      {
        blockingPolicySetID: '482',
        sequence: '1',
        description: 'Set #1',
        platformPolicies: [
          {
            platformName: 'YouTube',
            block: false,
            duration: '',
            expirationDate: '',
          },
          {
            platformName: 'SoundCloud',
            block: false,
            duration: '',
            expirationDate: '',
          },
          {
            platformName: 'Facebook',
            block: false,
            duration: '',
            expirationDate: '',
          },
          {
            platformName: 'Instagram',
            block: false,
            duration: '',
            expirationDate: '',
          },
        ],
        tracks: [
          {
            trackID: '3241',
            trackTitle: 'Title1',
            IsLockedByUgc: false,
          },
        ],
      },
    ],
    UnassignedBlockingPolicySetTracks: [],
    message: null,
    CreatedDateTime: '2022-03-21T10:23:46.865994',
    UserName: 'selvam murugan',
  },
];

const getCountries = countries => {
  return _.map(countries, 'name').toString();
};

const renderStep1Table = project => {
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>UPC</th>
          <th>Project Title</th>
          <th>Artist</th>
          <th>Project Type</th>
          <th>Label</th>
          <th>Release Date</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{project.upc}</td>
          <td>{project.projectTitle}</td>
          <td>{project.projectArtistName}</td>
          <td>{project.projectType}</td>
          <td>{project.projectReleasingLabel}</td>
          <td>{project.projectReleaseDate}</td>
          <td>{project.projectNotes}</td>
        </tr>
      </tbody>
    </Table>
  );
};

const renderStep2Table = project => {
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Project Security</th>
          <th className="text-center">Masked</th>
          <th>Primary Contact</th>
          <th>Primary Contact Email</th>
          <th>Additional Contacts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{project.projectSecurity}</td>
          <td className="text-center">
            <label className="custom-checkbox">
              <input
                id="projectReleaseDateTBD"
                className="form-control"
                type="checkbox"
                checked={project.isMasked}
              />
              <span className="checkmark "></span>
            </label>
          </td>
          <td>{project.projectPrimaryContact}</td>
          <td>{project.projectPrimaryContactEmail}</td>
          <td>{project.projectAdditionalContacts}</td>
        </tr>
      </tbody>
    </Table>
  );
};

const renderStep3UploadTable = AudioFiles => {
  const audioFileData = _.map(AudioFiles, (item, key) => {
    return (
      <tr>
        <td>{key + 1}</td>
        <td>{item.FileName}</td>
        <td>{item.FileSize}</td>
        <td>{item.FileFormat}</td>
        <td className="text-center completed-icon">
          {item.IsCompleted ? (
            <i className="material-icons success">verified_user</i>
          ) : (
            <i className="material-icons success">verified_user</i>
          )}
        </td>
      </tr>
    );
  });
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Upload Order</th>
          <th>File Name</th>
          <th>File Size</th>
          <th>Format</th>
          <th className="text-center">Completed</th>
        </tr>
      </thead>
      <tbody>{audioFileData}</tbody>
    </Table>
  );
};

const renderStep3TrackTable = Discs => {
  const trackData = _.map(Discs, Disc => {
    return _.map(Disc.Tracks, track => {
      return (
        <tr>
          <td>{Disc.discNumber}</td>
          <td>{track.trackNumber}</td>
          <td>{track.fileName}</td>
          <td>{track.trackTitle}</td>
          <td>{track.isrc}</td>
          <td>{track.artist}</td>
        </tr>
      );
    });
  });
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Disc</th>
          <th>Track</th>
          <th>File Name</th>
          <th>Track Title</th>
          <th>ISRC</th>
          <th>Artist</th>
        </tr>
      </thead>
      <tbody>{trackData}</tbody>
    </Table>
  );
};

const renderStep4TrackTable = Discs => {
  const trackData = _.map(Discs, Disc => {
    return _.map(Disc.Tracks, track => {
      return (
        <tr>
          <td>{Disc.discNumber}</td>
          <td>{track.trackNumber}</td>
          <td>{track.fileName}</td>
          <td>{track.trackTitle}</td>
          <td>{track.isrc}</td>
          <td>{track.artist}</td>
          <td className="text-center">
            <label className="custom-checkbox">
              <input
                id="projectReleaseDateTBD"
                className="form-control"
                type="checkbox"
                checked={track.isSingle}
              />
              <span className="checkmark "></span>
            </label>
          </td>
          <td>{track.trackReleaseDate}</td>
        </tr>
      );
    });
  });
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Disc</th>
          <th>Track</th>
          <th>File Name</th>
          <th>Track Title</th>
          <th>ISRC</th>
          <th>Artist</th>
          <th className="text-center">Single</th>
          <th>Release Date</th>
        </tr>
      </thead>
      <tbody>{trackData}</tbody>
    </Table>
  );
};

const renderStep5RightsTable = TerritorialRightsSets => {
  const TerritorialRightsSetsData = _.map(TerritorialRightsSets, Rights => {
    return _.map(Rights.tracks, track => {
      return (
        <tr>
          <td>{Rights.sequence}</td>
          <td>{track.trackID}</td>
          <td>{track.trackTitle}</td>
          <td>{Rights.hasRights ? 'Only Has Rights In' : 'Everywhere Except'}</td>
          <td>{getCountries(Rights.countries)}</td>
        </tr>
      );
    });
  });
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Set #</th>
          <th>Track</th>
          <th>Track Title</th>
          <th>Rights Rule</th>
          <th>Countries</th>
        </tr>
      </thead>
      <tbody>{TerritorialRightsSetsData}</tbody>
    </Table>
  );
};

const renderStep6BlockingPolicyTable = blockingPolicies => {
  const blockingPoliciesData = _.map(blockingPolicies, blocking => {
    const platforms = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper social-icons">
          <span>
            <span className={`platform-sprite small ${platform.platformName.toLowerCase()}`}></span>
          </span>
        </div>
      );
    });

    const trackTitle = _.map(blocking.tracks, track => {
      return (
        <div className="td-bottom-line-div">
          <span>{track.trackTitle}</span>
        </div>
      );
    });

    const trackId = _.map(blocking.tracks, track => {
      return (
        <div className="td-bottom-line-div">
          <span>{track.trackID}</span>
        </div>
      );
    });

    const setId = _.map(blocking.tracks, () => {
      return (
        <div className="td-bottom-line-div">
          <span>{blocking.sequence}</span>
        </div>
      );
    });

    const Monetize = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper">
          <span>
            {!platform.block && (
              <label className="custom-checkbox">
                <input
                  id="projectReleaseDateTBD"
                  className="form-control"
                  type="checkbox"
                  checked={true}
                />
                <span className="checkmark "></span>
              </label>
            )}
          </span>
        </div>
      );
    });

    const duration = _.map(blocking.platformPolicies, platform => {
      console.log(platform, 'platformplatformplatform');
      return (
        <div className="platform-wrapper">
          <span>{platform.duration}</span>
        </div>
      );
    });

    const blockUntil = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper">
          <span>{platform.expirationDate}</span>
        </div>
      );
    });

    const Block = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper">
          <span>
            {platform.block && (
              <label className="custom-checkbox">
                <input
                  id="projectReleaseDateTBD"
                  className="form-control"
                  type="checkbox"
                  checked={true}
                />
                <span className="checkmark "></span>
              </label>
            )}
          </span>
        </div>
      );
    });

    return (
      <tr>
        <td className="audit-5-custom-td">{setId}</td>
        <td className="audit-5-custom-td">{trackId}</td>
        <td className="audit-5-custom-td border-right">{trackTitle}</td>
        <td className="audit-5-custom-td"> {platforms}</td>
        <td className="audit-5-custom-td text-center">{Monetize}</td>
        <td className="audit-5-custom-td text-center">{Block}</td>
        <td className="audit-5-custom-td text-center">{duration}</td>
        <td className="audit-5-custom-td text-center">{blockUntil}</td>
      </tr>
    );
  });

  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Set #</th>
          <th>Track</th>
          <th>Track Title</th>
          <th className="text-center">Platform</th>
          <th className="text-center">Monetize</th>
          <th className="text-center">Block</th>
          <th className="text-center">Duration</th>
          <th className="text-center">Block Until</th>
        </tr>
      </thead>
      <tbody>{blockingPoliciesData}</tbody>
    </Table>
  );
};

export default ({ show, title, onHide, onConfirm }) => {
  const { t } = useTranslation();
  return (
    <Modal
      dialogClassName="new clas"
      fullscreen={true}
      className="test"
      backdrop="false"
      id="AuditModal"
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="row filter-head">
          <div className="col-3">
            <h3>Audit Trail for Test Project</h3>
          </div>
          <div className="col-8">
            <div className="display-filter">
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">display</Form.Label>
                <label className="custom-checkbox"></label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">All</Form.Label>
                <label className="custom-checkbox">
                  <input id="projectReleaseDateTBD" className="form-control" type="checkbox" />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">Step 1/ Step 2</Form.Label>
                <label className="custom-checkbox">
                  <input id="projectReleaseDateTBD" className="form-control" type="checkbox" />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">Step 3</Form.Label>
                <label className="custom-checkbox">
                  <input id="projectReleaseDateTBD" className="form-control" type="checkbox" />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">Step 4</Form.Label>
                <label className="custom-checkbox">
                  <input id="projectReleaseDateTBD" className="form-control" type="checkbox" />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">Step 5</Form.Label>
                <label className="custom-checkbox">
                  <input id="projectReleaseDateTBD" className="form-control" type="checkbox" />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">Step 6</Form.Label>
                <label className="custom-checkbox">
                  <input id="projectReleaseDateTBD" className="form-control" type="checkbox" />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">Step 7</Form.Label>
                <label className="custom-checkbox">
                  <input id="projectReleaseDateTBD" className="form-control" type="checkbox" />
                  <span className="checkmark "></span>
                </label>
              </div>
            </div>
          </div>
          <div className="col-1">
            <button className="btn btn-secondary" type="button">
              <span>
                <i className="material-icons">description</i> {t('search:Export')}
              </span>
            </button>
          </div>
        </div>
        <div className="row">
          {_.map(audit, item => {
            return (
              <div className="col-12">
                {item.StepId === 2 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">1</span>/{' '}
                      <span className="round-step-circle">2</span>
                      On {moment(item.CreatedDateTime).format('DD-MM-YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} created a new
                      project, {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep1Table(item.Project)}
                  </div>
                )}
                {item.StepId === 2 && renderStep2Table(item.Project)}

                {item.StepId === 3 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">3</span>
                      On {moment(item.CreatedDateTime).format('DD-MM-YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} uploaded the
                      following files:{' '}
                    </div>
                    {renderStep3UploadTable(item.AudioFiles)}
                  </div>
                )}
                {item.StepId === 3 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">3</span>
                      On {moment(item.CreatedDateTime).format('DD-MM-YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} saved Step 3
                      for {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep3TrackTable(item.Discs)}
                  </div>
                )}
                {item.StepId === 4 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">4</span>
                      On {moment(item.CreatedDateTime).format('DD-MM-YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} saved Step 4
                      for {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep4TrackTable(item.Discs)}
                  </div>
                )}
                {item.StepId === 5 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">5</span>
                      On {moment(item.CreatedDateTime).format('DD-MM-YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} saved Step 5
                      for {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep5RightsTable(item.TerritorialRightsSets)}
                  </div>
                )}
                {item.StepId === 6 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">6</span>
                      On {moment(item.CreatedDateTime).format('DD-MM-YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} saved Step 6
                      for {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep6BlockingPolicyTable(item.BlockingPolicySets)}
                  </div>
                )}
                {item.StepId === 7 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">7</span>
                      On {moment(item.CreatedDateTime).format('DD-MM-YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} submitted{' '}
                      {item.Project.projectTitle}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

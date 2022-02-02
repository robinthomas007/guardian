import React from 'react';
import './ExtendedTracks.css';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default ({ projectID, tracks = [], handleClose }) => {
  const { t } = useTranslation();
  return (
    <tr className="wrapper-tr">
      <td colSpan={13} className="wrapper-td">
        <span class="material-icons close" onClick={() => handleClose(projectID)}>
          close
        </span>
        <div className="table-wrapper">
          <Table className="ext-tracks-table" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>{t('track:FileName')}</th>
                <th>{t('track:TrackTitle')}</th>
                <th>{t('track:ISRC')}</th>
                <th>{t('track:Artist')}</th>
                <th>{t('track:Single')}</th>
                <th>{t('track:ReleaseDate')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@twitter</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@twitter</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Jacob</td>
                <td>@fat</td>
                <td>@twitter</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@twitter</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </td>
    </tr>
  );
};

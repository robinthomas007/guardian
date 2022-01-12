import React, { Component } from 'react';
import { Table, Grid, Button, Form } from 'react-bootstrap';
import ToolTip from 'component_library/Tooltip';
import BlockingPolicDurationInput from '../pageComponents/blockingPolicyDurationInput';
import BlockingPolicyDateInput from '../pageComponents/BlockingPolicyDateInput';
import TracksDropArea from '../../TerritorialRights/pageComponents/TracksDropArea';
import TracksSelectDropDown from '../../TerritorialRights/pageComponents/TracksSelectDropDown';
import { formatDateToYYYYMMDD } from '../../../Utils';

class BlockingSites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: ['youtube', 'soundcloud', 'facebook', 'instagram'],
    };
  }

  handleMonetizeBlock = e => {
    this.props.handleMonetizeBlock(e);
  };

  getSites = () => {
    return this.props.blockingSet.platformPolicies.map((site, i) => {
      return (
        <tr key={i}>
          <td>
            <span className={'platform-sprite ' + site.platformName.toLowerCase()}></span>
          </td>
          <td>
            <Form.Control
              type="radio"
              name={'monetizeBlock_' + site.platformName + '_' + this.props.setIndex}
              siteName={site.platformName}
              siteIndex={i}
              setIndex={this.props.setIndex}
              inputTarget={'block'}
              onChange={e => this.handleMonetizeBlock(e)}
              value={false}
              checked={site.block ? false : true}
            />
          </td>
          <td>
            <Form.Control
              type="radio"
              name={'monetizeBlock_' + site.platformName + '_' + this.props.setIndex}
              siteName={site.platformName}
              siteIndex={i}
              setIndex={this.props.setIndex}
              inputTarget={'block'}
              onChange={e => this.handleMonetizeBlock(e)}
              value={true}
              checked={site.block ? true : false}
            />
          </td>
          <td>
            <BlockingPolicDurationInput
              data={site.duration}
              onChange={e => this.props.onChange(e, i)}
              siteName={site.platformName}
              siteIndex={i}
              setIndex={this.props.setIndex}
              inputTarget={'duration'}
              id={'duration'}
              disabled={site.block ? false : true}
              t={this.props.t}
            />
          </td>
          <td>
            <BlockingPolicyDateInput
              data={site.expirationDate}
              onChange={e => this.props.onChange(e, i)}
              handleDateChange={(date, id, setIndex, siteIndex) =>
                this.props.handleDateChange(date, id, setIndex, siteIndex)
              }
              siteName={site.platformName}
              siteIndex={i}
              setIndex={this.props.setIndex}
              inputTarget={'expirationDate'}
              disabled={site.block ? false : true}
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    const { t } = this.props;
    return (
      <Table className="blocking-set">
        <thead>
          <tr>
            <th>
              {t('blocking:TracksforPolicy')}{' '}
              <ToolTip tabIndex="-1" message={t('blocking:TracksforPolicyMessage')} />
            </th>
            <th>
              {t('blocking:Platform')}{' '}
              <ToolTip tabIndex="-1" message={t('blocking:PlatformMessage')} />
            </th>
            <th>
              {t('blocking:Monetize')}{' '}
              <ToolTip tabIndex="-1" message={t('blocking:MonetizeMessage')} />
            </th>
            <th>
              {t('blocking:Block')} <ToolTip tabIndex="-1" message={t('blocking:BlockMessage')} />
            </th>
            <th></th>
            <th>
              {t('blocking:BlockedUntil')}{' '}
              <ToolTip tabIndex="-1" message={t('blocking:BlockedUntilMessage')} />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td rowSpan="5">
              <TracksSelectDropDown
                data={this.props.UnassignedBlockingPolicySetTracks}
                onChange={e => this.props.handleTrackSelect(e)}
                setIndex={this.props.setIndex}
                t={t}
              />

              <TracksDropArea
                data={this.props.blockingSet.tracks}
                dragSource={this.props.dragSource}
                setIndex={this.props.setIndex}
                handleChildDrag={e => this.props.handleChildDrag(e)}
                handleDrop={e => this.props.handleChildDrop(e, this.props.setIndex)}
              />
            </td>
          </tr>
          {this.getSites()}
        </tbody>
      </Table>
    );
  }
}

export default BlockingSites;

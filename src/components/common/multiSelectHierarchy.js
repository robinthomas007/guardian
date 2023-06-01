import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './multiSelectHierarchy.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Api from '../../lib/api';
import _ from 'lodash';
import Spinner from '../../component_library/Spinner';
import { showNotyInfo, showNotyAutoError } from '../../components/Utils';

export default function MultiSelectHierarchy({
  handleChangeCheckbox,
  type,
  isMultiSelect,
  user,
  releasingLabels,
  selectedLabelIds,
  tagList,
}) {
  const [companyList, setcompanyList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [tagQuery, setTagQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState([]);
  const [previousSelectedLabel, setPreviousSelectedLabel] = useState([]);

  const didMountRef = useRef(false);

  const addSelectedList = (e, data) => {
    if (e.target.checked) {
      if (isMultiSelect) setSelectedList([...selectedList, data]);
      else setSelectedList([data]);
    } else {
      const removedSelectedList = selectedList.filter(item => item.value === data.value);
      console.log('removedSelectedList', removedSelectedList);
      const modificedList = selectedList.filter(item => item.value !== data.value);
      setSelectedList(modificedList);
    }
  };

  useEffect(() => {
    if (didMountRef.current) {
      handleChangeCheckbox(selectedList);
    } else {
      didMountRef.current = true;
    }
  }, [selectedList]);

  useEffect(() => {
    if (releasingLabels && releasingLabels.length > 0) {
      setcompanyList(releasingLabels);
    }
  }, [releasingLabels]);
  useEffect(() => {
    if (selectedList.length !== selectedLabelIds.length) {
      console.log('test', selectedLabelIds);
      setSelectedList(selectedLabelIds);
    }
  }, [selectedLabelIds]);

  useEffect(() => {
    if (searchInput.length < 3) {
      setSelectedTag(tagList);
    }
  }, [tagList]);

  useEffect(() => {
    if (searchInput.length >= 3) {
      setLoading(true);
      // let formattedSearchQuery = searchInput.replace(/[^\w\s]/gi, '');
      // console.log('desiredOutput', formattedSearchQuery);
      const payload = {
        SearchCriteria: {
          SearchTerm: searchInput,
          isAdmin: type === 'requestFormInput' ? true : user.IsAdmin,
        },
        languageCode: localStorage.getItem('languageCode') || 'en',
      };

      Api.post('/labels/search', payload)
        .then(res => {
          return res.json();
        })
        .then(res => {
          const result = res.Result;
          setcompanyList(result);
          const preRenderList = getDefaultSelectedList(result);
          console.log('prerender data', preRenderList);
          setPreviousSelectedLabel(preRenderList);
          console.log('result', res);
          if (
            res.TagList.length > 0 &&
            type !== 'requestFormInput' &&
            type !== 'releaseInfoInput'
          ) {
            setSelectedList(preRenderList);
            setSelectedTag(res.TagList);
          } else {
            setSelectedList([]);
            setSelectedTag([]);
            setTagQuery('');
          }

          setLoading(false);
        });
    } else {
      if (searchInput.length === 0) {
        setSelectedTag([]);
        if (releasingLabels && releasingLabels.length > 0) setcompanyList(releasingLabels);
      }
    }
  }, [searchInput]);

  const checkIfIdPresent = id => {
    let lablelIds = _.map(selectedList, 'value');
    if (lablelIds.includes(id)) return true;
    else return false;
  };

  const getDefaultSelectedList = list => {
    const result = [];
    if (list.length > 0)
      list.forEach((company, i) => {
        if (company.TagName && company.TagName !== '')
          result.push({ value: String(company.CompanyId), label: company.CompanyName });
        if (company.DivisionList.length > 0) {
          let divisionList = company.DivisionList;
          divisionList.forEach((division, i) => {
            if (division.TagName && division.TagName !== '')
              result.push({ value: String(division.DivisionId), label: division.DivisionName });
            if (division.LabelList.length > 0) {
              let LabelList = division.LabelList;
              LabelList.forEach((label, i) => {
                if (label.TagName && label.TagName !== '') {
                  result.push({ value: String(label.LabelId), label: label.LabelName });
                }
              });
            }
          });
        }
      });
    return result;
  };

  function checkEmpty(obj) {
    for (let key in obj) {
      if (obj[key] instanceof Object === true) {
        if (checkEmpty(obj[key]) === false) return false;
      } else {
        if (obj[key].length !== 0) return false;
      }
    }
    return true;
  }
  const removeTag = tagName => {
    const labelIds = selectedList.map(list => Number(list.value));
    console.log('selectedList#####', labelIds);
    const payload = {
      LabelsId: [],
      TagName: tagName,
      User: {
        email: user.email,
      },
      IsDeleted: true,
      Tracking: null,
    };

    Api.post('/labels/labeltag', payload)
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.ValidTagName) {
          showNotyInfo('Successfully removed the label');
          setSelectedList([]);
          setSelectedTag([]);
          // setSelectedList([]);
          // setSelectedTag([]);
          setTagQuery('');
          setSearchInput('');
        } else {
          showNotyAutoError('Something went wrong, please try again!');
        }
      })
      .catch(e => {
        console.log('Error ', e);
      });
  };
  useEffect(() => {
    setTagQuery('');
  }, [selectedTag]);
  const addTag = () => {
    if (selectedList.length > 0) {
      const labelIds = selectedList.map(list => Number(list.value));

      const previousLabelIds = previousSelectedLabel.map(list => Number(list.value));
      const addNewLabelIds = labelIds.filter(val => !previousLabelIds.includes(val));
      console.log('add selectedlist', labelIds);
      console.log('previous-selectedlist', addNewLabelIds);

      setSelectedTag([...selectedTag, { name: tagQuery, id: null }]);
      const payload = {
        LabelsId: selectedTag.length > 0 ? addNewLabelIds : labelIds,
        TagName: tagQuery,
        User: {
          email: user.email,
        },
        IsDeleted: false,
        Tracking: null,
      };
      console.log('add---payload ', payload);
      Api.post('/labels/labeltag', payload)
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.ValidTagName) {
            // setTagQuery('Must Remove Existing Tag');
            // setSelectedList([...selectedList])

            setPreviousSelectedLabel([]);
            showNotyInfo('Successfully added the new label');
          } else {
            showNotyAutoError('Label not allowed to associate more than one Tag');
          }
        });
    }
  };

  const renderCompanies = companyList => {
    return (
      <div>
        {user.IsAdmin && companyList.length > 0 && (
          <span className="sub-title">Select Options from Search Results</span>
        )}
        {companyList.map((company, i) => {
          const { CompanyId, CompanyName, TagName } = company;
          const hasComapny = CompanyId ? true : false;
          return (
            <div className="company-wrapper" key={i}>
              {CompanyId && (
                <div className="inside-wrapper">
                  <label className="custom-checkbox msh-checkbox">
                    <input
                      id="company"
                      className="form-control"
                      type="checkbox"
                      name={CompanyId}
                      checked={checkIfIdPresent(String(CompanyId))}
                      onChange={e =>
                        addSelectedList(e, { value: String(CompanyId), label: CompanyName })
                      }
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>
                    {CompanyName} (Company) {TagName !== '' && renderTagName(TagName, CompanyId)}
                  </span>
                </div>
              )}
              {company.DivisionList &&
                company.DivisionList.length > 0 &&
                renderDivisions(company.DivisionList, hasComapny)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDivisions = (divisionList, hasComapny) => {
    return (
      <div className={`${!hasComapny ? 'rmvPadDivisonLabel' : ''} divison-wrapper`}>
        {divisionList.map((division, i) => {
          const { DivisionId, DivisionName, TagName } = division;
          const hasDivision = DivisionId ? true : false;
          return (
            <div key={i}>
              {DivisionId && (
                <div className="inside-wrapper ">
                  {hasComapny && (
                    <div className="tree">
                      <div className={`${i === 0 ? 'vl' : 'vl ex-ht'}`}></div>
                      <div className="hl"></div>
                    </div>
                  )}
                  <label className="custom-checkbox msh-checkbox">
                    <input
                      id="division"
                      className="form-control"
                      type="checkbox"
                      name={DivisionId}
                      checked={checkIfIdPresent(String(DivisionId))}
                      onChange={e =>
                        addSelectedList(e, { value: String(DivisionId), label: DivisionName })
                      }
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>
                    {DivisionName} (Division) {TagName !== '' && renderTagName(TagName, DivisionId)}
                  </span>
                </div>
              )}
              {division.LabelList.length > 0 && renderLabels(division.LabelList, hasDivision)}
            </div>
          );
        })}
      </div>
    );
  };

  const removeSingleTag = (tagName, labelId) => {
    console.log('remove single label from tag', labelId);
    // const labelIds = selectedList.map(list => Number(list.value));
    // console.log('selectedList#####', labelIds);
    const modifiedSelectedList = selectedList.filter(list => list.value !== String(labelId));
    console.log('modifiedSelectedList', modifiedSelectedList);
    const payload = {
      LabelsId: [labelId],
      TagName: tagName,
      User: {
        email: user.email,
      },
      IsDeleted: true,
      Tracking: null,
    };

    Api.post('/labels/labeltag', payload)
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.ValidTagName) {
          showNotyInfo('Successfully removed the label');
          // setSelectedList(modifiedSelectedList);
          // setSelectedList([]);
          // setSelectedTag([]);
          // setSelectedList([]);
          // setSelectedTag([]);
          // setTagQuery('');
          setSearchInput('');
        } else {
          showNotyAutoError('Something went wrong, please try again!');
        }
      })
      .catch(e => {
        console.log('Error ', e);
      });
  };

  const renderTagName = (TagName, labelId) => {
    if (isMultiSelect && type !== 'requestFormInput') {
      return (
        <span className="tags_wrapper">
          <button
            type="button"
            className="tag-btn"
            onClick={() => removeSingleTag(TagName, labelId)}
          >
            <span className="tag-label">{TagName}</span>
            <i className="material-icons tag-clear-btn">close</i>
          </button>
        </span>
      );
    }
    return null;
  };

  const renderLabels = (LabelList, hasDivision) => {
    return (
      <div className={`${!hasDivision ? 'rmvPadLabel' : ''} label-wrapper`}>
        {LabelList.map((label, i) => {
          const { LabelId, LabelName, TagName } = label;
          return (
            <div key={i}>
              {hasDivision && (
                <div className="tree">
                  <div className={`${i === 0 ? 'vl' : 'vl ex-ht'}`}></div>
                  <div className="hl"></div>
                </div>
              )}
              <label className="custom-checkbox msh-checkbox">
                <input
                  id="label"
                  className="form-control"
                  type="checkbox"
                  name={LabelId}
                  checked={checkIfIdPresent(String(LabelId))}
                  onChange={e => addSelectedList(e, { value: String(LabelId), label: LabelName })}
                />
                <span className="checkmark "></span>
              </label>
              <span>
                {LabelName} (Label) {TagName !== '' && renderTagName(TagName, LabelId)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="ms-dropdown-wrapper">
      <Dropdown className={`d-inline ${type}`} autoclose="inside">
        <Dropdown.Toggle id="dropdown-autoclose-inside" className="ms-dropdown-toggle">
          {selectedList.length > 1
            ? selectedList.length + ' Selected'
            : selectedList.length === 1
            ? selectedList[0].label
            : 'Select Options'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="msh-wrapper">
            <div className="main-title">Companies, Divisions & Labels</div>
            {user.IsAdmin && (
              <div className="search-input">
                <Form.Control
                  type="text"
                  name="searchInput"
                  className="form-control"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                />
                <i className="material-icons search-icon">search</i>
              </div>
            )}
            <div className="msh-content">
              <div className="spinner">
                <Spinner show={loading} />
              </div>
              {companyList.length === 1 && checkEmpty(companyList) ? (
                <span className="sub-title">No Results Found! Please try again.</span>
              ) : (
                renderCompanies(companyList)
              )}

              {/* {companyList.length > 0 && renderCompanies(companyList)} */}
            </div>
            {/* isMultiSelect && type !== 'requestFormInput' */}
            {isMultiSelect && type !== 'requestFormInput' && (
              <div className="tags_wrapper">
                <div className="main-title">Tags</div>

                <p className="tag-sub-title">
                  <p>Companies, Divisions & Labels associated with</p>
                  <p> a tag will no longer be displayed as options </p>
                  <p>within search.</p>
                </p>
                <div className="search-input">
                  <Form.Control
                    type="text"
                    name="tagQuery"
                    className="form-control"
                    value={tagQuery}
                    onChange={e => setTagQuery(e.target.value)}
                  />
                  <button className="tagCloseButton" onClick={addTag}>
                    <i className="material-icons plus-icon">add_box</i>
                  </button>
                </div>
                <div className="btn-tagList">
                  {selectedTag.map((tagList, index) => (
                    <div key={index}>
                      <button
                        type="button"
                        className="tag-btn"
                        onClick={() => removeTag(tagList.name)}
                      >
                        <span className="tag-label">{tagList.name}</span>
                        <i className="material-icons tag-clear-btn">close</i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* <div className="invalid-tooltip">Label is required.</div> */}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

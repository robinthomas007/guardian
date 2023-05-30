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
}) {
  const [companyList, setcompanyList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [tagQuery, setTagQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState([]);

  const didMountRef = useRef(false);

  const addSelectedList = (e, data) => {
    if (e.target.checked) {
      if (isMultiSelect) setSelectedList([...selectedList, data]);
      else setSelectedList([data]);
    } else {
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
      setSelectedList(selectedLabelIds);
    }
  }, [selectedLabelIds]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (searchInput.length >= 3) {
      setLoading(true);
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
          console.log('result', res);
          if (res.Tags.length > 0 && res.Tags[0].name !== undefined) {
            // setSelectedList([...selectedList, { label: res.Tags[0].name, value: res.Tags[0].id }]);
            setSelectedList(preRenderList);
            setSelectedTag([{ tag: res.Tags[0].name, labelIds: [res.Tags[0].id] }]);
          }

          setLoading(false);
        });
    } else {
      if (searchInput.length === 0) {
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
        if (company.TagId && company.TagId !== '0')
          result.push({ value: String(company.CompanyId), label: company.CompanyName });
        if (company.DivisionList.length > 0) {
          let divisionList = company.DivisionList;
          divisionList.forEach((division, i) => {
            if (division.TagId && division.TagId !== '0')
              result.push({ value: String(division.DivisionId), label: division.DivisionName });
            if (division.LabelList.length > 0) {
              let LabelList = division.LabelList;
              LabelList.forEach((label, i) => {
                if (label.TagId && label.TagId !== '0') {
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
  const removeTag = label => {
    const labelIds = selectedList.map(list => Number(list.value));
    console.log('selectedList#####', labelIds);
    const payload = {
      LabelsId: labelIds,
      TagName: selectedTag[0].tag,
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
      setSelectedTag([{ tag: tagQuery, labelIds: labelIds }]);
      const payload = {
        LabelsId: labelIds,
        TagName: tagQuery,
        User: {
          email: user.email,
        },
        IsDeleted: false,
        Tracking: null,
      };

      Api.post('/labels/labeltag', payload)
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.ValidTagName) {
            showNotyInfo('Successfully added the new label');
          } else {
            showNotyAutoError('Something went wrong, please try again!');
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
          const { CompanyId, CompanyName, TagId } = company;
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
                  <span>{CompanyName} (Company)</span>
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
          const { DivisionId, DivisionName } = division;
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
                  <span>{DivisionName} (Division)</span>
                </div>
              )}
              {division.LabelList.length > 0 && renderLabels(division.LabelList, hasDivision)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderLabels = (LabelList, hasDivision) => {
    return (
      <div className={`${!hasDivision ? 'rmvPadLabel' : ''} label-wrapper`}>
        {LabelList.map((label, i) => {
          const { LabelId, LabelName, TagId } = label;
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
              <span>{LabelName} (Label)</span>
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
            {isMultiSelect && (
              <div className="tags_wrapper">
                <div className="main-title">Tags</div>

                <p className="tag-sub-title">
                  Companies, Divisions & Labels associated with a tag will no longer be displayed as
                  options within search.
                </p>
                <div className="search-input">
                  <Form.Control
                    type="text"
                    name="tagQuery"
                    className="form-control"
                    value={tagQuery}
                    onChange={e => setTagQuery(e.target.value)}
                  />
                  <i onClick={addTag} className="material-icons plus-icon">
                    add_box
                  </i>
                </div>
                {selectedTag.length > 0 && (
                  <div>
                    <button type="button" className="tag-btn" onClick={() => removeTag()}>
                      <span className="tag-label">{selectedTag[0].tag}</span>
                      <i className="material-icons tag-clear-btn">close</i>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* <div className="invalid-tooltip">Label is required.</div> */}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

import React from 'react';

function LabelSelectHierarchy({
  releasingLabels,
  handleChangeCheckbox,
  isMultiSelect,
  selectedLabel,
}) {
  const renderCompanies = companyList => {
    return (
      <div>
        {companyList.map((company, i) => {
          const { CompanyId, CompanyName } = company;
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
                      checked={selectedLabel.includes(CompanyId) ? true : false}
                      onChange={e =>
                        handleChangeCheckbox(e, {
                          CompanyId,
                          CompanyName,
                          isMultiSelect,
                        })
                      }
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>{CompanyName} (Company)</span>
                </div>
              )}
              {company.DivisionList.length > 0 && renderDivisions(company.DivisionList, hasComapny)}
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
                      checked={selectedLabel.includes(DivisionId) ? true : false}
                      onChange={e =>
                        handleChangeCheckbox(e, { DivisionId, DivisionName, isMultiSelect })
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
      <div className={`${!hasDivision ? 'rmvPadDivisonLabel' : ''} label-wrapper`}>
        {LabelList.map((label, i) => {
          const { LabelId, LabelName } = label;
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
                  checked={selectedLabel.includes(LabelId) ? true : false}
                  onChange={e => handleChangeCheckbox(e, { LabelId, LabelName, isMultiSelect })}
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

  return <>{releasingLabels.length > 0 && renderCompanies(releasingLabels)}</>;
}

export default LabelSelectHierarchy;

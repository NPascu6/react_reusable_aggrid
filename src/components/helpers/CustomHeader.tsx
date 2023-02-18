import { GridApi } from 'ag-grid-community';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/headerStyles.css'
const CustomHeader = (props: {
  showColumnMenu: (arg0: null) => void;
  column: {
    isSortAscending: () => any;
    isSortDescending: () => any;
    addEventListener: (arg0: string, arg1: () => void) => void;
  };
  setSort: (arg0: string, arg1: boolean) => void;
  api: GridApi;
  enableMenu: any;
  menuIcon: any;
  enableSorting: any;
  filters: any;
  displayName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
  const [ascSort, setAscSort] = useState('inactive');
  const [descSort, setDescSort] = useState('inactive');
  const [, setNoSort] = useState('inactive');
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'active'
        : 'inactive'
    );
  };

  const onSortRequested = (order: string, event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="icon-container"
        onClick={() => onMenuClicked()}
      >
        <i className={`icon ag-theme-alpine ${props.menuIcon ?? 'ag-icon-menu'}`}></i>
      </div>
    );
  }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div style={{ display: 'flex', justifySelf: 'flex-end' }}>
        {(ascSort !== 'inactive' || descSort !== 'inactive' || Object.keys(props.filters)[0]) && <div className='icon-container'
          onClick={(event) => Object.keys(props.filters)[0] ? props.api.setFilterModel(null) : onSortRequested('inactive', event)}
          onTouchEnd={(event) => Object.keys(props.filters)[0] ? props.api.setFilterModel(null) : onSortRequested('inactive', event)}
        >
          <i className="icon ag-theme-alpine ag-icon-cancel"></i>
        </div>}
        {descSort === 'inactive' && ascSort === 'inactive' && <div className='icon-container'
          onClick={(event) => onSortRequested('asc', event)}
          onTouchEnd={(event) => onSortRequested('asc', event)}
        >
          <i className="icon ag-theme-alpine ag-icon-arrows"></i>
        </div>}
        {descSort !== 'inactive' && <div className='icon-container'
          onClick={(event) => onSortRequested('asc', event)}
          onTouchEnd={(event) => onSortRequested('asc', event)}
        >
          <i className="icon ag-theme-alpine ag-icon-desc"></i>
        </div>}
        {ascSort !== 'inactive' && <div className='icon-container'
          onClick={(event) => onSortRequested('desc', event)}
          onTouchEnd={(event) => onSortRequested('desc', event)}
        >
          <i className="icon ag-theme-alpine ag-icon-asc"></i>
        </div>}
      </div>
    );
  }

  return (
    <div className="custom-header-container">
      <div className="customHeaderLabel">{props.displayName}</div>
      <div className="custom-header-container-child-container">{sort}{menu}</div>
    </div>
  );
};

export default CustomHeader;
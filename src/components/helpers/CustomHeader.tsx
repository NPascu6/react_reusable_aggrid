import { Box } from '@mui/material';
import { GridApi } from 'ag-grid-community';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../colors/colors';
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
  headerStyle: React.CSSProperties;
  sortAscendingIcon: any;
  sortDescendingIcon: any;
  enableSorting: any;
  filters: any;
  showCancelFilterIcon: boolean;
  displayName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
  const [ascSort, setAscSort] = useState('inactive');
  const [descSort, setDescSort] = useState('inactive');
  const refButton = useRef(null);
  const [hover, setHover] = useState(false);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
  };

  const onSortRequested = (order: string, event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClass = () => {
    if (hover) {
      return 'ag-theme-alpine ag-icon-aggregation-hover';
    }
    if (props?.filters.length > 0) {
      return 'ag-theme-alpine ag-icon-aggregation-active';
    }
    if (props.column.isSortAscending()) {
      return 'ag-theme-alpine ag-icon-asc-active-header';
    }
    if (props.column.isSortDescending()) {
      return 'ag-theme-alpine ag-icon-desc-active-header';
    }
    return 'ag-theme-alpine ag-icon-aggregation';
  }

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="icon-container"
        onClick={() => onMenuClicked()}
      >
        <i className={`icon ${getClass()}`}></i>
      </div>
    );
  }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <>
        {props?.filters &&
          (ascSort !== 'inactive' || descSort !== 'inactive' || Object.keys(props?.filters)[0]) &&
          props.showCancelFilterIcon && <div className='icon-container'
            onClick={(event) => Object.keys(props?.filters)[0] ? props.api.setFilterModel(null) : onSortRequested('inactive', event)}
            onTouchEnd={(event) => Object.keys(props?.filters)[0] ? props.api.setFilterModel(null) : onSortRequested('inactive', event)}
          >
            <i className="icon ag-theme-alpine ag-icon-cancel"></i>
          </div>}
      </>
    );
  }

  return (
    <Box className="custom-header-container"
      onClick={onMenuClicked}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        ...props?.headerStyle,
        display: 'flex',
        justifySelf: 'flex-end',
        color: (descSort !== 'inactive' || ascSort !== 'inactive' || props?.filters?.length > 0) ? colors.core.reflexBlue[100] : 'black',
        opacity: (descSort !== 'inactive' || ascSort !== 'inactive' || props?.filters?.length > 0) ? 1 : 0.7,
        '&:hover': {
          color: colors.core.reflexBlue[100],
          fontWeight: 'bold',
          opacity: 1
        }
      }}>
      <div className="customHeaderLabel">{props?.displayName}</div>
      <div className="custom-header-container-child-container">{sort}{menu}</div>
    </Box>
  );
};

export default CustomHeader;
import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/iconStyles.css';
import '../styles/gridStyles.css';
import '../fonts/fonts.css';

import {
    ColDef,
    GridApi,
    GetRowIdParams,
    ColGroupDef,
    FirstDataRenderedEvent,
    GridReadyEvent,
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
    FilterChangedEvent,
    RowStyle,
    ITooltipParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import CustomTooltip from './components/CustomTooltip';
import customHeader from './components/CustomHeader';
import CustomPagination, { setLastButtonDisabled } from './components/CustomPagination';
import CustomFilterMenu from './components/CustomFilterMenu';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/gridTheme';

/**
 * Aggrid props
 * @param items: any[] - data to be displayed in the grid
 * @param rowStyle?: React.CSSProperties - style for the row
 * @param getColumnDefs: (ColDef | ColGroupDef)[] - column definitions for the grid
 * @param rowKey: string - key for the row
 * @param onRowSelected?: any - callback for row selection
 * @param showPagination?: boolean - show pagination
 * @param defaultRowsPerPage?: number - default rows per page
 * @param loadingMessage?: string - loading message
 * @param gridStyle?: React.CSSProperties - style for the grid
 * @param containerStyle?: React.CSSProperties - style for the container
 * @param tooltipField?: string - field for the tooltip
 * @param rowHeight?: number - row height
 * @param cancelFilterIcon?: any - cancel filter icon
 * @param suppressMenu?: boolean - suppress menu
 * @param showLoadingOverlay?: boolean - show loading overlay
 * @param enableRangeSelection?: boolean - enable range selection
 * @param showHeaderFilterIcon?: boolean - show header filter icon
 * @param noRowsMessage?: string - no rows message
 * @param openFilterMenuOnHeaderClick?: boolean - open filter menu on header click
 * @param customTooltip?: (params: ITooltipParams) => JSX.Element - custom tooltip
 * @param customHeader?: (props: ITooltipParams & { color: string }) => JSX.Element - custom header
 * @param onFilterChanged?: (event: FilterChangedEvent) => void - callback for filter change
 * @param onCellEditingStarted?: (event: CellEditingStartedEvent) => void - callback for cell editing started
 * @param onCellEditingStopped?: (event: CellEditingStoppedEvent) => void - callback for cell editing stopped
 * @param headerComponentStyle?: CSSProperties - style for the header component
 */
interface AGGridProps {
    items: any[];
    getColumnDefs: (ColDef | ColGroupDef)[];
    gridApi?: GridApi;
    setGridApi?: any;
    rowStyle?: RowStyle;
    rowKey: string;
    onRowSelected?: any
    showPagination?: boolean;
    defaultRowsPerPage?: number;
    loadingMessage?: string;
    gridStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    tooltipField?: string;
    rowHeight?: number;
    cancelFilterIcon?: any;
    suppressMenu?: boolean;
    showLoadingOverlay?: boolean;
    enableRangeSelection?: boolean;
    showHeaderFilterIcon?: boolean;
    noRowsMessage?: string;
    openFilterMenuOnHeaderClick?: boolean;
    headerComponentStyle?: CSSProperties;
    customTooltip?: (params: ITooltipParams) => JSX.Element;
    customHeader?: (props: ITooltipParams & {
        color: string;
    }) => JSX.Element;
    onFilterChanged?: (event: FilterChangedEvent) => void;
    onCellEditingStarted?: (event: CellEditingStartedEvent) => void;
    onCellEditingStopped?: (event: CellEditingStoppedEvent) => void;
}

/**
 * Aggrid props:
 * @param items: any[] - data to be displayed in the grid
 * @param rowStyle?: React.CSSProperties - style for the row
 * 
 * ---------------------------------------------------------------------------------------------------------------------
 * 
 * @param getColumnDefs: (ColDef | ColGroupDef)[] - column definitions for the grid :
 * 
 * {
 * 
 *  @param headerName:string, 
 *  @param field=string, 
 *  @param width?=number, 
 *  @param height?=number,
 *  @param minWidth?: =number, 
 *  @param minHeight?=number,
 *  @param maxWidth?=number, 
 *  @param maxHeight?=number,
 *  @param sortable?=boolean,
 *  @param enableRowGroup?=boolean,
 *  @param tootltipField?=string,
 *  @param type?=['dateColumn', 'numberColumn', 'textColumn', 'nonEditableColumn'],
 *  @param editable?=boolean,
 *  @param filter?='agTextColumnFilter', 'agNumberColumnFilter', 'agDateColumnFilter',
 *  @param cellStyle?=(params: any) => React.CSSProperties,
 *  @param cellRenderer?=(params: any) => React.ReactNode,
 *  @param cellEditor?=(params: any) => React.ReactNode,
 *  @param valueFormatter?=(params: any) => React.ReactNode,
 *  @param valueGetter?=(params: any) => React.ReactNode,
 *  @param valueSetter?=(params: any) => React.ReactNode,
 *  @param onCellValueChanged?=(params: any) => React.ReactNode,
 *  @param onCellEditingStarted?=(params: any) => React.ReactNode,
 *  @param onCellEditingStopped?=(params: any) => React.ReactNode,
 *  @param onCellFocused?=(params: any) => React.ReactNode,
 *  @param onCellClicked?=(params: any) => React.ReactNode,
 *  @param onCellDoubleClicked?=(params: any) => React.ReactNode,
 *  @param onCellContextMenu?=(params: any) => React.ReactNode,
 *  @param rowHeight?=number,    
 *  @param rowGroup?=boolean,
 *  @param rowDrag?=boolean,
 *  @param sort?=string, 'asc', 'desc'
 *  @param pinned?=string, 'left', 'right'
 *  @param lockPosition?=boolean,
 *  @param cellClass?=(params: any) => string | string[],
 *  @param children?=(ColDef | ColGroupDef)[], 
 *  @param headerClass?=(params: any) => string | string[],
 *  @param menuIcon:string,
 *  @param toolPanel:string,
 *  @param toolPanelParams?:any

 * }

 * ---------------------------------------------------------------------------------------------------------------------

 * @param onFilterChanged?=(event: FilterChangedEvent) => void, method with param event for filter change contains property data of the row.
 * @param onCellEditingStarted?=(event: CellEditingStartedEvent) => void, method with param event for cell editing start contains property data of the row.
 * @param onCellEditingStopped?=(event: CellEditingStoppedEvent) => void,
 * @param rowKey: string - row id (unique key - property name)
 * @param onRowSelected?: any - callback for row selection
 * @param showPagination?: boolean - show pagination
 * @param defaultRowsPerPage?: number - default rows per page
 * @param loadingMessage?: string - loading message
 * @param gridStyle?: React.CSSProperties - style for the grid
 * @param containerStyle?: React.CSSProperties - style for the container
 * @param cancelFilterIcon?: any - cancel filter icon
 * @param showHeaderFilterIcon?: boolean - show filter icon in header
 * @param openFilterMenuOnHeaderClick?: boolean - open filter menu on header click
 * @param customHeader?: React.component - custom header
 * @param customTooltip?: React.component - custom tooltip
 * @param noRowsMessage?: string - no rows message
 */
const AGGridComponent = (props: AGGridProps) => {
    const gridRef = useRef<AgGridReact<any>>(null);
    const [gridApi, setGridApi] = React.useState<GridApi | undefined>();
    const containerStyle: CSSProperties = useMemo(() => ({ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', padding: '0.5em' }), []);
    const [filters, setFilters] = useState<any>({}); // filters state
    const defaultRowStyle: RowStyle | undefined = useMemo(() => ({ cursor: 'pointer', backgroundColor: 'white' }), []);
    const [paginationPageSize, setPaginationPageSize] = useState<number>(props.defaultRowsPerPage ?? 10);

    useEffect(() => {
        if (gridApi) {
            const filters = gridApi.getFilterModel();
            setFilters(filters);
        }
    }, [gridApi]);

    const DefaultColumnDef = useMemo(() => ({
        enableCellChangeFlash: true,
        editable: true,
        sortable: true,
        flex: 1,
        resizable: true,
        filter: CustomFilterMenu,
        tooltipComponent: props.customTooltip ?? CustomTooltip,
        headerComponentParams: {
            filters: filters,
            headerStyle: props.headerComponentStyle ?? { backgroundColor: 'white', height: '100%', width: '100%', opacity: '0.7', fontWeight: 'bold', color: 'black' },
            cancelFilterIcon: props.cancelFilterIcon ?? 'fa-times',
            showHeaderFilterIcon: props.showHeaderFilterIcon ?? true,
            openFilterMenuOnHeaderClick: props.openFilterMenuOnHeaderClick ?? true,
        },
    }), [filters, props.cancelFilterIcon, props.openFilterMenuOnHeaderClick, props.showHeaderFilterIcon, props.customTooltip, props.headerComponentStyle]);

    /**
     * Sets row id to each row in the ag grid
     * @param params
     */
    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data[props.rowKey]
    }, [props]);

    /**
     * Sets colum to fit on start
     * @param params
     */
    const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
        params.api.sizeColumnsToFit();
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
        if (props.setGridApi) {
            props.setGridApi(params.api);
        }
    }, [props]);

    const onCellEditingStarted = useCallback((event: CellEditingStartedEvent) => {
        console.log('cellEditingStarted', event);
    }, []);

    const onCellEditingStopped = useCallback((event: CellEditingStoppedEvent) => {
        console.log('cellEditingStopped', event);
    }, []);

    const getRowStyle = useCallback((params: any) => {
        return props.rowStyle ?? defaultRowStyle;
    }, [defaultRowStyle, props.rowStyle]);

    const onFilterChanged = useCallback((event: FilterChangedEvent) => {
        const filters = event.api.getFilterModel();
        setFilters(filters);
    }, []);

    const components = useMemo<{
        [p: string]: any;
    }>(() => {
        return {
            agColumnHeader: props.customHeader ?? customHeader,
        };
    }, [props.customHeader]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationTotalPages, setPaginationTotalPages] = useState<number>(0);
    const [lastPageFound, setLastPageFound] = useState<boolean>(false);


    const onPaginationChanged: any = useCallback(() => {
        // Workaround for bug in events order
        if (gridRef?.current?.api) {
            const paginationGetTotalPages = gridRef.current.api.paginationGetTotalPages()
            const paginationGetCurrentPage = gridRef.current.api.paginationGetCurrentPage()
            const paginationIsLastPageFound = gridRef.current.api.paginationIsLastPageFound()
            setPaginationTotalPages(paginationGetTotalPages);
            setCurrentPage(paginationGetCurrentPage + 1);
            setLastPageFound(paginationIsLastPageFound);
            setLastButtonDisabled(!paginationIsLastPageFound);
        }
    }, []);

    return <ThemeProvider theme={theme}>
        <div style={props.containerStyle ?? containerStyle}>
            <div style={props?.gridStyle ?? gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    onFirstDataRendered={onFirstDataRendered}
                    rowData={props.items}
                    rowHeight={props.rowHeight ?? 40}
                    pagination={props?.showPagination}
                    paginationPageSize={paginationPageSize}
                    cellFlashDelay={1000}
                    columnDefs={props?.getColumnDefs}
                    getRowId={getRowId}
                    tooltipShowDelay={150}
                    ensureDomOrder={true}
                    suppressMenuHide={props?.showHeaderFilterIcon ?? true}
                    rowSelection={'single'}
                    onFilterChanged={props.onFilterChanged ?? onFilterChanged}
                    onGridReady={onGridReady}
                    onCellEditingStarted={onCellEditingStarted ?? null}
                    onCellEditingStopped={onCellEditingStopped ?? null}
                    suppressPaginationPanel={false}
                    getRowStyle={getRowStyle}
                    animateRows={true}
                    defaultColDef={DefaultColumnDef}
                    components={components}
                    onPaginationChanged={onPaginationChanged}
                    overlayLoadingTemplate={
                        props?.loadingMessage ?? '<span class="ag-overlay-loading-center">Please wait, loading...</span>'
                    }
                    overlayNoRowsTemplate={
                        props?.noRowsMessage ?? '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">This is a custom \'no rows\' overlay</span>'
                    }
                >
                </AgGridReact>
            </div>
            <CustomPagination
                gridRef={gridRef}
                pageSize={paginationPageSize}
                setPaginationPageSize={setPaginationPageSize}
                currentPage={currentPage}
                totalPages={paginationTotalPages}
                lastPageFound={lastPageFound}
            />
        </div>
    </ThemeProvider>

};

export default AGGridComponent
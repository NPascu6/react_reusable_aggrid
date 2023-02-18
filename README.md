# react_reusable_aggrid

React AGGrid component, to which we can pass dynamic props. 
I've encapsulated most of the initial typescript config from <https://www.ag-grid.com/react-data-grid/getting-started/>
here you can also find more docs about how AGGrid works.

You can uses ColDef | ColGroupDef from aggrid comunity if you need the type: https://www.npmjs.com/package/ag-grid-community

## ---------------------------------------------------------------------------------------------------

## Main props:

## @param items: any[]
 data to be displayed in the grid

## @param rowStyle?: React.CSSProperties
 style for the row

## ----------------------------------------------------------------------------------------------------

## @param getColumnDefs: (ColDef | ColGroupDef)[]  
==column definitions for the grid==

~~~json

{

 @param headerName:string Name to be shown as header.
 @param field=string Property to show in the column.
 @param width?=number
 @param height?=number
 @param minWidth?: =number
 @param minHeight?=number
 @param maxWidth?=number
 @param maxHeight?=number
 @param sortable?=boolean
 @param enableRowGroup?=boolean
 @param tootltipField?=string
 @param type?=['dateColumn', 'numberColumn', 'textColumn', 'nonEditableColumn']
 @param editable?=boolean
 @param filter?='agTextColumnFilter', 'agNumberColumnFilter', 'agDateColumnFilter'
 @param cellStyle?=(params: any) => React.CSSProperties
 @param cellRenderer?=(params: any) => React.ReactNode
 @param cellEditor?=(params: any) => React.ReactNode
 @param valueFormatter?=(params: any) => React.ReactNode
 @param valueGetter?=(params: any) => React.ReactNode
 @param valueSetter?=(params: any) => React.ReactNode
 @param onCellValueChanged?=(params: any) => React.ReactNode
 @param onCellEditingStarted?=(params: any) => React.ReactNode
 @param onCellEditingStopped?=(params: any) => React.ReactNode
 @param onCellFocused?=(params: any) => React.ReactNode
 @param onCellClicked?=(params: any) => React.ReactNode
 @param onCellDoubleClicked?=(params: any) => React.ReactNode
 @param onCellContextMenu?=(params: any) => React.ReactNode
 @param rowHeight?=number
 @param rowGroup?=boolean
 @param rowDrag?=boolean
 @param sort?=string, 'asc', 'desc'
 @param pinned?=string, 'left', 'right'
 @param lockPosition?=boolean
 @param cellClass?=(params: any) => string | string[]
 @param children?=(ColDef | ColGroupDef)[]
 @param headerClass?=(params: any) => string | string[]
 @param menuIcon:string
 @param toolPanel:string
 @param toolPanelParams?:any

 }
 
~~~

## -----------------------------------------------------------------------------------------------------

## @param onFilterChanged?=(event: FilterChangedEvent) => void
 method with param event for filter change contains property data of the row

## @param onCellEditingStarted?=(event: CellEditingStartedEvent) => void
method with param event for cell editing start contains property data of the row

## @param onCellEditingStopped?=(event: CellEditingStoppedEvent) => void
method with param event for cell editing end contains property data of the row

## @param rowKey: string rowId
(unique key - property name)

## @param onRowSelected?: () => any
callback for row selection

## @param showPagination?: boolean

## @param defaultRowsPerPage?: number

## @param loadingMessage?: string

## @param gridStyle?: React.CSSProperties 
style for the grid

## @param containerStyle?: React.CSSProperties 
style for the container of the grid

## ------------------------------------------------------------------------------------------------------

## EXAMPLE USSAGE

## --------------------------------------------------------------------------------------------------------

~~~javscript

{

import { ColDef, ColGroupDef } from 'ag-grid-community';
import React, { useMemo } from 'react';

import CustomAgGrid from './components/grid/Grid';

function App() {
  const getUserColumnDefs: (ColDef | ColGroupDef)[] = useMemo(() => {
    return [
      {
        headerName: 'UserId',
        field: 'userId',
        minWidth: 30,
        sortable: true,
        tooltipField: 'userId',
      },
      {
        headerName: 'User Name',
        field: 'userName',
        minWidth: 30,
        sortable: true,
        tooltipField: 'userName',
      },
      {
        headerName: 'Email',
        field: 'email',
        minWidth: 30,
        sortable: true,
        tooltipField: 'email',
      }
    ];
  }, []);

  return (
    <div className="App">
      <CustomAgGrid
        items={[{ userId: 1, userName: 'test', email: 'test@test' },
        { userId: 2, userName: 'testa', email: 'test@test' },
        { userId: 3, userName: 'atests', email: 'test@test' },
        { userId: 4, userName: 'atestd', email: 'test@test' },
        { userId: 5, userName: 'dteste', email: 'test@test' },
        { userId: 6, userName: 'dtestf', email: 'test@test' },
        { userId: 7, userName: 'testa', email: 'test@test' },
        { userId: 8, userName: 'test', email: 'test@test' },
        { userId: 9, userName: 'test', email: 'test@test' },
        { userId: 10, userName: 'dtest', email: 'test@test' },
        { userId: 11, userName: 'dtest', email: 'test@test' },
        { userId: 12, userName: 'ctest', email: 'test@test' },
        { userId: 13, userName: 'test', email: 'test@test' },
        { userId: 14, userName: '77test', email: 'test@test' },
        { userId: 15, userName: '6uktest', email: 'test@test' },
        { userId: 17, userName: '5test', email: 'test@test' },
        { userId: 18, userName: 'yytest', email: 'test@test' },
        { userId: 19, userName: 'atest', email: 'test@test' },
        { userId: 20, userName: 'zfdtest', email: 'test@test' },
        { userId: 21, userName: 'xtest', email: 'test@test' },
        { userId: 22, userName: 'stest', email: 'test@test' },
        { userId: 23, userName: 'atest', email: 'test@test' },
        { userId: 24, userName: '3test', email: 'test@test' }
        ]}
        rowHeight={30}
        showPagination={true}
        defaultRowsPerPage={20}
        showHeaderFilterIcon={true}
        getColumnDefs={getUserColumnDefs}
        rowKey={'userId'} />
    </div>
  );
}

export default App;

}
~~~

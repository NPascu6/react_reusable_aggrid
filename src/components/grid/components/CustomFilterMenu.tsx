import React, {
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import { Box, Button, Checkbox, Grid, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { colors } from '../../colors/colors';

const CustomFilter = React.forwardRef((props: IFilterParams, ref: any) => {
    const [filterText, setFilterText] = useState<string | undefined>(undefined);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [colId, setColId] = useState<string>('');
    const [filterActive, setFilterActive] = useState<string>('');
    const [hover, setHover] = useState<string>('');

    useEffect(() => {
        if (props.colDef?.field) {
            setColId(props.colDef?.field)
        }
    }, [props.colDef.field])

    const onSortRequested = (order: "desc" | "asc" | null | undefined, colId: string) => {
        props.columnApi.applyColumnState({
            state: [{ colId: colId, sort: order }],
            defaultState: { sort: null },
        });
        setFilterActive(order ?? '');
    };

    // expose AG Grid Filter Lifecycle callbacks
    useImperativeHandle(ref, () => {
        return {
            doesFilterPass(params: IDoesFilterPassParams) {
                const { api, colDef, column, columnApi, context } = props;
                const { node } = params;

                // make sure each word passes separately, ie search for firstname, lastname
                let passed = true;
                if (filterText) {
                    filterText
                        .toLowerCase()
                        .split(' ')
                        .forEach((filterWord) => {
                            const value = props.valueGetter({
                                api,
                                colDef,
                                column,
                                columnApi,
                                context,
                                data: node.data,
                                getValue: (field) => node.data[field],
                                node,
                            });

                            if (value.toString().toLowerCase().indexOf(filterWord) < 0) {
                                passed = false;
                            }
                        });
                }

                return passed;
            },

            isFilterActive() {
                return filterText != null && filterText !== '';
            },

            getModel() {
                if (!this.isFilterActive()) {
                    return null;
                }

                return { value: filterText };
            },

            setModel(model: any) {
                setFilterText(model == null ? null : model.value);
            },
        };
    });

    const onChange = (event: any) => {
        setFilterText(event.target.value);
    };

    let items: Array<any> = [];
    props.api.forEachNode(function (node) {
        items.push(node.data);
    });

    const handleCheckbox = (event: any) => {
        const tempFiltered: any[] = [...filtered];

        if (event.target.checked) {
            props.api.forEachNode(function (node) {
                if (node.data.userId.toString() === event.target.value) {
                    tempFiltered.push(node.data.userId.toString());
                    node.setSelected(true);
                    props.api.setQuickFilter(node.data.userId.toString());
                    setFiltered(tempFiltered);
                }
            });
        } else {
            props.api.forEachNode(function (node) {
                if (node.data.userId.toString() === event.target.value) {
                    tempFiltered.splice(tempFiltered.indexOf(node.data.userId.toString()), 1);
                    node.setSelected(false);
                    let newFilter: string = '';

                    props.api.getQuickFilter()?.split(' ').forEach((filterWord) => {
                        if (event.target.value !== filterWord) {
                            newFilter += filterWord + ' ';
                        }

                    });
                    props.api.setQuickFilter(newFilter);
                    setFiltered(tempFiltered);
                }
            });
        }
    }

    const handleClearFilter = () => {
        props.columnApi.applyColumnState({
            state: [{ colId: colId, sort: null }],
            defaultState: { sort: null },
        });
        setFiltered([]);
        setFilterActive('');
        setFilterText('');
        setHover('');
        props.api.setQuickFilter('');
        props.api.setFilterModel(null)
        props.api.forEachNode(function (node) {
            node.setSelected(false);
        });
    }

    useEffect(() => {
        debugger
        if (filterText)
            props.api.setQuickFilter(filterText);
        else
            props.api.setQuickFilter('')
    }, [filterText, props.api]);

    const isChecked = (item: any): boolean | undefined => {
        const isFiltered = filtered.filter(i => i === item.userId.toString())[0];
        return isFiltered ? true : false;
    }

    return (
        <Box sx={{ overflow: 'hidden', minWidth: '200px' }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton
                    sx={{ borderRadius: 0, color: filterActive === 'asc' ? colors.core.reflexBlue[100] : 'black', '&:hover': { color: colors.core.reflexBlue[100] } }}
                    onMouseEnter={() => setHover('asc')}
                    onMouseLeave={() => setHover('')}
                    className='icon-container'
                    onClick={() => onSortRequested('asc', colId)}
                    onTouchEnd={() => onSortRequested('asc', colId)}>
                    <i className={`icon ag-theme-alpine ${filterActive !== 'asc' && hover !== 'asc' ? 'ag-icon-asc' : 'ag-icon-asc-active'}`}></i>
                    <span style={{ fontSize: '12px' }}>A-Z/1-9</span>
                </IconButton>
                <IconButton
                    sx={{ borderRadius: 0, color: filterActive === 'desc' ? colors.core.reflexBlue[100] : 'black', '&:hover': { color: colors.core.reflexBlue[100] } }}
                    className='icon-container'
                    onMouseEnter={() => setHover('desc')}
                    onMouseLeave={() => setHover('')}
                    onClick={() => onSortRequested('desc', colId)}
                    onTouchEnd={() => onSortRequested('desc', colId)}>
                    <i className={`icon ag-theme-alpine ${filterActive !== 'desc' && hover !== 'desc' ? 'ag-icon-desc' : 'ag-icon-desc-active'}`}></i>
                    <span style={{ fontSize: '12px' }}>Z-A/9-1</span>
                </IconButton>
            </Grid>


            <Grid container sx={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '1em' }}>
                <Grid container item xs={12}>
                    <TextField value={filterText ?? ''}
                        InputProps={{ disableUnderline: true, style: { borderRadius: '0' } }}
                        sx={{ width: '100%', borderBottom: 'none', borderRadius: 0, backgroundColor: 'white' }}
                        onChange={onChange}
                        variant='filled'
                        size='small' placeholder='Search a value...' />
                </Grid>
                <Grid container item xs={12}></Grid>
                <Grid container item xs={12}></Grid>
            </Grid>
            <div className='container' style={{ flexDirection: 'column', height: '20em', margin: 0, overflow: 'auto' }}>
                {items?.map((item: any, index) => <Grid container key={index}>
                    <Grid item >
                        <Checkbox sx={{ color: 'success' }} size='small' checked={isChecked(item)} onChange={handleCheckbox} value={item.userId} />{item.email}
                    </Grid>
                </Grid>)}
            </div>
            <Box sx={{ padding: '0.5em' }}>
                <Button
                    disabled={!filterActive && filtered?.length === 0}
                    onClick={handleClearFilter}
                    sx={{
                        color: 'white',
                        borderRadius: 0,
                        justifyContent: 'center',
                        width: '100%',
                        border: '1px solid',
                        backgroundColor: !filterActive && filtered?.length === 0 ? 'gray' : colors.core.reflexBlue[100],
                        padding: '0.2em', '&:hover': { color: colors.core.reflexBlue[100], backgroundColor: 'white' }
                    }}>Clear Filter</Button>
            </Box>
        </Box>
    );
});

export default CustomFilter;
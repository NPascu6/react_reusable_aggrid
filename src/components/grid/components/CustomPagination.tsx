import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React, { useCallback } from "react";

// export function setText(selector: string, text: any) {
//     (document.querySelector(selector) as any).innerHTML = text;
// }

export function setLastButtonDisabled(disabled: boolean) {
    (document.querySelector('#btLast') as any).disabled = disabled;
}

interface CustomPaginationProps {
    gridRef: any;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    lastPageFound: boolean;
    setPaginationPageSize: (pageSize: number) => void;
}

const CustomPagination = (props: CustomPaginationProps) => {
    const onBtFirst = useCallback(() => {
        props.gridRef.current.api.paginationGoToFirstPage();
    }, [props]);

    const onBtLast = useCallback(() => {
        props.gridRef.current.api.paginationGoToLastPage();
    }, [props.gridRef]);

    const onBtNext = useCallback(() => {
        props.gridRef.current.api.paginationGoToNextPage();
    }, [props.gridRef]);

    const onBtPrevious = useCallback(() => {
        props.gridRef.current.api.paginationGoToPreviousPage();
    }, [props.gridRef]);

    // const onBtPageFive = useCallback(() => {
    //     // we say page 4, as the first page is zero
    //     props.gridRef.current.api.paginationGoToPage(4);
    // }, [props.gridRef]);

    // const onBtPageFifty = useCallback(() => {
    //     // we say page 49, as the first page is zero
    //     props.gridRef.current.api.paginationGoToPage(49);
    // }, [props.gridRef]);

    const handleChange = (event: SelectChangeEvent<number>) => {
        props.setPaginationPageSize(event.target.value as number);
    }

    return <div className="example-header">
        <Typography sx={{ width: '100%', justifyContent: 'center', display: 'flex' }} variant="h6">Custom Pagination</Typography>
        <Grid container sx={{ marginTop: '6px', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>

            <Button sx={{ marginRight: '0.2em' }} variant="contained" onClick={onBtFirst}>To First</Button>
            <Button sx={{ marginRight: '0.2em' }} variant="contained" onClick={onBtLast} id="btLast">To Last</Button>
            <Button sx={{ marginRight: '0.2em' }} variant="contained" onClick={onBtPrevious}>To Previous</Button>
            <Button sx={{ marginRight: '0.2em' }} variant="contained" onClick={onBtNext}>To Next</Button>
        </Grid>

        <Grid container sx={{ marginTop: '6px', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Grid item xs={12} sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Page size</InputLabel>
                    <Select
                        size="small"
                        value={props.pageSize}
                        label="Page size"
                        onChange={handleChange}
                        inputProps={{
                            sx: {
                                fontSize: '12px',
                                width: '50px',
                            }
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid container sx={{justifyContent: 'center'}}>

                <Typography className="label">Total Pages:</Typography>
                <Typography className="value">{props.totalPages}</Typography>

                <Divider orientation="vertical" flexItem sx={{ marginLeft: '1em', marginRight: '1em' }}>
                </Divider>

                <Typography className="label">Current Page:</Typography>
                <Typography className="label"> {props.currentPage}</Typography>

            </Grid>
        </Grid>
    </div >
}

export default CustomPagination;
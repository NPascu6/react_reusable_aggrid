import { useCallback } from "react";

export function setText(selector: string, text: any) {
    (document.querySelector(selector) as any).innerHTML = text;
}

export function setLastButtonDisabled(disabled: boolean) {
    (document.querySelector('#btLast') as any).disabled = disabled;
}

interface CustomPaginationProps {
    gridRef: any;
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

    const onBtPageFive = useCallback(() => {
        // we say page 4, as the first page is zero
        props.gridRef.current.api.paginationGoToPage(4);
    }, [props.gridRef]);

    const onBtPageFifty = useCallback(() => {
        // we say page 49, as the first page is zero
        props.gridRef.current.api.paginationGoToPage(49);
    }, [props.gridRef]);

    return <div className="example-header">
        <div>
            <span>Custom Pagination</span>
            <button onClick={onBtFirst}>To First</button>
            <button onClick={onBtLast} id="btLast">
                To Last
            </button>
            <button onClick={onBtPrevious}>To Previous</button>
            <button onClick={onBtNext}>To Next</button>
            <button onClick={onBtPageFive}>To Page 5</button>
            <button onClick={onBtPageFifty}>To Page 50</button>
        </div>

        <div style={{ marginTop: '6px' }}>
            <span className="label">Last Page Found:</span>
            <span className="value" id="lbLastPageFound">
                -
            </span>
            <span className="label">Page Size:</span>
            <span className="value" id="lbPageSize">
                -
            </span>
            <span className="label">Total Pages:</span>
            <span className="value" id="lbTotalPages">
                -
            </span>
            <span className="label">Current Page:</span>
            <span className="value" id="lbCurrentPage">
                -
            </span>
        </div>
    </div>
}

export default CustomPagination;
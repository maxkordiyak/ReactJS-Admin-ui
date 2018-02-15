import React from 'react';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import './index.css';
import matchSorter from 'match-sorter';

export default ({ requests,
                    getRequestsList,
                    pagination,
                    isLoading,
                    onFetchData,
                    setRequestsPageIndex,
                    setRequestsPageLimit,
                    setRequestsFilterStr,
                    sortRequestsColumn,
                    goToRequest }) => (
    <div className="requests-list">
        <h2 className="mdc-typography--title page-title">Запити</h2>
        <ReactTable
            getTdProps={(state, rowInfo, column, instance) => {
                return {
                    onClick: (e, handleOriginal) => {
                        const requestId = rowInfo.original._id;
                        goToRequest(requestId);
                    }
                }
            }}
            columns={[
                {
                    Header: "Name",
                    accessor: "name"
                },
                {
                    Header: "Address",
                    accessor: "address"
                },
                {
                    Header: "Hours",
                    accessor: "workingHours"
                },
                {
                    Header: "Phone",
                    accessor: "phone"
                },
                {
                    Header: "Email",
                    accessor: "email"
                },
                {
                    Header: "Materials",
                    accessor: "categories"
                }
            ]}
            manual
            data={requests}
            loading={isLoading} // Display the loading overlay when we need it
            pages={pagination.pageCount} // Display the total number of pages
            onPageChange={(pageIndex) => setRequestsPageIndex(pageIndex)} // Called when the page index is changed by the user
            onPageSizeChange={(pageSize) => setRequestsPageLimit(pageSize)} // Called when the pageSize is changed by the user. The resolve page is also sent to maintain approximate position in the data
            onFilteredChange={(value) => setRequestsFilterStr(value)} // Called when a user enters a value into a filter input field or the value passed to the onFiltersChange handler by the Filter option.
            onFetchData={() => getRequestsList()} // Request new data when things change
            onSortedChange={(newSorted, column, shiftKey) => {sortRequestsColumn(newSorted)}} // Called when a sortable column header is clicked with the column itself and if the shiftkey was held. If the column is a pivoted column, `column` will be an array of columns
            filterable
            defaultPageSize={10}
            className="-striped -highlight"
        />
    </div>
);

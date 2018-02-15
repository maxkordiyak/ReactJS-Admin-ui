import React from 'react';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import './index.css';
import matchSorter from 'match-sorter';

export default ({ reports,
  getReportsList,
  pagination,
  isLoading,
  onFetchData,
  setReportsPageIndex,
  setReportsPageLimit,
  setReportsFilterStr,
  sortReportsColumn,
  goToReport }) => (
  <div className="places-list">
    <h2 className="mdc-typography--title page-title">Повідомлення про неточності</h2>
    <ReactTable
      getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              const reportId = rowInfo.original._id;
              goToReport(reportId);
            }
          }
      }}
      columns={[
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Email",
          accessor: "email"
        },
        {
          Header: "Reason",
          accessor: "reason"
        },
        {
          Header: "Message",
          accessor: "message"
        },
        {
          Header: "Place id",
          accessor: "placeId"
        }
      ]}
      manual
      data={reports}
      loading={isLoading} // Display the loading overlay when we need it
      pages={pagination.pageCount} // Display the total number of pages
      onPageChange={(pageIndex) => setReportsPageIndex(pageIndex)} // Called when the page index is changed by the user
      onPageSizeChange={(pageSize) => setReportsPageLimit(pageSize)} // Called when the pageSize is changed by the user. The resolve page is also sent to maintain approximate position in the data
      onFilteredChange={(value) => setReportsFilterStr(value)} // Called when a user enters a value into a filter input field or the value passed to the onFiltersChange handler by the Filter option.
      onFetchData={() => getReportsList()} // Request new data when things change
      onSortedChange={(newSorted, column, shiftKey) => {sortReportsColumn(newSorted)}} // Called when a sortable column header is clicked with the column itself and if the shiftkey was held. If the column is a pivoted column, `column` will be an array of columns
      filterable
      defaultPageSize={10}
      className="-striped -highlight"
    />
  </div>
);

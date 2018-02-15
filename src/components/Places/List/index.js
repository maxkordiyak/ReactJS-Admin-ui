import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './index.css';
import { Button, Toolbar, ToolbarRow, ToolbarSection } from 'react-mdc-web/lib';
import matchSorter from 'match-sorter'

export default ({ places,
  getPlacesList,
  pagination,
  isLoading,
  onFetchData,
  setPageIndex,
  setPageLimit,
  setFilterStr,
  sortColumn,
  goToPlace }) => (
  <div className="places-list">
      <Toolbar>
          <ToolbarRow>
              <ToolbarSection align="start">
                  <h2 className="mdc-typography--title page-title" style={{borderBottom: 0}}>Точки збору</h2>
              </ToolbarSection>
              <ToolbarSection align="end">
                  <Link to={'/new/place'} className="create-button">
                    Створити
                  </Link>
              </ToolbarSection>
          </ToolbarRow>
      </Toolbar>
    <ReactTable
      getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
                e.preventDefault();
              let placeId = rowInfo.original._id;
              goToPlace(placeId);
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
          accessor: "phone",
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
      data={places}
      loading={isLoading} // Display the loading overlay when we need it
      pages={pagination.pageCount} // Display the total number of pages
      onPageChange={(pageIndex) => setPageIndex(pageIndex)} // Called when the page index is changed by the user
      onPageSizeChange={(pageSize) => setPageLimit(pageSize)} // Called when the pageSize is changed by the user. The resolve page is also sent to maintain approximate position in the data
      onFilteredChange={(value) => setFilterStr(value)} // Called when a user enters a value into a filter input field or the value passed to the onFiltersChange handler by the Filter option.
      onFetchData={() => getPlacesList()} // Request new data when things change
      onSortedChange={(newSorted, column, shiftKey) => {sortColumn(newSorted)}} // Called when a sortable column header is clicked with the column itself and if the shiftkey was held. If the column is a pivoted column, `column` will be an array of columns
      filterable
      defaultPageSize={10}
      className="-striped -highlight"
    />
  </div>
);

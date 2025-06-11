import React, { useState, useMemo } from 'react';
import styles from './Table.module.css';
import Button from './Button'; // Assuming a general Button component is available

export interface ColumnDefinition<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  rowsPerPage?: number;
}

const Table = <T extends { [key: string]: any }>({
  columns,
  data,
  onRowClick,
  rowsPerPage = 10
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * rowsPerPage;
    const lastPageIndex = firstPageIndex + rowsPerPage;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data, rowsPerPage]);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                onClick={() => onRowClick && onRowClick(item)}
                className={onRowClick ? styles.clickableRow : ''}
              >
                {columns.map((col) => (
                  <td key={`${String(col.key)}-${item.id || rowIndex}`}>
                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {currentTableData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className={styles.noDataCell}>
                  No data available for this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.length > rowsPerPage && ( // Only show pagination if there's more than one page
        <div className={styles.paginationControls}>
          <Button onClick={goToPreviousPage} disabled={currentPage === 1} variant="secondary">
            Previous
          </Button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages} variant="secondary">
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Table;

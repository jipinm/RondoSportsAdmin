import React, { useState, useMemo } from 'react';
import styles from './Table.module.css';
import Button from './Button';

// Utility to get nested properties
const getNestedValue = (obj: any, path: string): any => {
  if (!path) return undefined;
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return undefined; // Path does not exist
    }
  }
  return result;
};

export interface ColumnDefinition<T extends Record<string, any>> { // T must be an object type
  key: string; // Using string for flexibility (e.g., 'user.name' or 'id')
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T extends Record<string, any>> { // T must be an object type
  columns: ColumnDefinition<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  rowsPerPage?: number;
}

const Table = <T extends Record<string, any>>({
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
                <th key={col.key}>{col.header}</th> {/* col.key is now always string */}
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex} // Assuming items might have an 'id' property
                onClick={() => onRowClick && onRowClick(item)}
                className={onRowClick ? styles.clickableRow : ''}
              >
                {columns.map((col) => (
                  <td key={`${col.key}-${item.id || rowIndex}`}>
                    {col.render
                      ? col.render(item)
                      : String(getNestedValue(item, col.key) ?? '')} {/* Use getNestedValue */}
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

      {data.length > rowsPerPage && (
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

import React, { useState } from 'react';
import { Col,  Pagination, Row } from 'react-bootstrap';

const CustomPagination: React.FC<{
  items: unknown[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ items, currentPage, setCurrentPage }) => {
  const [itemsPerPage] = useState(10);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToPreviousPage = () =>
    setCurrentPage((currentPage) => Math.max(1, currentPage - 1));
  const goToNextPage = () =>
    setCurrentPage((currentPage) => Math.min(totalPages, currentPage + 1));

  const getPaginationItems = () => {
    const paginationItems = [];
    const maxPageNumber = Math.min(totalPages, currentPage + 2);
    const startPageNumber = Math.max(1, currentPage - 2);

    paginationItems.push(
      <Pagination.Prev
        key="prev"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      />
    );

    if (startPageNumber > 1) {
      paginationItems.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => setCurrentPage(1)}
        >
          {1}
        </Pagination.Item>
      );
      paginationItems.push(
        <Pagination.Ellipsis key="ellipsis-left" disabled />
      );
    }

    for (let number = startPageNumber; number <= maxPageNumber; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    if (maxPageNumber < totalPages) {
      paginationItems.push(
        <Pagination.Ellipsis key="ellipsis-right" disabled />
      );
      paginationItems.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    paginationItems.push(
      <Pagination.Next
        key="next"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      />
    );

    return paginationItems;
  };
  return (
    <Row>

      <Col
        xs={12}
        md={12}
        className="d-flex justify-content-md-end align-items-center"
      >
        <Pagination>{getPaginationItems()}</Pagination>
      </Col>
      {/* <Col
        xs={12}
        md={1}
        className="d-flex justify-content-md-end align-items-center"
      >
        <Form.Control
          as="select"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          style={{ maxWidth: '50px' }}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Form.Control>
      </Col> */}
    </Row>
  );
};
export default CustomPagination;

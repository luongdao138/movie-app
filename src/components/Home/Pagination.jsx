import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

const PaginationCom = ({page, total_pages, handleChangePage, ...rest}) => {
 return (
  <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '32px 0',
        }}
      >
   <Pagination
     page={page}
     count={total_pages}
     onChange={(e, newPage) => handleChangePage(newPage)}
     {...rest}
   />
   </div>
 );
}

export default PaginationCom

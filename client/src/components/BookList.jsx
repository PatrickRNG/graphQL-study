import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  const [selected, setSelected] = useState(null);
  
  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Some error ocurred</div>
  }
  
  return (
    <div id="main">
      <ul id="book-list">
        {data.books.map(book => (
          <li key={book.id} onClick={() => setSelected(book.id)} >{book.name}</li>
        ))}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;

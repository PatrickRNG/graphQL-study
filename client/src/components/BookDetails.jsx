import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });
  console.log('>>', bookId);

  if (error) {
    console.log(error);
    return <div>Some error ocurred</div>;
  }

  const renderBook = () => {
    const { name, genre, author } = data.book;
    console.log('>>>', { name, genre, author });
    return (
      <>
        <div>{name}</div>
        <div>{genre}</div>
        <div>{author.name}</div>
        <div>{author.age}</div>
        <div>{author.books.map(val => <div>{val.name}</div>)}</div>
      </>
    );
  };

  return (
    <div>
      <h2>Book details</h2>
      {loading ? 'loading...' : renderBook()}
    </div>
  );
}

export default BookDetails;

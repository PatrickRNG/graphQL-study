import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const [book, setBook] = useState({
    name: "",
    genre: "",
    authorId: ""
  });

  const onChange = e => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();
    addBook({
      variables: { name: book.name, genre: book.genre, authorId: book.authorId },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  if (error) {
    return <div>Some error ocurred</div>;
  }

  return (
    <div>
      <form onSubmit={onSubmit} action="">
        <input onChange={onChange} name="name" placeholder="Book name" type="text" />
        <input onChange={onChange} name="genre" placeholder="Genre" type="text" />
        <select onChange={onChange} name="authorId">
          <option value="">Select author</option>
          {!loading && data.authors.map((author) => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
        </select>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default AddBook;

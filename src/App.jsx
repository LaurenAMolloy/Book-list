import { useState, useEffect } from 'react'
import axios from 'axios'
import BookCreate from './components/BookCreate/BookCreate';
import BookList from './components/BookList/BookList'

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  }

  useEffect(() => {
    fetchBooks();
  }, [])

  const createBook = async (title) => {
      const response = await axios.post('http://localhost:3001/books', {
        title
      });

      //console.log(response);
      const updatedBooks = [
        ...books,
        response.data
      ];
       setBooks(updatedBooks)
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    console.log(response);

    const updatedBooks = books.map((book) => {
      if(book.id === id) {
        return { ...book, title: newTitle }
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookById = (id) => {
    const filteredArr = books.filter((book) => {
      //return truthy values
      return book.id !== id;
    });
    //original array NOT changed!
    setBooks(filteredArr)
  };


  return ( 
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  )
}

export default App

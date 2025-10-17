import { useState } from 'react'
import { nanoid } from 'nanoid'
import BookCreate from './components/BookCreate/BookCreate';
import BookList from './components/BookList/BookList'

function App() {
  const [books, setBooks] = useState([]);

  const createBook = (title) => {
      const updatedBooks = [
        ...books,
        { id: nanoid(), title}
      ]
      setBooks(updatedBooks)
  };

  const editBookById = (id, newTitle) => {
    const updatedBooks = books.map((book) => {
      if(book.id === id) {
        return { ...book, title: newTitle }
      }
      return book
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
    <div>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  )
}

export default App

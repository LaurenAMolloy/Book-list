import { createContext, useState } from 'react'
import axios from 'axios';

const BookContext = createContext();

function Provider( { children } ) {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
}

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
  
  //Use the response object to update state
  //This is the best option if our app grows to have more than one user
  const updatedBooks = books.map((book) => {
    if(book.id === id) {
      return { ...book, ...response.data }
    }
    return book;
  });
  setBooks(updatedBooks);
};

const deleteBookById = async (id) => {
  await axios.delete(`http://localhost:3001/books/${id}`)
  const filteredArr = books.filter((book) => {
    //return truthy values
    return book.id !== id;
  });
  //original array NOT changed!
  setBooks(filteredArr)
};

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    }

    return (
        //Share value
       <BookContext.Provider value={valueToShare}>
            {children}
      </BookContext.Provider> 
    ) 
}

//import BooksContext, { Provider } from './'
export { Provider }
export default BookContext
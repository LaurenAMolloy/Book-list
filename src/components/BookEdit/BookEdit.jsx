import React from 'react'
import { useState } from 'react';
import useBooksContext from '../../hooks/use-books-context';

export default function BookEdit({ book, onSubmit }) {
    const [title, setTitle] = useState(book.title);
    const { editBookById } = useBooksContext()

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit()
        editBookById(book.id, title);
    }

  return (
    <form onSubmit={handleSubmit} className="book-edit">
        <label>Title</label>
        <input className="input" value={title} onChange={handleChange}></input>
        <button className="button is-primary">Save</button>
    </form>
  )
}

import { useState } from 'react';
import BookEdit from '../BookEdit/BookEdit.jsx';

function BookShow({ book, onDelete, onEdit }){
    const[showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
       onDelete(book.id)
    }

    const handleEditClick =() => {
        console.log("click")
        setShowEdit(!showEdit)
    }

    const handleSubmit = (id, newTitle) => {
        onEdit(id,newTitle)
        setShowEdit(false)
    }

    let content = <h3>{book.title}</h3>
    if(showEdit) {
        content = <BookEdit onEdit={handleSubmit} book={book} />
    }

return (
    <>
    <div className="book-show">{content}
    <div>Book Content</div>
    <div className="actions">
        <button className="edit" onClick={handleEditClick}>Edit</button>
        <button className='delete' onClick={handleDeleteClick}>
            Delete
        </button>
    </div>
    </div>
    </>
    )  
}

export default BookShow
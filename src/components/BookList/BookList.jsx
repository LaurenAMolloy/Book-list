import BookShow from '../BookShow/BookShow'
import useBooksContext from '../../hooks/use-books-context'


function BookList() {
   const { books } = useBooksContext();

    const renderedBooks = books.map((book)=>{
        //Should we leave this books prop?
        //Yes! It is easier in this case to use props
        return <BookShow key={book.id} book={book} />;
    })
    return (
        
        <div className="book-list">
            {renderedBooks}
        </div>
        
    )
}

export default BookList
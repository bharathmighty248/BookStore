import Book from '../models/book.model';

//Add book 
export const addbook = async (info) => {
    try {
        const data = await Book.create(info);
        return data;
    } catch (error) {
        throw error;
    }
};

//Get all books 
export const getallbooks = async () => {
    try {
        const data = await Book.find();
        return data;
    } catch (error) {
        throw error;
    }
};

//Update book 
export const updatebook = async (info) => {
    try {
        const book = await Book.findById(info.bookId);
        if (book != null) {
            if (info.title !== undefined) {
                await Book.findOneAndUpdate({_id:info.bookId},{title:info.title});
            }
            if (info.description !== undefined) {
                await Book.findOneAndUpdate({_id:info.bookId},{description:info.description});
            }
            if (info.author !== undefined) {
                await Book.findOneAndUpdate({_id:info.bookId},{author:info.author});
            }
            if (info.quantity !== undefined) {
                await Book.findOneAndUpdate({_id:info.bookId},{quantity:info.quantity});
            }
            if (info.price !== undefined) {
                await Book.findOneAndUpdate({_id:info.bookId},{price:info.price});
            }
            return true;
        } else {
            return "Book Not Found";
        }
    } catch (error) {
        throw error;
    }
};

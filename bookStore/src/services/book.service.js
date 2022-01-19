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

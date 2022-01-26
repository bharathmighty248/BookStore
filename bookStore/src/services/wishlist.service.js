import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

//Add To Wishlist
export const add = async (info) => {
    try {
        const bookpresent = await Book.findOne({_id: info.bookId});
        if (bookpresent) {
            const userwishlist = await Wishlist.findOne({userId:info.userId});
            if (userwishlist) {
                const book = await Wishlist.findOne({userId:info.userId, "books.bookId":info.bookId})
                if (book) {
                    return "Already added"
                } else {
                    const newbook = {
                        bookId: info.bookId,
                        author: bookpresent.author,
                        title: bookpresent.title,
                        price: bookpresent.price
                    }
                    await Wishlist.findOneAndUpdate({userId:info.userId},{$addToSet: {books: newbook}});
                    return true;
                }
            } else {
                const wishlist = new Wishlist({
                    userId: info.userId,
                    books: [{
                        bookId: info.bookId,
                        author: bookpresent.author,
                        title: bookpresent.title,
                        price: bookpresent.price
                    }]
                });
                wishlist.save();
                return true;
            }
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

//Remove from Wishlist
export const remove = async (info) => {
    try {
        const userwishlist = await Wishlist.findOne({userId:info.userId});
        if (userwishlist) {
            const book = await Wishlist.findOne({userId:info.userId, "books.bookId":info.bookId})
            if (book) {
                await Wishlist.findOneAndUpdate({userId:info.userId}, { $pull: { books: { bookId: info.bookId } } });
                await Wishlist.findOneAndDelete({userId:info.userId,books:{ $exists: true, $size: 0 }});
                return true;
            } else {
                return "Not found";
            }
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

//My Wishlist
export const mywishlist = async (info) => {
    try {
        const userwishlist = await Wishlist.findOne({userId:info.userId});
        if (userwishlist) {
            return userwishlist;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

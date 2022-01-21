import Cart from '../models/cart.model';
import Book from '../models/book.model';

//Add To Cart
export const addtocart = async (info) => {
    try {
        const available = await Book.findOne({_id: info.bookId,status:"Available"});
        if (available) {
            const usercart = await Cart.findOne({userId:info.userId});
            if (!usercart) {
                if (available.quantity >= info.quantity) {
                    const cart = new Cart ({
                        userId: info.userId,
                        books: [{
                            bookId: info.bookId,
                            quantity: info.quantity,
                            total: info.quantity * available.price
                        }],
                        totalAmount : info.quantity * available.price
                    });
                    cart.save();
                    const remainingqty = available.quantity - info.quantity;
                    if (remainingqty == 0) {
                        await Book.findOneAndUpdate({_id:info.bookId}, {quantity:remainingqty,status:"sold out"});
                        return true;
                    } else {
                        await Book.findOneAndUpdate({_id:info.bookId}, {quantity:remainingqty});
                        return true;
                    }
                } else {
                    return "less stock";
                }
                
            } else {
                const bookpresent = await Cart.findOne({ userId:info.userId, "books.bookId":info.bookId });
                if (bookpresent == null ) {
                    if (available.quantity >= info.quantity) {
                        const newbook = {
                            bookId: info.bookId,
                            quantity: info.quantity,
                            total: info.quantity * available.price
                        };
                        await Cart.findOneAndUpdate({userId:info.userId},{$addToSet: {books: newbook}});
                        const newcart = await Cart.findOne({userId:info.userId});
                        const totalAmount = newcart.books.map((book) => book.total).reduce((acc,curr) => acc+curr);
                        await Cart.findOneAndUpdate({userId:info.userId},{totalAmount: totalAmount});
                        const remainingqty = available.quantity - info.quantity;
                        if (remainingqty == 0) {
                            await Book.findOneAndUpdate({_id:info.bookId}, {quantity:remainingqty,status:"sold out"});
                            return true;
                        } else {
                            await Book.findOneAndUpdate({_id:info.bookId}, {quantity:remainingqty});
                            return true;
                        }
                    } else {
                        return "less stock";
                    }
                } else {
                    if (available.quantity >= info.quantity) {
                        const oldqty = bookpresent.books.filter((book) => { return book.bookId==info.bookId })[0].quantity;
                        const newqty = oldqty + info.quantity;
                        await Cart.updateOne({ userId: info.userId }, { $pull: { books: { bookId: info.bookId } } });
                        const newbook = {
                            bookId: info.bookId,
                            quantity: newqty,
                            total: newqty * available.price
                        };
                        await Cart.findOneAndUpdate({userId:info.userId},{$addToSet: {books: newbook}});
                        const newcart = await Cart.findOne({userId:info.userId});
                        const totalAmount = newcart.books.map((book) => book.total).reduce((acc,curr) => acc+curr);
                        await Cart.findOneAndUpdate({userId:info.userId},{totalAmount: totalAmount});
                        const remainingqty = available.quantity - info.quantity;
                        if (remainingqty == 0) {
                            await Book.findOneAndUpdate({_id:info.bookId}, {quantity:remainingqty,status:"sold out"});
                            return true;
                        } else {
                            await Book.findOneAndUpdate({_id:info.bookId}, {quantity:remainingqty});
                            return true;
                        }
                    } else {
                        return "less stock";
                    }

                }
            }
        } else {
            return "Sold Out"
        }
    } catch (error) {
        throw error;
    }
};

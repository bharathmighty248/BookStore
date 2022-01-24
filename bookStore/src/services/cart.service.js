import Cart from '../models/cart.model';
import Book from '../models/book.model';
import { sendOrderConfirmation } from '../utils/user.util';

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

//Remove From Cart
export const removefromcart = async (info) => {
    try {
        const usercart = await Cart.findOne({userId:info.userId});
        if (usercart) {
            const bookpresent = await Cart.findOne({ userId:info.userId, "books.bookId":info.bookId });
            if (bookpresent) {
                if (info.bookId && info.quantity !== undefined) {
                    const oldqty = bookpresent.books.filter((book) => { return book.bookId==info.bookId })[0].quantity;
                    if (info.quantity >= oldqty) {
                        await Cart.updateOne({ userId: info.userId }, { $pull: { books: { bookId: info.bookId } } });
                        const newcart = await Cart.findOne({userId:info.userId});
                        const totalAmount = newcart.books.map((book) => book.total).reduce(((acc,curr) => acc+curr), 0);
                        await Cart.findOneAndUpdate({userId:info.userId},{totalAmount: totalAmount});
                        await Book.updateOne({_id:info.bookId},{$inc:{quantity:oldqty},status: "Available"});
                        return true;
                    } else {
                        const available = await Book.findOne({_id: info.bookId});
                        const newqty = oldqty - info.quantity;
                        await Cart.updateOne({ userId: info.userId }, { $pull: { books: { bookId: info.bookId } } });
                        const newbook = {
                            bookId: info.bookId,
                            quantity: newqty,
                            total: newqty * available.price
                        };
                        await Cart.findOneAndUpdate({userId:info.userId},{$addToSet: {books: newbook}});
                        const newcart = await Cart.findOne({userId:info.userId});
                        const totalAmount = newcart.books.map((book) => book.total).reduce(((acc,curr) => acc+curr), 0);
                        await Cart.findOneAndUpdate({userId:info.userId},{totalAmount: totalAmount});
                        await Book.updateOne({_id:info.bookId},{$inc:{quantity:info.quantity},status: "Available"});
                        return true;
                    }
                } else {
                    const oldqty = bookpresent.books.filter((book) => { return book.bookId==info.bookId })[0].quantity;
                    await Cart.updateOne({ userId: info.userId }, { $pull: { books: { bookId: info.bookId } } });
                    const newcart = await Cart.findOne({userId:info.userId});
                    const totalAmount = newcart.books.map((book) => book.total).reduce(((acc,curr) => acc+curr), 0);
                    await Cart.findOneAndUpdate({userId:info.userId},{totalAmount: totalAmount});
                    await Book.updateOne({_id:info.bookId},{$inc:{quantity:oldqty},status: "Available"});
                    return true;
                }
            } else {
                return "Book not found";
            }
        } else {
            return "Cart not Found";
        }
    } catch (error) {
        throw error;
    }
};

//View Cart by user
export const viewcart = async (info) => {
    try {
        const usercart = await Cart.findOne({userId:info.userId});
        if (usercart) {
            const books = usercart.books.length;
            if (books == 0) {
                return "Empty cart";
            } else {
                return usercart;
            }
        } else {
            return "Cart not Found";
        }
    } catch (error) {
        throw error;
    }
};

// Place Order
export const placeorder = async (info) => {
    try {
        const usercart = await Cart.findOne({userId:info.userId});
        if (usercart) {
            const books = usercart.books.length;
            if (books == 0) {
                return "Empty cart";
            } else {
                const cartdetails = await Cart.findOneAndUpdate({userId:info.userId}, {isPurchased: true}, {new: true});
                const orderdetails = {
                    email: info.email,
                    address: info.address,
                    paymentMode: info.paymentmode,
                    books: cartdetails.books,
                    totalAmount: cartdetails.totalAmount
                }
                sendOrderConfirmation(orderdetails);
                const newcart = await Cart.findOneAndUpdate({userId:info.userId},{isPurchased: false,books:[]},{ new: true});
                const totalAmount = newcart.books.map((book) => book.total).reduce(((acc,curr) => acc+curr), 0);
                await Cart.findOneAndUpdate({userId:info.userId},{totalAmount: totalAmount});
                return true;
            }
        } else {
            return "Cart not Found";
        }
    } catch (error) {
        throw error;
    }
}

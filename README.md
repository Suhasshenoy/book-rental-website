# Book Borrowing Application
This is a book rental application done using design thinking stratergy. In this application, you can list a book you wish to lend, submit an application to the person 
lending the book for the book which you wish to borrow, etc. The lender can also delete the book which he listed after he lends the book.

## Working
Home screen consists of two options. Lending and Borrowing
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/home.png)
<br />
<br />
If the lender decides to lend a book, he has to enter details about him and the book, upload the image of the book and post it
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/lendingForm.png)
<br />
<br />
A unique id for the book will be displayed for the book and lender has to note it down.
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/lendingSuccess.png)
<br />
<br />
His book will be listed and can be viewed by clicking borrow now. Here all the books listed will be displayed.
<br />
<br />
If there are books available, all the books availabe are displayed along with the lenders information.
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/booksAvailable.png)
<br />
<br />
If no books are listed or all the books listed are borrowed, this page is displayed
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/noBooks.png)
<br />
<br />
When a user clicks on Borrow it, he gets an application form to fill
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/bookApplication.png)
<br />
<br />
When the user enters his details and submits the application form, the lender gets an email consisting of user details through which he can contact the interested
person
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/applicationSuccess.png)
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/email.png)
<br />
<br />
Once the lender lends the book to someone and he wishes to delete his book from all the listed books, he has to go to Delete Book and paste the id of the book
which will delete the book
<br />
<br />
![](https://github.com/Suhasshenoy/book-rental-website/blob/main/images/deleteBook.png)
<br />
<br />

## Tech-stack used
### Front-end
* ejs
* css(bootstrap)

### Back-end
* nodeJS
* express
* mongo-DB




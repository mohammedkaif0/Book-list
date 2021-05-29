// create book
class Book{
    constructor(bookid,title,author){
        this.bookid = bookid;
        this.title = title;
        this.author = author;
    }
}
// book ui : handles ui
class ui {
    static displaybooks(){
        const storedbooks = [
            { bookid:"1",
                title:"Automate Python",
                author:"george"},
                { bookid:"2",
            title:"Boring physics",
            author:"henry"}
        ];
        const books= storedbooks;
        books.forEach((book) => ui.addbooktolist(book));
    }
    static addbooktolist(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>${book.bookid}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><a href="#" class="delete btn">x</a></td>
        `;
        list.appendChild(row);
    }
    static deletebook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearfields(){
        document.querySelector('#bookid').value='';
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
    }
}

// store book 
class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books =[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(author){
        const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  
    }
}
//event: display book
addEventListener('Dom-contentloaded',ui.displaybooks());

// event: Add book
    document.querySelector('#add-data').addEventListener('submit',(e)=>{
    //prevent default event
    e.preventDefault();
    // get data 
    const bookid =document.querySelector('#bookid').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    if( bookid==='' || title === ''  || author === ''){
        alert('Please fill all the fields');
    }
   else{
        // instantiate book object
    const book = new Book(bookid, title, author);
    //add book to ui
    ui.addbooktolist(book);
    // clear fields
    ui.clearfields();
   }
});
// event: remove book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    ui.deletebook(e.target)
})
import {BooksAPI} from '../../APILink';
import {getBookErrorCatch, getBooksErrorCatch} from './error/Book';

class BookError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'AuthError';
    this.status = response.status;
  }
}

export const getBooks = async () => {
  return await fetch(BooksAPI) //api
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getBooksErrorCatch(-1);
      } else {
        return getBooksErrorCatch(error.status);
      }
    });
};

export const getBook = async (id) => {
  //id指定で1データ取る
  return await fetch(BooksAPI + '/' + id) //api
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
      return res.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getBookErrorCatch(-1);
      } else {
        return getBookErrorCatch(error.status);
      }
    });
};

export const checkBookInQuestions = async (id) => {
  return await fetch(BooksAPI + '/' + id + '/questions').then((res) => {
    if (res.status === 404) {
      return false;
    } else {
      return true;
    }
  });
};

export const createBook = async (jsonData) => {
  return await fetch(BooksAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      summary: jsonData.summary,
      access_key: jsonData.access_key,
      user_id: jsonData.user_id,
    }),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error('BookCreateError');
      }
      return getBooks();
    })
    .catch((error) => alert('作成に失敗しました。', error))
    .finally(() => getBooks());
};

export const deleteBook = async (id) => {
  return await fetch(BooksAPI + '/' + id, {
    method: 'DELETE',
  }).then(() => getBooks());
};

export const updateBook = async (id, jsonData) => {
  return await fetch(BooksAPI + '/' + id, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      summary: jsonData.summary,
      access_key: jsonData.access_key,
      user_id: jsonData.user_id,
    }),
  })
    .then((res) => res)
    .then(() => getBook(id));
};

export const getRecodes = async (id) => {
  return await fetch(BooksAPI + '/' + id + '/questions').then((res) => {
    if (res.status === 404) {
      return [];
    } else {
      return res.json();
    }
  });
};

export const addRecode = async (jsonData) => {
  return await fetch(BooksAPI + '/addRecord', {
    body: JSON.stringify({book_id: jsonData.book_id, question_id: jsonData.question_id}),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  }) //api groups/addBook
    .then(() => getRecodes(jsonData.book_id))
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const removeRecode = async (jsonData) => {
  console.log(jsonData);
  return await fetch(BooksAPI + '/removeRecord', {
    body: JSON.stringify({book_id: jsonData.book_id, question_id: jsonData.question_id}),
    headers: {'Content-Type': 'application/json'},
    method: 'DELETE',
  }) //api groups/addBook
    .then(() => getRecodes(jsonData.book_id))
    .catch((error) => {
      console.error('Error:', error);
    });
};

import db from '../../database/db';
import {Author} from '../../types/LocalTypes';

// get all
const getAllAuthors = (): Author[] => {
  return db.prepare('SELECT * FROM authors').all() as Author[];
};

// get by id
const getAuthor = (id: number | bigint): Author => {
  const result = db
    .prepare('SELECT * FROM authors WHERE id = ?')
    .get(id) as Author;
  if (!result) {
    throw new Error('Author not found!');
  }
  return result;
};

// update
const updateAuthor = (
  id: number | bigint,
  name: string,
  email: string,
): Author => {
  const result = db
    .prepare('UPDATE authors SET name = ?, email = ? WHERE id = ?')
    .run(name, email, id);
  if (result.changes === 0) {
    throw new Error('Failed to update author!');
  }
  return getAuthor(id);
};

// Post new author
const createAuthor = (author: Omit<Author, 'id'>): Author => {
  const result = db
    .prepare('INSERT INTO authors (name, email) VALUES (?,?)')
    .run(author.name, author.email);
  if (!result.lastInsertRowid) {
    throw new Error('Failed to insert article');
  }
  return getAuthor(result.lastInsertRowid);
};

// Delete author - korjaa FK contraint fail
const deleteAuthor = (id: number | bigint): void => {
  const result = db.prepare('DELETE FROM authors WHERE id = ?').run(id);

  if (result.changes === 0) {
    throw new Error('Article not found');
  }
};

export {getAllAuthors, getAuthor, updateAuthor, createAuthor, deleteAuthor};

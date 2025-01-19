import express from 'express';
import {
  authorDelete,
  authorPost,
  authorPut,
  getAuthorByID,
  getAuthors,
} from '../controllers/authorController';

const router = express.Router();

router.route('/').get(getAuthors).post(authorPost);

router.route('/:id').get(getAuthorByID).put(authorPut).delete(authorDelete);

export default router;

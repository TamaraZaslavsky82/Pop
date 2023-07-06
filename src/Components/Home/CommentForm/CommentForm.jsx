import React, { useState, useEffect } from 'react';
import { addComment, db } from '../../../Certification.js';
import style from './CommentForm.module.css'
import Scenne from '../../Scenne/Scenne.js';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Cargar los comentarios existentes desde Firebase Firestore
    const loadComments = async () => {
      const snapshot = await db.collection('comentarios').get();
      const commentsData = snapshot.docs.map((doc) => doc.data());
      setComments(commentsData);
    };
    loadComments();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Agregar el comentario a Firebase Firestore
    addComment(name, comment)
      .then(() => {
        console.log('Comentario agregado correctamente');
        // Actualizar los comentarios mostrados en la página
        setComments([...comments, { nombre: name, comentario: comment }]);
        // Limpiar los campos del formulario
        setName('');
        setComment('');
      })
      .catch((error) => {
        console.error('Error al agregar el comentario:', error);
      });
  };

  return (
    <div className={style.container}>
      <Scenne/>
      <h3 className={style.comentario}>Dejar un comentario</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={style.input}
        />
        <textarea
          placeholder="Comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={style.textarea}
        ></textarea>
        <button className={style.buttom} type="submit">Enviar comentario</button>
      </form>
<div className={style.contenedor}>
      <h3>Comentarios</h3>
      {comments.map((comment, index) => (
        <div key={index}>
          <h4>{comment.nombre}</h4>
          <p>{comment.comentario}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default CommentForm;

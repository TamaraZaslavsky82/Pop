import React, { useState, useEffect } from 'react';
import { addComment, db } from '../../../Certification.js';

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
    <div>
      <h3>Dejar un comentario</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button type="submit">Enviar comentario</button>
      </form>

      <h3>Comentarios</h3>
      {comments.map((comment, index) => (
        <div key={index}>
          <h4>{comment.nombre}</h4>
          <p>{comment.comentario}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentForm;

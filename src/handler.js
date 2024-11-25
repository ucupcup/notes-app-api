/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSucces = notes.filter((note) => note.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'Success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id) [0];

  if (note !== undefined) {
    return {
      status: 'Success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'Fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  // let response;

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const successResponse = h.response({
      status: 'Success',
      message: 'Catatan berhasil diperbarui',
    });

    successResponse.code(200);
    return successResponse;
  }

  const failResponse = h.response({
    status: 'Fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });

  failResponse.code(404);
  return failResponse;
};

//   response = h.response({
//     status: 'Success',
//     message: 'Catatan berhasil diperbarui',
//   });

//   response.code(200);
// } else {
//   response = h.response({
//     status: 'Fail',
//     message: 'Gagal memperbarui catatan. Id tidak ditemukan',
//   });

//   response.code(404);


// return response;

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
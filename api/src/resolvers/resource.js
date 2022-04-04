const { Resource, Board } = require('../models/Board')

const uploadResource = async (file, data) => {
    const board = await Board.findById(data.boardId)
    if ( !board )
        return { code: 404, error: "Board not found"}
    const resource = await Resource.create({
        name: data.name,
        description: data.description,
        filename: file.filename,
        path: `/img/uploads/${file.filename}`,
        originalname: file.originalname,
        mimetype: file.mimetype,
        board: board._id
    });
    return { code: 200, data: resource }
}

module.exports = { uploadResource }
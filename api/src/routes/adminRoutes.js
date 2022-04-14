const { Router } = require('express')
const {uploadResource } = require('../resolvers/resource')
const path = require('path')
const { unlink }  = require('fs-extra')
// Models
const {Resource, Board } = require('../models/Board')

const adminRouter = Router();

adminRouter.get('/', (req, res) => {
    res.send("Hola Puerco!!")
});

adminRouter.post( '/upload', async (req, res) => {
    try {
        const response = await uploadResource(req.file, req.body)
        res.status(response.code).json(response)
    } catch ( e ){
        res.status(500).json({error: e.message})
    }
});

adminRouter.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

adminRouter.post('/resource/delete', async (req, res) => {
    try {
        const { id } = req.body;
        const resourceDel = await Resource.findByIdAndDelete(id)
            .populate({ path: 'board', model: 'Board'})
        if (!resourceDel) {
            res.status(404).json({error: 'Image not found'})
            return
        }
        await unlink(path.join(__dirname, `/../../public/${resourceDel.path}`));
        res.status(200).json({data: resourceDel})
    } catch ( e ) {
        res.status(500).json({error: e.message})
    }
});

adminRouter.get('/board/:id', async (req, res) => {
    try {
        const {id} =  req.params
        const resources = await Resource.find({ board: id })
        res.status(200).json({ data: resources })
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

adminRouter.post('/board/create', async (req, res) => {
    try {
        const data = req.body
        const board = await Board.create({
            name: data.name,
            description: data.description
        })
        res.status(200).json({data: board})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

adminRouter.get('/boards', async (req, res) => {
    try {
        const boards = await Board.find()
        res.status(200).json({data: boards})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

adminRouter.post('/board/delete', async (req, res) => {
    try {
        const { id } = req.body
        const board = await Board.findByIdAndDelete(id)
        if (!board){
            req.status(404).json({error: "Board not found"})
            return
        }
        res.status(200).json({data: board})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

module.exports = adminRouter

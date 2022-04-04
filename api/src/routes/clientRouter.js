import { Router } from 'express'
import { uploadResource } from '../resolvers/resource'
import path from 'path'
import { unlink } from 'fs-extra'
// Models
import { Resource, Board } from '../models/Board';

const router = Router();


router.get('/admin', async (req, res) => {
    const images = await Resource.find();
    res.render('index', { images });
});

router.post('/upload', async (req, res) => {
    try {
        const response = await uploadResource()
        res.status(response.code).json(response)
    } catch ( e ){
        res.status(500).json({error: e.message})
    }
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

router.post('/image/delete', async (req, res) => {
    try {
        const { id } = req.body;
        const imageDeleted = await Image.findByIdAndDelete(id)
            .populate({ path: 'board', model: 'Board'})
            .execPopulate()
        if (!imageDeleted) {
            res.status(404).json({error: 'Image not found'})
            return
        }
        console.log(imageDeleted)
        await unlink(path.resolve(`./src/public/${imageDeleted.board.name}/${imageDeleted.path}`));
        res.status(200)
    } catch ( e ) {
        res.status(500).json({error: e.message})
    }
});

router.get('/board/:id', async (req, res) => {
    try {
        const {id} =  req.params
        const resources = await Resource.find({ board: id })
        res.status(200).json({ data: resources })
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

module.exports = router;
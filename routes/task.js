import {router} from "express/lib/application.js";

router.route('/')
  .get((req, res) => {
    res.send('ok')
  })
  .post((req, res) => {})

router.get('/:id', (req, res) => {})

router.put('/:id', (req, res) => {})

router.delete('/:id', (req, res) => {})

export default router;

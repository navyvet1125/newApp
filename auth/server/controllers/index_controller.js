const controller = {}
controller.index = (req,res) => {
	res.render('index', { title: 'Express' })
}
export default controller;
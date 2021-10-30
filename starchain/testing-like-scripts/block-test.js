let mb = new Block('anna');
mb.incrementHeight();
mb.generateInitialHash();
mb.validate().then(function(res) {
	console.log(res)
});


let mb = new Block('anna');
mb.incrementHeight();
mb.getBData().then(function(res) {
	console.log(res)
});

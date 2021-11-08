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


mb = new Block('notagin');
app.blockchain.addBlock(mb).then(function(block) {
	console.log(JSON.stringify(block))
});


//for testing submitstar; not clear if first block is needed
mb = new Block('notagain');
app.blockchain.addBlock(mb).then(function(block) {
	console.log(JSON.stringify(block))
});

app.blockchain.submitStar('123', 'afjls;kdas', 'ajlk;fff', {star: 'ajdfk'}).then(function(block) {
	console.log(JSON.stringify(block));
});
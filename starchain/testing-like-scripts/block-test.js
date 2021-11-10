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

//to test the getblockby hash
mb0 = new Block('notagin');
app.blockchain.addBlock(mb0).then(function(block) {
	console.log('block added')
});

mb1 = new Block('notagin1');
app.blockchain.addBlock(mb1).then(function(block) {
	console.log('block added')
});

mb2 = new Block('notagin2');
app.blockchain.addBlock(mb2).then(function(block) {
	console.log('block added')
});

app.blockchain.getBlockByHash('123').then(function(res) {
	console.log(res);
});

app.blockchain.getBlockByHash(mb2.hash).then(function(res) {
	if(res){
		console.log(JSON.stringify(res));
	}
	else {
		console.log('not found')
	}
});
var mongoose = require('mongoose');
var telomere = require('./Telomere.js');

var populationSchema = new mongoose.Schema({
	name: String,
	date: { type : Date, default :Date.now },
	description : String,

	
telomeres: [
	{
		type : mongoose.Schema.Types.ObjectId,
		ref: 'Telomere'
	}
			],
telomeresBis : [
	{ id : String }
				]
});

populationSchema.methods.populationReturnForAngular = function () {
 
	return {
		id: this._id,
		name: this.name,
		params: this.params,
		/*telomeres: this.telomeres.map((Telomere) => {
			return telomere.telomereReturnForAngular();
		})*/
	}
  
 }


var Population = mongoose.model('Population', populationSchema);

module.exports = Population;
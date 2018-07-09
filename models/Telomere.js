var mongoose = require('mongoose');
var teloSchema = new mongoose.Schema({
	author : String,
	params : [String],
	date : { type : Date, default: Date.now },
	year : Number,
	organisme : String,
	fileName : String,
	
	populations: [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref: 'Population'
		}
				]
});


//give the object to angular
teloSchema.methods.telomereReturnForAngular = function () {
 
	return {
		id: this._id,
		name: this.name,
		params: this.params,
		populations: this.populations.map((Population) => {
			return Population.populationReturnForAngular();
		})
	}
  
 }



var Telomere = mongoose.model('Telomere', teloSchema);

module.exports = Telomere;
/***************************************************/

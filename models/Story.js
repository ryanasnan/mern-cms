const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const StorySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	slug: String,
	text: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create Story slug from the name
StorySchema.pre('save', function (next) {
	this.slug = slugify(`${this.title}-${this._id}`, { lower: true });
	next();
})

module.exports = Story = mongoose.model('Story', StorySchema);
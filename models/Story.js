const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const { totalCommentsAndReplies } = require('../utils/modelResults');

const StorySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	slug: String,
	text: {
		type: String,
		required: true,
		minlength: [300, 'Text minimal is 300 character']
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	picture: {
		directoryPath: {
			type: String,
			default: './static/images'
		},
		fileName: {
			type: String,
			default: 'default-story.jpg'
		}
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
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
			},
			reply: [
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: 'users'
					},
					text: {
						type: String,
						required: true,
						default: ''
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
					},
					mention: {
						type: String,
						default: ''
					}
				}
			]
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

// Create Story slug from the name
StorySchema.pre('save', function (next) {
	this.slug = slugify(`${this.title}-${this._id}`, { lower: true });
	next();
})


// need to check if the property is available (the property available if included on selection)
StorySchema.virtual('countCommentsAndReplies').get(function () {
	return this.comments !== undefined ? totalCommentsAndReplies(this.comments) : 0;
});

StorySchema.virtual('countLikes').get(function () {
	return this.likes !== undefined ? this.likes.length : 0;
});

module.exports = Story = mongoose.model('Story', StorySchema);
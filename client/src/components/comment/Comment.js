import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isObjectEmpty, isNullOrEmptyObject, arrayPaginator, preventDuplicateSameObjectDocumentId } from '../../utils/helper';
import moment from 'moment';
import { getStoryBySlug, reloadComment, commentStory, replyComment as actionReply, deleteCommentStory, deleteReplyComment } from '../../actions/story';
import Spinner from '../layout/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash';
import swal from 'sweetalert';

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			story: {},
			showComments: [],
			getComments: {
				comments: [],
				limitgetComments: 3,
				currentPage: null,
				total: '',
				nextPageComment: 1,
				previousPageComment: null,
				totalPages: 0
			},
			totalCommentAndReplies: 0,
			newComment: {
				text: '',
				commentId: '',
				mentionCommentId: ''
			},
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let stateObj = {};

		if (!isNullOrEmptyObject(nextProps.story.story)) {
			if (nextProps.story.story.data.results !== undefined) {
				stateObj = {
					...stateObj,
					showComments: preventDuplicateSameObjectDocumentId([...prevState.showComments], [...prevState.getComments.comments])
				}

				if (isObjectEmpty(prevState.story)) {
					stateObj = {
						...stateObj,
						story: nextProps.story.story.data.results
					}
				}
			}
		}

		if (!nextProps.comment.loading) {
			stateObj = {
				...stateObj,
				totalCommentAndReplies: nextProps.comment.totalCommentAndReplies
			}
		}

		return stateObj;
	}

	loadComment = _.debounce((page) => {
		if (page != null) {
			if (!isObjectEmpty(this.props.comment.data)) {
				const comments = this.props.comment.data;
				let { getComments } = this.state;
				const listComments = arrayPaginator(comments, page, getComments.limitgetComments);

				this.setState({
					showComments: [],
					getComments: {
						comments: listComments.data,
						limitgetComments: listComments.limit,
						total: listComments.total,
						currentPage: listComments.page,
						nextPageComment: listComments.nextPage,
						previousPageComment: listComments.previousPage,
						totalPages: listComments.totalPages
					}
				})
			}
		}
	}, 200)

	// using debounce for waiting
	replyComment = _.debounce((e, parentComment, mentionComment) => {
		this.setState({ newComment: { commentId: parentComment._id, mentionCommentId: (mentionComment != '' ? mentionComment._id : ''), text: (mentionComment != '' ? `@${mentionComment.name} ` : '') } });
		this.replyInput.focus();
		this.replyInput.setSelectionRange(this.replyInput.value.length, this.replyInput.value.length);
	}, 250);

	commentStory = (e) => {
		this.commentStoryInput.focus();
	}

	setComment = (e) => {
		const objectElement = e.target;

		// for box-sizing other than "content-box" use:
		// objectElement.style.cssText = '-moz-box-sizing:content-box';
		objectElement.style.cssText = 'height:' + objectElement.scrollHeight + 'px';
		this.setState(
			{
				newComment:
				{
					...this.state.newComment,
					text: e.target.value
				}
			})
	};

	loseFocusComment = (e) => {
		e.target.value = '';
		e.target.blur();
		this.setState({ newComment: { text: '', commentId: '', mentionCommentId: '' } })
	}

	submitReply = (e) => {
		if (e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();

			const { story, newComment } = this.state;
			const commentData = {
				text: newComment.text
			}
			// to get the form on reply
			if (this.state.newComment.commentId != '') {
				this.props.actionReply(story._id, newComment.commentId, commentData, newComment.mentionCommentId);
				this.reloadComment(this.state.getComments.currentPage);

			}
			else {
				this.props.commentStory(story._id, commentData);
				this.reloadComment(1);

			}
			this.loseFocusComment(e);
		}
	}

	deleteComment = async (e, story, commentStory, replyComment = null) => {
		let { currentPage, previousPageComment, limitgetComments, total } = this.state.getComments;
		let textAlert = replyComment != null ? "Your reply will be deleted permanently?" : "Your comment and the replies will be deleted permanently?"

		const willDelete = await swal({
			title: "Are you sure?",
			text: textAlert,
			icon: "warning",
			dangerMode: true,
			buttons: true
		});

		if (willDelete) {
			if (replyComment != null) {
				await this.props.deleteReplyComment(story._id, commentStory._id, replyComment._id);
			}
			else {
				await this.props.deleteCommentStory(story._id, commentStory._id);
			}

			if (currentPage > 1) {
				let lastNumberComment = (previousPageComment * limitgetComments) + 1;
				if (lastNumberComment == total && replyComment == null) {
					await this.reloadComment(previousPageComment);
				}
				else {
					await this.reloadComment(this.state.getComments.currentPage);
				}
			}
			else {
				await this.reloadComment(this.state.getComments.currentPage);
			}
		}
	}

	reloadComment = _.debounce((pageJump) => {
		this.props.reloadComment(this.state.story._id);
		this.loadComment(pageJump);
	}, 900)

	renderComments(comment, parentComment = null) {
		const user = this.props.auth.user;
		return (
			<Fragment>
				<div className="mb-2">
					<div className="d-flex mb-3 align-items-center">
						<img alt="#" className="rounded-circle shadow extra-small-thumbnail" src="https://www.w3schools.com/howto/img_avatar.png" />
						<div className="pl-3">
							<h2 className="mb-2 h6 font-weight-bold">
								<Link className="text-dark" to="./story">{comment.name}</Link>
							</h2>
							<small className="text-muted mr-2">{moment(comment.date).fromNow()}</small>
						</div>
					</div>
					<div className="card-text text-muted">
						{comment.text}
					</div>
					{/* NEED AUTHENTICATION */}
					{
						parentComment != null
							?
							<Fragment>
								<button className="btn btn-link btn-sm pl-0 text-primary" onClick={(e) => this.replyComment(e, parentComment, comment)}>Reply</button>
								{
									user._id == comment.user
										? <button className="btn btn-link btn-sm pl-0 text-danger" onClick={(e) => this.deleteComment(e, this.state.story, parentComment, comment)}>Delete</button>
										: ''
								}
							</Fragment>
							:
							<Fragment>
								<button className="btn btn-link btn-sm pl-0 text-primary" onClick={(e) => this.replyComment(e, comment, '')}>Reply</button>
								{
									user._id == comment.user
										? <button className="btn btn-link btn-sm pl-0 text-danger" onClick={(e) => this.deleteComment(e, this.state.story, comment)}>Delete</button>
										: ''

								}
							</Fragment>
					}
				</div>
				{
					(parentComment != null ? (this.state.newComment.mentionCommentId == comment._id) : (this.state.newComment.commentId == comment._id && this.state.newComment.mentionCommentId == ''))
						?
						<form ref={el => this.myFormRef = el} className="">
							<textarea
								ref={el => this.replyInput = el}
								className="form-control input-round input-comment mb-3"
								onChange={this.setComment}
								onBlur={this.loseFocusComment}
								onKeyDown={this.submitReply}
								placeholder="Reply Comment.."
								value={this.state.newComment.text}
								rows="1">
							</textarea>
						</form>

						: ''
				}
			</Fragment>
		)

	}

	renderCommentPagination = () => {
		const { total, previousPageComment, nextPageComment, totalPages } = this.state.getComments;
		const classPrevPage = previousPageComment != null ? 'text-primary' : 'text-lightblue';
		const classNextPage = nextPageComment != null ? 'text-primary' : 'text-lightblue';
		return (
			<Fragment>
				{
					totalPages > 1
						?
						<div className="container mb-3">
							<div className="row justify-content-between">
								<button className={`btn text-primary ${classPrevPage}`} onClick={() => { if (previousPageComment != null) this.loadComment(previousPageComment) }}>
									<FontAwesomeIcon size="lg" className={classPrevPage} icon="chevron-left" /> Previous Comment

					</button>
								<button className={`btn text-primary ${classNextPage}`} onClick={() => { if (nextPageComment != null) this.loadComment(nextPageComment) }} >
									Next Comment <FontAwesomeIcon size="lg" className={classNextPage} icon="chevron-right" />

								</button>
							</div>
						</div>

						: ''
				}

			</Fragment>
		)
	}

	componentDidMount() {
		const { getComments } = this.state;
		if (getComments.currentPage == null) {
			this.reloadComment(1);
		}
	}

	render() {
		const { showComments, getComments } = this.state;

		return (
			<Fragment>

				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-12 pb-2 text-center">
							<button type="button" className="btn btn-primary ml-2 mr-2" data-toggle="modal" data-target="#exampleModal">
								<FontAwesomeIcon size="sm" icon="thumbs-up" /> 20 Likes
							</button>

							<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div className="modal-dialog modal-dialog-centered" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">

										</div>
									</div>
								</div>
							</div>

							<button className="btn btn-secondary ml-2 mr-2" onClick={this.commentStory}>
								<FontAwesomeIcon size="sm" icon="comment" /> {this.state.totalCommentAndReplies} Comments
							</button>
							<hr />
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-10 pt-2">
							<div className="card box-shadow border-0 post-comment">
								<div className="mb-4 d-flex">
									<img alt="#" className="rounded-circle shadow extra-small-thumbnail" src="https://www.w3schools.com/howto/img_avatar.png" />
									<div className="pl-3 w-100">
										<div className="form-group">
											<form className="">
												<textarea
													ref={el => this.commentStoryInput = el}
													className="form-control input-round input-comment mb-3"
													onChange={this.setComment}
													onKeyDown={this.submitReply}
													placeholder="Write Comment.."
													rows="1">
												</textarea>
											</form>
										</div>
									</div>
								</div>
							</div>

							{this.renderCommentPagination()}

							{_.map(showComments, comment => {
								return (
									<Fragment key={comment._id}>
										<div className="card mb-4 box-shadow main-comment pt-3 pb-3 pl-3 pr-3">
											{this.renderComments(comment)}
											{
												comment.reply != 0
													?
													<div className="card mb-4 box-shadow reply-comment pt-3 pb-3 pl-3 pr-3">
														{_.map(comment.reply, reply => {
															return (
																<Fragment key={reply._id}>
																	{this.renderComments(reply, comment)}
																</Fragment>
															)
														})}
													</div>
													: ''
											}
										</div>
									</Fragment>
								)
							})}

						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	story: state.story,
	comment: state.comment
})

export default connect(mapStateToProps, { getStoryBySlug, reloadComment, commentStory, actionReply, deleteCommentStory, deleteReplyComment })(Comment);
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isObjectEmpty, isNullOrEmptyObject, arrayPaginator } from '../../utils/helper';
import moment from 'moment';
import { loadComment, commentStory, replyComment as actionReply, deleteCommentStory, deleteReplyComment, loadLikeStory, likeStory, unlikeStory } from '../../actions/story';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash';
import swal from 'sweetalert';

class Response extends Component {
	constructor(props) {
		super(props);
		this.state = {
			story: props.story,
			getComments: {
				comments: [],
				limitgetComments: 5,
				currentPage: null,
				total: '',
				nextPageComment: 1,
				previousPageComment: null,
				totalPages: 0
			},
			totalCommentsAndReplies: 0,
			newComment: {
				text: '',
				commentId: '',
				mentionCommentId: ''
			},
			like: {
				totalLikes: 0,
				dataLikeStory: null,
				userLikeStoryStatus: {
					status: false,
					likeId: null
				}
			}
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let stateObj = {};

		if (!nextProps.storyComment.loading) {
			stateObj = {
				...stateObj,
				totalCommentsAndReplies: nextProps.storyComment.totalCommentsAndReplies
			}
		}

		if(!nextProps.storyLike.loading) {
			stateObj = {
				...stateObj,
				like: {
					dataLikeStory: nextProps.storyLike.data,
					totalLikes: nextProps.storyLike.data.length
				}
			}

			if(!isNullOrEmptyObject(nextProps.auth.user)) {
				// the getderivedstatefromprops cannot access function/method in this class

				let status = false;
				let likeId = null;
				let userId = nextProps.auth.user._id.toString();
				let checkUserLikeStory = nextProps.storyLike.data.find((likeStory) => { return likeStory.user === userId });

				if (checkUserLikeStory !== undefined) {
					status = true;
					likeId = checkUserLikeStory._id;
				}
				
				stateObj = {
					...stateObj,
					like: {
						...stateObj.like,
						userLikeStoryStatus: {
							status: status,
							likeId: likeId
						}
					}
				}
			}
		}

		return stateObj;
	}

	paginateComment = _.debounce((page) => {
		if (page != null) {
			if (!isObjectEmpty(this.props.storyComment.data)) {
				const comments = this.props.storyComment.data;
				let { getComments } = this.state;
				const listComments = arrayPaginator(comments, page, getComments.limitgetComments);

				this.setState({
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

	setFocusComment = (e) => {
		this.commentStoryInput.focus();
	}

	replyComment = _.debounce((e, parentComment, mentionComment) => {
		this.setState({ newComment: { commentId: parentComment._id, mentionCommentId: (mentionComment !== '' ? mentionComment._id : ''), text: (mentionComment !== '' ? `@${mentionComment.name} ` : '') } });
		this.replyInput.focus();
		this.replyInput.setSelectionRange(this.replyInput.value.length, this.replyInput.value.length);
	}, 250);

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

	submitComment = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();

			const { story, newComment } = this.state;
			const commentData = {
				text: newComment.text
			}
			// to get the form on reply
			if (this.state.newComment.commentId !== '') {
				this.props.actionReply(story._id, newComment.commentId, commentData, newComment.mentionCommentId);
				this.loadComment(this.state.getComments.currentPage);
			}
			else {
				this.props.commentStory(story._id, commentData);
				this.loadComment(1);

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
				if (lastNumberComment === total && replyComment === null) {
					await this.loadComment(previousPageComment);
				}
				else {
					await this.loadComment(this.state.getComments.currentPage);
				}
			}
			else {
				await this.loadComment(this.state.getComments.currentPage);
			}
		}
	}

	loadComment = _.debounce((pageJump) => {
		this.props.loadComment(this.state.story._id);
		this.paginateComment(pageJump);
	}, 900)

	setLikeStory = async (e, storyId) => {
		e.preventDefault();
		await this.props.likeStory(storyId);
		await this.props.loadLikeStory(storyId);
	}

	setUnlikeStory = async (e, storyId, likeId) => {
		e.preventDefault();
		await this.props.unlikeStory(storyId, likeId);
		await this.props.loadLikeStory(storyId);
	}

	renderComments(comment, parentComment = null, isAuthenticated) {
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
					{ 
						isAuthenticated 
						? 
							parentComment != null
								?
								<Fragment>
									<button className="btn btn-link btn-sm pl-0 text-primary" onClick={(e) => this.replyComment(e, parentComment, comment)}>Reply</button>
									{
										user._id === comment.user
											? <button className="btn btn-link btn-sm pl-0 text-danger" onClick={(e) => this.deleteComment(e, this.state.story, parentComment, comment)}>Delete</button>
											: ''
									}
								</Fragment>
								:
								<Fragment>
									<button className="btn btn-link btn-sm pl-0 text-primary" onClick={(e) => this.replyComment(e, comment, '')}>Reply</button>
									{
										user._id === comment.user
											? <button className="btn btn-link btn-sm pl-0 text-danger" onClick={(e) => this.deleteComment(e, this.state.story, comment)}>Delete</button>
											: ''
	
									}
								</Fragment>
						: ''
					}
				</div>
				{
					(parentComment !== null ? (this.state.newComment.mentionCommentId === comment._id) : (this.state.newComment.commentId === comment._id && this.state.newComment.mentionCommentId === ''))
						?
						<form ref={el => this.myFormRef = el} className="">
							<textarea
								ref={el => this.replyInput = el}
								className="form-control input-round input-comment mb-3"
								onChange={this.setComment}
								onBlur={this.loseFocusComment}
								onKeyDown={this.submitComment}
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
		const { previousPageComment, nextPageComment, totalPages } = this.state.getComments;
		const classPrevPage = previousPageComment != null ? 'text-primary' : 'text-lightblue';
		const classNextPage = nextPageComment != null ? 'text-primary' : 'text-lightblue';
		return (
			<Fragment>
				{
					totalPages > 1
						?
						<div className="container mb-3">
							<div className="row justify-content-between">
								<button className={`btn text-primary ${classPrevPage}`} onClick={() => { if (previousPageComment != null) this.paginateComment(previousPageComment) }}>
									<FontAwesomeIcon size="lg" className={classPrevPage} icon="chevron-left" /> Previous Comment
								</button>
								<button className={`btn text-primary ${classNextPage}`} onClick={() => { if (nextPageComment != null) this.paginateComment(nextPageComment) }} >
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
		const { getComments, story } = this.state;
		if (getComments.currentPage == null) {
			this.loadComment(1);
		}

		if (this.state.like.dataLikeStory == null) {
			this.props.loadLikeStory(story._id);
		}
	}

	render() {
		const { getComments, story, like } = this.state;
		const { auth: { isAuthenticated } } = this.props;

		const responseButton = 
			isAuthenticated 
			? (<Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-12 pb-2 text-center">

							{
								like.userLikeStoryStatus.status === true
								? <button type="button" className="btn btn-danger ml-2 mr-2" onClick={(e) => this.setUnlikeStory(e, story._id, like.userLikeStoryStatus.likeId)}>
									<FontAwesomeIcon size="sm" icon="thumbs-down" /> Unlike ({this.state.like.totalLikes})
								</button>
								: <button type="button" className="btn btn-primary ml-2 mr-2" onClick={(e) => this.setLikeStory(e, story._id)}>
									<FontAwesomeIcon size="sm" icon="thumbs-up" /> Like ({this.state.like.totalLikes})
								</button>
							}

							<button className="btn btn-secondary ml-2 mr-2" onClick={(e) => this.setFocusComment() }>
								<FontAwesomeIcon size="sm" icon="comment" /> Comment ({this.state.totalCommentsAndReplies})
							</button>
							<hr />
						</div>
					</div>
				</div>
			</Fragment>)			
			: (<Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-12 pb-2 text-center">
							<button type="button" className="btn btn-primary ml-2 mr-2" onClick={(e) => this.setLikeStory(e, story._id)}>
								<FontAwesomeIcon size="sm" icon="thumbs-up" /> Likes (20)
							</button>

							<button className="btn btn-secondary ml-2 mr-2">
								<FontAwesomeIcon size="sm" icon="comment" /> Comments ({this.state.totalCommentsAndReplies})
							</button>
							<hr />
						</div>
					</div>
				</div>
			</Fragment>);
		

		return (
			<Fragment>

				{responseButton}

				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-10 pt-2">

							{
								isAuthenticated
									? <div className="card box-shadow border-0 post-comment">
										<div className="mb-4 d-flex">
											<img alt="#" className="rounded-circle shadow extra-small-thumbnail" src="https://www.w3schools.com/howto/img_avatar.png" />
											<div className="pl-3 w-100">
												<div className="form-group">
													<form className="">
														<textarea
															ref={el => this.commentStoryInput = el}
															className="form-control input-round input-comment mb-3"
															onChange={this.setComment}
															onKeyDown={this.submitComment}
															placeholder="Write Comment.."
															rows="1">
														</textarea>
													</form>
												</div>
											</div>
										</div>
									</div>
									: ''
							}


							{this.renderCommentPagination()}

							{_.map(getComments.comments, comment => {
								return (
									<Fragment key={comment._id}>
										<div className="card mb-4 box-shadow main-comment pt-3 pb-3 pl-3 pr-3">
											{this.renderComments(comment, null, isAuthenticated)}
											{
												comment.reply.length !== 0
													?
													<div className="card mb-4 box-shadow reply-comment pt-3 pb-3 pl-3 pr-3">
														{_.map(comment.reply, reply => {
															return (
																<Fragment key={reply._id}>
																	{this.renderComments(reply, comment, isAuthenticated)}
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
	storyComment: state.storyComment,
	storyLike: state.storyLike
})

export default connect(mapStateToProps, { loadComment, commentStory, actionReply, deleteCommentStory, deleteReplyComment, loadLikeStory, likeStory, unlikeStory })(Response);
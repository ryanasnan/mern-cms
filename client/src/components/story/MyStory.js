import React, { Component } from 'react';
import { jpgDemoImg } from '../../utils/helper';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import { getUserStories, resetStory, deleteStory } from '../../actions/story';
import { isObjectEmpty, removeTagHtml } from '../../utils/helper';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import _ from 'lodash';
import swal from 'sweetalert';

class MyStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myStories: {
				data: [],
				dataManipulationStatement: {
					currentPage: 1,
					prevPageDirection: {
						hasPrevPage: false,
						page: null
					},
					nextPageDirection: {
						hasNextPage: false,
						page: null
					},
					totalDocument: 0,
					sort: '-createdAt',
					select: 'title slug text createdAt picture',
					limit: 10
				}
			}
		}

		this.props.clearAlert();
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let stateObj = {};

		if (!isObjectEmpty(nextProps.story.stories.data) && !nextProps.story.stories.loading && nextProps.history.action) {

			stateObj = {
				...stateObj,
				myStories: {
					...prevState.myStories,
					data: nextProps.story.stories.data.results,
					dataManipulationStatement: {
						...prevState.myStories.dataManipulationStatement,
						currentPage: nextProps.story.stories.data.pagination.currentPage.page,
						totalDocument: nextProps.story.stories.data.totalDocument,
						prevPageDirection: {
							hasPrevPage: nextProps.story.stories.data.pagination.hasOwnProperty('prev') ? true : false,
							page: nextProps.story.stories.data.pagination.hasOwnProperty('prev') ? nextProps.story.stories.data.pagination.prev.page : null
						},
						nextPageDirection: {
							hasNextPage: nextProps.story.stories.data.pagination.hasOwnProperty('next') ? true : false,
							page: nextProps.story.stories.data.pagination.hasOwnProperty('next') ? nextProps.story.stories.data.pagination.next.page : null
						}
					}
				}
			}
		}
		return stateObj;
	}

	componentDidMount() {
		this.loadStories();
	}

	loadStories = (option = null) => {
		const { currentPage, prevPageDirection, nextPageDirection, sort, select, limit } = this.state.myStories.dataManipulationStatement;
		let page;
		if (option === 'prevpage') {
			page = prevPageDirection.page;
		}
		else if (option === 'nextpage') {
			page = nextPageDirection.page;
		}
		else {
			page = currentPage;
		}

		const urlParams = {
			page,
			sort,
			select,
			limit
		}

		this.props.getUserStories(urlParams, this.props.auth.user._id);
	}

	changeLimitData = async (e) => {
		const newLimit = parseInt(e.target.value);

		await this.setState(
			{
				myStories: {
					...this.state.myStories,
					dataManipulationStatement: {
						...this.state.myStories.dataManipulationStatement,
						limit: newLimit
					}
				}
			}
		);

		await this.loadStories();
	}

	changeSortData = async (e) => {
		const newSort = e.target.value;

		await this.setState(
			{
				myStories: {
					...this.state.myStories,
					dataManipulationStatement: {
						...this.state.myStories.dataManipulationStatement,
						sort: newSort
					}
				}
			}
		);

		await this.loadStories();
	}

	deleteData = async (id, titlePost) => {
		let contentConfirm = document.createElement('p');
		contentConfirm.innerHTML = `Post <b> ${titlePost} </b> will be deleted!`;

		const shouldDelete = await swal({
			title: "Are you sure?",
			content: contentConfirm,
			icon: "warning",
			buttons: true,
			dangerMode: true,
		});

		let contentSuccessfullDeleted = document.createElement('p');
		contentSuccessfullDeleted.innerHTML = `Post <b> ${titlePost} </b> has successfully deleted!`;

		if (shouldDelete) {
			await this.props.deleteStory(id);
			swal({
				content: contentSuccessfullDeleted,
				icon: "success"
			});
			await this.loadStories();
		}
	}

	renderUserStories(story) {
		const storyTextWithoutTag = removeTagHtml(story.text);
		const storyText = storyTextWithoutTag.length < 80 ? storyTextWithoutTag : storyTextWithoutTag.substring(0, 80) + '...';
		const title = story.title.length < 35 ? story.title : story.title.substring(0, 35) + '...';

		return (
			<div key={story._id} className="flex-item-two-columns pt-3 border-top border-dark">
				<div className="mb-3 d-flex align-items-center">
					<img alt="#" className="small-thumbnail" src={`/${story.picture.directoryPath}/${story.picture.fileName}`} />
					<div className="pl-3">
						<h2 className="mb-2 h6 font-weight-bold">
							<Link className="text-dark" to={{ pathname: `/story/${story.slug}` }}>{title}</Link>
						</h2>
						<div className="card-text text-muted small">
							{storyText}
						</div>
						<small className="text-muted">{moment(story.createdAt).format('ll')}</small>
					</div>
				</div>
				<ul className="story-button">
					<li className="form-control"><button className="btn btn-sm btn-primary"><i className="fa fa-chart-line"></i><FontAwesomeIcon size="sm" icon="thumbs-up" /> 12 Like</button></li>
					<li className="form-control"><button className="btn btn-sm btn-secondary"><FontAwesomeIcon size="sm" icon="comment" /> 2 Comment</button></li>
					<li className="form-control"><Link to={`./editstory/${story.slug}`} className="btn btn-sm btn-lightblue"><FontAwesomeIcon size="sm" icon="edit" /> Edit</Link></li>
					<li className="form-control"><button onClick={() => { this.deleteData(story._id, title) }} className="btn btn-sm btn-danger"><FontAwesomeIcon size="sm" icon="trash-alt" /> Delete</button></li>
				</ul>
			</div>
		);
	}

	renderPaginationPointer() {
		const { totalDocument, prevPageDirection, nextPageDirection } = this.state.myStories.dataManipulationStatement;
		const classPrevPage = prevPageDirection.hasPrevPage ? 'text-primary cursor-pointer' : 'text-lightblue';
		const classNextPage = nextPageDirection.hasNextPage ? 'text-primary cursor-pointer' : 'text-lightblue';
		return (
			<div className="container pt-2">
				<div className="row data-page-switch">
					<ul>
						<li className="form-control data-page-info">
							<FontAwesomeIcon onClick={() => { if (prevPageDirection.hasPrevPage) this.loadStories('prevpage') }} className={classPrevPage} size="lg" icon="chevron-left" />
						</li>
						<li className="form-control data-page-info">
							<span className="text-dark">You have {totalDocument} Stories</span>
						</li>
						<li className="form-control data-page-info">
							<FontAwesomeIcon onClick={() => { if (nextPageDirection.hasNextPage) this.loadStories('nextpage') }} className={classNextPage} size="lg" icon="chevron-right" />
						</li>
					</ul>
				</div>
			</div>
		);
	}

	render() {
		const { loading: loadingUserStory } = this.props.story.stories;
		const { data: myStoriesData, dataManipulationStatement: dms } = this.state.myStories;

		return (
			<div className="row increase-min-height">
				<div className="col-md-12">
					<div className="container pb-2">
						<div className="row filter-data">
							<div className="col sort">
								<select className="form-control" value={dms.sort} onChange={this.changeSortData}>
									<option value="-createdAt">Last Date</option>
									<option value="createdAt">First Date</option>
									<option value="title">Title</option>
								</select>
							</div>

							<div className="col limit">
								<select className="form-control" value={dms.limit} onChange={this.changeLimitData}>
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
								</select>
							</div>
						</div>
					</div>

					{this.renderPaginationPointer()}

					<div className="container pt-4 pb-4">
						{loadingUserStory ? <Spinner /> :
							<div className="row">
								{_.map(myStoriesData, story => {
									return this.renderUserStories(story, loadingUserStory);
								})}
							</div>
						}
					</div>

				</div>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	story: state.story
});

export default connect(mapStateToProps, { getUserStories, deleteStory, resetStory, setAlert, clearAlert, setErrors, clearErrors })(withRouter(MyStory));
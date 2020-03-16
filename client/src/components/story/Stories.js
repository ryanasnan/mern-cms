import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import { getStories, getPopularStories, getStory, resetStory, getRandomStory } from '../../actions/story';
import { isNullOrEmptyObject, isObjectEmpty, removeTagHtml, preventDuplicateSameObjectDocumentId } from '../../utils/helper';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import _ from 'lodash';

class Stories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			latestStories: {
				data: [],
				dataManipulationStatement: {
					currentPage: 1,
					sort: '-createdAt',
					select: 'title slug text createdAt picture',
					limit: 5,
					hasMore: false
				}
			},
			randomStory: {
				data: {}
			},
			popularStories: {
				data: null,
				loading: true
			}
		}
		this.props.clearAlert();
		this.props.clearErrors();
	}

	onScroll = _.debounce(() => {
		const { currentPage, sort, select, limit, hasMore } = this.state.latestStories.dataManipulationStatement;
		if (!hasMore) return;

		if (
			window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
		) {
			this.loadStory({
				page: (currentPage + 1),
				sort,
				select,
				limit
			});
		}
	}, 100)

	static getDerivedStateFromProps(nextProps, prevState) {

		let stateObj = {};
		if (nextProps.errors) {
			stateObj = {
				...stateObj,
				errors: nextProps.errors
			};
		}

		if (!isObjectEmpty(nextProps.story.stories.data) && !nextProps.story.stories.loading) {
			let hasMore = false;
			if (nextProps.story.stories.data.pagination.hasOwnProperty('next')) {
				hasMore = true;
			}
			stateObj = {
				...stateObj,
				latestStories: {
					...prevState.latestStories,
					data: preventDuplicateSameObjectDocumentId([...prevState.latestStories.data], [...nextProps.story.stories.data.results]),
					dataManipulationStatement: {
						...prevState.latestStories.dataManipulationStatement,
						currentPage: nextProps.story.stories.data.pagination.currentPage.page,
						hasMore
					}
				}
			}
		}

		if (!isObjectEmpty(nextProps.story.randomStory.data && !nextProps.story.randomStory.loading)) {
			if (isObjectEmpty(prevState.randomStory.data)) {
				stateObj = {
					...stateObj,
					randomStory: {
						data: nextProps.story.randomStory.data
					}
				}

			}
		}

		if (!isNullOrEmptyObject(nextProps.story.popularStories.data)) {
			if (isNullOrEmptyObject(prevState.popularStories.data)) {
				stateObj = {
					...stateObj,
					popularStories: {
						data: nextProps.story.popularStories.data.results,
						loading: nextProps.story.popularStories.loading
					}
				}

			}
		}


		return stateObj;
	}


	componentDidMount() {
		window.addEventListener('scroll', this.onScroll, false);
		const { currentPage, sort, select, limit } = this.state.latestStories.dataManipulationStatement;

		this.loadStory({
			page: currentPage,
			sort,
			select,
			limit
		});
		this.loadRandomStory();
		this.loadPopularStories(5);
	}

	loadPopularStories = _.debounce((number) => {
		this.props.getPopularStories(number);
	}, 700);

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	loadStory = (urlParams) => {
		this.props.getStories(urlParams);
	}

	loadRandomStory = () => {
		this.props.getRandomStory();
	}

	renderRandomStory = (story, loading) => {

		if (loading) {
			return (<Spinner />);
		}
		else {
			const storyTextWithoutTag = removeTagHtml(story.text);

			const styleBackgroundImage = {
				backgroundImage: `url(/${story.picture.directoryPath}/${story.picture.fileName})`,
				height: '350px',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
			}

			return (
				<Fragment>
					<h5 className="font-weight-bold spanborder"><span>Random Story</span></h5>
					<div className="card border-0 mb-5 box-shadow">
						<div style={styleBackgroundImage} >

						</div>
						<div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
							<h2 className="h2 font-weight-bold">
								<Link className="text-dark" to={{ pathname: `/story/${story.slug}` }}>{story.title}</Link>
							</h2>
							{storyTextWithoutTag.length < 200 ? storyTextWithoutTag : storyTextWithoutTag.substring(0, 200) + '...'}
							<div>
								<small className="d-block"><Link className="text-muted" to="#">{story.user.name}</Link></small>
								<small className="text-muted">{moment(story.createdAt).format('ll')}</small>
							</div>
						</div>
					</div>
				</Fragment>
			);
		}


	}

	renderLatestStories(story, loadingLatestStories) {
		const storyTextWithoutTag = removeTagHtml(story.text);

		return (
			<div key={story._id} className="mb-3 d-flex align-items-center">
				<div className="pr-3">
					<h2 className="mb-1 h4 font-weight-bold">
						<Link className="text-dark" to={{ pathname: `/story/${story.slug}` }}>{story.title}</Link>
					</h2>
					<p>
						{storyTextWithoutTag.length < 150 ? storyTextWithoutTag : storyTextWithoutTag.substring(0, 150) + '...'}
					</p>
					<div className="card-text text-muted small">
						{story.user.name}
					</div>
					<small className="text-muted">{moment(story.createdAt).format('ll')}</small>
				</div>
				<img alt="#" className="small-thumbnail ml-auto" src={`/${story.picture.directoryPath}/${story.picture.fileName}`} aria-hidden />
			</div>
		);
	}

	renderPopularStories(stories, loading) {
		return (
			<Fragment>
				<div className="col-md-4 pl-4">
					<div className="sticky-top">
						<h5 className="font-weight-bold spanborder"><span>Popular Stories</span></h5>
						{
							loading || isNullOrEmptyObject(stories)
								? <Spinner />
								:
								<ol className="list-featured">
									{_.map(stories, story => {
										var storyTitle = story.title.length < 30 ? story.title : story.title.substring(0, 30) + '...';
										return (
											<li key={story._id}>
												<span>
													<h6 className="font-weight-bold">
														<Link className="text-dark" to={{ pathname: `/story/${story.slug}` }}>{storyTitle}</Link>
													</h6>
													<p className="text-muted">
														{story.user.name}
                                    				</p>
												</span>
											</li>
										)
									})}
								</ol>
						}

					</div>
				</div>


			</Fragment>
		)
	}

	render() {
		const { stories: { loading: loadingLatestStories }, randomStory: { loading: loadingRandomStory } } = this.props.story;
		const { latestStories: { data: latestStoriesData }, randomStory: { data: { results: randomStory } }, popularStories: { data: popularStories, loading: loadingPopularStories } } = this.state;

		return (
			<div className="row responsive-column-reverse">
				<div className="col-md-8">
					{this.renderRandomStory(randomStory, loadingRandomStory)}

					<h5 className="font-weight-bold spanborder"><span>Latest Stories</span></h5>
					{_.map(latestStoriesData, story => {
						return this.renderLatestStories(story, loadingLatestStories);
					})}
					{loadingLatestStories &&
						<Spinner />
					}

				</div>
				{this.renderPopularStories(popularStories, loadingPopularStories)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	story: state.story
});


export default connect(mapStateToProps, { setAlert, clearAlert, setErrors, clearErrors, getStories, getPopularStories, getStory, resetStory, getRandomStory })(Stories);
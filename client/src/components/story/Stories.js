import React, { Component } from 'react';
import { jpgDemoImg } from '../../utils/helper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import { getStories, getStory, resetStory } from '../../actions/story';
import { isObjectEmpty, removeTagHtml, preventDuplicateObjectInStoriesArray } from '../../utils/helper';
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
					select: 'title slug text',
					limit: 5,
					hasMore: false
				}
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

		if (!isObjectEmpty(nextProps.story.data) && !nextProps.story.loading) {
			let hasMore = false;
			if (nextProps.story.data.pagination.hasOwnProperty('next')) {
				hasMore = true;
			}
			stateObj = {
				...stateObj,
				latestStories: {
					...prevState.latestStories,
					data: preventDuplicateObjectInStoriesArray([...prevState.latestStories.data], [...nextProps.story.data.results]),
					dataManipulationStatement: {
						...prevState.latestStories.dataManipulationStatement,
						currentPage: nextProps.story.data.pagination.currentPage.page,
						hasMore
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
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	loadStory = (urlParams) => {
		this.props.getStories(urlParams);
	}

	renderLatestStories(story, loadingLatestStories) {
		const storyTextWithoutTag = removeTagHtml(story.text); 

		return (
			<div key={story._id} className="mb-3 d-flex justify-content-between">
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
				<img alt="#" height="120" src={jpgDemoImg(1)} aria-hidden />
			</div>

		);
	}

	render() {
		const loadingLatestStories = this.props.story.loading;
		const { latestStories: { data: latestStoriesData } } = this.state;

		return (
			<div className="row">
				<div className="col-md-8">
					<h5 className="font-weight-bold spanborder"><span>Shuffle Story</span></h5>
					<div className="card border-0 mb-5 box-shadow">
						<div style={{ backgroundImage: `url(${jpgDemoImg(2)})`, height: '350px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} ></div>
						<div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
							<h2 className="h2 font-weight-bold">
								<Link className="text-dark" to="./story">Brain Stimulation Relieves Depression Symptoms</Link>
							</h2>
							<p className="card-text">
								Researchers have found an effective target in the brain for electrical stimulation to improve mood in people suffering from depression.
                            </p>
							<div>
								<small className="d-block"><Link className="text-muted" to="./author.html">Favid Rick</Link></small>
								<small className="text-muted">Dec 12 · 5 min read</small>
							</div>
						</div>
					</div>

					<h5 className="font-weight-bold spanborder"><span>Latest Stories</span></h5>
					{_.map(latestStoriesData, story => {
						return this.renderLatestStories(story, loadingLatestStories);
					})}
					{loadingLatestStories &&
						<Spinner />
					}

				</div>
				<div className="col-md-4 pl-4">
					<div className="sticky-top">
						<h5 className="font-weight-bold spanborder"><span>Popular Stories</span></h5>
						<ol className="list-featured">
							<li>
								<span>
									<h6 className="font-weight-bold">
										<Link to="./story" className="text-dark">Did Supernovae Kill Off Large Ocean Animals?</Link>
									</h6>
									<p className="text-muted">
										Jake Bittle in SCIENCE
                                    </p>
								</span>
							</li>
							<li>
								<span>
									<h6 className="font-weight-bold">
										<Link to="./story" className="text-dark">Humans Reversing Climate Clock: 50 Million Years</Link>
									</h6>
									<p className="text-muted">
										Jake Bittle in SCIENCE
                                    </p>
								</span>
							</li>
							<li>
								<span>
									<h6 className="font-weight-bold">
										<Link to="./story" className="text-dark">Unprecedented Views of the Birth of Planets</Link>
									</h6>
									<p className="text-muted">
										Jake Bittle in SCIENCE
                                    </p>
								</span>
							</li>
							<li>
								<span>
									<h6 className="font-weight-bold">
										<Link to="./story" className="text-dark">Effective New Target for Mood-Boosting Brain Stimulation Found</Link>
									</h6>
									<p className="text-muted">
										Jake Bittle in SCIENCE
									</p>
								</span>
							</li>
							<li>
								<span>
									<h6 className="font-weight-bold">
										<Link to="./story" className="text-dark">Effective New Target for Mood-Boosting Brain Stimulation Found</Link>
									</h6>
									<p className="text-muted">
										Jake Bittle in SCIENCE
                                    </p>
								</span>
							</li>
						</ol>
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


export default connect(mapStateToProps, { preventDuplicateObjectInStoriesArray, setAlert, clearAlert, setErrors, clearErrors, getStories, getStory, resetStory })(Stories);
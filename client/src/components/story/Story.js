import React, { Component, Fragment } from 'react';
import { jpgDemoImg } from '../../utils/helper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import { getStoryBySlug } from '../../actions/story';
import { isObjectEmpty, isNullOrEmptyObject } from '../../utils/helper';
import parse from 'html-react-parser';
import moment from 'moment';
import Spinner from '../layout/Spinner';
import Response from '../response/Response';

class Story extends Component {
	constructor(props) {
		super(props);
		this.state = {
			story: {
				data: {}
			}
		}
		this.props.clearAlert();
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let stateObj = {};
		if (!isObjectEmpty(nextProps.match.params)) {
			stateObj = {
				...stateObj,
				story: {
					...prevState.story,
					data: {
						...prevState.story.data,
						slug: nextProps.match.params.slug
					}
				}
			}
		}

		if (!isNullOrEmptyObject(nextProps.story.story.data)) {
			stateObj = {
				...stateObj,
				story: {
					...prevState.story,
					data: {
						...prevState.story.data,
						_id: nextProps.story.story.data.results._id,
						title: nextProps.story.story.data.results.title,
						text: nextProps.story.story.data.results.text,
						picture: nextProps.story.story.data.results.picture,
						user: nextProps.story.story.data.results.user,
						createdAt: nextProps.story.story.data.results.createdAt
					}
				}
			}
		}

		return stateObj;
	}

	componentDidMount() {
		const { slug } = this.state.story.data;

		this.props.getStoryBySlug(slug, this.props.history);
	}

	renderStory(story, loading) {
		if (loading) {
			return (<Spinner />);
		}
		else {
			const { title, text, user, picture, createdAt } = story;
			return (
				<Fragment>
					<div className="container pt-4 pb-4">
						<div className="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
							<div className="h-100 tofront">
								<div className="row justify-content-between">
									<div className="col-md-6 align-self-center">
										<p className="text-uppercase font-weight-bold">
											<Link className="text-danger" to="/">Stories</Link>
										</p>
										<h1 className="display-4 secondfont mb-3 font-weight-bold">{title}</h1>
										<div className="d-flex align-items-center">
											<img className="rounded-circle extra-small-thumbnail" alt="#" src="https://www.w3schools.com/howto/img_avatar.png" aria-hidden />

											<small className="ml-2">{user.name}<span className="text-muted d-block">{moment(createdAt).format('ll')}</span>
											</small>
										</div>
									</div>
									<div className="col-md-6 pr-0 text-right">
										<img alt="#" height="300" src={`/${picture.directoryPath}/${picture.fileName}`} aria-hidden />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="container pt-4">

						<div className="row justify-content-center">
							<div className="col-md-12 col-lg-12">
								<article className="article-post">
									{parse(text)}
								</article>
							</div>
						</div>
					</div>
				</Fragment>
			)
		}
	}

	render() {
		const { story: { loading: loadingSingleStory } } = this.props.story;
		const { story: { data: singleStory } } = this.state;

		return (
			<Fragment>
				<div className="row">
					<div className="col-md-12">

						{this.renderStory(singleStory, loadingSingleStory)}

						{
							!loadingSingleStory
							? 
							<Response story={singleStory} />
							: <Spinner/>
						}
						
						<div className="container pt-4 pb-4">
							<h5 className="font-weight-bold spanborder"><span>Read next</span></h5>
							<div className="row">
								<div className="col-lg-6">
									<div className="card border-0 mb-4 box-shadow h-xl-300">
										<div style={{ backgroundImage: `url(${jpgDemoImg(2)})`, height: '150px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
										<div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
											<h2 className="h4 font-weight-bold">
												<Link className="text-dark" to="./story"> Stimulation Relieves Depression Symptoms</Link>
											</h2>
											<p className="card-text">
												Researchers have found an effective target in the brain for electrical stimulation to improve mood in people suffering from depression.
										</p>
											<div>
												<small className="d-block"><Link className="text-muted" to="./story">Favid Rick</Link></small>
												<small className="text-muted">Dec 12</small>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="flex-md-row mb-4 box-shadow h-xl-300">
										<div className="mb-3 d-flex align-items-center">
											<img alt="#" height="80" src={jpgDemoImg('blog4')} />
											<div className="pl-3">
												<h2 className="mb-2 h6 font-weight-bold">
													<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
												</h2>
												<div className="card-text text-muted">
													Jake Bittle in LOVE/HATE
										</div>
												<small className="text-muted">Dec 12</small>
											</div>
										</div>
										<div className="mb-3 d-flex align-items-center">
											<img alt="#" height="80" src={jpgDemoImg('blog5')} />
											<div className="pl-3">
												<h2 className="mb-2 h6 font-weight-bold">
													<Link className="text-dark" to="./story">Underwater museum brings hope to Lake Titicaca</Link>
												</h2>
												<div className="card-text text-muted">
													Jake Bittle in LOVE/HATE
										</div>
												<small className="text-muted">Dec 12</small>
											</div>
										</div>
										<div className="mb-3 d-flex align-items-center">
											<img alt="#" height="80" src={jpgDemoImg('blog6')} />
											<div className="pl-3">
												<h2 className="mb-2 h6 font-weight-bold">
													<Link className="text-dark" to="./story">Sun-skimming probe starts calling home</Link>
												</h2>
												<div className="card-text text-muted">
													Jake Bittle in LOVE/HATE
												</div>
												<small className="text-muted">Dec 12</small>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Fragment >
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	story: state.story
})

export default connect(mapStateToProps, { setAlert, clearAlert, getStoryBySlug, setErrors, clearErrors })(Story);
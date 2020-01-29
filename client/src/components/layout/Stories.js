import React, { Component } from 'react';
import { jpgDemoImg } from '../../utils/helper';
import { Link } from 'react-router-dom';

class Stories extends Component {
	render() {
		
		return (
			<div className="row">
				<div className="col-md-8">
					<h5 className="font-weight-bold spanborder"><span>Featured in Science</span></h5>
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
					<h5 className="font-weight-bold spanborder"><span>Latest</span></h5>
					<div className="mb-3 d-flex justify-content-between">
						<div className="pr-3">
							<h2 className="mb-1 h4 font-weight-bold">
								<Link className="text-dark" to="./story">Nearly 200 Great Barrier Reef coral species also live in the deep sea</Link>
							</h2>
							<p>
								There are more coral species lurking in the deep ocean that previously thought.
                                        </p>
							<div className="card-text text-muted small">
								Jake Bittle in SCIENCE
                                        </div>
							<small className="text-muted">Dec 12 · 5 min read</small>
						</div>
						<img height="120" src={jpgDemoImg(1)} aria-hidden alt="image post 1" />
					</div>
					<div className="mb-3 d-flex justify-content-between">
						<div className="pr-3">
							<h2 className="mb-1 h4 font-weight-bold">
								<Link className="text-dark" to="./story">East Antarctica's glaciers are stirring</Link>
							</h2>
							<p>
								Nasa says it has detected the first signs of significant melting in a swathe of glaciers in East Antarctica.
                                        </p>
							<div className="card-text text-muted small">
								Jake Bittle in SCIENCE
                                        </div>
							<small className="text-muted">Dec 12 · 5 min read</small>
						</div>
						<img height="120" src={jpgDemoImg(2)} aria-hidden alt="image post 2" />
					</div>
					<div className="mb-3 d-flex justify-content-between">
						<div className="pr-3">
							<h2 className="mb-1 h4 font-weight-bold">
								<Link className="text-dark" to="./story">50 years ago, armadillos hinted that DNA wasn’t destiny</Link>
							</h2>
							<p>
								Nasa says it has detected the first signs of significant melting in a swathe of glaciers in East Antarctica.
                                        </p>
							<div className="card-text text-muted small">
								Jake Bittle in SCIENCE
                                        </div>
							<small className="text-muted">Dec 12 · 5 min read</small>
						</div>
						<img height="120" src={jpgDemoImg(3)} aria-hidden alt="image post 3" />
					</div>
				</div>
				<div className="col-md-4 pl-4">
					<div className="sticky-top">
						<h5 className="font-weight-bold spanborder"><span>Popular in Science</span></h5>
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

export default Stories;
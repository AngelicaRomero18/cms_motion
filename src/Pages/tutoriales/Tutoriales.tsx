import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./Tutoriales.scss";

const mapStateToProps = (state: any) => {
  return {
    TutorialesReducer: state.TutorialesReducer,
  };
};

interface MyProps {
  TutorialesReducer: any;
}

interface MyState {}

class Tutoriales extends Component<MyProps, MyState> {
  render() {
    return (
      <div className="Tutoriales Desktop">
        <div className="Tutoriales-content column">
          {this.props.TutorialesReducer.tutoriales.map((tuto: any) => (
            <div className="column Tutoriales-content-tuto" key={tuto.id}>
              <div className="title-section row">
                <img
                  src={`data:image/png;base64, ${tuto.ico_app}`}
                  alt=""
                  className="title-ico"
                />
                <div className="title-text">{tuto.name}</div>
              </div>
              <div className="carrusel-videos row">
                <div className="carrusel-content row">
                  {tuto.videos.map((video: any) => {
                    return (
                      <Link
                        key={video.id}
                        to={{
                          pathname: `/Tutoriales/${video.id}`,
                          state: { video: video, tutoriales: tuto },
                        }}
                        className="item-tuto-content row"
                      >
                        <div className="item-tuto-background">
                          <div
                            className="row item-tuto-content-video"
                            key={video.id}
                          >
                            <div className="text-content column">
                              <div className="title-video">{video.name}</div>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: video.description,
                                }}
                                className="description-video"
                              />
                            </div>
                            <img
                              src={`data:image/png;base64, ${video.miniature}`}
                              className="item-tuto"
                              alt=""
                            />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Tutoriales);

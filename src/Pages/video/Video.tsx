import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./Video.scss";
import { ReactComponent as EliminarIco } from "../../../img/Eliminar.svg";

interface MyProps {}

interface MyState {}

class Video extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const location: any = this.props;
    return (
      <div className="Video Desktop">
        <div className="Video-content row">
          <div className="column mediaplayer-content">
            <div className="mediaplayer">
              <iframe
                src={location.state.video.link}
                frameBorder="0"
                className="video-player"
              ></iframe>
            </div>
            <div className="description">
              <div className="description-content">
                <div className="text column">
                  <div className="text-content column">
                    <div className="header-text row">
                      <div className="text-title">
                        {location.state.video.name}
                      </div>
                      <Link to="/Tutoriales">
                        <EliminarIco className="salir-ico" />
                      </Link>
                    </div>
                    <div className="text-app">
                      {location.state.tutoriales.name}
                    </div>
                    <div
                      className="text-description"
                      dangerouslySetInnerHTML={{
                        __html: location.state.video.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sections">
            <div className="column sections-content">
              {location.state.tutoriales.videos.map((tuto: any) => {
                return (
                  <Link
                    key={tuto.id}
                    to={{
                      pathname: `/Tutoriales/${tuto.id}`,
                      state: {
                        video: tuto,
                        tutoriales: location.state.tutoriales,
                      },
                    }}
                    className="section-video row"
                  >
                    <div className="sections-background row">
                      <div className="column section-text">
                        <div className="section-title">{tuto.name}</div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: tuto.description,
                          }}
                          className="section-description"
                        />
                      </div>
                      <img
                        src={`data:image/png;base64, ${tuto.miniature}`}
                        className="section-miniature"
                        alt=""
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Video);

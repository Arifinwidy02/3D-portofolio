import React, { useState } from "react";
import { projects, works } from "../constants";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import CTA from "../components/CTA";
import { titleCase } from "title-case";
const Projects = () => {
  const [hoveredVideos, setHoveredVideos] = useState(
    Array(projects.length).fill(false)
  );

  const handleVideoHover = (index, isHovered) => {
    const updatedHoveredVideos = [...hoveredVideos];
    updatedHoveredVideos[index] = isHovered;
    setHoveredVideos(updatedHoveredVideos);
  };

  return (
    <section className="max-container">
      <h1 className="head-text">
        My{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Projects
        </span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>I've projects mobile and web developer</p>
      </div>
      <div className="flex flex-wrap mb-20 gap-16 mt-5">
        {projects.map(
          (
            {
              name,
              iconUrl,
              theme,
              description,
              link,
              sourceVideo,
              typeOfProject,
            },
            index
          ) => {
            const customAlign = index % 2 ? "flex-end" : "flex-start";
            const CustomTextAlign = index % 2 ? "right" : "left";
            return (
              <div
                className={`w-full flex-col ${customAlign}`}
                key={name}
                style={{
                  justifyContent: "flex-start", // Keep horizontal alignment as default
                  alignItems: customAlign, // Align items based on index
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <div
                  className="w-6/12"
                  onMouseEnter={() => handleVideoHover(index, true)}
                  onMouseLeave={() => handleVideoHover(index, false)}
                  style={{
                    display: "flex",
                    justifyContent: customAlign,
                    height: 250,
                  }}
                >
                  <video
                    controls={hoveredVideos[index]}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  >
                    <source
                      src={
                        sourceVideo.startsWith("http")
                          ? sourceVideo
                          : sourceVideo
                      }
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div
                  className="mt-5 flex flex-col"
                  style={{
                    textAlign: CustomTextAlign,
                  }}
                >
                  <h4 className="mt-2 font-poppins font-semibold">{`${name} (${titleCase(
                    typeOfProject
                  )})`}</h4>
                  <p className="text-slate-500 mt-2">{description}</p>
                  <div
                    className="flex flex-row mt-3"
                    style={{
                      alignItems: "center",
                      justifyContent: customAlign,
                    }}
                  >
                    <Link
                      to={link}
                      className="font-semibold text-blue-600"
                      target="_blank"
                    >
                      Live Link
                    </Link>
                    <img src={arrow} alt="arrow" className="ml-2" />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <hr className="border-slate-200" />
      {/* <div
        style={{
          display: "flex",
          paddingTop: 32,
          paddingBottom: 32,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <p className="cta-text" style={{ textAlign: "center" }}>
            What i have been doing on my work
          </p>
        </div>
        <div className="flex flex-wrap mb-20 gap-16 mt-5">
          {works.map(
            (
              {
                name,
                iconUrl,
                theme,
                description,
                link,
                sourceVideo,
                typeOfProject,
              },
              index
            ) => {
              const customAlign = index % 2 ? "flex-end" : "flex-start";
              const CustomTextAlign = index % 2 ? "right" : "left";
              return (
                <div
                  className={`w-full flex-col ${customAlign}`}
                  key={name}
                  style={{
                    justifyContent: "flex-start", // Keep horizontal alignment as default
                    alignItems: customAlign, // Align items based on index
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div
                    className="w-6/12"
                    onMouseEnter={() => handleVideoHover(index, true)}
                    onMouseLeave={() => handleVideoHover(index, false)}
                    style={{
                      display: "flex",
                      justifyContent: customAlign,
                      height: 250,
                    }}
                  >
                    <video
                      controls={hoveredVideos[index]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    >
                      <source
                        src={
                          sourceVideo.startsWith("http")
                            ? sourceVideo
                            : sourceVideo
                        }
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div
                    className="mt-5 flex flex-col"
                    style={{
                      textAlign: CustomTextAlign,
                    }}
                  >
                    <h4 className="mt-2 font-poppins font-semibold">{`${name} (${titleCase(
                      typeOfProject
                    )})`}</h4>
                    <p className="text-slate-500 mt-2">{description}</p>
                    <div
                      className="flex flex-row mt-3"
                      style={{
                        alignItems: "center",
                        justifyContent: customAlign,
                      }}
                    >
                      <Link
                        to={link}
                        className="font-semibold text-blue-600"
                        target="_blank"
                      >
                        Live Link
                      </Link>
                      <img src={arrow} alt="arrow" className="ml-2" />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div> */}
      {/* <hr className="border-slate-200" /> */}
      <CTA />
    </section>
  );
};

export default Projects;

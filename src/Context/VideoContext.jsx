import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/fr"; // Importez la locale 'fr' pour moment

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export const CurrentVideosContextProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState("");

  const videoDate = (video) =>
    moment(video.creation_date).locale("fr").fromNow();

  const values = {
    selectedId,
    setSelectedId,
    videoDate,
  };

  return (
    <CurrentVideosContext.Provider value={values}>
      {children}
    </CurrentVideosContext.Provider>
  );
};

CurrentVideosContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentVideosContext = () => {
  const context = useContext(CurrentVideosContext);
  if (!context) {
    throw new Error(
      "useCurrentVideosContext must be used within a CurrentVideosContextProvider"
    );
  }
  return context;
};

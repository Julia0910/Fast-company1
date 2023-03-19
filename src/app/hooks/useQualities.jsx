import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export function useQualities() {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
      if (error !== null) {
          toast(error);
          setError(null);
      }
  }, [error]);

  useEffect(() => {
      getQualititesList();
  }, []);
  function errorCatcher(error) {
      const { message } = error.response.data;
      setError(message);
  }
  function getQualities(ids) {
      return qualities.filter((q) => ids.includes(q._id));
  }

  async function getQualititesList() {
      try {
          const { content } = await qualityService.get();
          setQualities(content);
          setLoading(false);
      } catch (error) {
          errorCatcher(error);
      }
  }

  return (
      <QualityContext.Provider
          value={{ isLoading, qualities, getQualities }}
      >
          {children}
      </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
};

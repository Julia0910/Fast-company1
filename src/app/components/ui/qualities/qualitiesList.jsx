import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities: qualitiesIds }) => {
    const { isLoading, getQualities } = useQualities();
    const qualities = getQualities(qualitiesIds);

    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;

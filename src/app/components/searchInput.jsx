import PropTypes from "prop-types";
import React from "react";

const SearchInput = ({ onChange, search }) => {
    const handleChange = (event) => {
        const value = event.target.value;
        onChange(value);
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            name="text"
            onChange={handleChange}
            value={search}
        />
    );
};

SearchInput.propTypes = {
    onChange: PropTypes.func,
    search: PropTypes.string
};

export default SearchInput;

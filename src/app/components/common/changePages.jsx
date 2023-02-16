import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useParams, useHistory } from "react-router-dom";

const ChangePages = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const { userId } = useParams();
    const history = useHistory();

    const prepareData = (data) => {
        const profession = Object.values(professions).find(
            (profession) => profession._id === data.profession
        );
        const userQualities = data.qualities.map((dataQuality) =>
            Object.values(qualities).find(
                (quality) => quality._id === dataQuality.value
            )
        );
        return {
            ...data,
            profession,
            qualities: userQualities
        };
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.users
            .getById(userId)
            .then((data) => {
                const qualities = data.qualities.map((quality) => ({
                    label: quality.name,
                    value: quality._id
                }));
                setData({
                    ...data,
                    profession: data.profession._id,
                    qualities: qualities
                });
            })
            .catch(() => {})
            .finally(() => setIsLoading(false));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле 'Имя' обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const preparedData = prepareData(data);
        api.users.update(userId, preparedData);
        history.push(`/users/${userId}`);
    };

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберите вашу профессию"
                                    defaultOption="Choose..."
                                    name="profession"
                                    options={professions}
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChangePages;

import React, { useContext } from 'react';
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useNavigate } from "react-router-dom";

import './PlaceForm.css'
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

function NewPlace() {

    const navigate = useNavigate();

    const auth = useContext(AuthContext);


    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },
            image: {
                value: null,
                isValid: false
            },
        },
        false
    );

    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('image', formState.inputs.image.value);
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/places',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            );
            navigate("/", { replace: false });
        } catch (err) { }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='please enter a valid title.'
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='please enter a valid description(at least 5 char).'
                    onInput={inputHandler}

                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                <ImageUpload
                    center
                    id="image"
                    onInput={inputHandler}
                    errorText='Please provide an image'
                />
                <Button
                    type="submit"
                    disabled={!formState.isValid}
                >
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    )
}

export default NewPlace

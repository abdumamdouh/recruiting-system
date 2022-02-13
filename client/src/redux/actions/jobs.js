import {GET_JOBS_REQUEST,GET_JOBS_SUCCESS,GET_JOBS_FAIL} from '../types/index'
const getJobsAction = (
    Recruiter,
    redirect,
    showError,
    showSuccessMessage
) => {
    return async dispatch => {
        try {
            dispatch({ type: GET_JOBS_REQUEST });
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.post(
                `${serverURL}/Recruiter/Sign-up`,
                Recruiter,
                config
            );
            dispatch({ type: REGISTER_RECRUITER_SUCCESS, payload: data });

            //TRYING LOCAL STORAGE
            //localStorage.setItem('userAuthData', JSON.stringify(data));

            showSuccessMessage();
            setTimeout(() => {
                redirect();
            }, 1000);
        } catch (error) {
            dispatch({
                type: REGISTER_RECRUITER_FAIL,
                payload: error.response && error.response.data
            });
            showError();
        }
    };
}
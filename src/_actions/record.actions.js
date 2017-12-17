import { recordConstants } from '../_constants';
import { recordService } from '../_services';
import { alertActions } from './';

export const recordActions = {
    getByUserId,
    update
};

function getByUserId(user) {
    return dispatch => {
        dispatch(request());

        recordService.getByUserId(user)
            .then(
                records => { dispatch(success(records.records));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: recordConstants.GETBYUSERID_REQUEST } }
    function success(records) { return { type: recordConstants.GETBYUSERID_SUCCESS, records } }
    function failure(error) { return { type: recordConstants.GETBYUSERID_FAILURE, error } }
}

  function update(record){
    return dispatch => {
        dispatch(request(record));

        recordService.update(record)
            .then(
                record => {
                    dispatch(success(record.record));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(record) { return { type: recordConstants.UPDATE_REQUEST, record } }
    function success(record) { return { type: recordConstants.UPDATE_SUCCESS, record } }
    function failure(error) { return { type: recordConstants.UPDATE_FAILURE, error } }
  }

import { engineConstants } from '../_constants';
import { engineService } from '../_services';
import { alertActions } from './';

export const engineActions = {
    create,
    update,
    getAll,
    delete: _delete,
    reservation,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        engineService.getAll()
            .then(
                engines => { dispatch(success(engines.engines));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: engineConstants.GETALL_REQUEST } }
    function success(engines) { return { type: engineConstants.GETALL_SUCCESS, engines } }
    function failure(error) { return { type: engineConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        engineService.delete(id)
            .then(
                engine => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: engineConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: engineConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: engineConstants.DELETE_FAILURE, error } }
  }

  function update(engine){
    return dispatch => {
        dispatch(request(engine));

        engineService.update(engine)
            .then(
                engine => {
                    dispatch(success(engine.engine));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(engine) { return { type: engineConstants.UPDATE_REQUEST, engine } }
    function success(engine) { return { type: engineConstants.UPDATE_SUCCESS, engine } }
    function failure(error) { return { type: engineConstants.UPDATE_FAILURE, error } }
  }

  function create(engine){
    return dispatch => {
        dispatch(request(engine));

        engineService.create(engine)
            .then(
                engine => {
                    dispatch(success(engine));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(engine) { return { type: engineConstants.CREATE_REQUEST, engine } }
    function success(engine) { return { type: engineConstants.CREATE_SUCCESS, engine } }
    function failure(error) { return { type: engineConstants.CREATE_FAILURE, error } }
  }

  function reservation(engine, reservation){
    return dispatch => {
        dispatch(request(engine, reservation));

        engineService.reservation(engine, reservation)
            .then(
                engine => {
                    dispatch(success(engine.engine));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(engine, reservation) { return { type: engineConstants.RESERVATION_REQUEST, engine, reservation } }
    function success(engine) { return { type: engineConstants.RESERVATION_SUCCESS, engine } }
    function failure(error) { return { type: engineConstants.RESERVATION_FAILURE, error } }
  }

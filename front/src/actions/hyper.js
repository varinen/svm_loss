import {UPDATE_HYPER} from "../actionTypes";

export const updateHyper = (name, value) => {
    let updating = {};
    updating[name] = value;
    return {type: UPDATE_HYPER, updating};
};
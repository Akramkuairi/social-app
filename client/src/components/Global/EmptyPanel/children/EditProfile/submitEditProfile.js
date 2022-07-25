import { axiosConfiguration } from "../../../../../functions/axiosConfig";
import { qsev } from "../../../../../functions/functions";
import { loading, stopLoading } from "../../../../../redux/loadingReducer";
import { deleteOptionMenu } from "../../../../../redux/optionMenuReducer";
import { closePanel } from "../../../../../redux/panelReducer";
import { updateProfileUserProfile } from "../../../../../redux/profileReducer";
import { store } from "../../../../../redux/store";
import { updateUserProfile } from "../../../../../redux/userReducer";

export const submitEditProfile = () => {
  store.dispatch(closePanel());
  store.dispatch(loading());
  const axiosConfig = axiosConfiguration();
  const name = qsev("#name");
  const description = qsev("#description");
  const city = qsev("#city");
  const country = qsev("#country");

  axiosConfig
    .put(`/user/profile`, {
      name: name,
      description: description,
      city: city,
      country: country,
    })
    .then((res) => {
      console.log(res.data);
      store.dispatch(
        updateUserProfile({
          name: res.data.name,
          description: res.data.description,
          city: res.data.city,
          country: res.data.country,
        })
      );
      store.dispatch(
        updateProfileUserProfile({
          name: res.data.name,
          description: res.data.description,
          city: res.data.city,
          country: res.data.country,
        })
      );
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(stopLoading());
    });
};

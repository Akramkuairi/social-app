import {
  setOptionMenu,
  deleteOptionMenu,
} from "../../../../../../redux/optionMenuReducer";
import { store } from "../../../../../../redux/store";

export const handleOptionMenuClick = (optionMenu, id) => {
  if (optionMenu.id === id) {
    return store.dispatch(deleteOptionMenu());
  }
  store.dispatch(
    setOptionMenu({
      isOptionMenu: !optionMenu.isOptionMenu,
      id: id,
    })
  );
};

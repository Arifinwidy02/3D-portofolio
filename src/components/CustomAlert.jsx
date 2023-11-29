import Swal from "sweetalert2";

export const CustomAlert = ({ ...props }) => {
  Swal.fire({
    ...props,
  });
};

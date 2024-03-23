import {useSelector} from "react-redux";

function Customer() {
  const customerFullName = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customerFullName}</h2>;
}

export default Customer;

import React from 'react';
import { MYAPPLICATION } from "../../requests/userRequests";
import NavBarButton from './navbarbutton';
import { useQuery } from "@apollo/client";

const NavbarMyApplicationButton = () => {
    const myApplicationData = useQuery(MYAPPLICATION, {
      fetchPolicy: "no-cache",
    },);
    const userHasApplication = Boolean(myApplicationData?.data?.myApplication);
    if (userHasApplication) {
      return (<NavBarButton title="My Application" iconstring="address-card" address="/myapplication" />);
    }
    return (
      <div></div>
    );
};

export default NavbarMyApplicationButton;


const getRolesFromToken = (token) => {
    if (!Boolean(token)){
        return [];
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    let Roles = JSON.parse(jsonPayload)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    let hasRole = Boolean(Roles)

    return hasRole ? Roles : [] ;
};

const getAccessLevel = (RolesArray) => {
if (RolesArray.includes("superuser")) {return 5;}
    else if (RolesArray.includes("admin")) {  return 4; }
    else if (RolesArray.includes("teamleader")) {  return 3; }
    else if (RolesArray.includes("internal")) { return 2 ;}
    else { return 1;}
}

export {
    getRolesFromToken,
    getAccessLevel
}
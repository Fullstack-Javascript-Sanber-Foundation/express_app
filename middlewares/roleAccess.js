const roleAccess = (userRole, endpoint) => {
    if(endpoint === '/student' && userRole === 'superadmin'){
        return true
    } else {
        return false
    }
}

export default roleAccess
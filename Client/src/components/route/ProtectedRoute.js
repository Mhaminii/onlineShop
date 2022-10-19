import React, {Fragment} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function ProtectedRoute({ component: Component, ...rest}) {

    const {isAuthenticated, loading, user} =useSelector(state => state.auth)

  return (
    <Fragment>
        {loading === flase &&(
            <Route
                {...rest}
                render={ props =>{
                    if(isAuthenticated === false){
                        return <Navigate to="/login" replace />
                    }

                    return <Component {...props}/>
                }}
            />   
        )}
    </Fragment>
  )
}

export default ProtectedRoute